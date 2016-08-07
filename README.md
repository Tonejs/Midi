## [DEMO](http://tonejs.github.io/MidiConvert/)

MidiConvert parses loads and parses midi files into more easily understandable format:


```javascript
MidiConvert.load("path/to/midi.mid", function(midiData){
	console.log(midiData);
})
```

### Format

The data parsed from the midi file looks like this:

```javascript
{
	// the transport and timing data
	transport : {
		bpm : Number,                     // the tempo, e.g. 120
		timeSignature : [Number, Number], // the time signature, e.g. [4, 4],
		midiPPQ : Number                  // the original PPQ of the midi file
	},
	// an array of midi tracks
	tracks : [
		{
			name : String, // the track name if one was given
			notes : [
				{
					ticks : Number // absolute time (time since beginning) in ticks
					time : Number, // time in seconds
					note : String, // note name, e.g. "C4"
					midi : Number, // midi number, e.g. 60
					velocity : Number,  // normalized
					duration : String   // duration between noteOn and noteOff
				}
			],
			//midi control changes are named if they have a common name
			sustain : [
				{
					ticks : Number // absolute time in ticks
					time : Number, // time in seconds
					value : Number  // normalized
				}
			],
			//cc changes are named 'cc_[Number]'
			cc_91 : [
				{
					ticks : Number // absolute time in ticks
					time : Number, // time in seconds
					value : Number  // normalized
				}
			],
		}
	]
}
```

### Raw Midi Parsing

If you are using the file in Node.js or have the raw binary string from the midi file, just use the `parse` method:

```javascript
fs.readFile("test.mid", "binary", function(err, midiBlob){
	if (!err){
		MidiConvert.parse(midiBlob);
	}
});
```

In the browser, the MIDI blob as a string can be obtained using the [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader). 

```javascript
var reader = new FileReader();
reader.onload = function(e){
	MidiConvert.parse(e.target.result);
}
reader.readAsBinaryString(file);
```

### Tone.Part

The note data can be easily passed into [Tone.Part](http://tonejs.github.io/docs/#Part)

```javascript
var synth = new Tone.PolySynth(8).toMaster();

MidiConvert.load("path/to/midi.mid", function(midi){

	//make sure you set the tempo before you schedule the events
	Tone.Transport.set(midi.transport);


	//pass in the note events from the first track into Tone.Part

	var midiPart = new Tone.Part(function(time, event){

		//use the events to play the synth
		synth.triggerAttackRelease(event.note, event.duration, time, event.velocity);

	}, midi.tracks[0].notes).start();

	Tone.Transport.start();
});
```

### Acknowledgment

MidiConvert uses [midi-file-parser](https://github.com/NHQ/midi-file-parser) which is ported from [jasmid](https://github.com/gasman/jasmid)