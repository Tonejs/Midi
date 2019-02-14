import { search } from './BinarySearch'
import { Midi } from './Midi'

const privatePPQMap = new WeakMap()

/**
 * @typedef TempoEvent
 * @property {number} ticks
 * @property {number} bpm
 * @property {number} [time]
 */

/**
 * @typedef TimeSignatureEvent
 * @property {number} ticks
 * @property {number[]} timeSignature
 * @property {number} [measures]
 */

/** Represents the parsed midi file header */
export class Header {
	/**
	 * 
	 * @param {*} midiData 
	 */
	constructor(midiData){
		//look through all the tracks for tempo changes

		privatePPQMap.set(this, 480)

		/** @type {TempoEvent[]} */
		this.tempos = []

		/** @type {TimeSignatureEvent[]} */
		this.timeSignatures = []
		
		/** @type {string} */
		this.name = ''

		/** @type {Array} */
		this.meta = []
		
		if (midiData){
			privatePPQMap.set(this, midiData.header.ticksPerBeat)
			//check the first track for all the relevant data
			midiData.tracks[0].forEach(event => {
				if (event.meta){
					if (event.type === 'timeSignature'){
						this.timeSignatures.push({
							ticks : event.absoluteTime,
							timeSignature : [event.numerator, event.denominator]
						})
					} else if (event.type === 'setTempo'){
						this.tempos.push({
							ticks : event.absoluteTime,
							bpm : 60000000 / event.microsecondsPerBeat
						})
					} else if (event.type === 'trackName'){
						this.name = event.text
					} else if (event.type !== 'endOfTrack'){
						this.meta.push({
							type : event.type,
							text : event.text,
							ticks : event.absoluteTime
						})
					}
				}
			})
			this.update()
		}
	}

	/**
	 * This must be invoked after any changes are made to the tempo array
	 * or the timeSignature array for the updated values to be reflected.
	 */
	update(){
		let currentTime = 0
		let lastEventBeats = 0
		//make sure it's sorted
		this.tempos.sort((a, b) => a.ticks - b.ticks)
		this.tempos.forEach((event, index) => {
			const lastBPM = index > 0 ? this.tempos[index - 1].bpm : this.tempos[0].bpm
			const beats = (event.ticks / this.ppq) - lastEventBeats
			const elapsedSeconds = (60 / lastBPM) * beats
			event.time = elapsedSeconds + currentTime
			currentTime = event.time
			lastEventBeats += beats
		})
		this.timeSignatures.sort((a, b) => a.ticks - b.ticks)
		this.timeSignatures.forEach((event, index) => {
			const lastEvent = index > 0 ? this.timeSignatures[index - 1] : this.timeSignatures[0]
			const elapsedBeats = (event.ticks - lastEvent.ticks) / this.ppq
			const elapsedMeasures = (elapsedBeats / lastEvent.timeSignature[0]) / (lastEvent.timeSignature[1] / 4)
			lastEvent.measures = lastEvent.measures || 0
			event.measures = elapsedMeasures + lastEvent.measures
		})
	}

	/**
	 * @param {number} ticks
	 * @returns {number}
	 */
	ticksToSeconds(ticks){
		//find the relevant position
		const index = search(this.tempos, ticks)
		if (index !== -1){
			const tempo = this.tempos[index]
			const tempoTime = tempo.time
			const elapsedBeats = (ticks - tempo.ticks) / this.ppq
			return tempoTime + (60 / tempo.bpm) * elapsedBeats
		} else {
			//assume 120
			const beats = (ticks / this.ppq)
			return (60 / 120) * beats
		}
	}

	/**
	 * @param {number} ticks
	 * @returns {number}
	 */
	ticksToMeasures(ticks){
		const index = search(this.timeSignatures, ticks)
		if (index !== -1){
			const timeSigEvent = this.timeSignatures[index]
			const elapsedBeats = (ticks - timeSigEvent.ticks) / this.ppq
			return timeSigEvent.measures + elapsedBeats / (timeSigEvent.timeSignature[0] / timeSigEvent.timeSignature[1]) / 4
		} else {
			return (ticks / this.ppq) / 4
		}
	}

	/**
	 * The number of ticks per quarter note 
	 * @type {number} 
	 * @readonly
	 */
	get ppq(){
		return privatePPQMap.get(this)
	}

	/**
	 * @param {number} seconds 
	 * @returns {number}
	 */
	secondsToTicks(seconds){
		//find the relevant position
		const index = search(this.tempos, seconds, 'time')
		if (index !== -1){
			const tempo = this.tempos[index]
			const tempoTime = tempo.time
			const elapsedTime = (seconds - tempoTime)
			const elapsedBeats = elapsedTime / (60 / tempo.bpm)
			return Math.round(tempo.ticks + elapsedBeats * this.ppq)
		} else {
			//assume 120
			const beats = seconds / (60 / 120)
			return Math.round(beats * this.ppq)
		}
	}

	toJSON(){
		return {
			name : this.name,
			ppq : this.ppq,
			meta : this.meta,
			tempos : this.tempos.map(t => {
				return {
					ticks : t.ticks,
					bpm : t.bpm
				}
			}),
			timeSignatures : this.timeSignatures,
		}
	}
}
