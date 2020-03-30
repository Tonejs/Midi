import { expect } from "chai";
import { readFileSync } from "fs";
import { basename, resolve } from "path";
import { Midi } from "../src/Midi";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const glob = require("glob");

function parseGroundTruth(path) {
	const textData = readFileSync(`${path}.txt`).toString();
	const tracks = textData.split(/track .*\n/gm)
		.map(track => track.split("\n")
			.map(row => row.split("\t"))
			.map(([note, start, end]) => [parseInt(note), parseFloat(start), parseFloat(end)]));
	// push off the first one
	tracks.shift();
	// parse the note values
	tracks.forEach(track => track.pop());
	return tracks;
}

describe("matches pre-parsed midi", async () => {

	const midiFiles = glob.sync(resolve(__dirname, "./midi/*/*.mid"));
	midiFiles.forEach(file => {
		it(`parsed ${basename(file)} correctly`, () => {
			const midi = new Midi(readFileSync(file));
			const truth = parseGroundTruth(file);

			midi.tracks.slice(0, truth.length).forEach((track) => {
				let misses = 0;
				const noteLimit = 30;
				// const truthTrack = truth[trackIndex].slice(0, noteLimit)
				track.notes.slice(0, noteLimit).forEach(note => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
					// @ts-ignore
					const match = truth.find(truthTrack => {
						truthTrack = truthTrack.slice(0, noteLimit + 10);
						const trackMatch = truthTrack.find(([mid, start, end]) => {
							const sameMidi = mid === note.midi;
							const sameTime = Math.abs(start - note.time) < 0.1;
							const sameDuration = Math.abs(end - (note.time + note.duration)) < 0.1;
							return sameMidi && sameTime && sameDuration;
						});
						return trackMatch;
					});
					if (!match) {
						misses++;
					}

				});
				expect(misses).to.equal(0);
			});
		});
	});
});
