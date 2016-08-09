define(["Util", "track/Name", "track/Notes", "track/Control"], 
	function (Util, getName, getNotes, getControl) {

	function parseTrack(track, transport){
		var controls = getControl(track, transport);
		var ret = {};
		var name = getName(track);
		if (name){
			ret.name = name;
		}
		var notes = getNotes(track, transport);
		if (notes){
			ret.notes = notes[0];
			ret.noteOffs = notes[1];
		}
		//map over values returned from controls
		for (var c in controls){
			ret[c] = controls[c];
		}
		return ret;
	}

	return function parseTracks(midiJson, transport){
		var givenPPQ = midiJson.header.ticksPerBeat;

		var tracks = [];

		for (var i = 0; i < midiJson.tracks.length; i++) {
			var track = midiJson.tracks[i];
			track = Util.absoluteTime(track, transport);
			tracks.push(parseTrack(track, transport));
		}
		return tracks;
	};
});