define(["Util"], function (Util) {

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

	return function getNotes(track){
		var trackNotes = [];
		var noteOffs = [];
		for (var j = 0; j < track.length; j++){
			var evnt = track[j];
			if (evnt.subtype === "noteOn"){
				var noteObj = {
					ticks : evnt.ticks,
					time : evnt.time,
					midi : evnt.noteNumber,
					noteNumber : evnt.noteNumber,
					note : midiToNote(evnt.noteNumber),
					velocity : Util.midiToFloat(evnt.velocity)
				};
				trackNotes.push(noteObj);
			} else if (evnt.subtype === "noteOff"){
				noteOffs.push({
					ticks : evnt.ticks,
					time : evnt.time,
					midi : evnt.noteNumber,
					note : midiToNote(evnt.noteNumber)
				});
				//add the duration by going through
				//and finding the matching note on
				//which doens't already have a duration
				for (var k = 0; k < trackNotes.length; k++){
					var trackNote = trackNotes[k];
					if (trackNote.noteNumber === evnt.noteNumber && typeof trackNote.duration === "undefined"){
						trackNote.duration = evnt.time - trackNote.time;
						delete trackNote.noteNumber;
						break;
					}
				}
			}
		}
		if (trackNotes.length){
			return [trackNotes, noteOffs];
		}
	};
});