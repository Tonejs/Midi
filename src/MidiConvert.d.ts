export interface Note {
	time: number,
	name: string,
	midi: number,
	velocity: number,
	duration: number,
};

export interface Track {
	id?: number,
	channelNumber: number,
	name: string,
	instrument: string,
	instrumentNumber: number,
	instrumentFamily: string,
	notes: Array<Note>,
	startTime: number,
	duration: number,
	length: number,
};

export interface ControlChange {
	number: number,
	time: string,
	value: number,
};

export interface MIDI {
	header: {
		bpm: number,
		timeSignature: [number, number],
		PPQ: number,
	},

	startTime: number,
	duration: number,

	tracks: Array<Track>,

	controlChanges: {
		[key: number]: ControlChange
	},
};

export function parse(raw: ArrayBuffer): MIDI;
export function load(url: string, data?: any, method?: 'GET'|'POST'): Promise<MIDI>;
export function create(): MIDI;

export interface StringsByID {
	[index: number]: string;
}

export const instrumentByPatchID: StringsByID;
export const instrumentFamilyByID: StringsByID;
export const drumKitByPatchID: StringsByID;
