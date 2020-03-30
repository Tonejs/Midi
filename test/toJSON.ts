import { expect } from "chai";
import { readFileSync, writeFileSync } from "fs";
import { parseMidi } from "midi-file";
import { basename, resolve } from "path";
import { Midi } from "../src/Midi";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const glob = require("glob");

describe("JSON", () => {

	context("toJSON", () => {

		it("bach 846 is converted to JSON", () => {
			const midi = new Midi(readFileSync(resolve(__dirname, "./midi/bach/bach_846.mid")));
			const json = midi.toJSON();
			expect(json).to.have.property("header");
			expect(json.header).to.have.property("tempos");
			expect(json.header.tempos).is.an("array");
			expect(json.header).to.have.property("timeSignatures");
			expect(json.header.timeSignatures).is.an("array");
			expect(json.header).to.have.property("name");
			expect(json.header.name).is.an("string");
			expect(json.header).to.have.property("ppq");
			expect(json.header.ppq).is.an("number");

			expect(json).to.have.property("tracks");
			expect(json.tracks[0]).to.have.property("notes");

			expect(json.tracks[0].notes).to.be.an("array");
			expect(json.tracks[0].notes[0]).to.have.property("midi");
			expect(json.tracks[0].notes[0]).to.have.property("time");
			expect(json.tracks[0].notes[0]).to.have.property("duration");
			expect(json.tracks[0].notes[0]).to.have.property("ticks");

			expect(json.tracks[0].controlChanges).to.be.an("object");
			expect(json.tracks[0].controlChanges[91]).to.be.an("array");
			expect(json.tracks[0].controlChanges[91][0]).to.have.property("ticks");
			expect(json.tracks[0].controlChanges[91][0]).to.have.property("time");
			expect(json.tracks[0].controlChanges[91][0]).to.have.property("number");
			expect(json.tracks[0].controlChanges[91][0]).to.have.property("value");
		});

		it("claire de lune is converted to JSON", () => {
			const midi = new Midi(readFileSync(resolve(__dirname, "./midi/debussy/claire_de_lune.mid")));
			const json = midi.toJSON();
			expect(json).to.have.property("header");
			expect(json.header).to.have.property("tempos");
			expect(json.header.tempos).is.an("array");
			expect(json.header).to.have.property("timeSignatures");
			expect(json.header.timeSignatures).is.an("array");
			expect(json.header).to.have.property("name");
			expect(json.header.name).is.an("string");
			expect(json.header).to.have.property("ppq");
			expect(json.header.ppq).is.an("number");

			expect(json).to.have.property("tracks");
			expect(json.tracks).to.be.an("array");
			expect(json.tracks[0]).to.have.property("notes");

			expect(json.tracks[0].notes).to.be.an("array");
			expect(json.tracks[0].notes[0]).to.have.property("midi");
			expect(json.tracks[0].notes[0]).to.have.property("time");
			expect(json.tracks[0].notes[0]).to.have.property("duration");
			expect(json.tracks[0].notes[0]).to.have.property("ticks");

			expect(json.tracks[0].controlChanges).to.be.an("object");
			expect(json.tracks[0].controlChanges[91]).to.be.an("array");
			expect(json.tracks[0].controlChanges[91][0]).to.have.property("ticks");
			expect(json.tracks[0].controlChanges[91][0]).to.have.property("time");
			expect(json.tracks[0].controlChanges[91][0]).to.have.property("number");
			expect(json.tracks[0].controlChanges[91][0]).to.have.property("value");
		});

		const bachFiles = glob.sync(resolve(__dirname, "./midi/bach/*.mid"));
		bachFiles.forEach(file => {
			it(`can decode and re-encode and re-decode to the same thing - ${basename(file)}`, () => {
				const midi = new Midi(readFileSync(file));
				const encoded = midi.toArray();
				const compareTo = new Midi(encoded);

				expect(midi.name).to.equal(compareTo.name);
				expect(midi.tracks.length).to.equal(compareTo.tracks.length);
				expect(midi.header.tempos.length).to.equal(compareTo.header.tempos.length);

				expect(midi.tracks[0].notes.length).to.equal(compareTo.tracks[0].notes.length);

				expect(midi.tracks[0].notes[0].name).to.equal(compareTo.tracks[0].notes[0].name);
				expect(midi.tracks[0].notes[0].time).to.be.closeTo(compareTo.tracks[0].notes[0].time, 0.001);
				expect(midi.tracks[0].notes[0].duration).to.be.closeTo(compareTo.tracks[0].notes[0].duration, 0.001);

				if (midi.tracks[0].controlChanges.sustain) {
					expect(midi.tracks[0].controlChanges.sustain.length).to.equal(compareTo.tracks[0].controlChanges.sustain.length);
				}

				// exists in meta
				const metaEvent = midi.header.meta[0];
				const exists = compareTo.header.meta.find(e => {
					return e.type === metaEvent.type && e.text === metaEvent.text;
				});
				if (metaEvent) {
					expect(exists).to.be.ok;
				}
			});
		});
	});

	context("fromJSON", () => {

		it("can go from a json representation", () => {
			const json = JSON.parse(readFileSync(resolve(__dirname, "./midi/bach/bach_846.json")).toString());
			const midi = new Midi();
			midi.fromJSON(json);
			expect(midi.name).to.equal("Das wohltemperierte Klavier I - Praeludium und Fuge 1 in C-Dur BWV 846");
			expect(midi.header.tempos).to.have.length(358);
			expect(midi.tracks).to.have.length(10);
			expect(midi.tracks[0].notes).to.have.length(415);
			expect(midi.toJSON()).to.deep.equal(json);
		});
	});
});
