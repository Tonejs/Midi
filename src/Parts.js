define(function(){

	/**
	 *  Convert a MIDI number to scientific pitch notation
	 *  @param {Number} midi The MIDI note number
	 *  @returns {String} The note in scientific pitch notation
	 */
	function midiToNote(midi){
		var scaleIndexToNote = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
		var octave = Math.floor(midi / 12) - 1;
		var note = midi % 12;
		return scaleIndexToNote[note] + octave;
	}

	/**
	 *  Convert MIDI PPQ into Tone.js PPQ
	 */
	function ticksToToneTicks(tick, ticksPerBeat, PPQ){
		return Math.round((tick / ticksPerBeat) * PPQ) + "i";
	}

	/**
	 *  Parse noteOn/Off from the tracks in midi JSON format into
	 *  Tone.Score-friendly format.
	 *  @param  {Object}  midiJson 
	 *  @param  {Object}  options   options for parseing
	 *  @return  {Object}
	 */
	return function parseParts(midiJson, options){
		var ticksPerBeat = midiJson.header.ticksPerBeat;
		//some default values
		options = typeof options !== "object" ? {} : options;
		options.PPQ = typeof options.PPQ === "undefined" ? 48 : options.PPQ;
		options.midiNote = typeof options.midiNote === "undefined" ? true : options.midiNote;
		options.noteName = typeof options.noteName === "undefined" ? true : options.noteName;
		options.duration = typeof options.duration === "undefined" ? true : options.duration;
		options.velocity = typeof options.velocity === "undefined" ? true : options.velocity;

		var output = {};

		//parse each of the tracks
		for (var i = 0; i < midiJson.tracks.length; i++) {
			var track = midiJson.tracks[i];
			var trackName = "track"+i;
			var trackNotes = [];
			var currentTime = 0;
			for (var j = 0; j < track.length; j++){
				var evnt = track[j];
				currentTime += evnt.deltaTime;
				if (evnt.subtype === "noteOn"){
					var noteObj = {
						ticks : currentTime,
						time : currentTime, 
						note : evnt.noteNumber,
					};
					if (options.midiNote){
						noteObj.midiNote = evnt.noteNumber;
					}
					if (options.noteName){
						noteObj.noteName =  midiToNote(evnt.noteNumber);
					}
					if (options.velocity){
						var velocity = evnt.velocity / 127;
						noteObj.velocity =  velocity;
					}
					trackNotes.push(noteObj);
				} else if (evnt.subtype === "noteOff"){
					//add the duration
					for (var k = trackNotes.length - 1; k >= 0; k--){
						var trackNote = trackNotes[k];
						if (trackNote.note === evnt.noteNumber && typeof trackNote.duration === "undefined"){
							if (options.duration){
								trackNote.duration = ticksToToneTicks(currentTime - trackNote.ticks, ticksPerBeat, options.PPQ);
							}
							trackNote.time = ticksToToneTicks(trackNote.time, ticksPerBeat, options.PPQ);
							delete trackNote.note;
							delete trackNote.ticks;
							break;
						}
					}
				} else if (evnt.type === "meta" && evnt.subtype === "trackName"){
					trackName = evnt.text;
					//Ableton Live adds an additional character to the track name
					trackName = trackName.replace(/\u0000/g, '');
				}
			}
			if (trackNotes.length > 0){
				output[trackName] = trackNotes;
			}
		}
		return output;
	};
});