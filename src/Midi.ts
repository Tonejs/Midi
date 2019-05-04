import { parseMidi } from "midi-file";
import { encode } from "./Encode";
import { Header, HeaderJSON } from "./Header";
import { Track, TrackJSON } from "./Track";

/**
 * The main midi parsing class
 */
export class Midi {

	/**
	 * Download and parse the MIDI file. Returns a promise
	 * which resolves to the generated midi file
	 * @param url The url to fetch
	 */
	static async fromUrl(url: string): Promise<Midi> {
		const response = await fetch(url);
		if (response.ok) {
			const arrayBuffer = await response.arrayBuffer();
			return new Midi(arrayBuffer);
		} else {
			throw new Error(`could not load ${url}`);
		}
	}

	/**
	 * The header information, includes things like tempo and meta events.
	 */
	header: Header;

	/**
	 * The midi tracks.
	 */
	tracks: Track[];

	/**
	 * Parse the midi data
	 */
	constructor(midiArray?: (ArrayLike<number> | ArrayBuffer)) {

		// parse the midi data if there is any
		let midiData = null;
		if (midiArray) {
			if (midiArray instanceof ArrayBuffer) {
				midiArray = new Uint8Array(midiArray);
			}
			midiData = parseMidi(midiArray);

			// add the absolute times to each of the tracks
			midiData.tracks.forEach(track => {
				let currentTicks = 0;
				track.forEach(event => {
					currentTicks += event.deltaTime;
					event.absoluteTime = currentTicks;
				});
			});
		}

		this.header = new Header(midiData);
		this.tracks = [];

		// parse the midi data
		if (midiArray) {
			// format 0, everything is on the same track
			this.tracks = midiData.tracks.map(trackData => new Track(trackData, this.header));

			// if it's format 1 and there are no notes on the first track, remove it
			if (midiData.header.format === 1 && this.tracks[0].duration === 0) {
				this.tracks.shift();
			}
		}
	}

	/**
	 * The name of the midi file, taken from the first track
	 */
	get name(): string {
		return this.header.name;
	}

	set name(n: string) {
		this.header.name = n;
	}

	/**
	 * The total length of the file in seconds
	 */
	get duration(): number {
		// get the max of the last note of all the tracks
		const durations = this.tracks.map(t => t.duration);
		return Math.max(...durations);
	}

	/**
	 * The total length of the file in ticks
	 */
	get durationTicks(): number {
		// get the max of the last note of all the tracks
		const durationTicks = this.tracks.map(t => t.durationTicks);
		return Math.max(...durationTicks);
	}

	/**
	 * Add a track to the midi file
	 */
	addTrack(): Track {
		const track = new Track(undefined, this.header);
		this.tracks.push(track);
		return track;
	}

	/**
	 * Encode the midi as a Uint8Array.
	 */
	toArray(): Uint8Array {
		return encode(this);
	}

	/**
	 * Convert the midi object to JSON.
	 */
	toJSON(): MidiJSON {
		return {
			header : this.header.toJSON(),
			tracks : this.tracks.map(track => track.toJSON()),
		};
	}

	/**
	 * Parse a JSON representation of the object. Will overwrite the current
	 * tracks and header.
	 */
	fromJSON(json: MidiJSON): void {
		this.header = new Header();
		this.header.fromJSON(json.header);
		this.tracks = json.tracks.map(trackJSON => {
			const track = new Track(undefined, this.header);
			track.fromJSON(trackJSON);
			return track;
		});
	}

	/**
	 * Clone the entire object midi object
	 */
	clone(): Midi {
		const midi = new Midi();
		midi.fromJSON(this.toJSON());
		return midi;
	}
}

/**
 * The MIDI data in JSON format
 */
interface MidiJSON {
	header: HeaderJSON;
	tracks: TrackJSON[];
}
