import { parseMidi } from 'midi-file'
import { Header } from './Header'
import { Track } from './Track'
import { encode } from './Encode'

/**
 * The main midi parsing class
 */
export class Midi {

	/**
	 * Download and parse the MIDI file. Returns a promise 
	 * which resolves to the generated midi file
	 * @param {string} url The url to fetch
	 * @returns {Promise<Midi>}
	 */
	static fromUrl(url){
		return fetch(url).then(response => {
			if (response.ok){
				return response.arrayBuffer()
			} else {
				throw new Error(`could not load ${url}`)
			}
		}).then(arrayBuffer => {
			return new Midi(arrayBuffer)
		})
	}

	/**
	 * Parse the midi data
	 * @param {(ArrayLike<number>|ArrayBuffer)} [midiArray] An array-like object
	 */
	constructor(midiArray){
		
		//parse the midi data if there is any
		let midiData = null
		if (midiArray){
			if (midiArray instanceof ArrayBuffer){
				midiArray = new Uint8Array(midiArray)
			}
			midiData = parseMidi(midiArray)
			
			//add the absolute times to each of the tracks
			midiData.tracks.forEach(track => {
				let currentTicks = 0
				track.forEach(event => {
					currentTicks += event.deltaTime
					event.absoluteTime = currentTicks
				})
			})
		}

		/** @type {Header} */
		this.header = new Header(midiData)
		
		/** @type {Array<Track>} */
		this.tracks = []

		//parse the midi data
		if (midiArray){
			if (midiData.header.format === 1){
				//format 1 all of the tracks comes after the first one which contains the relevant data
				this.tracks = midiData.tracks.slice(1).map(trackData => new Track(trackData, this.header))
			} else {
				//format 0, everything is on the same track
				this.tracks = midiData.tracks.map(trackData => new Track(trackData, this.header))
			}
		}
	}

	/**
	 * The name of the midi file, taken from the first track
	 * @type {string}
	 */
	get name(){
		return this.header.name
	}

	set name(n){
		this.header.name = n
	}

	/**
	 * The total length of the file
	 * @type {number}
	 */
	get duration(){
		//get the max of the last note of all the tracks
		const noteTracks = this.tracks.filter(t => t.notes.length)
		const lastNotes = noteTracks.map(t => t.notes[t.notes.length-1])
		const lastNoteEnd = lastNotes.map(n => n.time + n.duration)
		return Math.max(...lastNoteEnd)
	}

	/**
	 * Add a track to the midi file
	 * @returns {Track}
	 */
	addTrack(){
		const track = new Track(undefined, this.header)
		this.tracks.push(track)
		return track
	}

	/**
	 * Encode the midi as a Uint8Array.
	 * @returns {Uint8Array}
	 */
	toArray(){
		return encode(this)
	}

	/**
	 * Convert the midi object to JSON.
	 * @returns {Object}
	 */
	toJSON(){
		return {
			header : this.header.toJSON(),
			tracks : this.tracks.map(track => track.toJSON())
		}
	}
}
