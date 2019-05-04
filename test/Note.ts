import { expect } from "chai";
import { readFileSync } from "fs";
import { resolve } from "path";
import { Midi } from "../src/Midi";

context("Note", () => {

	describe("getters for bach 846", () => {

		const midi = new Midi(readFileSync(resolve(__dirname, "./midi/bach/bach_846.mid")));

		it("has midi", () => {
			expect(midi.tracks[0].notes[0].midi).is.a("number");
			expect(midi.tracks[0].notes[0].midi).equals(67);

			expect(midi.tracks[0].notes[1].midi).is.a("number");
			expect(midi.tracks[0].notes[1].midi).equals(72);
		});

		it("has ticks", () => {
			expect(midi.tracks[0].notes[0].ticks).is.a("number");
			expect(midi.tracks[0].notes[0].ticks).equals(241);

			expect(midi.tracks[0].notes[1].ticks).is.a("number");
			expect(midi.tracks[0].notes[1].ticks).equals(361);
		});

		it("has durationTicks", () => {
			expect(midi.tracks[0].notes[0].durationTicks).is.a("number");
			expect(midi.tracks[0].notes[0].durationTicks).equals(120);

			expect(midi.tracks[0].notes[1].durationTicks).is.a("number");
			expect(midi.tracks[0].notes[1].durationTicks).equals(120);
		});

		it("has name", () => {
			expect(midi.tracks[0].notes[0].name).is.a("string");
			expect(midi.tracks[0].notes[0].name).equals("G4");

			expect(midi.tracks[0].notes[1].name).is.a("string");
			expect(midi.tracks[0].notes[1].name).equals("C5");
		});

		it("has pitch", () => {
			expect(midi.tracks[0].notes[0].pitch).is.a("string");
			expect(midi.tracks[0].notes[0].pitch).equals("G");

			expect(midi.tracks[0].notes[1].pitch).is.a("string");
			expect(midi.tracks[0].notes[1].pitch).equals("C");
		});

		it("has time", () => {
			expect(midi.tracks[0].notes[0].time).is.a("number");
			expect(midi.tracks[0].notes[0].time).is.closeTo(0.407, 0.0001);

			expect(midi.tracks[0].notes[1].time).is.a("number");
			expect(midi.tracks[0].notes[1].time).is.closeTo(0.6097, 0.0001);
		});

		it("has duration", () => {
			expect(midi.tracks[0].notes[0].duration).is.a("number");
			expect(midi.tracks[0].notes[0].duration).is.closeTo(0.2026, 0.001);

			expect(midi.tracks[0].notes[1].duration).is.a("number");
			expect(midi.tracks[0].notes[1].duration).is.closeTo(0.2026, 0.001);
		});

		it("has velocity", () => {
			expect(midi.tracks[0].notes[0].velocity).is.a("number");
			expect(midi.tracks[0].notes[0].velocity).is.closeTo(0.4409, 0.001);

			expect(midi.tracks[0].notes[1].velocity).is.a("number");
			expect(midi.tracks[0].notes[1].velocity).is.closeTo(0.4724, 0.001);
		});

		it("velocity is between 0-1", () => {
			midi.tracks[0].notes.forEach(note => {
				expect(note.velocity).is.within(0, 1);
			});
		});

		it("has noteOffVelocity", () => {
			expect(midi.tracks[0].notes[0].noteOffVelocity).is.a("number");
			expect(midi.tracks[0].notes[0].noteOffVelocity).equals(0);

			expect(midi.tracks[0].notes[1].noteOffVelocity).is.a("number");
			expect(midi.tracks[0].notes[1].noteOffVelocity).equals(0);
		});
	});

	describe("setters for bach 847", () => {

		const midi = new Midi(readFileSync(resolve(__dirname, "./midi/bach/bach_847.mid")));

		it("set ticks/time", () => {
			const note = midi.tracks[0].notes[0];
			expect(note.ticks).is.a("number");
			expect(note.ticks).equals(3);
			expect(note.time).to.be.closeTo(0.00301, 0.0001);

			note.ticks = 10;
			expect(note.ticks).equals(10);
			expect(note.time).to.be.closeTo(0.010204, 0.001);

			note.time = 0.00301;
			expect(note.ticks).equals(3);
			expect(note.time).to.be.closeTo(0.00301, 0.0001);
		});

		it("set duration/durationTicks", () => {
			const note = midi.tracks[0].notes[0];
			expect(note.durationTicks).is.a("number");
			expect(note.durationTicks).equals(140);
			expect(note.duration).closeTo(0.1361, 0.001);

			note.durationTicks = 200;
			expect(note.durationTicks).equals(200);
			expect(note.duration).closeTo(0.1925, 0.001);

			note.duration = 0.1361;
			expect(note.durationTicks).equals(140);
		});

		it("set midi/name", () => {
			const note = midi.tracks[0].notes[0];
			expect(note.name).equals("C5");
			expect(note.midi).equals(72);

			note.midi = 60;
			expect(note.name).equals("C4");
			expect(note.midi).equals(60);

			note.name = "C5";
			expect(note.midi).equals(72);
		});

		it("set pitch/octave", () => {
			const note = midi.tracks[0].notes[0];
			expect(note.name).equals("C5");

			note.octave -= 1;
			expect(note.name).equals("C4");
			expect(note.midi).equals(60);
			expect(note.octave).equals(4);

			note.pitch = "D";
			expect(note.name).equals("D4");
			expect(note.octave).equals(4);
			expect(note.midi).equals(62);

			note.name = "C5";
		});
	});

});
