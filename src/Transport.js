define(function(){

	/**
	 *  Parse tempo and time signature from the midiJson
	 *  @param  {Object}  midiJson 
	 *  @return  {Object}
	 */
	return function parseTransport(midiJson){
		var ret = {};
		for (var i = 0; i < midiJson.tracks.length; i++){
			var track = midiJson.tracks[i];
			for (var j = 0; j < track.length; j++){
				var datum = track[j];
				if (datum.type === "meta"){
					if (datum.subtype === "timeSignature"){
						ret.timeSignature = [datum.numerator, datum.denominator];
					} else if (datum.subtype === "setTempo"){
						ret.bpm = 60000000 / datum.microsecondsPerBeat;
					}
				} 
			}
		}
		return ret;
	};

});