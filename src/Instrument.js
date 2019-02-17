import { instrumentByPatchID, instrumentFamilyByID, drumKitByPatchID } from './InstrumentMaps'
// eslint-disable-next-line no-unused-vars
import { Track } from './Track'

const privateTrackMap = new WeakMap()

/**
 * Describes the midi instrument of a track
 */
export class Instrument {
	/**
	 * @param {Array} [trackData] 
	 * @param {Track} track
	 */
	constructor(trackData, track){

		privateTrackMap.set(this, track)

		/**@type {number} */
		this.number = 0

		if (trackData){
			const programChange = trackData.find(e => e.type === 'programChange')
			if (programChange){
				this.number = programChange.programNumber
			}
		}
	}

	/** @type {string} */
	get name(){
		if (this.percussion){
			return drumKitByPatchID[this.number]
		} else {
			return instrumentByPatchID[this.number]
		}
	}

	set name(n){
		const patchNumber = instrumentByPatchID.indexOf(n)
		if (patchNumber !== -1){
			this.number = patchNumber
		}
	}

	/** @type {string} */
	get family(){
		if (this.percussion){
			return 'drums'
		} else {
			return instrumentFamilyByID[Math.floor(this.number / 8)]
		}
	}

	/** @type {boolean} */
	get percussion(){
		const track = privateTrackMap.get(this)
		return [9, 10].includes(track.channel)
	}

	/**
	 * @returns {Object}
	 */
	toJSON(){
		return {
			number : this.number,
			name : this.name,
			family : this.family
		}
	}

	/**
	 * @param {Object} json 
	 */
	fromJSON(json){
		this.number = json.number
	}
}
