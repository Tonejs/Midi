import { PitchbendChange, PitchbendChangeJSON } from "./PitchbendChange";

export interface PitchbendChanges {
	[key: string]: PitchbendChange[];
	[key: number]: PitchbendChange[];
}

export interface PitchbendChangesJSON {
	[key: string]: PitchbendChangeJSON[];
	[key: number]: PitchbendChangeJSON[];
}