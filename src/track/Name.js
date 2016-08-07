define(function () {

	/** 
	 *  Get the name of the track
	 *  @param  {Array}  track  All the raw track events
	 *  @return  {String}  the name, or `undefined` if one doens't exist
	 */
	return function getName(track){
		var name;
		track.forEach(function(evnt){
			if (evnt.type === "meta" && evnt.subtype === "trackName"){
				name = evnt.text;
				//Ableton Live adds an additional character to the track name
				name = name.replace(/\u0000/g, '');
			}
		});
		return name;
	};
});