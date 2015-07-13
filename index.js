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
console.dir(argv);

var midiConverter = require("midi-converter");
var fs = require("fs");

var file = fs.readFileSync(process.argv[2], "binary");

var midi = midiConverter.midiToJson(file);


var output = {};

var settings = {};

var defaultSettings = {
	PPQ : 48,
	tempo : 120,
	timeSignature : [4, 4],
};

var tempo = 120;
var TonePPQ = 12;
var ticksPerBeat = midi.header.ticksPerBeat;
var timeSignature = [4, 4];
var microsecondsPerBeat = 60000000 / tempo;

//parse the tracks
for (var i = 0; i < midi.tracks.length; i++) {
	var data = midi.tracks[i];
	var trackName = "track"+i;
	var trackNotes = [];
	var currentTime = 0;
	for (var j = 0; j < data.length; j++) {
		//meta tag stuff
		var evnt = data[j];
		currentTime += evnt.deltaTime;
		if (evnt.type === "meta"){
			if (evnt.subtype === "timeSignature"){
				timeSignature[0] = evnt.numerator;
				timeSignature[1] = evnt.denominator;
			} else if (evnt.subtype === "setTempo"){
				tempo = 60000000 / evnt.microsecondsPerBeat;
				microsecondsPerBeat = evnt.microsecondsPerBeat;
			} else if (evnt.subtype === "trackName"){
				trackName = evnt.text;
			}
		} else {
			var time = deltaTimeToMeter(currentTime);
			var note = midiToNote(evnt.noteNumber);
			var velocity = evnt.velocity / 127;
			if (evnt.subtype === "noteOn"){
				trackNotes.push({
					"ticks" : currentTime,
					"time" : time, 
					"note" : note, 
					"velocity" : velocity
				});
			} else if (evnt.subtype === "noteOff"){
				//add the duration
				for (var i = trackNotes.length - 1; i >= 0; i--){
					var trackNote = trackNotes[i];
					if (trackNote.note === note && typeof trackNote.duration === "undefined"){
						trackNote.duration = deltaTimeToMeter(currentTime - trackNote.ticks);
						delete trackNote.ticks;
						break;
					}
				}
			} 
		}
	}
	output[trackName] = trackNotes;
}

output.tempo = tempo;
output.timeSignature = timeSignature;

//write it to the output file
fs.writeFileSync(process.argv[2]+".json", JSON.stringify(output));

function deltaTimeToMeter(deltaTime){
	var timeSigValue = timeSignature[0] / (timeSignature[1] / 4);
	// return deltaTime;
	var quarters = deltaTime / ticksPerBeat;
	return quarters * 12;

	//old
	var measures = Math.floor(quarters / timeSigValue);
	var sixteenths = (quarters % 1) * 4;
	quarters = Math.floor(quarters) % timeSigValue;
	var progress = [measures, quarters, sixteenths];
	return progress.join(":");
}

/**
 *  Convert MIDI PPQ into Tone.js PPQ
 */
function parseSettings(midi){
	return Math.round((ticks / ticksPerBeat) * TonePPQ) + "i";
}

/**
 *  Convert MIDI PPQ into Tone.js PPQ
 */
function PPQtoTonePPQ(ticks){
	return Math.round((ticks / ticksPerBeat) * TonePPQ) + "i";
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