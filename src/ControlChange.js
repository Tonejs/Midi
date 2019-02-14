import { Header } from './Header'

export const controlChangeNames = {
	1 : 'modulationWheel',
	2 : 'breath',
	4 : 'footController',
	5 : 'portamentoTime',
	7 : 'volume',
	8 : 'balance',
	10 : 'pan',
	64 : 'sustain',
	65 : 'portamentoTime',
	66 : 'sostenuto',
	67 : 'softPedal',
	68 : 'legatoFootswitch',
	84 : 'portamentoControl'
}

//swap the keys and values
export const controlChangeIds = Object.keys(controlChangeNames).reduce(function(obj, key){
	obj[controlChangeNames[key]] = key
	return obj
}, {})

const privateHeaderMap = new Map()
const privateCCNumberMap = new WeakMap()

/**
 * @typedef ControlChangeEvent
 * @property {number} controllerType
 * @property {number=} value
 * @property {number=} absoluteTime
 */

/**
  * Represents a control change event
  */
export class ControlChange {
	/**
	 * @param {ControlChangeEvent} event
	 * @param {Header} header
	 */
	constructor(event, header){
		privateHeaderMap.set(this, header)

		privateCCNumberMap.set(this, event.controllerType)

		/** @type {number} */
		this.ticks = event.absoluteTime

		/** @type {number} */
		this.value = event.value
	}
	
	/**
	 * The controller number
	 * @readonly
	 * @type {number}
	 */
	get number(){
		return privateCCNumberMap.get(this)
	}

	/** 
	 * return the common name of the control number if it exists
	 * @type {?string} 
	 * @readonly
	 * */
	get name(){
		if (controlChangeNames[this.number]){
			return controlChangeNames[this.number]
		} else {
			return null
		}
	}

	/**
	 * The time of the event in seconds
	 * @type {number}
	 */
	get time(){
		const header = privateHeaderMap.get(this)
		return header.ticksToSeconds(this.ticks)
	}

	set time(t){
		const header = privateHeaderMap.get(this)
		this.ticks = header.secondsToTicks(t)
	}

	toJSON(){
		return {
			number : this.number,
			value : this.value,
			time : this.time,
			ticks : this.ticks
		}
	}
}
