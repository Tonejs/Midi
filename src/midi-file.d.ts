declare module "midi-file" {

	// ////////////////////////////////////////////////////////
	// THE EVENT TYPES
	// ////////////////////////////////////////////////////////

	export interface MidiEvent {
		type: string;
		deltaTime: number;
		absoluteTime: number;
	}

	export interface MidiChannelEvent extends MidiEvent {
		channel: number;
		meta?: false;
	}

	export interface MidiNoteEvent extends MidiChannelEvent {
		type: string;
		velocity: number;
		noteNumber: number;
		running?: boolean;
	}

	export interface MidiNoteOnEvent extends MidiNoteEvent {
		type: "noteOn";
	}

	export interface MidiNoteOffEvent extends MidiNoteEvent {
		type: "noteOff";
	}

	export interface MidiControllerEvent extends MidiChannelEvent {
		type: "controller";
		controllerType: number;
		value: number;
	}

	export interface MidiInstrumentEvent extends MidiChannelEvent {
		type: "programChange";
		programNumber: number;
	}

	// ////////////////////////////////////////////////////////
	// META EVENTS
	// ////////////////////////////////////////////////////////

	export interface MidiMetaEvent extends MidiEvent {
		meta: true;
		type: string;
	}

	export interface MidiTimeSignatureEvent extends MidiMetaEvent {
		type: "timeSignature";
		numerator: number;
		denominator: number;
		thirtyseconds: number;
		metronome: number;
	}

	export interface MidiTempoEvent extends MidiMetaEvent {
		type: "setTempo";
		microsecondsPerBeat: number;
	}

	export interface MidiTrackNameEvent extends MidiMetaEvent {
		type: "trackName";
		text: string;
	}

	export interface MidiEndOfTrackEvent extends MidiMetaEvent {
		type: "endOfTrack";
	}

	export interface MidiCopyrightEvent extends MidiMetaEvent {
		type: "copyrightNotice";
		text: string;
	}

	export interface MidiTextEvent extends MidiMetaEvent {
		type: "text" | "marker" | "lyrics" | "cuePoint";
		text: string;
	}

	export interface MidiKeySignatureEvent extends MidiMetaEvent {
		type: "keySignature";
		key: number;
		scale: number;
	}

	export interface MidiPitchBendEvent extends MidiChannelEvent {
		type: "pitchBend";
		value: number;
	}

	export type MidiTrackEvent = MidiTimeSignatureEvent | MidiTempoEvent | MidiTrackNameEvent | MidiEndOfTrackEvent | MidiNoteOnEvent | MidiNoteOffEvent | MidiControllerEvent | MidiPitchBendEvent | MidiInstrumentEvent | MidiKeySignatureEvent | MidiTextEvent;

	export type MidiTrackData = MidiTrackEvent[];

	export interface MidiData {
		header: {
			format: number;
			ticksPerBeat: number;
			numTracks: number;
		};
		tracks: MidiTrackData[];
	}

	// //////////////////////////////////////////////////////
	// EXPORTED METHODS
	// //////////////////////////////////////////////////////
	export function parseMidi(midiArray: ArrayLike<number> | ArrayBuffer): MidiData;
	export function writeMidi(midiData: MidiData): ArrayBuffer;
}
