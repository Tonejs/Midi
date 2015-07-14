/**
 *  Converts Binary MIDI files into Tone.js Score JSON descriptions. 
 *  
 *  @example
 * node MidiToScore.js mySong.mid
 * 
 *  @example
 * //to parse the score in Tone.js:
 * var score = new Tone.Score("path/to/score.json");
 * score.start();
 * //or 
 * var score = new Tone.Score({
 * 	//the parsed JSON score
 * });
 */

var argv = require('minimist')(process.argv.slice(2));
var midiConverter = require("midi-converter");
var fs = require("fs");

/**
 *  MIDI ticks. should be read from the file. 
 */
var ticksPerBeat = 480;

/**
 *  the default settings
 */
var defaultSettings = {
	PPQ : 48,
	tempo : 120,
	timeSignature : [4, 4],
};

/**
 *  Get all of the settings out of the tracks
 */
function parseSettings(midi){
	var settings = {};
	for (var i = 0; i < midi.tracks.length; i++) {
		var track = midi.tracks[i];
		var trackNotes = [];
		for (var j = 0; j < track.length; j++){
			var evnt = track[j];
			if (evnt.type === "meta"){
				if (evnt.subtype === "timeSignature"){
					settings.timeSignature = [evnt.numerator, evnt.denominator];
				} else if (evnt.subtype === "setTempo"){
					settings.tempo = 60000000 / evnt.microsecondsPerBeat;
				} else if (evnt.subtype === "trackName"){
					trackName = evnt.text;
				}
			}
		}
	}
	//also go through and grab the MIDI PPQ
	ticksPerBeat = midi.header.ticksPerBeat;
	for (var attr in defaultSettings){
		if (typeof settings[attr] === "undefined"){
			settings[attr] = defaultSettings[attr];
		}
	}
	return settings;
}

/**
 *  Convert 
 */
function parseTracks(midi){
	var output = {};
	for (var i = 0; i < midi.tracks.length; i++) {
		var track = midi.tracks[i];
		var trackName = "track"+i;
		var trackNotes = [];
		var currentTime = 0;
		for (var j = 0; j < track.length; j++){
			var evnt = track[j];
			currentTime += evnt.deltaTime;
			var note = midiToNote(evnt.noteNumber);
			var velocity = evnt.velocity / 127;
			if (evnt.subtype === "noteOn"){
				trackNotes.push({
					"ticks" : currentTime,
					"time" : currentTime, 
					"note" : note, 
					"velocity" : velocity,
					"midiNote" : evnt.noteNumber
				});
			} else if (evnt.subtype === "noteOff"){
				//add the duration
				for (var k = trackNotes.length - 1; k >= 0; k--){
					var trackNote = trackNotes[k];
					if (trackNote.note === note && typeof trackNote.duration === "undefined"){
						trackNote.duration = currentTime - trackNote.ticks;
						delete trackNote.ticks;
						break;
					}
				}
			} else if (evnt.type === "meta" && evnt.subtype === "trackName"){
				trackName = evnt.text;
			}
		}
		output[trackName] = trackNotes;
	}
	return output;
}

/**
 *  Convert MIDI PPQ into Tone.js PPQ
 */
function convertTicksToPPQ(tracks, PPQ){
	for (var trackName in tracks){
		var track = tracks[trackName];
		for (var note = 0; note < track.length; note++){
			track[note].time = ticksToToneTicks(track[note].time, PPQ);
			track[note].duration = ticksToToneTicks(track[note].duration, PPQ);
		}
	}
}

function ticksToToneTicks(tick, PPQ){
	return Math.round((tick / ticksPerBeat) * PPQ) + "i";
}

/**
 *  Convert a MIDI note number to a string in the form [Note][Octave]
 */
function midiToNote(noteNum){
	var noteIndexToNote = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
	var octave = Math.floor(noteNum / 12) - 2;
	var note = noteNum % 12;
	return noteIndexToNote[note] + octave;
}

/**
 *  the main parsing function
 */
(function main(){
	//read the file
	var file = fs.readFileSync(process.argv[2], "binary");
	//parse the midi
	var midi = midiConverter.midiToJson(file);
	//grab the settings
	var settings = parseSettings(midi);
	//get the tracks
	var tracks = parseTracks(midi);
	//convert the given ticks to Tone's PPQ
	convertTicksToPPQ(tracks, settings.PPQ);
	tracks.settings = settings;
	//write the output
	fs.writeFileSync(process.argv[2]+".json", JSON.stringify(tracks));
}());