import { MidiPitchBendEvent, writeMidi } from "midi-file";
import { MidiControllerEvent, MidiData, MidiEndOfTrackEvent,
	MidiInstrumentEvent, MidiKeySignatureEvent, MidiNoteOffEvent,
	MidiNoteOnEvent, MidiTempoEvent, MidiTextEvent, MidiTimeSignatureEvent, MidiTrackNameEvent } from "midi-file";
import { ControlChange } from "./ControlChange";
import { PitchBend } from "./PitchBend";
import { KeySignatureEvent, keySignatureKeys, MetaEvent, TempoEvent, TimeSignatureEvent } from "./Header";
import { Midi } from "./Midi";
import { Note } from "./Note";
import { Track } from "./Track";
import flatten from "array-flatten";

function encodeNote(note: Note, channel: number): [MidiNoteOnEvent, MidiNoteOffEvent] {
	return [{
		absoluteTime: note.ticks,
		channel,
		deltaTime: 0,
		noteNumber: note.midi,
		type: "noteOn",
		velocity: Math.floor(note.velocity * 127),
	},
	{
		absoluteTime: note.ticks + note.durationTicks,
		channel,
		deltaTime: 0,
		noteNumber: note.midi,
		type: "noteOff",
		velocity: Math.floor(note.noteOffVelocity * 127),
	}];
}

function encodeNotes(track: Track): Array<MidiNoteOnEvent | MidiNoteOffEvent> {
	return flatten(track.notes.map(note => encodeNote(note, track.channel))) as unknown as Array<MidiNoteOnEvent | MidiNoteOffEvent>;
}

function encodeControlChange(cc: ControlChange, channel: number): MidiControllerEvent {
	return {
		absoluteTime: cc.ticks,
		channel,
		controllerType: cc.number,
		deltaTime: 0,
		type: "controller",
		value: Math.floor(cc.value * 127),
	};
}

function encodeControlChanges(track: Track): MidiControllerEvent[] {
	const controlChanges: MidiControllerEvent[] = [];
	for (let i = 0; i < 127; i++) {
		if (track.controlChanges.hasOwnProperty(i)) {
			track.controlChanges[i].forEach((cc: ControlChange) => {
				controlChanges.push(encodeControlChange(cc, track.channel));
			});
		}
	}
	return controlChanges;
}

function encodePitchBend(pb: PitchBend, channel: number): MidiPitchBendEvent {
	return {
		absoluteTime: pb.ticks,
		channel,
		deltaTime: 0,
		type: "pitchBend",
		value: pb.value,
	};
}

function encodePitchBends(track: Track): MidiPitchBendEvent[] {
	const pitchBends: MidiPitchBendEvent[] = [];
	track.pitchBends.forEach((pb: PitchBend) => {
		pitchBends.push(encodePitchBend(pb, track.channel));
	});	
	return pitchBends;
}

function encodeInstrument(track: Track): MidiInstrumentEvent {
	return {
		absoluteTime: 0,
		channel: track.channel,
		deltaTime: 0,
		programNumber: track.instrument.number,
		type: "programChange",
	};
}

function encodeTrackName(name: string): MidiTrackNameEvent {
	return {
		absoluteTime: 0,
		deltaTime: 0,
		meta: true,
		text: name,
		type: "trackName",
	};
}

function encodeTempo(tempo: TempoEvent): MidiTempoEvent {
	return {
		absoluteTime: tempo.ticks,
		deltaTime: 0,
		meta: true,
		microsecondsPerBeat: Math.floor(60000000 / tempo.bpm),
		type: "setTempo",
	};
}

function encodeTimeSignature(timeSig: TimeSignatureEvent): MidiTimeSignatureEvent {
	return {
		absoluteTime: timeSig.ticks,
		deltaTime: 0,
		denominator: timeSig.timeSignature[1],
		meta: true,
		metronome: 24,
		numerator: timeSig.timeSignature[0],
		thirtyseconds: 8,
		type: "timeSignature",
	};
}

// function encodeMeta(event: )

function encodeKeySignature(keySig: KeySignatureEvent): MidiKeySignatureEvent {
	const keyIndex = keySignatureKeys.indexOf(keySig.key);
	return {
		absoluteTime: keySig.ticks,
		deltaTime: 0,
		key: keyIndex + 7,
		meta: true,
		scale: keySig.scale === "major" ? 0 : 1,
		type: "keySignature",
	};
}

function encodeText(textEvent: MetaEvent): MidiTextEvent {
	return {
		absoluteTime: textEvent.ticks,
		deltaTime: 0,
		meta: true,
		text: textEvent.text,
		type: textEvent.type,
	} as MidiTextEvent;
}

/**
 * Convert the midi object to an array
 */
export function encode(midi: Midi): Uint8Array {
	const midiData: MidiData = {
		header: {
			format: 1,
			numTracks: midi.tracks.length + 1,
			ticksPerBeat: midi.header.ppq,
		},
		tracks: [
			[
				// the name data
				{
					absoluteTime: 0,
					deltaTime: 0,
					meta: true,
					text: midi.header.name,
					type: "trackName",
				} as MidiTrackNameEvent,
				...midi.header.keySignatures.map(keySig => encodeKeySignature(keySig)),
				// and all the meta events (cloned for safety)
				...midi.header.meta.map(e => encodeText(e)),
				// the first track is all the tempo data
				...midi.header.tempos.map(tempo => encodeTempo(tempo)),
				// and the time signature data
				...midi.header.timeSignatures.map(timeSig => encodeTimeSignature(timeSig)),
			],
			// the remaining tracks
			...midi.tracks.map(track => {
				return [
					// add the name
					encodeTrackName(track.name),
					// the instrument
					encodeInstrument(track),
					// add the notes
					...encodeNotes(track),
					// and the control changes
					...encodeControlChanges(track),
					// and the pitch bends
					...encodePitchBends(track)
				];
			}),
		],
	};

	// sort and set deltaTime of all of the tracks
	midiData.tracks = midiData.tracks.map(track => {
		track = track.sort((a, b) => a.absoluteTime - b.absoluteTime);
		let lastTime = 0;
		track.forEach(note => {
			note.deltaTime = note.absoluteTime - lastTime;
			lastTime = note.absoluteTime;
			delete note.absoluteTime;
		});
		// end of track
		track.push({
			deltaTime: 0,
			meta: true,
			type: "endOfTrack",
		} as MidiEndOfTrackEvent);
		return track;
	});

	// return midiData
	return new Uint8Array(writeMidi(midiData));
}
