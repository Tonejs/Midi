var fs = require("fs");
var MidiConvert = require("../build/MidiConvert");
var expect = require("chai").expect;

describe("API", function(){

	it("has parse method", function(){
		expect(MidiConvert).to.have.property("parse");
	});

	it("has load method", function(){
		expect(MidiConvert).to.have.property("load");
	});
});

describe("Goldberg Variation 1 format 1 midi file", function(){

	var midiData;
	var midiJson;

	before(function(done){
		fs.readFile("midi/bwv-988-v01.mid", "binary", function(err, data){
			if (!err){
				midiData = data;
				fs.readFile("midi/bwv-988-v01.json", "utf8", function(err, json){
					if (!err){
						midiJson = JSON.parse(json);
						done();
					}
				});
			}
		});
	});

	it("gets the time signature from the file", function(){
		var midi = MidiConvert.parse(midiData);
		expect(midi).to.have.property("transport");
		expect(midi.transport).to.have.property("timeSignature");
		expect(midi.transport.timeSignature).to.be.an("array");
		expect(midi.transport.timeSignature).to.deep.equal([3, 4]);
	});

	it("gets the bpm from the file", function(){
		var midi = MidiConvert.parse(midiData);
		expect(midi.transport).to.have.property("bpm");
		expect(midi.transport.bpm).to.be.a("number");
		expect(midi.transport.bpm).to.be.closeTo(60, 0.001);
	});

	it("gets the midiPPQ from the file", function(){
		var midi = MidiConvert.parse(midiData);
		expect(midi.transport).to.have.property("midiPPQ");
		expect(midi.transport.midiPPQ).to.be.a("number");
		expect(midi.transport.midiPPQ).to.equal(384);
	});

	it("extracts the tracks from the file", function(){
		var midi = MidiConvert.parse(midiData);
		expect(midi.tracks.length).to.equal(3);
		expect(midi.tracks).to.deep.equal(midiJson.tracks);
	});

});


describe("Prelude in D minor format 0 midi file", function(){

	var midiData;
	var midiJson;

	before(function(done){
		fs.readFile("midi/bwv-850.mid", "binary", function(err, data){
			if (!err){
				midiData = data;
				fs.readFile("midi/bwv-850.json", "utf8", function(err, json){
					if (!err){
						midiJson = JSON.parse(json);
						done();
					}
				});
			}
		});
	});

	it("gets the transport data from the file", function(){
		var midi = MidiConvert.parse(midiData);
		expect(midi.transport).to.deep.equal(midiJson.transport);
	});

	it("extracts the tracks from the file", function(){
		var midi = MidiConvert.parse(midiData);
		expect(midi.tracks.length).to.equal(1);
		expect(midi.tracks).to.deep.equal(midiJson.tracks);
	});

	it("the track data has a name", function(){
		var midi = MidiConvert.parse(midiData);
		var firstTrack = midi.tracks[0];
		expect(firstTrack).to.have.property("name");
		expect(firstTrack.name).to.equal("Präludium und Fuge in D-Dur, BWV 850");
	});

	it("the track data has all the properties", function(){
		var midi = MidiConvert.parse(midiData);
		var firstTrack = midi.tracks[0];
		expect(firstTrack).to.have.property("notes");
		expect(firstTrack.notes.length).to.equal(1503);
		var firstEvent = midi.tracks[0].notes[0];
		expect(firstEvent).to.have.all.keys("midi", "note", "ticks", "time", "velocity", "duration");
		expect(firstEvent.note).to.be.a("string");
		expect(firstEvent.midi).to.be.a("number");
		expect(firstEvent.ticks).to.be.a("number");
		expect(firstEvent.duration).to.be.a("number");
		expect(firstEvent.velocity).to.be.a("number");
	});

	it("the track data has noteOff properties", function(){
		var midi = MidiConvert.parse(midiData);
		var firstTrack = midi.tracks[0];
		expect(firstTrack).to.have.property("noteOffs");
		expect(firstTrack.noteOffs.length).to.equal(1503);
		var firstEvent = midi.tracks[0].noteOffs[0];
		expect(firstEvent).to.have.all.keys("midi", "note", "ticks", "time");
		expect(firstEvent.note).to.be.a("string");
		expect(firstEvent.midi).to.be.a("number");
		expect(firstEvent.ticks).to.be.a("number");
	});
});

describe("parses midi control changes from file", function(){

	var midiData;
	var midiJson;

	before(function(done){
		fs.readFile("midi/bwv-847.mid", "binary", function(err, data){
			if (!err){
				midiData = data;
				fs.readFile("midi/bwv-847.json", "utf8", function(err, json){
					if (!err){
						midiJson = JSON.parse(json);
						done();
					}
				});
			}
		});
	});

	it("gets the transport data from the file", function(){
		var midi = MidiConvert.parse(midiData);
		expect(midi.transport).to.deep.equal(midiJson.transport);
	});

	it("extracts the tracks from the file", function(){
		var midi = MidiConvert.parse(midiData);
		expect(midi.tracks.length).to.equal(1);
		expect(midi.tracks).to.deep.equal(midiJson.tracks);
	});

	it("extracts the curve events from the file", function(){
		var midi = MidiConvert.parse(midiData);
		expect(midi.tracks[0]).to.have.property("cc_91");
		var curves = midi.tracks[0].cc_91;
		expect(curves.length).to.equal(27);
		expect(curves[0]).to.have.all.keys("value", "time", "ticks");
	});
});

describe("Prelude in C minor format 0 midi file", function(){

	var midiData;
	var midiJson;

	before(function(done){
		fs.readFile("midi/bwv-846.mid", "binary", function(err, data){
			if (!err){
				midiData = data;
				fs.readFile("midi/bwv-846.json", "utf8", function(err, json){
					if (!err){
						midiJson = JSON.parse(json);
						done();
					}
				});
			}
		});
	});

	it("gets the transport data from the file", function(){
		var midi = MidiConvert.parse(midiData);
		expect(midi.transport).to.deep.equal(midiJson.transport);
	});

	it("extracts the tracks from the file", function(){
		var midi = MidiConvert.parse(midiData);
		expect(midi.tracks.length).to.equal(11);
		expect(midi.tracks).to.deep.equal(midiJson.tracks);
	});

	it("extracts the sustain events from the file", function(){
		var midi = MidiConvert.parse(midiData);
		expect(midi.tracks[2]).to.have.property("sustain");
		var pedalTrack = midi.tracks[2].sustain;
		expect(pedalTrack[0]).to.have.all.keys("value", "time", "ticks");
		expect(pedalTrack.length).to.equal(70);
	});

});


describe("Funk kit with implicit note off events", function(){

	var midiData;
	var midiJson;

	before(function(done){
		fs.readFile("midi/funk-kit.mid", "binary", function(err, data){
			if (!err){
				midiData = data;
				fs.readFile("midi/funk-kit.json", "utf8", function(err, json){
					if (!err){
						midiJson = JSON.parse(json);
						done();
					}
				});
			}
		});
	});

	it("gets the transport data from the file", function(){
		var midi = MidiConvert.parse(midiData);
		expect(midi.transport).to.deep.equal(midiJson.transport);
	});

	it("extracts the tracks from the file", function(){
		var midi = MidiConvert.parse(midiData);
		expect(midi.tracks.length).to.equal(1);
		expect(midi.tracks).to.deep.equal(midiJson.tracks);
	});

});
