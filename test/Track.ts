import { expect } from "chai";
import { readFileSync } from "fs";
import { resolve } from "path";
import { Midi } from "../src/Midi";

context("Track", () => {
	describe("getters for beethoven symphony 7", () => {
		const midi = new Midi(
			readFileSync(
				resolve(__dirname, "./midi/beethoven/symphony_7_2.mid")
			)
		);

		it("has the correct number of tracks", () => {
			expect(midi.tracks.length).to.equal(17);
		});

		it("tracks have correct names", () => {
			expect(midi.tracks[0].name).to.equal("2 Flutes");
			expect(midi.tracks[1].name).to.equal("2 Oboes");
			expect(midi.tracks[2].name).to.equal("2 Clarinets in A");
			expect(midi.tracks[3].name).to.equal("2 Bassoons");
		});

		it("has instruments", () => {
			expect(midi.tracks[0].instrument.name).to.equal("flute");
			expect(midi.tracks[1].instrument.name).to.equal("oboe");
		});

		it("has instruments description", () => {
			expect(midi.tracks[0].instrument.name).to.equal("flute");
			expect(midi.tracks[0].instrument.number).to.equal(73);
			expect(midi.tracks[1].instrument.name).to.equal("oboe");
		});

		it("can set instrument", () => {
			midi.tracks[0].instrument.name = "acoustic grand piano";
			expect(midi.tracks[0].instrument.name).to.equal(
				"acoustic grand piano"
			);
			expect(midi.tracks[0].instrument.number).to.equal(0);
			midi.tracks[0].instrument.number = 73;
			expect(midi.tracks[0].instrument.name).to.equal("flute");
		});

		it("can get the instrument family", () => {
			expect(midi.tracks[0].instrument.family).to.equal("pipe");
		});

		it("can get the set percussion", () => {
			midi.tracks[0].channel = 9;
			expect(midi.tracks[0].instrument.family).to.equal("drums");
			midi.tracks[0].instrument.number = 0;
			expect(midi.tracks[0].instrument.name).to.equal("standard kit");
			midi.tracks[0].instrument.number = 73;
			midi.tracks[0].channel = 0;
			expect(midi.tracks[0].instrument.family).to.equal("pipe");
		});

		it("tracks have notes", () => {
			midi.tracks.forEach((track) => {
				expect(track.notes).to.be.an("array");
			});
			expect(midi.tracks[0].notes).to.have.length(404);
			expect(midi.tracks[1].notes).to.have.length(420);
		});

		it("parses midi drum beat", () => {
			const drumMidi = new Midi(
				readFileSync(resolve(__dirname, "./midi/beat.mid"))
			);
			expect(drumMidi.tracks.length).to.equal(1);
			expect(drumMidi.tracks[0].channel).to.equal(9);
		});

		it("sets the endOfTrackTicks", () => {
			expect(midi.tracks[0].endOfTrackTicks).to.equal(135058);
			expect(midi.tracks[1].endOfTrackTicks).to.equal(141953);
		});
	});

	describe("single-track beethoven symphony 7", () => {
		const midi = new Midi(
			readFileSync(
				resolve(
					__dirname,
					"./midi/beethoven/symphony_7_2_singletrack.mid"
				)
			)
		);

		it("has the correct number of tracks", () => {
			expect(midi.tracks.length).to.equal(17);
		});
	});

	describe("control changes on debussy claire de lune", () => {
		const midi = new Midi(
			readFileSync(
				resolve(__dirname, "./midi/debussy/claire_de_lune.mid")
			)
		);

		it("tracks have control changes", () => {
			midi.tracks.forEach((track) => {
				expect(track.controlChanges).to.be.an("object");
			});
			expect(midi.tracks[1].controlChanges).to.include.keys([
				10,
				64,
				7,
				91,
			]);
			expect(midi.tracks[1].controlChanges[64]).to.have.length(326);
		});

		it("get control change attributes", () => {
			expect(midi.tracks[1].controlChanges[64]).to.have.length(326);
			const pedals = midi.tracks[1].controlChanges[64];
			expect(pedals[0]).has.property("ticks");
			expect(pedals[0]).has.property("time");
			expect(pedals[0]).has.property("name");
			expect(pedals[0]).has.property("number");
			expect(pedals[0]).has.property("value");

			expect(midi.tracks[1].controlChanges[91]).to.have.length(1);
			expect(midi.tracks[1].controlChanges[91][0]).to.have.property(
				"name"
			);
			expect(midi.tracks[1].controlChanges[91][0].name).to.equal(null);
		});

		it("get/set control change attributes", () => {
			expect(midi.tracks[1].controlChanges[64]).to.have.length(326);
			const pedals = midi.tracks[1].controlChanges[64];
			expect(pedals[2].ticks).equals(5132);
			expect(pedals[2].value).equals(1);
			expect(pedals[2].time).to.be.closeTo(9.541, 0.001);

			pedals[2].value = 0.5;
			expect(pedals[2].value).equals(0.5);

			pedals[2].ticks = 5000;
			expect(pedals[2].ticks).equals(5000);
			expect(pedals[2].time).to.be.closeTo(9.303, 0.001);

			pedals[2].time = 9.541;
			expect(pedals[2].time).to.be.closeTo(9.541, 0.001);
			expect(pedals[2].ticks).to.equal(5132);

			expect(pedals[2].name).equals("sustain");
		});
	});

	describe("getter for bach in format 0", () => {
		const midi = new Midi(
			readFileSync(resolve(__dirname, "./midi/bach/bach_format0.mid"))
		);

		it("has 1 track", () => {
			expect(midi.tracks.length).to.equal(1);
		});

		it("tracks have correct names", () => {
			expect(midi.tracks[0].name).to.include("Piano right");
		});

		it("track has notes", () => {
			expect(midi.tracks[0].notes).to.have.length(415);
		});
	});

	describe("Non-standard Format 1", () => {
		const midi = new Midi(
			readFileSync(resolve(__dirname, "./midi/joplin/TheEntertainer.mid"))
		);

		it("has 2 track", () => {
			expect(midi.tracks.length).to.equal(2);
		});

		it("tracks have notes", () => {
			expect(midi.tracks[0].notes).to.have.length(1387);
			expect(midi.tracks[1].notes).to.have.length(1229);
		});
	});

	describe("Tchaikovsky symphony", () => {
		const midi = new Midi(
			readFileSync(resolve(__dirname, "./midi/tchaikovsky_seasons.mid"))
		);

		it("doesn't have negative durations", () => {
			midi.tracks.forEach((track) => {
				track.notes.forEach((note) => {
					expect(note.duration).to.be.gte(0);
				});
			});
		});
	});

	describe("can add note to beethoven symphony 7", () => {
		const midi = new Midi(
			readFileSync(
				resolve(__dirname, "./midi/beethoven/symphony_7_2.mid")
			)
		);

		it("can add a note", () => {
			const firstTrack = midi.tracks[0];
			expect(firstTrack.notes).to.have.length(404);

			firstTrack.addNote({
				midi: 60,
				time: 200,
				velocity: 0.4,
				duration: 0.5,
			});

			expect(firstTrack.notes).to.have.length(405);

			// was inserted in the right place
			const note = firstTrack.notes.find(
				(n) => n.velocity === 0.4 && n.midi === 60
			);
			expect(note.duration).to.be.closeTo(0.5, 0.01);
			expect(note.time).to.be.closeTo(200, 0.01);
			expect(note.ticks).to.be.equal(61440);

			// search the array to make sure that it's ordered
			let lastTick = 0;
			firstTrack.notes.forEach((n) => {
				expect(n.ticks).at.least(lastTick);
				lastTick = n.ticks;
			});
		});

		it("can add a note to the end of the array", () => {
			const secondTrack = midi.tracks[1];
			expect(secondTrack.notes).to.have.length(420);

			const lastNote = secondTrack.notes[secondTrack.notes.length - 1];

			const addedNote = Object.assign({}, lastNote);
			addedNote.ticks = lastNote.ticks + 100;
			secondTrack.addNote(addedNote);

			// incremented the length
			expect(secondTrack.notes).to.have.length(421);

			// the previously last note is second to last
			expect(
				secondTrack.notes[secondTrack.notes.length - 2].ticks
			).to.equal(lastNote.ticks);
			// has new last note
			expect(
				secondTrack.notes[secondTrack.notes.length - 1].ticks
			).to.equal(lastNote.ticks + 100);
		});
	});

	describe("add CC values", () => {
		const midi = new Midi();

		it("can add values", () => {
			const track = midi.addTrack();
			track.addCC({
				number: 64,
				value: 0,
				time: 10,
			});

			expect(track.controlChanges.sustain).to.have.length(1);
			expect(track.controlChanges[64]).to.have.length(1);

			// alias to the same array
			expect(track.controlChanges[64][0]).to.have.property("value");
			expect(track.controlChanges[64][0].value).to.equal(0);
			track.controlChanges[64][0].value = 0.5;
			expect(track.controlChanges.sustain[0].value).to.equal(0.5);
			// remove all sustain events
			track.controlChanges.sustain = null;
			expect(track.controlChanges[64]).is.not.ok;
		});
	});

	describe("PitchBend", () => {
		it("can add values", () => {
			const midi = new Midi();
			const track = midi.addTrack();
			track.addPitchBend({
				value: 0,
				time: 1,
			});
			expect(track.pitchBends).to.have.length(1);
		});

		it("can parse values from midi file", () => {
			const midi = new Midi(
				readFileSync(resolve(__dirname, "./midi/pitchBendTest.mid"))
			);
			expect(midi.tracks[0].pitchBends[0].value).to.equal(0);
			expect(midi.tracks[0].pitchBends[0].time).to.equal(0);

			expect(midi.tracks[0].pitchBends[25].ticks).to.equal(480);
			expect(midi.tracks[0].pitchBends[25].value).to.be.closeTo(1, 0.01);
		});
	});
});
