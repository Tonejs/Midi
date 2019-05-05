//////////////////////////////////////////////////////////
// THE EVENT TYPES
//////////////////////////////////////////////////////////

interface MidiEvent {
	type: string;
	deltaTime: number;
	absoluteTime: number;
}

interface MidiChannelEvent extends MidiEvent {
	channel: number;
	meta?: false;
}

interface MidiNoteEvent extends MidiChannelEvent {
	type: string;
	velocity: number;
	noteNumber: number;
	running?: boolean;
}

interface MidiNoteOnEvent extends MidiNoteEvent {
	type: "noteOn";
}

interface MidiNoteOffEvent extends MidiNoteEvent {
	type: "noteOff";
}

interface MidiControllerEvent extends MidiChannelEvent {
	type: "controller";
	controllerType: number;
	value: number;
}

interface MidiInstrumentEvent extends MidiChannelEvent {
	type: "programChange";
	programNumber: number;
}

//////////////////////////////////////////////////////////
// META EVENTS
//////////////////////////////////////////////////////////

interface MidiMetaEvent extends MidiEvent {
	meta: true;
	type: string;
}

interface MidiTimeSignatureEvent extends MidiMetaEvent {
	type: "timeSignature";
	numerator: number;
	denominator: number;
	thirtyseconds: number;
	metronome: number;
}

interface MidiTempoEvent extends MidiMetaEvent {
	type: "setTempo";
	microsecondsPerBeat: number;
}

interface MidiTrackNameEvent extends MidiMetaEvent {
	type: "trackName";
	text: string;
}

interface MidiEndOfTrackEvent extends MidiMetaEvent {
	type: "endOfTrack";
}

interface MidiCopyrightEvent extends MidiMetaEvent {
	type: "copyrightNotice";
	text: string;
}

interface MidiTextEvent extends MidiMetaEvent {
	type: "text" | "marker" | "lyrics" | "cuePoint";
	text: string;
}

interface MidiKeySignatureEvent extends MidiMetaEvent {
	type: "keySignature";
	key: number;
	scale: number;
}

type MidiTrackEvent = MidiTimeSignatureEvent | MidiTempoEvent | MidiTrackNameEvent |
	MidiEndOfTrackEvent | MidiNoteOnEvent | MidiNoteOffEvent | MidiControllerEvent |
	MidiInstrumentEvent | MidiKeySignatureEvent | MidiTextEvent;

export type MidiTrackData = MidiTrackEvent[];

export interface MidiData {
	header: {
		format: number;
		ticksPerBeat: number;
		numTracks: number;
	};
	tracks: MidiTrackData[];
}

//////////////////////////////////////////////////////////
// EXPORTED METHODS
//////////////////////////////////////////////////////////
export function parseMidi(midiArray: ArrayLike<number> | ArrayBuffer): MidiData;
export function writeMidi(midiData: MidiData): ArrayBuffer;
