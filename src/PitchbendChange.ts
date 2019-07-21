import { Header } from "./Header";

const privateHeaderMap = new WeakMap<PitchbendChange, Header>();

// convert [-8191,8191]] to [-2,2]
export function PitchbendMIDItoFloat(pb_14bit: number): number {
	return pb_14bit / 8191.0 * 2.0;
}

/**)
 * @typedef PitchbendChangeEvent
 * @property {number=} value
 * @property {number=} absoluteTime
 */


/**
 * Represents a pitch bend change event
 */
export class PitchbendChange implements PitchbendChangeInterface {

	/**
	 * The number value of the pitch bend
	 * Also in semitones
	 */
	value: number;
	semitones: number;

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
		this.value = event.value;
		this.semitones = PitchbendMIDItoFloat(event.value);
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
			channel : this.channel,
			ticks : this.ticks,
			time : this.time,
			value : this.value,
			semitones : this.semitones
		};
	}
}

export interface PitchbendChangeJSON {
	ticks: number;
	time: number;
	value: number;
	semitones: number;
	channel: number;
}

export interface PitchbendChangeInterface {
	ticks: number;
	time: number;
	value: number;
	semitones: number;
	channel: number;
}