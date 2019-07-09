import { MidiInstrumentEvent, MidiTrackData } from "midi-file";
import { drumKitByPatchID, instrumentByPatchID, instrumentFamilyByID } from "./InstrumentMaps";
import { Track } from "./Track";

const privateTrackMap = new WeakMap<Instrument, Track>();

/**
 * Describes the midi instrument of a track
 */
export class Instrument {

	/**
	 * The instrument number
	 */
	number: number = 0;

	/**
	 * @param {Array} [trackData]
	 * @param {Track} track
	 */
	constructor(trackData: MidiTrackData, track) {

		privateTrackMap.set(this, track);
		this.number = 0;
		if (trackData) {
			const programChange = trackData.find(e => e.type === "programChange") as MidiInstrumentEvent;
			if (programChange) {
				this.number = programChange.programNumber;
			}
		}
	}

	/**
	 * The common name of the instrument
	 */
	get name(): string {
		if (this.percussion) {
			return drumKitByPatchID[this.number];
		} else {
			return instrumentByPatchID[this.number];
		}
	}

	set name(n: string) {
		const patchNumber = instrumentByPatchID.indexOf(n);
		if (patchNumber !== -1) {
			this.number = patchNumber;
		}
	}

	/**
	 * The instrument family, e.g. "piano".
	 */
	get family(): string {
		if (this.percussion) {
			return "drums";
		} else {
			return instrumentFamilyByID[Math.floor(this.number / 8)];
		}
	}

	/**
	 * If the instrument is a percussion instrument
	 */
	get percussion(): boolean {
		const track = privateTrackMap.get(this);
		return [9, 10].includes(track.channel);
	}

	/**
	 * Convert it to JSON form
	 */
	toJSON(): InstrumentJSON {
		return {
			family : this.family,
			name : this.name,
			number : this.number,
		};
	}

	/**
	 * Convert from JSON form
	 */
	fromJSON(json: InstrumentJSON): void {
		this.number = json.number;
	}
}

export interface InstrumentJSON {
	number: number;
	name: string;
	family: string;
}
