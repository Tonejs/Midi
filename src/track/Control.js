define(["Util"], function (Util) {

	var channelNames = {
		"1"  : "modulationWheel",
		"2"  : "breath",
		"4"  : "footController",
		"5"  : "portamentoTime",
		"7"  : "volume",
		"8"  : "balance",
		"10" : "pan",
		"64" : "sustain",
		"65" : "portamentoTime",
		"66" : "sostenuto",
		"67" : "softPedal",
		"68" : "legatoFootswitch",
		"84" : "portamentoContro"
	};

	/**
	 *  get the CC channels from the track
	 */
	function getChannels(track){
		var controlChanges = {};
		track.forEach(function(evnt){
			if (evnt.subtype === "controller"){
				controlChanges[evnt.controllerType] = 1;
			}
		});
		return controlChanges;
	}

	/**
	 *  get all the channel events
	 */
	function getChannelEvents(track, channelNum){
		var events = [];
		track.forEach(function(evnt){
			if (evnt.subtype === "controller" && evnt.controllerType === channelNum){
				events.push({
					ticks : evnt.ticks,
					time : evnt.time,
					value : Util.midiToFloat(evnt.value)
				});
			}
		});
		return events;
	}

	/**
	 *  Extract the CC curves from the track
	 *  @param  {Array}  track  The track events
	 *  @return  {Object}  All of the CC curves contained in the track
	 */
	return function getCurve(track){
		var channels = getChannels(track);
		var controls = {};
		for (var channel in channels){
			channel = parseInt(channel);
			var channelEvents = getChannelEvents(track, channel);
			if (channelNames[channel]){
				controls[channelNames[channel]] = channelEvents;
			}
			controls["cc_" + channel] = channelEvents;
		}
		return controls;
	};
});