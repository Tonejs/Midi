import { expect } from "chai";
import { readFileSync } from "fs";
import { resolve } from "path";
import { Midi } from "../src/Midi";
// add fetch to the window so that the fetch function could work
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require("node-fetch");
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
global.fetch = fetch;
import { createServer } from "http-server";

context("Midi", () => {

	describe("empty constructor", () => {

		it("has the correct number of tracks", () => {
			const midi = new Midi();
			expect(midi.tracks.length).to.equal(0);
		});

		it("can get/set name", () => {
			const midi = new Midi();
			expect(midi.name).to.equal("");

			midi.name = "test";
			expect(midi.name).to.equal("test");
		});

		it("can add a track", () => {
			const midi = new Midi();
			expect(midi.tracks).to.have.length(0);

			const track = midi.addTrack();
			expect(midi.tracks).to.have.length(1);

			expect(track.notes).to.have.length(0);

			// add note to the empty track
			track.addNote({
				midi: 44,
				time: 0
			});
			expect(track.notes).to.have.length(1);
		});
	});

	describe("from a file", () => {

		it("has a duration", () => {
			const midi = new Midi(readFileSync(resolve(__dirname, "./midi/debussy/childrens_corner_1.mid")));
			expect(midi.duration).to.be.closeTo(143, 0.5);
		});

		it("has a duration in ticks", () => {
			const midi = new Midi(readFileSync(resolve(__dirname, "./midi/debussy/childrens_corner_1.mid")));
			expect(midi.durationTicks).to.equal(144240);
		});
	});

	describe("from a url", () => {

		let server = null;
		before(done => {
			server = createServer({
				root: resolve(__dirname, "./midi"),
			});
			server.listen(9999, () => done());
		});

		after(() => {
			server.close();
		});

		it("can use static fromUrl method", async () => {
			const url = "http://localhost:9999/bach/bach_847.mid";
			const midi = await Midi.fromUrl(url);
			expect(midi.name).to.include("Das wohltemperierte Klavier I - Praeludium und Fuge 2 in c-Moll BWV 847");
		});

		it("throws an error when theres no file", async () => {
			const url = "http://localhost:9999/bach/nope.mid";
			let threwError = false;
			try {
				await Midi.fromUrl(url);
			} catch (e) {
				threwError = true;
			}
			expect(threwError).to.be.true;

		});
	});

	context("clone", () => {

		it("can clone a midi file", () => {
			const midi = new Midi(readFileSync(resolve(__dirname, "./midi/bach/bach_846.mid")));
			const clone = midi.clone();
			expect(midi.toJSON()).to.deep.equal(clone.toJSON());
		});

		it("changes to the clone dont change the original", () => {
			const original = new Midi(readFileSync(resolve(__dirname, "./midi/bach/bach_846.mid")));
			const clone = original.clone();
			// change the clone
			clone.tracks[0].notes[0].ticks = 111;
			// shouldnt affect the original
			expect(original.tracks[0].notes[0].ticks).to.not.equal(111);
		});
	});
});
