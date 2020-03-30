import { MidiData } from "midi-file";
import { search } from "./BinarySearch";

const privatePPQMap = new WeakMap<Header, number>();

export interface TempoEvent {
	ticks: number;
	bpm: number;
	time?: number;
}

export interface TimeSignatureEvent {
	ticks: number;
	timeSignature: number[];
	measures?: number;
}

export interface MetaEvent {
	text: string;
	type: string;
	ticks: number;
}

export interface KeySignatureEvent {
	ticks: number;
	key: string;
	scale: string;
}

/**
 * @hidden
 */
export const keySignatureKeys = ["Cb", "Gb", "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E", "B", "F#", "C#"];

/** The parsed midi file header */
export class Header {

	/**
	 * The array of all the tempo events
	 */
	tempos: TempoEvent[] = [];

	/**
	 * The time signatures
	 */
	timeSignatures: TimeSignatureEvent[] = [];

	/**
	 * The time signatures
	 */
	keySignatures: KeySignatureEvent[] = [];

	/**
	 * Additional meta events
	 */
	meta: MetaEvent[] = [];

	/**
	 * The name of the midi file
	 */
	name = "";

	constructor(midiData?: MidiData) {
		// look through all the tracks for tempo changes

		privatePPQMap.set(this, 480);

		if (midiData) {
			privatePPQMap.set(this, midiData.header.ticksPerBeat);
			// check the first track for all the relevant data
			midiData.tracks[0].forEach(event => {
				if (event.meta) {
					if (event.type === "timeSignature") {
						this.timeSignatures.push({
							ticks: event.absoluteTime,
							timeSignature: [event.numerator, event.denominator],
						});
					} else if (event.type === "setTempo") {
						this.tempos.push({
							bpm: 60000000 / event.microsecondsPerBeat,
							ticks: event.absoluteTime,
						});
					} else if (event.type === "keySignature") {
						this.keySignatures.push({
							key: keySignatureKeys[event.key + 7],
							scale: event.scale === 0 ? "major" : "minor",
							ticks: event.absoluteTime,
						});
					} else if (event.type === "trackName") {
						this.name = event.text;
					} else if (event.type !== "endOfTrack") {
						this.meta.push({
							text: event.text,
							ticks: event.absoluteTime,
							type: event.type,
						});
					}
				}
			});
			this.update();
		}
	}

	/**
	 * This must be invoked after any changes are made to the tempo array
	 * or the timeSignature array for the updated values to be reflected.
	 */
	update(): void {
		let currentTime = 0;
		let lastEventBeats = 0;
		// make sure it's sorted
		this.tempos.sort((a, b) => a.ticks - b.ticks);
		this.tempos.forEach((event, index) => {
			const lastBPM = index > 0 ? this.tempos[index - 1].bpm : this.tempos[0].bpm;
			const beats = (event.ticks / this.ppq) - lastEventBeats;
			const elapsedSeconds = (60 / lastBPM) * beats;
			event.time = elapsedSeconds + currentTime;
			currentTime = event.time;
			lastEventBeats += beats;
		});
		this.timeSignatures.sort((a, b) => a.ticks - b.ticks);
		this.timeSignatures.forEach((event, index) => {
			const lastEvent = index > 0 ? this.timeSignatures[index - 1] : this.timeSignatures[0];
			const elapsedBeats = (event.ticks - lastEvent.ticks) / this.ppq;
			const elapsedMeasures = (elapsedBeats / lastEvent.timeSignature[0]) / (lastEvent.timeSignature[1] / 4);
			lastEvent.measures = lastEvent.measures || 0;
			event.measures = elapsedMeasures + lastEvent.measures;
		});
	}

	/**
	 * Convert ticks into seconds based on the tempo changes
	 */
	ticksToSeconds(ticks: number): number {
		// find the relevant position
		const index = search(this.tempos, ticks);
		if (index !== -1) {
			const tempo = this.tempos[index];
			const tempoTime = tempo.time;
			const elapsedBeats = (ticks - tempo.ticks) / this.ppq;
			return tempoTime + (60 / tempo.bpm) * elapsedBeats;
		} else {
			// assume 120
			const beats = (ticks / this.ppq);
			return (60 / 120) * beats;
		}
	}

	/**
	 * Convert ticks into measures based off of the time signatures
	 */
	ticksToMeasures(ticks: number): number {
		const index = search(this.timeSignatures, ticks);
		if (index !== -1) {
			const timeSigEvent = this.timeSignatures[index];
			const elapsedBeats = (ticks - timeSigEvent.ticks) / this.ppq;
			return timeSigEvent.measures + elapsedBeats / (timeSigEvent.timeSignature[0] / timeSigEvent.timeSignature[1]) / 4;
		} else {
			return (ticks / this.ppq) / 4;
		}
	}

	/**
	 * The number of ticks per quarter note
	 */
	get ppq(): number {
		return privatePPQMap.get(this);
	}

	/**
	 * Convert seconds to ticks based on the tempo events
	 */
	secondsToTicks(seconds: number): number {
		// find the relevant position
		const index = search(this.tempos, seconds, "time");
		if (index !== -1) {
			const tempo = this.tempos[index];
			const tempoTime = tempo.time;
			const elapsedTime = (seconds - tempoTime);
			const elapsedBeats = elapsedTime / (60 / tempo.bpm);
			return Math.round(tempo.ticks + elapsedBeats * this.ppq);
		} else {
			// assume 120
			const beats = seconds / (60 / 120);
			return Math.round(beats * this.ppq);
		}
	}

	/**
	 * Convert the header into an object.
	 */
	toJSON(): HeaderJSON {
		return {
			keySignatures: this.keySignatures,
			meta: this.meta,
			name: this.name,
			ppq: this.ppq,
			tempos: this.tempos.map(t => {
				return {
					bpm: t.bpm,
					ticks: t.ticks,
				};
			}),
			timeSignatures: this.timeSignatures,
		};
	}

	/**
	 * parse a header json object.
	 */
	fromJSON(json: HeaderJSON): void {
		this.name = json.name;
		// clone all the attributes
		this.tempos = json.tempos.map(t => Object.assign({}, t));
		this.timeSignatures = json.timeSignatures.map(t => Object.assign({}, t));
		this.keySignatures = json.keySignatures.map(t => Object.assign({}, t));
		this.meta = json.meta.map(t => Object.assign({}, t));
		privatePPQMap.set(this, json.ppq);
		this.update();
	}

	/**
	 * Update the tempo of the midi to a single tempo. Will remove and replace
	 * any other tempos currently set and update all of the event timing.
	 * @param bpm The tempo in beats per second
	 */
	setTempo(bpm: number): void {
		this.tempos = [{
			bpm,
			ticks: 0,
		}];
		this.update();
	}
}

export interface HeaderJSON {
	name: string;
	ppq: number;
	meta: MetaEvent[];
	tempos: TempoEvent[];
	timeSignatures: TimeSignatureEvent[];
	keySignatures: KeySignatureEvent[];
}
