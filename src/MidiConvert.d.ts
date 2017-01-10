export interface Note {
  time: number,
  name: string,
  midi: number,
  velocity: number,
  duration: number,
};

export interface Track {
  name: string,
  instrument: string,
  instrumentPatchID: number,
  notes: Array<Note>,
  duration: number,
  length: number,
};

export interface ControlChange {
  time: number,
  name: string,
  midi: number,
  velocity: number,
  duration: number,
};

export interface MIDI {
  header: {
    bpm: number,
    timeSignature: [number, number],
    PPQ: number,
  },
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
