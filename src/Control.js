const channelNames = {
	"1"  : "modulationWheel",
	"2"  : "breath",
	"4"  : "footController",
	"5"  : "portamentoTime",
	"7"  : "volume",
	"8"  : "balance",
	"10" : "pan",
	"64" : "sustain",
	"65" : "portamentoTime",
	"66" : "sostenuto",
	"67" : "softPedal",
	"68" : "legatoFootswitch",
	"84" : "portamentoContro"
}

class Control{
	constructor(number, time, value, channel = -1, instrument = -1){

		this.number = number

		this.time = time

		this.value = value

		this.channel = channel

		this.instrument = instrument
	}

	/**
	 * The common name of the control change event
	 * @type {String}
	 * @readOnly
	 */
	get name(){
		if (channelNames.hasOwnProperty(this.number)){
			return channelNames[this.number]
		}
	}

	/**
	 * Convert the control change to JSON
	 * @returns {Object}
	 */
	toJSON(){
		return {
			number : this.number,
			time : this.time,
			value : this.value
		}
	}
}

export {Control}
