## [DEMO](http://tonejs.github.io/MidiConvert/)

MidiConvert has two methods for parsing binary midi files into a format that Tone.js can easily consume:

#### `parseTransport(BinaryString midiBlob) => Object`

This function returns the bpm and time signature values of the midi file as a Javascript Object.

```javascript
var transportSettings = MidiConvert.parseTransport(midiBlob);
//returns =>
//{
//	"bpm" : 70,
//	"timeSignature" : [3, 4]
//}
```

Set the return value:

```javascript
Tone.Transport.set(transportSettings);
```

#### `parseParts(BinaryString midiBlob, [Object options]) => Array`

This function parses all of the tracks from the midi file and returns an array of the tracks. Each track is an array of notes. 

```javascript
var parts = MidiConvert.parseParts(midiBlob);
//returns =>
//[
//	//track 0
//	[ 
//	{
//		"time": "0i",
//		"midiNote": 67,
//		"noteName": "G4",
//		"velocity": 0.7086614173228346,
//		"duration": "12i"
//	},
//	...
```

Which can then be used in Tone.Part

```javascript
var pianoPart = new Tone.Part(callback, parts[0]).start();
```

The options object encodes how the MIDI file is parsed:

```javascript
MidiConvert.parseParts(midiBlob, {
	/*
	 *	the pulses per quarter note at which 
	 *	the midi file is parsed.
	 */
	PPQ : 192,
	/*
	 *	if the midi note number should be 
	 *	included in the output.
	 */
	midiNote : true,
	/*
	 *	if the notes scientific pitch notation 
	 *	should be included in the output.
	 */
	noteName : true,
	/*
	 *	if the normalized velocity should be included 
	 * 	in the output
	 */
	velocity : true,
	/*
	 *	if the time between the noteOn and noteOff event
	 * 	should be included in the output. Otherwise
	 *	each event represents a noteOn.
	 */
	duration : true
});
```

#### MIDI Blobs

In node.js, pass MidiConvert the output from `fs.readFile`:

```javascript
fs.readFile(test.mid, "binary", function(err, midiBlob){
	if (!err){
		var transportSettings = MidiConvert.parseTransport(midiBlob);
	}
});
```

In the browser, the MIDI blob as a string can be obtained using the [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader). 

```javascript
var reader = new FileReader();
reader.onload = function(e){
	var parts = MidiConvert.parseParts(e.target.result);
}
reader.readAsBinaryString(file);
```
