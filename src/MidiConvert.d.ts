export type Note = {
  time: number,
  name: string,
  midi: number,
  velocity: number,
  duration: number,
};

export type Track = {
  name: string,
  instrument: string,
  notes: Array<Note>,
  duration: number,
  length: number,
};

export type ControlChange = {
  time: number,
  name: string,
  midi: number,
  velocity: number,
  duration: number,
};

export type MIDI = {
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
