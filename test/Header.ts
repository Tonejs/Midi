import { expect } from "chai";
import { readFileSync } from "fs";
import { resolve } from "path";
import { Midi } from "../src/Midi";

context("Header", () => {
	describe("empty midi file", () => {
		const midi = new Midi();

		it("has defaults", () => {
			expect(midi.header.ppq).to.equal(480);
			expect(midi.header.tempos).to.have.length(0);
			expect(midi.header.timeSignatures).to.have.length(0);
		});
	});

	describe("parses beethoven Symphony 7", () => {
		const midi = new Midi(
			readFileSync(
				resolve(__dirname, "./midi/beethoven/symphony_7_2.mid")
			)
		);

		it("parsed the PPQ", () => {
			expect(midi.header.ppq).to.equal(256);
		});

		it("parsed the tempo", () => {
			expect(midi.header.tempos).to.have.length(4);
			expect(midi.header.tempos[0]).to.have.property("bpm");
			expect(midi.header.tempos[0].bpm).to.be.closeTo(72, 0.001);
			expect(midi.header.tempos[1].bpm).to.be.closeTo(72, 0.001);
			expect(midi.header.tempos[2].bpm).to.be.closeTo(62, 0.001);
			expect(midi.header.tempos[3].bpm).to.be.closeTo(54, 0.001);
		});

		it("parsed the time signatures", () => {
			expect(midi.header.timeSignatures).to.have.length(1);
			expect(midi.header.timeSignatures[0].timeSignature).to.deep.equal([
				2,
				4,
			]);
		});

		it("can set the tempo with setTempo", () => {
			const firstNoteTicks = midi.tracks[0].notes[0].ticks;
			const firstNoteTime = midi.tracks[0].notes[0].time;
			expect(midi.header.tempos).to.have.length(4);
			midi.header.setTempo(80);
			expect(midi.header.tempos).to.have.length(1);
			expect(midi.header.tempos[0].bpm).to.equal(80);
			expect(firstNoteTicks).to.equal(midi.tracks[0].notes[0].ticks);
			expect(firstNoteTime).to.not.equal(midi.tracks[0].notes[0].time);
		});
	});

	describe("parses debussy claire de lune", () => {
		const midi = new Midi(
			readFileSync(
				resolve(__dirname, "./midi/debussy/claire_de_lune.mid")
			)
		);

		it("parsed the PPQ", () => {
			expect(midi.header.ppq).to.equal(480);
		});

		it("parsed the tempo", () => {
			expect(midi.header.tempos).to.have.length(733);
			expect(midi.header.tempos[0]).to.have.property("bpm");
			expect(midi.header.tempos[0]).to.have.property("ticks");
			expect(midi.header.tempos[0]).to.have.property("time");
			expect(midi.header.tempos[0].bpm).to.be.closeTo(100, 0.001);
			expect(midi.header.tempos[0].ticks).to.be.closeTo(0, 0.001);
			expect(midi.header.tempos[0].time).to.be.closeTo(0, 0.001);

			expect(midi.header.tempos[10]).to.have.property("bpm");
			expect(midi.header.tempos[10]).to.have.property("ticks");
			expect(midi.header.tempos[10]).to.have.property("time");
			expect(midi.header.tempos[10].bpm).to.be.closeTo(67, 0.001);
			expect(midi.header.tempos[10].ticks).to.be.closeTo(5040, 0.001);
			expect(midi.header.tempos[10].time).to.be.closeTo(9.369, 0.001);
		});

		it("parsed the time signatures", () => {
			expect(midi.header.timeSignatures).to.have.length(1);
			expect(midi.header.timeSignatures[0].timeSignature).to.deep.equal([
				9,
				8,
			]);
		});
	});

	describe("can get a tempo on a track which isn't the first track", () => {
		const midi = new Midi(
			readFileSync(resolve(__dirname, "./midi/230_bpm_multitrack.mid"))
		);

		it("parsed the PPQ", () => {
			expect(midi.header.ppq).to.equal(96);
		});

		it("parsed the tempo", () => {
			expect(midi.header.tempos).to.have.length(1);
			expect(midi.header.tempos[0].bpm).to.be.closeTo(230, 0.01);
		});
	});

	describe("Tempo", () => {
		const midi = new Midi();

		it("defaults to 120", () => {
			const track = midi.addTrack();
			track.addNote({
				time: 0,
				midi: 20,
				duration: 1,
			});
			track.addNote({
				time: 1,
				midi: 30,
				duration: 1,
			});

			expect(track.notes[0].ticks).to.equal(0);
			expect(track.notes[0].durationTicks).to.equal(960);

			expect(track.notes[1].ticks).to.equal(960);
			expect(track.notes[1].durationTicks).to.equal(960);
		});

		it("can change the tempo and updates time and duration of all of the notes", () => {
			midi.header.tempos.push({
				bpm: 60,
				ticks: 0,
			});
			midi.header.update();

			const track = midi.tracks[0];
			expect(track.notes[0].ticks).to.equal(0);
			expect(track.notes[0].time).to.equal(0);
			expect(track.notes[0].duration).to.equal(2);

			expect(track.notes[1].ticks).to.equal(960);
			expect(track.notes[1].time).to.equal(2);
			expect(track.notes[1].duration).to.equal(2);
		});

		it("can have multiple tempos scheduled", () => {
			midi.header.tempos.push({
				bpm: 120,
				ticks: 960,
			});
			expect(midi.header.tempos).to.have.length(2);
			midi.header.update();

			const track = midi.tracks[0];
			expect(track.notes[0].ticks).to.equal(0);
			expect(track.notes[0].time).to.equal(0);
			expect(track.notes[0].duration).to.equal(2);

			expect(track.notes[1].ticks).to.equal(960);
			expect(track.notes[1].time).to.equal(2);
			expect(track.notes[1].duration).to.equal(1);
		});
	});

	describe("Time Signature", () => {
		const midi = new Midi();

		it("defaults to [4, 4]", () => {
			const track = midi.addTrack();
			track.addNote({
				time: 0,
				midi: 20,
			});
			track.addNote({
				time: 2,
				midi: 30,
			});
			track.addNote({
				time: 3,
				midi: 40,
			});

			expect(track.notes[0].bars).to.equal(0);
			expect(track.notes[1].bars).to.equal(1);
			expect(track.notes[2].bars).to.equal(1.5);
		});

		it("uses the current time signature", () => {
			const track = midi.addTrack();
			midi.header.timeSignatures.push({
				ticks: 0,
				timeSignature: [5, 4],
			});
			midi.header.update();
			track.addNote({
				time: 0,
				midi: 20,
			});
			track.addNote({
				time: 2,
				midi: 30,
			});
			track.addNote({
				time: 2.5,
				midi: 40,
			});

			expect(track.notes[0].bars).to.equal(0);
			expect(track.notes[1].bars).to.equal(0.8);
			expect(track.notes[2].bars).to.equal(1);
		});

		it("can have multiple schedule time signatures", () => {
			const track = midi.addTrack();
			midi.header.timeSignatures.push({
				ticks: midi.header.ppq * 10,
				timeSignature: [4, 4],
			});
			midi.header.update();
			track.addNote({
				time: 0,
				midi: 20,
			});
			track.addNote({
				time: 5,
				midi: 30,
			});
			track.addNote({
				time: 7,
				midi: 40,
			});

			expect(track.notes[0].bars).to.equal(0);
			expect(track.notes[1].bars).to.equal(2);
			expect(track.notes[2].bars).to.equal(3);
		});
	});
});
