var MidiConvert = require("../build/MidiConvert")
var expect = require("chai").expect
var fs = require("fs")
var path = require("path")

describe("API", function(){

	it("has parse method", function(){
		expect(MidiConvert).to.have.property("parse")
	})

	it("has load method", function(){
		expect(MidiConvert).to.have.property("load")
	})

	it("has create method", function(){
		expect(MidiConvert).to.have.property("create")
	})
})

describe("Header", function(){

	it("can parse the time signature and bpm from a format 1", function(){
		var midi = MidiConvert.parse(readMIDI("bwv-988-v01.mid"))
		expect(midi).to.have.property("timeSignature")
		expect(midi.timeSignature).to.be.an("array")
		expect(midi.timeSignature).to.deep.equal([3, 4])

		expect(midi).to.have.property("bpm")
		expect(midi.bpm).to.be.closeTo(60, 0.001)
	})

	it("can parse the time signature and bpm from a format 0", function(){
		var midi = MidiConvert.parse(readMIDI("bwv-846.mid"))
		expect(midi).to.have.property("timeSignature")
		expect(midi.timeSignature).to.be.an("array")
		expect(midi.timeSignature).to.deep.equal([4, 4])

		expect(midi).to.have.property("bpm")
		expect(midi.bpm).to.be.closeTo(74, 0.001)
	})

})

describe("Midi", function(){

	it("can get the tracks by either index or name", function(){
		var midi = MidiConvert.parse(readMIDI("bwv-846.mid"))
		expect(midi.get(5).name).to.equal("Fuga 3")
		expect(midi.get(5)).to.equal(midi.get("Fuga 3"))
		expect(midi.get(5)).to.equal(midi.tracks[5])
	})

	it("parses the correct number of tracks", function(){
		var midi = MidiConvert.parse(readMIDI("bwv-988-v01.mid"))
		expect(midi.tracks.length).to.equal(3)
	})

	it("gets the duration of the midi file", function(){
		var midi = MidiConvert.parse(readMIDI("bwv-988-v01.mid"))
		expect(midi.duration).to.equal(96)
	})

	it("can slice a midi file", function(){
		var midi = MidiConvert.create()
		var track = midi.track()
		track.note(60, 0, 2, 1)
		track.note(61, 1, 2, 1)
		track.note(62, 3, 2, 1)
		var midi2 = midi.slice(0, 3)
		expect(midi2.duration).to.equal(3)
		expect(midi2.tracks[0].length).to.equal(2)
		var midi3 = midi.slice(1, 3)
		expect(midi3.duration).to.equal(2)
		expect(midi3.tracks[0].length).to.equal(1)
		expect(midi3.tracks[0].notes[0].time).to.equal(0)
	})
})


describe("Track", function(){

	it("can add an empty track with a name", function(){
		var midi = MidiConvert.parse(readMIDI("bwv-846.mid"))
		expect(midi.tracks.length).to.equal(11)
		midi.track("test")
		expect(midi.tracks.length).to.equal(12)
		expect(midi.get("test").notes).to.be.instanceOf(Array)
	})

	it("has correct methods", function(){
		var track = MidiConvert.create().track()
		expect(track.note).to.be.function
		expect(track.noteOn).to.be.function
		expect(track.noteOff).to.be.function
	})

	it("can add notes with noteOn/noteOff", function(){
		var track = MidiConvert.create().track()
		expect(track.notes.length).to.equal(0)
		track.noteOn(60, 0)
		track.noteOn(61, 1)
		expect(track.notes.length).to.equal(2)
		track.noteOff(60, 2)
		track.noteOff(61, 4)
		expect(track.notes.length).to.equal(2)
		expect(track.notes[0].midi).to.equal(60)
		expect(track.notes[1].midi).to.equal(61)
		expect(track.notes[0].duration).to.equal(2)
		expect(track.notes[1].duration).to.equal(3)
	})

	it("can add notes with noteOn/noteOff even if it's out of order", function(){
		var track = MidiConvert.create().track()
		expect(track.notes.length).to.equal(0)
		track.noteOn(62, 3)
		track.noteOn(60, 0)
		track.noteOn(61, 1)
		expect(track.notes.length).to.equal(3)
		track.noteOff(62, 4)
		track.noteOff(61, 4)
		track.noteOff(60, 2)
		expect(track.notes.length).to.equal(3)
		expect(track.notes[0].midi).to.equal(60)
		expect(track.notes[1].midi).to.equal(61)
		expect(track.notes[2].midi).to.equal(62)
		expect(track.notes[0].duration).to.equal(2)
		expect(track.notes[1].duration).to.equal(3)
		expect(track.notes[2].duration).to.equal(1)
	})

	it("can scale the track timing", function(){
		var track = MidiConvert.create().track()
		track.note(62, 3, 2, 1)
		track.note(60, 0, 2, 1)
		track.note(61, 1, 2, 1)
		track.scale(2)
		expect(track.notes[0].time).to.equal(0)
		expect(track.notes[0].duration).to.equal(4)
		expect(track.notes[1].time).to.equal(2)
		expect(track.notes[2].time).to.equal(6)
	})

	it("get the length of the track", function(){
		var track = MidiConvert.create().track()
		track.note(60, 0, 2, 1)
		track.note(61, 1, 2, 1)
		expect(track.length).to.equal(2)
		track.note(62, 3, 2, 1)
		expect(track.length).to.equal(3)
	})

	it("get the duration of the track", function(){
		var track = MidiConvert.create().track()
		expect(track.duration).to.equal(0)
		track.note(60, 0, 2, 1)
		track.note(61, 1, 2, 1)
		expect(track.duration).to.equal(3)
		track.note(62, 3, 2, 1)
		expect(track.duration).to.equal(5)
	})

	it("get the startTime of the track", function(){
		var track = MidiConvert.create().track()
		expect(track.duration).to.equal(0)
		track.note(60, 2, 2, 1)
		expect(track.duration).to.equal(4)
		expect(track.startTime).to.equal(2)
	})

	it("gets the instrument", function(){
		var midi = MidiConvert.parse(readMIDI("bwv-988-v01.mid", "binary"))
		var track = midi.tracks[1]
		expect(track.instrument).to.equal("harpsichord")
	})
})

describe("Note", function(){

	it("can add a note with 'note'", function(){
		var track = MidiConvert.create().track()
		track.note(60, 0)
		var note = track.notes[0]
		expect(note.time).to.equal(0)
		expect(note.midi).to.equal(60)
	})

	it("can parse notes correctly", function(){
		var midi = MidiConvert.parse(readMIDI("bwv-846.mid"))
		var track = midi.tracks[5]
		expect(track.notes.length).to.equal(175)
		expect(track.notes[0].midi).to.equal(55)
		expect(track.notes[0].name).to.equal("G3")
		expect(track.notes[1].midi).to.equal(57)
		expect(track.notes[2].duration).to.be.closeTo(0.405, 0.001)
		expect(track.notes[3].velocity).to.be.closeTo(0.472, 0.001)
	})

	it("has right defaults", function(){
		var track = MidiConvert.create().track().note(60, 10)
		var note = track.notes[0]
		expect(note.velocity).to.equal(1)
		expect(note.duration).to.equal(0)
		expect(note.noteOff).to.equal(10)
		expect(note.noteOn).to.equal(10)
		expect(note.time).to.equal(10)
		expect(note.name).to.equal("C4")
	})

	it("has right constructor args", function(){
		var track = MidiConvert.create().track().note(61, 1, 1, 0.5)
		var note = track.notes[0]
		expect(note.velocity).to.equal(0.5)
		expect(note.duration).to.equal(1)
		expect(note.noteOff).to.equal(2)
		expect(note.noteOn).to.equal(1)
		expect(note.time).to.equal(1)
		expect(note.name).to.equal("C#4")
	})

	it("updates values correctly", function(){
		var track = MidiConvert.create().track().note(61, 1, 1, 0.5)
		var note = track.notes[0]
		expect(note.duration).to.equal(1)
		expect(note.noteOff).to.equal(2)
		note.noteOff = 3
		expect(note.duration).to.equal(2)
		note.duration = 4
		expect(note.noteOff).to.equal(5)
		note.name = "B#3"
		expect(note.midi).to.equal(60)
	})

})

describe("Control Change", function(){

	it("parses cc values", function(){
		var midi = MidiConvert.parse(readMIDI("bwv-846.mid"))
		var track = midi.get(2)
		expect(track.controlChanges[64]).to.be.array
		expect(track.controlChanges[64].length).to.equal(70)
		var cc0 = track.controlChanges[64][0]
		expect(cc0.time).to.equal(0)
		expect(cc0.value).to.equal(1)
	})

	it("can add cc values", function(){
		var midi = MidiConvert.parse(readMIDI("bwv-846.mid"))
		var track = midi.get(2)
		expect(track.controlChanges[64]).to.be.array
		expect(track.controlChanges[64].length).to.equal(70)
		track.cc(64, 0.2, 1)
		expect(track.controlChanges[64].length).to.equal(71)
	})

	it("has cc values", function(){
		var track = MidiConvert.create().track()
		track.cc(64, 0.2, 0.4)
		expect(track.controlChanges[64].length).to.equal(1)
		var cc = track.controlChanges[64][0]
		expect(cc.time).to.equal(0.2)
		expect(cc.value).to.equal(0.4)
		expect(cc.number).to.equal(64)
		expect(cc.name).to.equal("sustain")
	})

})

describe("Encode", function(){

	it("can encode and re decode a midi track", function(){
		var midi = MidiConvert.create()
		midi.bpm = 80
		midi.track()
			.note(60, 0, 1)
			.note(61, 1, 1.5)
			.note(62, 2, 1)

		midi.track()
			.note(64, 0, 1)
			.note(65, 1, 1.5)
			.note(66, 2, 1)
		var reencoded = MidiConvert.parse(midi.encode())
		expect(reencoded.bpm).to.equal(80)
		expect(reencoded.tracks.length).to.equal(2)
		expect(reencoded.tracks[0].notes.length).to.equal(3)
		expect(reencoded.tracks[0].notes[0].midi).to.equal(60)
		expect(reencoded.tracks[0].notes[0].duration).to.equal(1)
		expect(reencoded.tracks[0].notes[1].time).to.equal(1)
		expect(reencoded.tracks[0].notes[1].duration).to.equal(1.5)
		expect(reencoded.tracks[0].notes[2].time).to.equal(2)
	})

	it("can encode an output like the input", function(){
		var midi = MidiConvert.parse(readMIDI("bwv-846.mid"))
		midi.encode()
	})

})

function readMIDI(filename) {
  return fs.readFileSync(
    path.join(
      __dirname,
      "midi",
      filename
    ),
    "binary"
  )
}
