define(["midi-file-parser", "Transport", "Parts"], function(midiFileParser, Transport, Parts){

	return {
		/**
		 *  Convert a midi file to a Tone.Score-friendly JSON representation
		 *  @param  {ArrayBuffer}  fileBlob  The output from fs.readFile or FileReader
		 *  @param  {Object}  options   The parseing options
		 *  @return  {Object}  A Tone.js-friendly object which can be consumed
		 *                       by Tone.Score
		 */
		parseParts : function(fileBlob, options){
			var midiJson = midiFileParser(fileBlob);
			return Parts(midiJson, options);
		},
		/**
		 *  Parse the Transport-relevant descriptions from the MIDI file blob
		 *  @param  {ArrayBuffer}  fileBlob  The output from fs.readFile or FileReader
		 *  @return  {Object}  
		 */
		parseTransport : function(fileBlob){
			var midiJson = midiFileParser(fileBlob);
			return Transport(midiJson);
		}
	};
});
