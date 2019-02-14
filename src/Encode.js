import { writeMidi } from 'midi-file'
// import { writeFileSync } from 'fs'
//@ts-ignore
import flatten from 'array-flatten'
import { Midi } from './Midi'

/**
 * @param {Midi} midi 
 * @returns {Uint8Array}
 */
export function encode(midi){
	const midiData = {
		header : {
			ticksPerBeat : midi.header.ppq,
			format : 1,
			numTracks : midi.tracks.length + 1
		},
		tracks : [
			[
				//the name data
				{
					ticks : 0,
					meta : true,
					type : 'trackName',
					text : midi.header.name
				},
				//and all the meta events (cloned for safety)
				...midi.header.meta.map(e => {
					return {
						ticks : e.ticks,
						meta : true,
						type : e.type,
						text : e.text
					}
				}),
				//the first track is all the tempo data
				...midi.header.tempos.map(e => {
					return {
						type : 'setTempo',
						microsecondsPerBeat : Math.floor(60000000 / e.bpm),
						ticks : e.ticks,
						meta : true,
					}
				}), 
				//and the time signature data
				...midi.header.timeSignatures.map(e => {
					return {
						type : 'timeSignature',
						meta : true,
						ticks : e.ticks,
						numerator : e.timeSignature[0],
						denominator : e.timeSignature[1],
						metronome : 24,
						thirtyseconds : 8
					}
				}),
			],
			// the remaining tracks
			...midi.tracks.map(track => {
				const controlChanges = []
				for (let i = 0; i < 127; i++){
					if (track.controlChanges.hasOwnProperty(i)){
						controlChanges.push(track.controlChanges[i].map(e => {
							return {
								type : 'controller',
								controllerType : e.number,
								value : Math.floor(e.value * 127),
								channel : track.channel,
								ticks : e.ticks
							}
						}))
					}
				}
				return [
					//add the name
					{
						type : 'trackName',
						text : track.name,
						meta : true,
						ticks : 0
					},
					//the instrument
					{
						type : 'programChange',
						ticks : 0,
						channel : track.channel,
						programNumber : track.instrument.number
					},
					...flatten(track.notes.map(note => {
						//make a note on and note off event for each note
						return [
							{
								type : 'noteOn',
								channel : track.channel,
								noteNumber : note.midi,
								ticks : note.ticks,
								velocity : Math.floor(note.velocity * 127)
							},
							{
								type : 'noteOff',
								channel : track.channel,
								noteNumber : note.midi,
								ticks : note.ticks + note.durationTicks,
								velocity : Math.floor(note.noteOffVelocity * 127)
							}
						]
					})),
					//and the control changes
					...flatten(controlChanges)
				]
			})
		]
	}

	//sort and set deltaTime of all of the tracks
	midiData.tracks = midiData.tracks.map(track => {
		track = track.sort((a, b) => a.ticks - b.ticks)
		let lastTime = 0
		track.forEach(note => {
			note.deltaTime = note.ticks - lastTime
			lastTime = note.ticks
			delete note.ticks
		})
		//end of track
		track.push({
			deltaTime : 0,
			meta : true,
			type : 'endOfTrack'
		})
		return track
	})

	// return midiData
	return new Uint8Array(writeMidi(midiData))
}
