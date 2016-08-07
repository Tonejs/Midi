define(function () {

	function simplifySixteenths(sixteenths){
		sixteenths = sixteenths.toString();
		if (sixteenths.length > 5){
			return sixteenths.substring(0, 5);
		} else {
			return sixteenths;
		}
	}

	function simplifyTime(time){
		if (time.substring(time.length - 2) === ":0"){
			return time.substring(0, time.length - 2);
		} else {
			return time;
		}
	}

	return {
		/**
		 *  Convert a value in the midi range 0-127 to a float
		 */
		midiToFloat : function(midiVal){
			return parseFloat((midiVal / 127).toFixed(4));
		},
		/**
		 *  Convert midi ticks into Tone.js time
		 */
		ticksToTime : function(ticks, transport){
			var quarterToSeconds = (60 / transport.bpm) * (ticks / transport.midiPPQ);
			return quarterToSeconds;
		},
		/**
		 *  Does an initial pass on the json MIDI track
		 *  and converts all the timings to absolute timings
		 *  @param {Array} track
		 */
		absoluteTime : function(track, transport){
			var currentTime = 0;
			for (var i = 0; i < track.length; i++){
				var evnt = track[i];
				currentTime += evnt.deltaTime;
				evnt.time = this.ticksToTime(currentTime, transport);
				evnt.ticks = currentTime;
				delete evnt.deltaTime;
			}
			return track;
		},
		/**
		 *  Does a mixin of the given values with a fallback
		 *  @param {Object} given
		 *  @param {Object} fallback the default object
		 */
		defaults : function(given, fallback){
			given = given || {};
			for (var param in fallback){
				if (typeof given[param] === 'undefined'){
					given[param] = fallback[param];
				}
			}
			return given;
		}
	};
});