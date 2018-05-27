import {BinaryInsert} from './BinaryInsert'
import {Control} from './Control'
import {Merge} from './Merge'
import {Note} from './Note'
import {instrumentByPatchID, instrumentFamilyByID, drumKitByPatchID} from './instrumentMaps'

class Track {
/**
	 * Convert JSON to Track object
	 * @param {object} json
	 * @static
	 * @returns {Track}
	 */
	static fromJSON(json){
		var track = new Track(json.name, json.instrumentNumber, json.channelNumber )

		track.id = json.id
		
		if (json.notes) {
			json.notes.forEach((note) => {
				var newNote = Note.fromJSON(note)
				track.notes.push(newNote)
			})
		}

		if (json.controlChanges) {
			track.controlChanges = json.controlChanges
		}

		return track
	}
	
	constructor(name, instrumentNumber=-1, channel=-1){

		/**
		 * The name of the track
		 * @type {String}
		 */
		this.name = name

		/**
		 * The MIDI channel of the track
		 * @type {number}
		 */
		this.channelNumber = channel

		/**
		 * The note events
		 * @type {Array}
		 */
		this.notes = []

		/**
		 * The control changes
		 * @type {Object}
		 */
		this.controlChanges = {}

		/**
		 * The MIDI patch ID of the instrument. -1 if none is set.
		 * @type {Number}
		 */
		this.instrumentNumber = instrumentNumber
	}

	note(midi, time, duration=0, velocity=1){
		const note = new Note(midi, time, duration, velocity)
		BinaryInsert(this.notes, note)
		return this
	}

	/**
	 * Add a note on event
	 * @param  {Number|String} midi     The midi note as either a midi number or
	 *                                  Pitch Notation like ('C#4')
	 * @param  {Number} time     The time in seconds
	 * @param  {Number} velocity The velocity value 0-1
	 * @return {Track} this
	 */
	noteOn(midi, time, velocity=1){
		const note = new Note(midi, time, 0, velocity)
		BinaryInsert(this.notes, note)
		return this
	}

	/**
	 * Add a note off event. Go through and find an unresolved
	 * noteOn event with the same pitch.
	 * @param  {String|Number} midi The midi number or note name.
	 * @param  {Number} time The time of the event in seconds
	 * @return {Track} this
	 */
	noteOff(midi, time){
		for (let i = 0; i < this.notes.length; i++){
			let note = this.notes[i]
			if (note.match(midi) && note.duration === 0){
				note.noteOff = time
				break;
			}
		}
		return this
	}

	/**
	 * Add a CC event
	 * @param  {Number} num The CC number
	 * @param  {Number} time The time of the event in seconds
	 * @param  {Number} value The value of the CC
	 * @return {Track} this
	 */
	cc(num, time, value){
		if (!this.controlChanges.hasOwnProperty(num)){
			this.controlChanges[num] = []
		}
		const cc = new Control(num, time, value)
		BinaryInsert(this.controlChanges[num], cc)
		return this
	}

	/**
	 * Sets instrumentNumber.
	 * For a list of possible values, see the [General MIDI Instrument Patch Map](https://www.midi.org/specifications/item/gm-level-1-sound-set)
	 * @param  {Number} id The Patch ID for this instrument, as specified in the General MIDI Instrument Patch Map
	 */
	patch(id){
		this.instrumentNumber = id
		return this
	}

	/**
	 * Sets channelNumber.
	 * @param  {Number} id The MIDI channel number, between 0 and 0xF.  0x9 and 0xA are percussion
	 */
	channel(id){
		this.channelNumber = id
		return this
	}

	/**
	 * An array of all the note on events
	 * @type {Array<Object>}
	 * @readOnly
	 */
	get noteOns(){
		const noteOns = []
		this.notes.forEach((note) => {
			noteOns.push({
				time : note.noteOn,
				midi : note.midi,
				name : note.name,
				velocity : note.velocity
			})
		})
		return noteOns
	}

	/**
	 * An array of all the noteOff events
	 * @type {Array<Object>}
	 * @readOnly
	 */
	get noteOffs(){
		const noteOffs = []
		this.notes.forEach((note) => {
			noteOffs.push({
				time : note.noteOff,
				midi : note.midi,
				name : note.name
			})
		})
		return noteOffs
	}

	/**
	 * The length in seconds of the track
	 * @type {Number}
	 */
	get length() {
		return this.notes.length
	}

	/**
	 * The time of the first event in seconds
	 * @type {Number}
	 */
	get startTime() {
		if (this.notes.length){
			let firstNote = this.notes[0]
			return firstNote.noteOn
		} else {
			return 0
		}
	}

	/**
	 * The time of the last event in seconds
	 * @type {Number}
	 */
	get duration() {
		if (this.notes.length){
			let lastNote = this.notes[this.notes.length - 1]
			return lastNote.noteOff
		} else {
			return 0
		}
	}

	/**
	 * The name of the midi instrument
	 * @type {String}
	 */
	get instrument() {
		if (this.isPercussion){
			return drumKitByPatchID[this.instrumentNumber]
		} else {
			return instrumentByPatchID[this.instrumentNumber]
		}
	}
	set instrument(inst) {
		const index = instrumentByPatchID.indexOf(inst)
		if (index !== -1){
			this.instrumentNumber = index
		}
	}


	/**
	 * Whether or not this is a percussion track
	 * @type {Boolean}
	 */
	get isPercussion() {
		return [0x9, 0xA].includes(this.channelNumber)
	}

	/**
	 * The family that the instrument belongs to
	 * @type {String}
	 * @readOnly
	 */
	get instrumentFamily() {
		if (this.isPercussion){
			return 'drums'
		} else {
			return instrumentFamilyByID[Math.floor(this.instrumentNumber / 8)]
		}
	}

	/**
	 * Scale the timing of all the events in the track
	 * @param {Number} amount The amount to scale all the values
	 */
	scale(amount){
		this.notes.forEach((note) => {
			note.time *= amount
			note.duration *= amount
		})
		return this
	}

	/**
	 * Slice returns a new track with only events that occured between startTime and endTime.
	 * Modifies this track.
	 * @param {Number} startTime
	 * @param {Number} endTime
	 * @returns {Track}
	 */
	slice(startTime=0, endTime=this.duration){
		// get the index before the startTime
		const noteStartIndex = Math.max(this.notes.findIndex((note) => note.time >= startTime), 0)
		const noteEndIndex = this.notes.findIndex((note) => note.noteOff >= endTime) + 1
		const track = new Track(this.name)
		track.notes = this.notes.slice(noteStartIndex, noteEndIndex)
		//shift the start time
		track.notes.forEach((note) => note.time = note.time - startTime)
		return track
	}

	/**
	 * Write the output to the stream
	 */
	encode(trackEncoder, header){

		const ticksPerSecond = header.PPQ / (60 / header.bpm)
		let lastEventTime = 0

		// unset, `channelNumber` defaults to -1, but that's not a valid MIDI channel
		const channelNumber = Math.max(0, this.channelNumber)

		function getDeltaTime(time){
			const ticks = Math.floor(ticksPerSecond * time)
			const delta = Math.max(ticks - lastEventTime, 0)
			lastEventTime = ticks
			return delta
		}

		if (this.instrumentNumber !== -1) {
			trackEncoder.instrument(channelNumber, this.instrumentNumber)
		}

		Merge(this.noteOns.sort((a, b) => a.time - b.time), (noteOn) => {
			trackEncoder.addNoteOn(channelNumber, noteOn.name, getDeltaTime(noteOn.time), Math.floor(noteOn.velocity * 127))
		}, this.noteOffs.sort((a, b) => a.time - b.time), (noteOff) => {
			trackEncoder.addNoteOff(channelNumber, noteOff.name, getDeltaTime(noteOff.time))
		})
	}

	/**
	 *  Convert all of the fields to JSON
	 *  @return  {Object}
	 */
	toJSON(){

		const ret = {
			startTime: this.startTime,
			duration: this.duration,
			length: this.length,
			notes: [],
			controlChanges: {},
		}

		if (typeof this.id !== 'undefined')
			ret.id = this.id

		ret.name = this.name

		if (this.instrumentNumber !== -1){
			ret.instrumentNumber = this.instrumentNumber
			ret.instrument = this.instrument
			ret.instrumentFamily = this.instrumentFamily
		}

		if (this.channelNumber !== -1){
			ret.channelNumber = this.channelNumber
			ret.isPercussion = this.isPercussion
		}

		if (this.notes.length)
			ret.notes = this.notes.map((n) => n.toJSON())

		if (Object.keys(this.controlChanges).length)
			ret.controlChanges = this.controlChanges

		return ret
	}
}

export {Track}
