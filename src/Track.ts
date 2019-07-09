import { MidiControllerEvent, MidiNoteOffEvent, MidiNoteOnEvent, MidiTrackData, MidiTrackNameEvent } from "midi-file";
import { insert } from "./BinarySearch";
import { ControlChange, ControlChangeInterface } from "./ControlChange";
import { ControlChangesJSON, createControlChanges } from "./ControlChanges";
import { Header } from "./Header";
import { Instrument, InstrumentJSON } from "./Instrument";
import { Note, NoteInterface, NoteJSON } from "./Note";

const privateHeaderMap = new WeakMap<Track, Header>();

/**
 * A Track is a collection of notes and controlChanges
 */
export class Track {

	/**
	 * The name of the track
	 */
	name: string = "";

	/**
	 * The instrument associated with the track
	 */
	instrument: Instrument;

	/**
	 * The track's note events
	 */
	notes: Note[] = [];

	/**
	 * The channel number of the track. Applies this channel
	 * to all events associated with the channel
	 */
	channel: number;

	/**
	 * The control change events
	 */
	controlChanges = createControlChanges();

	constructor(trackData: MidiTrackData, header: Header) {

		privateHeaderMap.set(this, header);

		if (trackData) {
			const nameEvent = trackData.find(e => e.type === "trackName") as MidiTrackNameEvent;
			this.name = nameEvent ? nameEvent.text : "";
		}

		/** @type {Instrument} */
		this.instrument = new Instrument(trackData, this);

		this.channel = 0;

		if (trackData) {
			const noteOns = trackData.filter(event => event.type === "noteOn") as MidiNoteOnEvent[];
			const noteOffs = trackData.filter(event => event.type === "noteOff") as MidiNoteOffEvent[];
			while (noteOns.length) {
				const currentNote = noteOns.shift();
				// find the corresponding note off
				const offIndex = noteOffs.findIndex(note => note.noteNumber === currentNote.noteNumber);
				if (offIndex !== -1) {
					// once it's got the note off, add it
					const noteOff = noteOffs.splice(offIndex, 1)[0];
					this.addNote({
						durationTicks : noteOff.absoluteTime - currentNote.absoluteTime,
						midi : currentNote.noteNumber,
						noteOffVelocity : noteOff.velocity / 127,
						ticks : currentNote.absoluteTime,
						velocity : currentNote.velocity / 127,
					});
				}
			}

			const controlChanges = trackData.filter(event => event.type === "controller") as MidiControllerEvent[];
			controlChanges.forEach(event => {
				this.addCC({
					number : event.controllerType,
					ticks : event.absoluteTime,
					value : event.value / 127,
				});
			});

			// const endOfTrack = trackData.find(event => event.type === "endOfTrack");
		}
	}

	/**
	 * Add a note to the notes array
	 * @param props The note properties to add
	 */
	addNote(props: Partial<NoteInterface> = {}): this {
		const header = privateHeaderMap.get(this);
		const note = new Note({
			midi : 0,
			ticks : 0,
			velocity : 1,
		}, {
			ticks : 0,
			velocity : 0,
		}, header);
		Object.assign(note, props);
		insert(this.notes, note, "ticks");
		return this;
	}

	/**
	 * Add a control change to the track
	 * @param props
	 */
	addCC(props: Partial<ControlChangeInterface>): this {
		const header = privateHeaderMap.get(this);
		const cc = new ControlChange({
			controllerType : props.number,
		}, header);
		delete props.number;
		Object.assign(cc, props);
		if (!Array.isArray(this.controlChanges[cc.number])) {
			this.controlChanges[cc.number] = [];
		}
		insert(this.controlChanges[cc.number], cc, "ticks");
		return this;
	}

	/**
	 * The end time of the last event in the track
	 */
	get duration(): number {
		const lastNote = this.notes[this.notes.length - 1];
		if (lastNote) {
			return lastNote.time + lastNote.duration;
		} else {
			return 0;
		}
	}

	/**
	 * The end time of the last event in the track in ticks
	 */
	get durationTicks(): number {
		const lastNote = this.notes[this.notes.length - 1];
		if (lastNote) {
			return lastNote.ticks + lastNote.durationTicks;
		} else {
			return 0;
		}
	}

	/**
	 * Assign the json values to this track
	 */
	fromJSON(json: TrackJSON): void {
		this.name = json.name;
		this.channel = json.channel;
		this.instrument = new Instrument(undefined, this);
		this.instrument.fromJSON(json.instrument);
		for (const number in json.controlChanges) {
			if (json.controlChanges[number]) {
				json.controlChanges[number].forEach(cc => {
					this.addCC({
						number : cc.number,
						ticks : cc.ticks,
						value : cc.value,
					});
				});
			}
		}
		json.notes.forEach(n => {
			this.addNote({
				durationTicks : n.durationTicks,
				midi : n.midi,
				ticks : n.ticks,
				velocity : n.velocity,
			});
		});
	}

	/**
	 * Convert the track into a JSON format
	 */
	toJSON(): TrackJSON {

		// convert all the CCs to JSON
		const controlChanges = {};
		for (let i = 0; i < 127; i++) {
			if (this.controlChanges.hasOwnProperty(i)) {
				controlChanges[i] = this.controlChanges[i].map(c => c.toJSON());
			}
		}
		return {
			channel : this.channel,
			controlChanges,
			instrument : this.instrument.toJSON(),
			name : this.name,
			notes : this.notes.map(n => n.toJSON()),
		};
	}
}

export interface TrackJSON {
	name: string;
	notes: NoteJSON[];
	channel: number;
	instrument: InstrumentJSON;
	controlChanges: ControlChangesJSON;
}
