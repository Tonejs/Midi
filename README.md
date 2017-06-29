# MidiConvert #

[![Build Status](https://travis-ci.org/Tonejs/MidiConvert.svg?branch=master)](https://travis-ci.org/Tonejs/MidiConvert)
[![codecov](https://codecov.io/gh/Tonejs/MidiConvert/branch/master/graph/badge.svg)](https://codecov.io/gh/Tonejs/MidiConvert)

## [DEMO](https://tonejs.github.io/MidiConvert/)

MidiConvert makes it straightforward to work with MIDI files in Javascript. It uses [midi-file-parser](https://github.com/NHQ/midi-file-parser) to decode MIDI files and [jsmidgen](https://github.com/dingram/jsmidgen) to encode MIDI files.


```javascript
// load a midi file
MidiConvert.load("path/to/midi.mid", function(midi) {
  console.log(midi)
})
```

### Format

The data parsed from the midi file looks like this:

```javascript
{
  // the transport and timing data
  header: {
    name: String,                     // the name of the first empty track, 
                                      // which is usually the song name
    bpm: Number,                      // the tempo, e.g. 120
    timeSignature: [Number, Number],  // the time signature, e.g. [4, 4],
    PPQ: Number                       // the Pulses Per Quarter of the midi file
  },

  startTime: Number,                  // the time before the first note plays
  duration: Number,                   // the time until the last note finishes

  // an array of midi tracks
  tracks: [
    {
      id: Number,                     // the position of this track in the array
      name: String,                   // the track name if one was given
      notes: [
        {
          midi: Number,               // midi number, e.g. 60
          time: Number,               // time in seconds
          note: String,               // note name, e.g. "C4"
          velocity: Number,           // normalized 0-1 velocity
          duration: Number,           // duration between noteOn and noteOff
        }
      ],

      startTime: Number,              // the time before the first note plays
      duration: Number,               // the time until the last note finishes

      // midi control changes
      controlChanges: {
        // if there are control changes in the midi file
        '91': [
          {
            number: Number,           // the cc number
            time: Number,             // time in seconds
            value: Number,            // normalized 0-1
          }
        ],
      },

      isPercussion: Boolean,          // true if this track is on a percussion
                                      // channel
      channelNumber: Number,          // the ID for this channel; 9 and 10 are
                                      // reserved for percussion

      instrumentNumber: Number,       // the ID for this instrument, as defined
                                      // by the MIDI spec
      instrumentFamily: String,       // the name of this instrument's family,
                                      // as defined by the MIDI spec
      instrument: String,             // the instrument name, as defined by the
                                      // MIDI spec
    }
  ]
}
```

### Raw Midi Parsing

If you are using Node.js or have the raw binary string from the midi file, just use the `parse` method:

```javascript
fs.readFile("test.mid", "binary", function(err, midiBlob) {
  if (!err) {
    var midi = MidiConvert.parse(midiBlob)
  }
})
```

### Encoding Midi

You can also create midi files from scratch or by modifying an existing file.

```javascript
// create a new midi file
var midi = MidiConvert.create()
// add a track
midi.track()
  // select an instrument by its MIDI patch number
  .patch(32)
  // chain note events: note, time, duration
  .note(60, 0, 2)
  .note(63, 1, 2)
  .note(60, 2, 2)

// write the output
fs.writeFileSync("output.mid", midi.encode(), "binary")
```

### Tone.Part

The note data can be easily passed into [Tone.Part](http://tonejs.github.io/docs/#Part)

```javascript
var synth = new Tone.PolySynth(8).toMaster()

MidiConvert.load("path/to/midi.mid", function(midi) {

  // make sure you set the tempo before you schedule the events
  Tone.Transport.bpm.value = midi.header.bpm

  // pass in the note events from one of the tracks as the second argument to Tone.Part 
  var midiPart = new Tone.Part(function(time, note) {

    //use the events to play the synth
    synth.triggerAttackRelease(note.name, note.duration, time, note.velocity)

  }, midi.tracks[0].notes).start()

  // start the transport to hear the events
  Tone.Transport.start()
})
```

### Acknowledgment

MidiConvert uses [midi-file-parser](https://github.com/NHQ/midi-file-parser) which is ported from [jasmid](https://github.com/gasman/jasmid) for decoding MIDI data and and [jsmidgen](https://github.com/dingram/jsmidgen) for encoding MIDI data.
