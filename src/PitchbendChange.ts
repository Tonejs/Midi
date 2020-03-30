import { Header } from "./Header";

const privateHeaderMap = new WeakMap<PitchbendChange, Header>();

// convert [-8191,8191]] to [-2,2]
export function PitchbendMIDItoFloat(PitchbendFourteenBit: number): number {
	return PitchbendFourteenBit / 8191.0 * 2.0;
}

/** )
 * @typedef PitchbendChangeEvent
 * @property {number=} value
 * @property {number=} absoluteTime
 */

/**
 * Represents a pitch bend change event
 */
export class PitchbendChange implements PitchbendChangeInterface {

	/**
	 * The number value of the pitch bend, in semitones [-2,+2]
	 */
	value: number;

	/**
	 * Channel number pitchbend applies to
	 */
	channel: number;

	/**
	 * The tick time of the event
	 */
	ticks: number;

	/**
	 * @param {PitchbendChangeEvent} event
	 * @param {Header} header
	 */
	constructor(event, header: Header) {

		privateHeaderMap.set(this, header);

		this.ticks = event.absoluteTime;
		this.value = PitchbendMIDItoFloat(event.value);
	}

	/**
	 * The time of the event in seconds
	 */
	get time(): number {
		const header = privateHeaderMap.get(this);
		return header.ticksToSeconds(this.ticks);
	}

	set time(t: number) {
		const header = privateHeaderMap.get(this);
		this.ticks = header.secondsToTicks(t);
	}

	toJSON(): PitchbendChangeJSON {
		return {
			ticks: this.ticks,
			time: this.time,
			value: this.value,
			channel: this.channel
		};
	}
}

export interface PitchbendChangeJSON {
	ticks: number;
	time: number;
	value: number;
	channel: number;
}

export interface PitchbendChangeInterface {
	ticks: number;
	time: number;
	value: number;
	channel: number;
}
