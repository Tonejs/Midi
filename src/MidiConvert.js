define(["midi-file-parser", "Transport", "track/Track"], 
	function(midiFileParser, Transport, Tracks){

	return {
		/**
		 *  Parse all the data from the Midi file into this format:
		 *  {
		 *  	// the transport and timing data
		 *  	transport : {
		 *  		bpm : Number,                     // tempo, e.g. 120
		 *  		timeSignature : [Number, Number], // time signature, e.g. [4, 4],
		 *  		midiPPQ : Number                  // PPQ of the midi file
		 *  	},
		 *  	// an array for each of the midi tracks
		 *  	tracks : [
		 *  		{
		 *  			name : String, // the track name if one was given
		 *  			notes : [
		 *  				{
		 *  					ticks : Number // absolute time in ticks
		 *  					time : Number, // time in seconds
		 *  					note : String, // note name, e.g. "C4"
		 *  					midi : Number, // midi number, e.g. 60
		 *  					velocity : Number,  // normalized
		 *  					duration : String   // duration between noteOn and noteOff
		 *  				}
		 *  			],
		 *  			//midi control changes are named if they have a common name
		 *  			sustain : [
		 *  				{
		 *  					ticks : Number // absolute time in ticks
		 *  					time : Number, // time in seconds
		 *  					value : Number  // normalized
		 *  				}
		 *  			],
		 *  			//other cc changes are named 'cc_[Number]'
		 *  			cc_91 : [
		 *  				{
		 *  					ticks : Number // absolute time in ticks
		 *  					time : Number, // time in seconds
		 *  					value : Number  // normalized
		 *  				}
		 *  			],
		 *  		}
		 *  	]
		 *  }
		 *  @param  {Binary String}  fileBlob  The output from fs.readFile or FileReader
		 *  @returns {Object} All of the options parsed from the midi file. 
		 */
		parse : function(fileBlob){
			var midiJson = midiFileParser(fileBlob);
			var transport = Transport(midiJson);
			return {
				transport : transport,
				tracks : Tracks(midiJson, transport)
			};
		},
		/**
		 *  Load and parse a midi file. See `parse` for what the results look like.
		 *  @param  {String}    url
		 *  @param {Function} callback
		 */
		load : function(url, callback){
			var request = new XMLHttpRequest();
			request.open("GET", url);
			request.overrideMimeType("text/plain; charset=x-user-defined");
			// decode asynchronously
			request.onload = function() {
				if (request.readyState === 4 && request.status === 200){
					var text = request.responseText || "" ;
					var ff = [];
					for (var i = 0; i < text.length; i++) {
						ff[i] = String.fromCharCode(text.charCodeAt(i) & 255);
					}
					var parsed = this.parse(ff.join(""));
					if (callback){
						callback(parsed);
					}
				}
			}.bind(this);
			//send the request
			request.send();
			return request;
		}
	};
});
