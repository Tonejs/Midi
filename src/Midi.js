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
	 * The total length of the file in seconds
	 * @type {number}
	 */
	get duration(){
		//get the max of the last note of all the tracks
		const durations = this.tracks.map(t => t.duration)
		return Math.max(...durations)
	}

	/**
	 * The total length of the file in ticks
	 * @type {number}
	 */
	get durationTicks(){
		//get the max of the last note of all the tracks
		const durationTicks = this.tracks.map(t => t.durationTicks)
		return Math.max(...durationTicks)
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

	/**
	 * Parse a JSON representation of the object. Will overwrite the current
	 * tracks and header.
	 * @param {Object} json 
	 */
	fromJSON(json){
		this.header = new Header()
		this.header.fromJSON(json.header)
		this.tracks = json.tracks.map(trackJSON => {
			const track = new Track(undefined, this.header)
			track.fromJSON(trackJSON)
			return track
		})
	}

	/**
	 * Clone the entire object midi object
	 * @returns {Midi}
	 */
	clone(){
		const midi = new Midi()
		midi.fromJSON(this.toJSON())
		return midi
	}
}
