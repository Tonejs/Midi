import { Note } from './Note'
import { ControlChange } from './ControlChange'
import { insert } from './BinarySearch'
import { Instrument } from './Instrument'
import { ControlChanges } from './ControlChanges'
// eslint-disable-next-line no-unused-vars
import { Header } from './Header'

const privateHeaderMap = new WeakMap()

/**
 * @typedef MidiEvent
 * @property {string} type
 * @property {number=} velocity
 * @property {number} absoluteTime
 * @property {number=} noteNumber
 * @property {string=} text
 * @property {number=} controllerType
 * @property {number} value
 */

/**
 * @typedef {Array<MidiEvent>} TrackData
 */

/**
 * A Track is a collection of notes and controlChanges
 */
export class Track {
	/**
	 * @param {TrackData} trackData
	 * @param {Header} header
	 */
	constructor(trackData, header){

		privateHeaderMap.set(this, header)

		/** @type {string} */
		this.name = ''

		if (trackData){
			const nameEvent = trackData.find(e => e.type === 'trackName')
			this.name = nameEvent ? nameEvent.text : ''
		}

		/** @type {Instrument} */
		this.instrument = new Instrument(trackData, this)
		
		/** @type {Array<Note>} */
		this.notes = []

		/** @type {number} */
		this.channel = 0

		/** @type {Object<string,Array<ControlChange>>} */
		this.controlChanges = ControlChanges()

		if (trackData){
			const noteOns = trackData.filter(event => event.type === 'noteOn')
			const noteOffs = trackData.filter(event => event.type === 'noteOff')
			while (noteOns.length){
				const currentNote = noteOns.shift()
				//find the corresponding note off
				const offIndex = noteOffs.findIndex(note => note.noteNumber === currentNote.noteNumber)
				if (offIndex !== -1){
					//once it's got the note off, add it
					const noteOff = noteOffs.splice(offIndex, 1)[0]
					this.addNote({
						midi : currentNote.noteNumber,
						ticks : currentNote.absoluteTime,
						velocity : currentNote.velocity / 127,
						durationTicks : noteOff.absoluteTime - currentNote.absoluteTime,
						noteOffVelocity : noteOff.velocity / 127
					})
				}
			}

			const controlChanges = trackData.filter(event => event.type === 'controller')
			controlChanges.forEach(event => {
				this.addCC({
					number : event.controllerType,
					value : event.value / 127,
					ticks : event.absoluteTime
				})
			})

		}
		
	}

	/**
	 * @typedef NoteParameters
	 * @property {number=} time
	 * @property {number=} ticks
	 * @property {number=} duration
	 * @property {number=} durationTicks
	 * @property {number=} midi
	 * @property {string=} pitch
	 * @property {number=} octave
	 * @property {string=} name
	 * @property {number=} noteOffVelocity
	 * @property {number} [velocity=1]
	 * @property {number} [channel=1]
	 */

	/**
	 * Add a note to the notes array
	 * @param {NoteParameters} props The note properties to add
	 * @returns {Track} this
	 */
	addNote(props={}){
		const header = privateHeaderMap.get(this)
		const note = new Note({ 
			midi : 0,
			ticks : 0, 
			velocity : 1,
		}, { 
			ticks : 0, 
			velocity : 0
		}, header)
		Object.assign(note, props)
		insert(this.notes, note, 'ticks')
		return this
	}

	/**
	 * @typedef CCParameters
	 * @property {number=} time
	 * @property {number=} ticks
	 * @property {number} value
	 * @property {number} number
	 */
	
	/**
	 * Add a control change to the track
	 * @param {CCParameters} props
	 * @returns {Track} this
	 */
	addCC(props){
		const header = privateHeaderMap.get(this)
		const cc = new ControlChange({
			controllerType : props.number
		}, header)
		delete props.number
		Object.assign(cc, props)
		if (!Array.isArray(this.controlChanges[cc.number])){
			this.controlChanges[cc.number] = []
		}
		insert(this.controlChanges[cc.number], cc, 'ticks')
		return this
	}

	/**
	 * The end time of the last event in the track
	 * @type {number}
	 * @readonly
	 */
	get duration(){
		const lastNote = this.notes[this.notes.length-1]
		if (lastNote){
			return lastNote.time + lastNote.duration
		} else {
			return 0
		}
	}

	/**
	 * The end time of the last event in the track in ticks
	 * @type {number}
	 * @readonly
	 */
	get durationTicks(){
		const lastNote = this.notes[this.notes.length - 1]
		if (lastNote){
			return lastNote.ticks + lastNote.durationTicks
		} else {
			return 0
		}
	}

	/**
	 * @param {Object} json 
	 */
	fromJSON(json){
		this.name = json.name
		this.channel = json.channel
		this.instrument = new Instrument(undefined, this)
		this.instrument.fromJSON(json.instrument)
		for (let number in json.controlChanges){
			json.controlChanges[number].forEach(cc => {
				this.addCC({
					number : cc.number,
					value : cc.value,
					ticks : cc.ticks
				})
			})
		}
		json.notes.forEach(n => {
			this.addNote({
				ticks : n.ticks,
				durationTicks : n.durationTicks,
				velocity : n.velocity,
				midi : n.midi
			})
		})
	}

	/**
	 * @returns {Object}
	 */
	toJSON(){

		//convert all the CCs to JSON
		const controlChanges = {}
		for (let i = 0; i < 127; i++){
			if (this.controlChanges.hasOwnProperty(i)){
				controlChanges[i] = this.controlChanges[i].map(c => c.toJSON())
			}
		}
		return {
			name : this.name,
			channel : this.channel,
			instrument : this.instrument.toJSON(),
			notes : this.notes.map(n => n.toJSON()),
			controlChanges, 
		}
	}
}
