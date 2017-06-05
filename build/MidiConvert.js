(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MidiConvert"] = factory();
	else
		root["MidiConvert"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return instrumentByPatchID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return instrumentFamilyByID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return drumKitByPatchID; });
var instrumentByPatchID = ["acoustic grand piano", "bright acoustic piano", "electric grand piano", "honky-tonk piano", "electric piano 1", "electric piano 2", "harpsichord", "clavi", "celesta", "glockenspiel", "music box", "vibraphone", "marimba", "xylophone", "tubular bells", "dulcimer", "drawbar organ", "percussive organ", "rock organ", "church organ", "reed organ", "accordion", "harmonica", "tango accordion", "acoustic guitar (nylon)", "acoustic guitar (steel)", "electric guitar (jazz)", "electric guitar (clean)", "electric guitar (muted)", "overdriven guitar", "distortion guitar", "guitar harmonics", "acoustic bass", "electric bass (finger)", "electric bass (pick)", "fretless bass", "slap bass 1", "slap bass 2", "synth bass 1", "synth bass 2", "violin", "viola", "cello", "contrabass", "tremolo strings", "pizzicato strings", "orchestral harp", "timpani", "string ensemble 1", "string ensemble 2", "synthstrings 1", "synthstrings 2", "choir aahs", "voice oohs", "synth voice", "orchestra hit", "trumpet", "trombone", "tuba", "muted trumpet", "french horn", "brass section", "synthbrass 1", "synthbrass 2", "soprano sax", "alto sax", "tenor sax", "baritone sax", "oboe", "english horn", "bassoon", "clarinet", "piccolo", "flute", "recorder", "pan flute", "blown bottle", "shakuhachi", "whistle", "ocarina", "lead 1 (square)", "lead 2 (sawtooth)", "lead 3 (calliope)", "lead 4 (chiff)", "lead 5 (charang)", "lead 6 (voice)", "lead 7 (fifths)", "lead 8 (bass + lead)", "pad 1 (new age)", "pad 2 (warm)", "pad 3 (polysynth)", "pad 4 (choir)", "pad 5 (bowed)", "pad 6 (metallic)", "pad 7 (halo)", "pad 8 (sweep)", "fx 1 (rain)", "fx 2 (soundtrack)", "fx 3 (crystal)", "fx 4 (atmosphere)", "fx 5 (brightness)", "fx 6 (goblins)", "fx 7 (echoes)", "fx 8 (sci-fi)", "sitar", "banjo", "shamisen", "koto", "kalimba", "bag pipe", "fiddle", "shanai", "tinkle bell", "agogo", "steel drums", "woodblock", "taiko drum", "melodic tom", "synth drum", "reverse cymbal", "guitar fret noise", "breath noise", "seashore", "bird tweet", "telephone ring", "helicopter", "applause", "gunshot"];

var instrumentFamilyByID = ["piano", "chromatic percussion", "organ", "guitar", "bass", "strings", "ensemble", "brass", "reed", "pipe", "synth lead", "synth pad", "synth effects", "ethnic", "percussive", "sound effects"];

var drumKitByPatchID = {
	0: "standard kit",
	8: "room kit",
	16: "power kit",
	24: "electronic kit",
	25: "tr-808 kit",
	32: "jazz kit",
	40: "brush kit",
	48: "orchestra kit",
	56: "sound fx kit"
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = cleanName;
/* harmony export (immutable) */ __webpack_exports__["a"] = ticksToSeconds;
/* harmony export (immutable) */ __webpack_exports__["c"] = isNumber;
/* unused harmony export isString */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isPitch; });
/* harmony export (immutable) */ __webpack_exports__["e"] = midiToPitch;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return pitchToMidi; });
function cleanName(str) {
	//ableton adds some weird stuff to the track
	return str.replace(/\u0000/g, '');
}

function ticksToSeconds(ticks, header) {
	return 60 / header.bpm * (ticks / header.PPQ);
}

function isNumber(val) {
	return typeof val === 'number';
}

function isString(val) {
	return typeof val === 'string';
}

var isPitch = function () {
	var regexp = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i;
	return function (val) {
		return isString(val) && regexp.test(val);
	};
}();

function midiToPitch(midi) {
	var scaleIndexToNote = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
	var octave = Math.floor(midi / 12) - 1;
	var note = midi % 12;
	return scaleIndexToNote[note] + octave;
}

var pitchToMidi = function () {
	var regexp = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i;
	var noteToScaleIndex = {
		"cbb": -2, "cb": -1, "c": 0, "c#": 1, "cx": 2,
		"dbb": 0, "db": 1, "d": 2, "d#": 3, "dx": 4,
		"ebb": 2, "eb": 3, "e": 4, "e#": 5, "ex": 6,
		"fbb": 3, "fb": 4, "f": 5, "f#": 6, "fx": 7,
		"gbb": 5, "gb": 6, "g": 7, "g#": 8, "gx": 9,
		"abb": 7, "ab": 8, "a": 9, "a#": 10, "ax": 11,
		"bbb": 9, "bb": 10, "b": 11, "b#": 12, "bx": 13
	};
	return function (note) {
		var split = regexp.exec(note);
		var pitch = split[1];
		var octave = split[2];
		var index = noteToScaleIndex[pitch.toLowerCase()];
		return index + (parseInt(octave) + 1) * 12;
	};
}();

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Midi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_midi_file_parser__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_midi_file_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_midi_file_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jsmidgen__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jsmidgen___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jsmidgen__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Track__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Header__ = __webpack_require__(5);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







/**
 * @class The Midi object. Contains tracks and the header info.
 */

var Midi = function () {
	_createClass(Midi, null, [{
		key: 'fromJSON',

		/**
   * Convert JSON to Midi object
   * @param {object} json
   * @static
   * @returns {Midi}
   */
		value: function fromJSON(json) {
			var midi = new Midi();

			midi.header = json.header;
			json.tracks.forEach(function (track) {
				var newTrack = __WEBPACK_IMPORTED_MODULE_3__Track__["a" /* Track */].fromJSON(track);
				midi.tracks.push(newTrack);
			});

			return midi;
		}
	}]);

	function Midi() {
		_classCallCheck(this, Midi);

		this.header = {
			//defaults
			bpm: 120,
			timeSignature: [4, 4],
			PPQ: 480
		};

		this.tracks = [];
	}

	/**
  * Load the given url and parse the midi at that url
  * @param  {String}   url
  * @param {*} data Anything that should be sent in the XHR
  * @param {String} method Either GET or POST
  * @return {Promise}
  */


	_createClass(Midi, [{
		key: 'load',
		value: function load(url) {
			var _this = this;

			var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
			var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';

			return new Promise(function (success, fail) {
				var request = new XMLHttpRequest();
				request.open(method, url);
				request.responseType = 'arraybuffer';
				// decode asynchronously
				request.addEventListener('load', function () {
					if (request.readyState === 4 && request.status === 200) {
						success(_this.decode(request.response));
					} else {
						fail(request.status);
					}
				});
				request.addEventListener('error', fail);
				request.send(data);
			});
		}

		/**
   * Decode the bytes
   * @param  {String|ArrayBuffer} bytes The midi file encoded as a string or ArrayBuffer
   * @return {Midi}       this
   */

	}, {
		key: 'decode',
		value: function decode(bytes) {
			var _this2 = this;

			if (bytes instanceof ArrayBuffer) {
				var byteArray = new Uint8Array(bytes);
				bytes = String.fromCharCode.apply(null, byteArray);
			}

			var midiData = __WEBPACK_IMPORTED_MODULE_0_midi_file_parser__(bytes);

			this.header = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Header__["a" /* parseHeader */])(midiData);

			//replace the previous tracks
			this.tracks = [];

			midiData.tracks.forEach(function (trackData, i) {

				var track = new __WEBPACK_IMPORTED_MODULE_3__Track__["a" /* Track */]();
				track.id = i;
				_this2.tracks.push(track);

				var absoluteTime = 0;
				trackData.forEach(function (event) {
					absoluteTime += __WEBPACK_IMPORTED_MODULE_2__Util__["a" /* ticksToSeconds */](event.deltaTime, _this2.header);
					if (event.type === 'meta' && event.subtype === 'trackName') {
						track.name = __WEBPACK_IMPORTED_MODULE_2__Util__["b" /* cleanName */](event.text);
					} else if (event.subtype === 'noteOn') {
						track.noteOn(event.noteNumber, absoluteTime, event.velocity / 127);

						if (track.channelNumber === -1) {
							track.channelNumber = event.channel;
						}
					} else if (event.subtype === 'noteOff') {
						track.noteOff(event.noteNumber, absoluteTime);
					} else if (event.subtype === 'controller' && event.controllerType) {
						track.cc(event.controllerType, absoluteTime, event.value / 127);
					} else if (event.type === 'meta' && event.subtype === 'instrumentName') {
						track.instrument = event.text;
					} else if (event.type === 'channel' && event.subtype === 'programChange') {
						track.patch(event.programNumber);
						track.channelNumber = event.channel;
					}
				});

				//if the track is empty, then it is the file name
				if (!_this2.header.name && !track.length && track.name) {
					_this2.header.name = track.name;
				}
			});

			return this;
		}

		/**
   * Encode the Midi object as a Buffer String
   * @returns {String}
   */

	}, {
		key: 'encode',
		value: function encode() {
			var _this3 = this;

			var output = new __WEBPACK_IMPORTED_MODULE_1_jsmidgen__["File"]({
				ticks: this.header.PPQ
			});

			var firstEmptyTrack = this.tracks.filter(function (track) {
				return !track.length;
			})[0];

			if (this.header.name && !(firstEmptyTrack && firstEmptyTrack.name === this.header.name)) {
				var track = output.addTrack();
				track.addEvent(new __WEBPACK_IMPORTED_MODULE_1_jsmidgen__["MetaEvent"]({
					time: 0,
					type: __WEBPACK_IMPORTED_MODULE_1_jsmidgen__["MetaEvent"].TRACK_NAME,
					data: this.header.name
				}));
			}

			this.tracks.forEach(function (track) {
				var trackEncoder = output.addTrack();
				trackEncoder.setTempo(_this3.bpm);
				track.encode(trackEncoder, _this3.header);
			});
			return output.toBytes();
		}

		/**
   * Convert the output encoding into an Array
   * @return {Array}
   */

	}, {
		key: 'toArray',
		value: function toArray() {
			var encodedStr = this.encode();
			var buffer = new Array(encodedStr.length);
			for (var i = 0; i < encodedStr.length; i++) {
				buffer[i] = encodedStr.charCodeAt(i);
			}
			return buffer;
		}

		/**
   *  Convert all of the fields to JSON
   *  @return  {Object}
   */

	}, {
		key: 'toJSON',
		value: function toJSON() {
			return {
				header: this.header,
				startTime: this.startTime,
				duration: this.duration,
				tracks: (this.tracks || []).map(function (track) {
					return track.toJSON();
				})
			};
		}

		/**
   * Add a new track.
   * @param {String=} name Optionally include the name of the track
   * @returns {Track}
   */

	}, {
		key: 'track',
		value: function track(name) {
			var track = new __WEBPACK_IMPORTED_MODULE_3__Track__["a" /* Track */](name);
			this.tracks.push(track);
			return track;
		}

		/**
   * Get a track either by it's name or track index
   * @param  {Number|String} trackName
   * @return {Track}
   */

	}, {
		key: 'get',
		value: function get(trackName) {
			if (__WEBPACK_IMPORTED_MODULE_2__Util__["c" /* isNumber */](trackName)) {
				return this.tracks[trackName];
			} else {
				return this.tracks.find(function (t) {
					return t.name === trackName;
				});
			}
		}

		/**
   * Slice the midi file between the startTime and endTime. Returns a copy of the
   * midi
   * @param {Number} startTime
   * @param {Number} endTime
   * @returns {Midi} this
   */

	}, {
		key: 'slice',
		value: function slice() {
			var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
			var endTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.duration;

			var midi = new Midi();
			midi.header = this.header;
			midi.tracks = this.tracks.map(function (t) {
				return t.slice(startTime, endTime);
			});
			return midi;
		}

		/**
   * the time of the first event
   * @type {Number}
   */

	}, {
		key: 'startTime',
		get: function get() {
			var startTimes = this.tracks.map(function (t) {
				return t.startTime;
			});
			return Math.min.apply(Math, startTimes);
		}

		/**
   * The bpm of the midi file in beats per minute
   * @type {Number}
   */

	}, {
		key: 'bpm',
		get: function get() {
			return this.header.bpm;
		},
		set: function set(bpm) {
			var prevTempo = this.header.bpm;
			this.header.bpm = bpm;
			//adjust the timing of all the notes
			var ratio = prevTempo / bpm;
			this.tracks.forEach(function (track) {
				return track.scale(ratio);
			});
		}

		/**
   * The timeSignature of the midi file
   * @type {Array}
   */

	}, {
		key: 'timeSignature',
		get: function get() {
			return this.header.timeSignature;
		},
		set: function set(timeSig) {
			this.header.timeSignature = timeSig;
		}

		/**
   * The duration is the end time of the longest track
   * @type {Number}
   */

	}, {
		key: 'duration',
		get: function get() {
			var durations = this.tracks.map(function (t) {
				return t.duration;
			});
			return Math.max.apply(Math, durations);
		}
	}]);

	return Midi;
}();



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BinaryInsert; });
/**
 * Return the index of the element at or before the given time
 */
function findElement(array, time) {
	var beginning = 0;
	var len = array.length;
	var end = len;
	if (len > 0 && array[len - 1].time <= time) {
		return len - 1;
	}
	while (beginning < end) {
		// calculate the midpoint for roughly equal partition
		var midPoint = Math.floor(beginning + (end - beginning) / 2);
		var event = array[midPoint];
		var nextEvent = array[midPoint + 1];
		if (event.time === time) {
			//choose the last one that has the same time
			for (var i = midPoint; i < array.length; i++) {
				var testEvent = array[i];
				if (testEvent.time === time) {
					midPoint = i;
				}
			}
			return midPoint;
		} else if (event.time < time && nextEvent.time > time) {
			return midPoint;
		} else if (event.time > time) {
			//search lower
			end = midPoint;
		} else if (event.time < time) {
			//search upper
			beginning = midPoint + 1;
		}
	}
	return -1;
}

/**
 * Does a binary search to insert the note
 * in the correct spot in the array
 * @param  {Array} array
 * @param  {Object} event
 * @param  {Number=} offset
 */
function BinaryInsert(array, event) {
	if (array.length) {
		var index = findElement(array, event.time);
		array.splice(index + 1, 0, event);
	} else {
		array.push(event);
	}
}



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Control; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var channelNames = {
	"1": "modulationWheel",
	"2": "breath",
	"4": "footController",
	"5": "portamentoTime",
	"7": "volume",
	"8": "balance",
	"10": "pan",
	"64": "sustain",
	"65": "portamentoTime",
	"66": "sostenuto",
	"67": "softPedal",
	"68": "legatoFootswitch",
	"84": "portamentoContro"
};

var Control = function () {
	function Control(number, time, value) {
		_classCallCheck(this, Control);

		this.number = number;

		this.time = time;

		this.value = value;
	}

	/**
  * The common name of the control change event
  * @type {String}
  * @readOnly
  */


	_createClass(Control, [{
		key: "name",
		get: function get() {
			if (channelNames.hasOwnProperty(this.number)) {
				return channelNames[this.number];
			}
		}
	}]);

	return Control;
}();



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parseHeader; });
/**
 *  Parse tempo and time signature from the midiJson
 *  @param  {Object}  midiJson
 *  @return  {Object}
 */
function parseHeader(midiJson) {
	var ret = {
		PPQ: midiJson.header.ticksPerBeat
	};
	for (var i = 0; i < midiJson.tracks.length; i++) {
		var track = midiJson.tracks[i];
		for (var j = 0; j < track.length; j++) {
			var datum = track[j];
			if (datum.type === "meta") {
				if (datum.subtype === "timeSignature") {
					ret.timeSignature = [datum.numerator, datum.denominator];
				} else if (datum.subtype === "setTempo") {
					if (!ret.bpm) {
						ret.bpm = 60000000 / datum.microsecondsPerBeat;
					}
				}
			}
		}
	}
	ret.bpm = ret.bpm || 120;
	return ret;
}



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Merge; });

function hasMoreValues(arrays, positions) {
	for (var i = 0; i < arrays.length; i++) {
		var arr = arrays[i];
		var pos = positions[i];
		if (arr.length > pos) {
			return true;
		}
	}
	return false;
}

function getLowestAtPosition(arrays, positions, encoders) {
	var lowestIndex = 0;
	var lowestValue = Infinity;
	for (var i = 0; i < arrays.length; i++) {
		var arr = arrays[i];
		var pos = positions[i];
		if (arr[pos] && arr[pos].time < lowestValue) {
			lowestIndex = i;
			lowestValue = arr[pos].time;
		}
	}
	encoders[lowestIndex](arrays[lowestIndex][positions[lowestIndex]]);
	// increment array
	positions[lowestIndex] += 1;
}

/**
 * Combine multiple arrays keeping the timing in order
 * The arguments should alternate between the array and the encoder callback
 * @param {...Array|Function} args
 */
function Merge() {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	var arrays = args.filter(function (v, i) {
		return i % 2 === 0;
	});
	var positions = new Uint32Array(arrays.length);
	var encoders = args.filter(function (v, i) {
		return i % 2 === 1;
	});
	var output = [];
	while (hasMoreValues(arrays, positions)) {
		getLowestAtPosition(arrays, positions, encoders);
	}
}



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["parse"] = parse;
/* harmony export (immutable) */ __webpack_exports__["load"] = load;
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["fromJSON"] = fromJSON;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Midi__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__instrumentMaps__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "instrumentByPatchID", function() { return __WEBPACK_IMPORTED_MODULE_1__instrumentMaps__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "instrumentFamilyByID", function() { return __WEBPACK_IMPORTED_MODULE_1__instrumentMaps__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "drumKitByPatchID", function() { return __WEBPACK_IMPORTED_MODULE_1__instrumentMaps__["c"]; });



/**
 *  Parse all the data from the Midi file into this format:
 *  {
 *  	// the transport and timing data
 *  	header : {
 *  		bpm : Number,                     // tempo, e.g. 120
 *  		timeSignature : [Number, Number], // time signature, e.g. [4, 4],
 *  		PPQ : Number                  // PPQ of the midi file
 *  	}
 *  	// an array for each of the midi tracks
 *  	tracks : [
 *  		{
 *  			name : String, // the track name if one was given
 *  			notes : [
 *  				{
 *  					time : Number, // time in seconds
 *  					name : String, // note name, e.g. 'C4'
 *  					midi : Number, // midi number, e.g. 60
 *  					velocity : Number,  // normalized velocity
 *  					duration : Number   // duration between noteOn and noteOff
 *  				}
 *  			],
 *  			controlChanges : { //all of the control changes
 *  				64 : [ //array for each cc value
 *  					{
 *  						number : Number, //the cc number
 *  						time : Number, //the time of the event in seconds
 *  						name : String, // if the cc value has a common name (e.g. 'sustain')
 *  						value : Number, //the normalized value
 *  					}
 *  				]
 *  			}
 *  		}
 *  	]
 *  }
 *  @param  {Binary String}  fileBlob  The output from fs.readFile or FileReader
 *  @returns {Object} All of the options parsed from the midi file.
 */
function parse(fileBlob) {
  return new __WEBPACK_IMPORTED_MODULE_0__Midi__["a" /* Midi */]().decode(fileBlob);
}

/**
 *  Load and parse a midi file. See `parse` for what the results look like.
 *  @param  {String}    url
 *  @param {Function=} callback
 *  @returns {Promise} A promise which is invoked with the returned Midi object
 */
function load(url, callback) {
  var promise = new __WEBPACK_IMPORTED_MODULE_0__Midi__["a" /* Midi */]().load(url);
  if (callback) {
    promise.then(callback);
  }
  return promise;
}

/**
 * Create an empty midi file
 * @return {Midi}
 */
function create() {
  return new __WEBPACK_IMPORTED_MODULE_0__Midi__["a" /* Midi */]();
}

/**
 * Create midi object from json
 * @param {object} json
 * @returns {Midi} Deserialized midi object
 */
function fromJSON(json) {
  return __WEBPACK_IMPORTED_MODULE_0__Midi__["a" /* Midi */].fromJSON(json);
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Note; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Util__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Note = function () {
	_createClass(Note, null, [{
		key: 'fromJSON',

		/**
   * Convert JSON to Note object
   * @param {object} json
   * @static
   * @returns {Note}
   */
		value: function fromJSON(json) {
			var note = new Note(json.midi, json.time, json.duration, json.velocity);
			return note;
		}
	}]);

	function Note(midi, time) {
		var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
		var velocity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

		_classCallCheck(this, Note);

		/**
   * The MIDI note number
   * @type {Number}
   */
		if (__WEBPACK_IMPORTED_MODULE_0__Util__["c" /* isNumber */](midi)) {
			this.midi = midi;
		} else if (__WEBPACK_IMPORTED_MODULE_0__Util__["d" /* isPitch */](midi)) {
			this.name = midi;
		} else {
			throw new Error('the midi value must either be in Pitch Notation (e.g. C#4) or a midi value');
		}

		/**
   * The note on time in seconds
   * @type {Number}
   */
		this.time = time;

		/**
   * The duration in seconds
   * @type {Number}
   */
		this.duration = duration;

		/**
   * The velocity 0-1
   * @type {Number}
   */
		this.velocity = velocity;
	}

	/**
  * If the note is the same as the given note
  * @param {String|Number} note
  * @return {Boolean}
  */


	_createClass(Note, [{
		key: 'match',
		value: function match(note) {
			if (__WEBPACK_IMPORTED_MODULE_0__Util__["c" /* isNumber */](note)) {
				return this.midi === note;
			} else if (__WEBPACK_IMPORTED_MODULE_0__Util__["d" /* isPitch */](note)) {
				return this.name.toLowerCase() === note.toLowerCase();
			}
		}

		/**
   * The note in Scientific Pitch Notation
   * @type {String}
   */

	}, {
		key: 'toJSON',


		/**
   * Convert the note to JSON
   * @returns {Object}
   */
		value: function toJSON() {
			return {
				name: this.name,
				midi: this.midi,
				time: this.time,
				velocity: this.velocity,
				duration: this.duration
			};
		}
	}, {
		key: 'name',
		get: function get() {
			return __WEBPACK_IMPORTED_MODULE_0__Util__["e" /* midiToPitch */](this.midi);
		},
		set: function set(name) {
			this.midi = __WEBPACK_IMPORTED_MODULE_0__Util__["f" /* pitchToMidi */](name);
		}

		/**
   * Alias for time
   * @type {Number}
   */

	}, {
		key: 'noteOn',
		get: function get() {
			return this.time;
		},
		set: function set(t) {
			this.time = t;
		}

		/**
   * The note off time
   * @type {Number}
   */

	}, {
		key: 'noteOff',
		get: function get() {
			return this.time + this.duration;
		},
		set: function set(time) {
			this.duration = time - this.time;
		}
	}]);

	return Note;
}();



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Track; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BinaryInsert__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Control__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Merge__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Note__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__instrumentMaps__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







var Track = function () {
	_createClass(Track, null, [{
		key: 'fromJSON',

		/**
   * Convert JSON to Track object
   * @param {object} json
   * @static
   * @returns {Track}
   */
		value: function fromJSON(json) {
			var track = new Track(json.name, json.instrumentNumber, json.channelNumber);

			track.id = json.id;

			if (json.notes) {
				json.notes.forEach(function (note) {
					var newNote = __WEBPACK_IMPORTED_MODULE_3__Note__["a" /* Note */].fromJSON(note);
					track.notes.push(newNote);
				});
			}

			if (json.controlChanges) {
				track.controlChanges = json.controlChanges;
			}

			return track;
		}
	}]);

	function Track(name) {
		var instrumentNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
		var channel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

		_classCallCheck(this, Track);

		/**
   * The name of the track
   * @type {String}
   */
		this.name = name;

		/**
   * The MIDI channel of the track
   * @type {number}
   */
		this.channelNumber = channel;

		/**
   * The note events
   * @type {Array}
   */
		this.notes = [];

		/**
   * The control changes
   * @type {Object}
   */
		this.controlChanges = {};

		/**
   * The MIDI patch ID of the instrument. -1 if none is set.
   * @type {Number}
   */
		this.instrumentNumber = instrumentNumber;
	}

	_createClass(Track, [{
		key: 'note',
		value: function note(midi, time) {
			var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
			var velocity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

			var note = new __WEBPACK_IMPORTED_MODULE_3__Note__["a" /* Note */](midi, time, duration, velocity);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__BinaryInsert__["a" /* BinaryInsert */])(this.notes, note);
			return this;
		}

		/**
   * Add a note on event
   * @param  {Number|String} midi     The midi note as either a midi number or
   *                                  Pitch Notation like ('C#4')
   * @param  {Number} time     The time in seconds
   * @param  {Number} velocity The velocity value 0-1
   * @return {Track} this
   */

	}, {
		key: 'noteOn',
		value: function noteOn(midi, time) {
			var velocity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

			var note = new __WEBPACK_IMPORTED_MODULE_3__Note__["a" /* Note */](midi, time, 0, velocity);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__BinaryInsert__["a" /* BinaryInsert */])(this.notes, note);
			return this;
		}

		/**
   * Add a note off event. Go through and find an unresolved
   * noteOn event with the same pitch.
   * @param  {String|Number} midi The midi number or note name.
   * @param  {Number} time The time of the event in seconds
   * @return {Track} this
   */

	}, {
		key: 'noteOff',
		value: function noteOff(midi, time) {
			for (var i = 0; i < this.notes.length; i++) {
				var note = this.notes[i];
				if (note.match(midi) && note.duration === 0) {
					note.noteOff = time;
					break;
				}
			}
			return this;
		}

		/**
   * Add a CC event
   * @param  {Number} num The CC number
   * @param  {Number} time The time of the event in seconds
   * @param  {Number} value The value of the CC
   * @return {Track} this
   */

	}, {
		key: 'cc',
		value: function cc(num, time, value) {
			if (!this.controlChanges.hasOwnProperty(num)) {
				this.controlChanges[num] = [];
			}
			var cc = new __WEBPACK_IMPORTED_MODULE_1__Control__["a" /* Control */](num, time, value);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__BinaryInsert__["a" /* BinaryInsert */])(this.controlChanges[num], cc);
			return this;
		}

		/**
   * Sets instrumentNumber.
   * For a list of possible values, see the [General MIDI Instrument Patch Map](https://www.midi.org/specifications/item/gm-level-1-sound-set)
   * @param  {Number} id The Patch ID for this instrument, as specified in the General MIDI Instrument Patch Map
   */

	}, {
		key: 'patch',
		value: function patch(id) {
			this.instrumentNumber = id;
			return this;
		}

		/**
   * Sets channelNumber.
   * @param  {Number} id The MIDI channel number, between 0 and 0xF.  0x9 and 0xA are percussion
   */

	}, {
		key: 'channel',
		value: function channel(id) {
			this.channelNumber = id;
			return this;
		}

		/**
   * An array of all the note on events
   * @type {Array<Object>}
   * @readOnly
   */

	}, {
		key: 'scale',


		/**
   * Scale the timing of all the events in the track
   * @param {Number} amount The amount to scale all the values
   */
		value: function scale(amount) {
			this.notes.forEach(function (note) {
				note.time *= amount;
				note.duration *= amount;
			});
			return this;
		}

		/**
   * Slice returns a new track with only events that occured between startTime and endTime.
   * Modifies this track.
   * @param {Number} startTime
   * @param {Number} endTime
   * @returns {Track}
   */

	}, {
		key: 'slice',
		value: function slice() {
			var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
			var endTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.duration;

			// get the index before the startTime
			var noteStartIndex = Math.max(this.notes.findIndex(function (note) {
				return note.time >= startTime;
			}), 0);
			var noteEndIndex = this.notes.findIndex(function (note) {
				return note.noteOff >= endTime;
			}) + 1;
			var track = new Track(this.name);
			track.notes = this.notes.slice(noteStartIndex, noteEndIndex);
			//shift the start time
			track.notes.forEach(function (note) {
				return note.time = note.time - startTime;
			});
			return track;
		}

		/**
   * Write the output to the stream
   */

	}, {
		key: 'encode',
		value: function encode(trackEncoder, header) {

			var ticksPerSecond = header.PPQ / (60 / header.bpm);
			var lastEventTime = 0;

			// unset, `channelNumber` defaults to -1, but that's not a valid MIDI channel
			var channelNumber = Math.max(0, this.channelNumber);

			function getDeltaTime(time) {
				var ticks = Math.floor(ticksPerSecond * time);
				var delta = Math.max(ticks - lastEventTime, 0);
				lastEventTime = ticks;
				return delta;
			}

			if (this.instrumentNumber !== -1) {
				trackEncoder.instrument(channelNumber, this.instrumentNumber);
			}

			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Merge__["a" /* Merge */])(this.noteOns, function (noteOn) {
				trackEncoder.addNoteOn(channelNumber, noteOn.name, getDeltaTime(noteOn.time), Math.floor(noteOn.velocity * 127));
			}, this.noteOffs, function (noteOff) {
				trackEncoder.addNoteOff(channelNumber, noteOff.name, getDeltaTime(noteOff.time));
			});
		}

		/**
   *  Convert all of the fields to JSON
   *  @return  {Object}
   */

	}, {
		key: 'toJSON',
		value: function toJSON() {

			var ret = {
				startTime: this.startTime,
				duration: this.duration,
				length: this.length
			};

			if (typeof this.id !== 'undefined') ret.id = this.id;

			if (this.name) ret.name = this.name;

			if (this.instrumentNumber !== -1) {
				ret.instrumentNumber = this.instrumentNumber;
				ret.instrument = this.instrument;
				ret.instrumentFamily = this.instrumentFamily;
			}

			if (this.channelNumber !== -1) {
				ret.channelNumber = this.channelNumber;
				ret.isPercussion = this.isPercussion;
			}

			if (this.notes.length) ret.notes = this.notes.map(function (n) {
				return n.toJSON();
			});

			if (Object.keys(this.controlChanges).length) ret.controlChanges = this.controlChanges;

			return ret;
		}
	}, {
		key: 'noteOns',
		get: function get() {
			var noteOns = [];
			this.notes.forEach(function (note) {
				noteOns.push({
					time: note.noteOn,
					midi: note.midi,
					name: note.name,
					velocity: note.velocity
				});
			});
			return noteOns;
		}

		/**
   * An array of all the noteOff events
   * @type {Array<Object>}
   * @readOnly
   */

	}, {
		key: 'noteOffs',
		get: function get() {
			var noteOffs = [];
			this.notes.forEach(function (note) {
				noteOffs.push({
					time: note.noteOff,
					midi: note.midi,
					name: note.name
				});
			});
			return noteOffs;
		}

		/**
   * The length in seconds of the track
   * @type {Number}
   */

	}, {
		key: 'length',
		get: function get() {
			return this.notes.length;
		}

		/**
   * The time of the first event in seconds
   * @type {Number}
   */

	}, {
		key: 'startTime',
		get: function get() {
			if (this.notes.length) {
				var firstNote = this.notes[0];
				return firstNote.noteOn;
			} else {
				return 0;
			}
		}

		/**
   * The time of the last event in seconds
   * @type {Number}
   */

	}, {
		key: 'duration',
		get: function get() {
			if (this.notes.length) {
				var lastNote = this.notes[this.notes.length - 1];
				return lastNote.noteOff;
			} else {
				return 0;
			}
		}

		/**
   * The name of the midi instrument
   * @type {String}
   */

	}, {
		key: 'instrument',
		get: function get() {
			if (this.isPercussion) {
				return __WEBPACK_IMPORTED_MODULE_4__instrumentMaps__["c" /* drumKitByPatchID */][this.instrumentNumber];
			} else {
				return __WEBPACK_IMPORTED_MODULE_4__instrumentMaps__["a" /* instrumentByPatchID */][this.instrumentNumber];
			}
		},
		set: function set(inst) {
			var index = __WEBPACK_IMPORTED_MODULE_4__instrumentMaps__["a" /* instrumentByPatchID */].indexOf(inst);
			if (index !== -1) {
				this.instrumentNumber = index;
			}
		}

		/**
   * Whether or not this is a percussion track
   * @type {Boolean}
   */

	}, {
		key: 'isPercussion',
		get: function get() {
			return [0x9, 0xA].includes(this.channelNumber);
		}

		/**
   * The family that the instrument belongs to
   * @type {String}
   * @readOnly
   */

	}, {
		key: 'instrumentFamily',
		get: function get() {
			if (this.isPercussion) {
				return 'drums';
			} else {
				return __WEBPACK_IMPORTED_MODULE_4__instrumentMaps__["b" /* instrumentFamilyByID */][Math.floor(this.instrumentNumber / 8)];
			}
		}
	}]);

	return Track;
}();



/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var Midi = {};

(function(exported) {

	var DEFAULT_VOLUME   = exported.DEFAULT_VOLUME   = 90;
	var DEFAULT_DURATION = exported.DEFAULT_DURATION = 128;
	var DEFAULT_CHANNEL  = exported.DEFAULT_CHANNEL  = 0;

	/* ******************************************************************
	 * Utility functions
	 ****************************************************************** */

	var Util = {

		midi_letter_pitches: { a:21, b:23, c:12, d:14, e:16, f:17, g:19 },

		/**
		 * Convert a symbolic note name (e.g. "c4") to a numeric MIDI pitch (e.g.
		 * 60, middle C).
		 *
		 * @param {string} n - The symbolic note name to parse.
		 * @returns {number} The MIDI pitch that corresponds to the symbolic note
		 * name.
		 */
		midiPitchFromNote: function(n) {
			var matches = /([a-g])(#+|b+)?([0-9]+)$/i.exec(n);
			var note = matches[1].toLowerCase(), accidental = matches[2] || '', octave = parseInt(matches[3], 10);
			return (12 * octave) + Util.midi_letter_pitches[note] + (accidental.substr(0,1)=='#'?1:-1) * accidental.length;
		},

		/**
		 * Ensure that the given argument is converted to a MIDI pitch. Note that
		 * it may already be one (including a purely numeric string).
		 *
		 * @param {string|number} p - The pitch to convert.
		 * @returns {number} The resulting numeric MIDI pitch.
		 */
		ensureMidiPitch: function(p) {
			if (typeof p == 'number' || !/[^0-9]/.test(p)) {
				// numeric pitch
				return parseInt(p, 10);
			} else {
				// assume it's a note name
				return Util.midiPitchFromNote(p);
			}
		},

		midi_pitches_letter: { '12':'c', '13':'c#', '14':'d', '15':'d#', '16':'e', '17':'f', '18':'f#', '19':'g', '20':'g#', '21':'a', '22':'a#', '23':'b' },
		midi_flattened_notes: { 'a#':'bb', 'c#':'db', 'd#':'eb', 'f#':'gb', 'g#':'ab' },

		/**
		 * Convert a numeric MIDI pitch value (e.g. 60) to a symbolic note name
		 * (e.g. "c4").
		 *
		 * @param {number} n - The numeric MIDI pitch value to convert.
		 * @param {boolean} [returnFlattened=false] - Whether to prefer flattened
		 * notes to sharpened ones. Optional, default false.
		 * @returns {string} The resulting symbolic note name.
		 */
		noteFromMidiPitch: function(n, returnFlattened) {
			var octave = 0, noteNum = n, noteName, returnFlattened = returnFlattened || false;
			if (n > 23) {
				// noteNum is on octave 1 or more
				octave = Math.floor(n/12) - 1;
				// subtract number of octaves from noteNum
				noteNum = n - octave * 12;
			}

			// get note name (c#, d, f# etc)
			noteName = Util.midi_pitches_letter[noteNum];
			// Use flattened notes if requested (e.g. f# should be output as gb)
			if (returnFlattened && noteName.indexOf('#') > 0) {
				noteName = Util.midi_flattened_notes[noteName];
			}
			return noteName + octave;
		},

		/**
		 * Convert beats per minute (BPM) to microseconds per quarter note (MPQN).
		 *
		 * @param {number} bpm - A number in beats per minute.
		 * @returns {number} The number of microseconds per quarter note.
		 */
		mpqnFromBpm: function(bpm) {
			var mpqn = Math.floor(60000000 / bpm);
			var ret=[];
			do {
				ret.unshift(mpqn & 0xFF);
				mpqn >>= 8;
			} while (mpqn);
			while (ret.length < 3) {
				ret.push(0);
			}
			return ret;
		},

		/**
		 * Convert microseconds per quarter note (MPQN) to beats per minute (BPM).
		 *
		 * @param {number} mpqn - The number of microseconds per quarter note.
		 * @returns {number} A number in beats per minute.
		 */
		bpmFromMpqn: function(mpqn) {
			var m = mpqn;
			if (typeof mpqn[0] != 'undefined') {
				m = 0;
				for (var i=0, l=mpqn.length-1; l >= 0; ++i, --l) {
					m |= mpqn[i] << l;
				}
			}
			return Math.floor(60000000 / mpqn);
		},

		/**
		 * Converts an array of bytes to a string of hexadecimal characters. Prepares
		 * it to be converted into a base64 string.
		 *
		 * @param {Array} byteArray - Array of bytes to be converted.
		 * @returns {string} Hexadecimal string, e.g. "097B8A".
		 */
		codes2Str: function(byteArray) {
			return String.fromCharCode.apply(null, byteArray);
		},

		/**
		 * Converts a string of hexadecimal values to an array of bytes. It can also
		 * add remaining "0" nibbles in order to have enough bytes in the array as the
		 * `finalBytes` parameter.
		 *
		 * @param {string} str - string of hexadecimal values e.g. "097B8A"
		 * @param {number} [finalBytes] - Optional. The desired number of bytes
		 * (not nibbles) that the returned array should contain.
		 * @returns {Array} An array of nibbles.
		 */
		str2Bytes: function (str, finalBytes) {
			if (finalBytes) {
				while ((str.length / 2) < finalBytes) { str = "0" + str; }
			}

			var bytes = [];
			for (var i=str.length-1; i>=0; i = i-2) {
				var chars = i === 0 ? str[i] : str[i-1] + str[i];
				bytes.unshift(parseInt(chars, 16));
			}

			return bytes;
		},

		/**
		 * Translates number of ticks to MIDI timestamp format, returning an array
		 * of bytes with the time values. MIDI has a very particular way to express
		 * time; take a good look at the spec before ever touching this function.
		 *
		 * @param {number} ticks - Number of ticks to be translated.
		 * @returns {number} Array of bytes that form the MIDI time value.
		 */
		translateTickTime: function(ticks) {
			var buffer = ticks & 0x7F;

			while (ticks = ticks >> 7) {
				buffer <<= 8;
				buffer |= ((ticks & 0x7F) | 0x80);
			}

			var bList = [];
			while (true) {
				bList.push(buffer & 0xff);

				if (buffer & 0x80) { buffer >>= 8; }
				else { break; }
			}
			return bList;
		},

	};

	/* ******************************************************************
	 * Event class
	 ****************************************************************** */

	/**
	 * Construct a MIDI event.
	 *
	 * Parameters include:
	 *  - time [optional number] - Ticks since previous event.
	 *  - type [required number] - Type of event.
	 *  - channel [required number] - Channel for the event.
	 *  - param1 [required number] - First event parameter.
	 *  - param2 [optional number] - Second event parameter.
	 */
	var MidiEvent = function(params) {
		if (!this) return new MidiEvent(params);
		if (params &&
				(params.type    !== null || params.type    !== undefined) &&
				(params.channel !== null || params.channel !== undefined) &&
				(params.param1  !== null || params.param1  !== undefined)) {
			this.setTime(params.time);
			this.setType(params.type);
			this.setChannel(params.channel);
			this.setParam1(params.param1);
			this.setParam2(params.param2);
		}
	};

	// event codes
	MidiEvent.NOTE_OFF           = 0x80;
	MidiEvent.NOTE_ON            = 0x90;
	MidiEvent.AFTER_TOUCH        = 0xA0;
	MidiEvent.CONTROLLER         = 0xB0;
	MidiEvent.PROGRAM_CHANGE     = 0xC0;
	MidiEvent.CHANNEL_AFTERTOUCH = 0xD0;
	MidiEvent.PITCH_BEND         = 0xE0;


	/**
	 * Set the time for the event in ticks since the previous event.
	 *
	 * @param {number} ticks - The number of ticks since the previous event. May
	 * be zero.
	 */
	MidiEvent.prototype.setTime = function(ticks) {
		this.time = Util.translateTickTime(ticks || 0);
	};

	/**
	 * Set the type of the event. Must be one of the event codes on MidiEvent.
	 *
	 * @param {number} type - Event type.
	 */
	MidiEvent.prototype.setType = function(type) {
		if (type < MidiEvent.NOTE_OFF || type > MidiEvent.PITCH_BEND) {
			throw new Error("Trying to set an unknown event: " + type);
		}

		this.type = type;
	};

	/**
	 * Set the channel for the event. Must be between 0 and 15, inclusive.
	 *
	 * @param {number} channel - The event channel.
	 */
	MidiEvent.prototype.setChannel = function(channel) {
		if (channel < 0 || channel > 15) {
			throw new Error("Channel is out of bounds.");
		}

		this.channel = channel;
	};

	/**
	 * Set the first parameter for the event. Must be between 0 and 255,
	 * inclusive.
	 *
	 * @param {number} p - The first event parameter value.
	 */
	MidiEvent.prototype.setParam1 = function(p) {
		this.param1 = p;
	};

	/**
	 * Set the second parameter for the event. Must be between 0 and 255,
	 * inclusive.
	 *
	 * @param {number} p - The second event parameter value.
	 */
	MidiEvent.prototype.setParam2 = function(p) {
		this.param2 = p;
	};

	/**
	 * Serialize the event to an array of bytes.
	 *
	 * @returns {Array} The array of serialized bytes.
	 */
	MidiEvent.prototype.toBytes = function() {
		var byteArray = [];

		var typeChannelByte = this.type | (this.channel & 0xF);

		byteArray.push.apply(byteArray, this.time);
		byteArray.push(typeChannelByte);
		byteArray.push(this.param1);

		// Some events don't have a second parameter
		if (this.param2 !== undefined && this.param2 !== null) {
			byteArray.push(this.param2);
		}
		return byteArray;
	};

	/* ******************************************************************
	 * MetaEvent class
	 ****************************************************************** */

	/**
	 * Construct a meta event.
	 *
	 * Parameters include:
	 *  - time [optional number] - Ticks since previous event.
	 *  - type [required number] - Type of event.
	 *  - data [optional array|string] - Event data.
	 */
	var MetaEvent = function(params) {
		if (!this) return new MetaEvent(params);
		var p = params || {};
		this.setTime(params.time);
		this.setType(params.type);
		this.setData(params.data);
	};

	MetaEvent.SEQUENCE   = 0x00;
	MetaEvent.TEXT       = 0x01;
	MetaEvent.COPYRIGHT  = 0x02;
	MetaEvent.TRACK_NAME = 0x03;
	MetaEvent.INSTRUMENT = 0x04;
	MetaEvent.LYRIC      = 0x05;
	MetaEvent.MARKER     = 0x06;
	MetaEvent.CUE_POINT  = 0x07;
	MetaEvent.CHANNEL_PREFIX = 0x20;
	MetaEvent.END_OF_TRACK   = 0x2f;
	MetaEvent.TEMPO      = 0x51;
	MetaEvent.SMPTE      = 0x54;
	MetaEvent.TIME_SIG   = 0x58;
	MetaEvent.KEY_SIG    = 0x59;
	MetaEvent.SEQ_EVENT  = 0x7f;

	/**
	 * Set the time for the event in ticks since the previous event.
	 *
	 * @param {number} ticks - The number of ticks since the previous event. May
	 * be zero.
	 */
	MetaEvent.prototype.setTime = function(ticks) {
		this.time = Util.translateTickTime(ticks || 0);
	};

	/**
	 * Set the type of the event. Must be one of the event codes on MetaEvent.
	 *
	 * @param {number} t - Event type.
	 */
	MetaEvent.prototype.setType = function(t) {
		this.type = t;
	};

	/**
	 * Set the data associated with the event. May be a string or array of byte
	 * values.
	 *
	 * @param {string|Array} d - Event data.
	 */
	MetaEvent.prototype.setData = function(d) {
		this.data = d;
	};

	/**
	 * Serialize the event to an array of bytes.
	 *
	 * @returns {Array} The array of serialized bytes.
	 */
	MetaEvent.prototype.toBytes = function() {
		if (!this.type) {
			throw new Error("Type for meta-event not specified.");
		}

		var byteArray = [];
		byteArray.push.apply(byteArray, this.time);
		byteArray.push(0xFF, this.type);

		// If data is an array, we assume that it contains several bytes. We
		// apend them to byteArray.
		if (Array.isArray(this.data)) {
			byteArray.push(this.data.length);
			byteArray.push.apply(byteArray, this.data);
		} else if (typeof this.data == 'number') {
			byteArray.push(1, this.data);
		} else if (this.data !== null && this.data !== undefined) {
			// assume string; may be a bad assumption
			byteArray.push(this.data.length);
			var dataBytes = this.data.split('').map(function(x){ return x.charCodeAt(0) });
			byteArray.push.apply(byteArray, dataBytes);
		} else {
			byteArray.push(0);
		}

		return byteArray;
	};

	/* ******************************************************************
	 * Track class
	 ****************************************************************** */

	/**
	 * Construct a MIDI track.
	 *
	 * Parameters include:
	 *  - events [optional array] - Array of events for the track.
	 */
	var Track = function(config) {
		if (!this) return new Track(config);
		var c = config || {};
		this.events = c.events || [];
	};

	Track.START_BYTES = [0x4d, 0x54, 0x72, 0x6b];
	Track.END_BYTES   = [0x00, 0xFF, 0x2F, 0x00];

	/**
	 * Add an event to the track.
	 *
	 * @param {MidiEvent|MetaEvent} event - The event to add.
	 * @returns {Track} The current track.
	 */
	Track.prototype.addEvent = function(event) {
		this.events.push(event);
		return this;
	};

	/**
	 * Add a note-on event to the track.
	 *
	 * @param {number} channel - The channel to add the event to.
	 * @param {number|string} pitch - The pitch of the note, either numeric or
	 * symbolic.
	 * @param {number} [time=0] - The number of ticks since the previous event,
	 * defaults to 0.
	 * @param {number} [velocity=90] - The volume for the note, defaults to
	 * DEFAULT_VOLUME.
	 * @returns {Track} The current track.
	 */
	Track.prototype.addNoteOn = Track.prototype.noteOn = function(channel, pitch, time, velocity) {
		this.events.push(new MidiEvent({
			type: MidiEvent.NOTE_ON,
			channel: channel,
			param1: Util.ensureMidiPitch(pitch),
			param2: velocity || DEFAULT_VOLUME,
			time: time || 0,
		}));
		return this;
	};

	/**
	 * Add a note-off event to the track.
	 *
	 * @param {number} channel - The channel to add the event to.
	 * @param {number|string} pitch - The pitch of the note, either numeric or
	 * symbolic.
	 * @param {number} [time=0] - The number of ticks since the previous event,
	 * defaults to 0.
	 * @param {number} [velocity=90] - The velocity the note was released,
	 * defaults to DEFAULT_VOLUME.
	 * @returns {Track} The current track.
	 */
	Track.prototype.addNoteOff = Track.prototype.noteOff = function(channel, pitch, time, velocity) {
		this.events.push(new MidiEvent({
			type: MidiEvent.NOTE_OFF,
			channel: channel,
			param1: Util.ensureMidiPitch(pitch),
			param2: velocity || DEFAULT_VOLUME,
			time: time || 0,
		}));
		return this;
	};

	/**
	 * Add a note-on and -off event to the track.
	 *
	 * @param {number} channel - The channel to add the event to.
	 * @param {number|string} pitch - The pitch of the note, either numeric or
	 * symbolic.
	 * @param {number} dur - The duration of the note, in ticks.
	 * @param {number} [time=0] - The number of ticks since the previous event,
	 * defaults to 0.
	 * @param {number} [velocity=90] - The velocity the note was released,
	 * defaults to DEFAULT_VOLUME.
	 * @returns {Track} The current track.
	 */
	Track.prototype.addNote = Track.prototype.note = function(channel, pitch, dur, time, velocity) {
		this.noteOn(channel, pitch, time, velocity);
		if (dur) {
			this.noteOff(channel, pitch, dur, velocity);
		}
		return this;
	};

	/**
	 * Add a note-on and -off event to the track for each pitch in an array of pitches.
	 *
	 * @param {number} channel - The channel to add the event to.
	 * @param {array} chord - An array of pitches, either numeric or
	 * symbolic.
	 * @param {number} dur - The duration of the chord, in ticks.
	 * @param {number} [velocity=90] - The velocity of the chord,
	 * defaults to DEFAULT_VOLUME.
	 * @returns {Track} The current track.
	 */
	Track.prototype.addChord = Track.prototype.chord = function(channel, chord, dur, velocity) {
		if (!Array.isArray(chord) && !chord.length) {
			throw new Error('Chord must be an array of pitches');
		}
		chord.forEach(function(note) {
			this.noteOn(channel, note, 0, velocity);
		}, this);
		chord.forEach(function(note, index) {
			if (index === 0) {
				this.noteOff(channel, note, dur);
			} else {
				this.noteOff(channel, note);
			}
		}, this);
		return this;
	};

	/**
	 * Set instrument for the track.
	 *
	 * @param {number} channel - The channel to set the instrument on.
	 * @param {number} instrument - The instrument to set it to.
	 * @param {number} [time=0] - The number of ticks since the previous event,
	 * defaults to 0.
	 * @returns {Track} The current track.
	 */
	Track.prototype.setInstrument = Track.prototype.instrument = function(channel, instrument, time) {
		this.events.push(new MidiEvent({
			type: MidiEvent.PROGRAM_CHANGE,
			channel: channel,
			param1: instrument,
			time: time || 0,
		}));
		return this;
	};

	/**
	 * Set the tempo for the track.
	 *
	 * @param {number} bpm - The new number of beats per minute.
	 * @param {number} [time=0] - The number of ticks since the previous event,
	 * defaults to 0.
	 * @returns {Track} The current track.
	 */
	Track.prototype.setTempo = Track.prototype.tempo = function(bpm, time) {
		this.events.push(new MetaEvent({
			type: MetaEvent.TEMPO,
			data: Util.mpqnFromBpm(bpm),
			time: time || 0,
		}));
		return this;
	};

	/**
	 * Serialize the track to an array of bytes.
	 *
	 * @returns {Array} The array of serialized bytes.
	 */
	Track.prototype.toBytes = function() {
		var trackLength = 0;
		var eventBytes = [];
		var startBytes = Track.START_BYTES;
		var endBytes   = Track.END_BYTES;

		var addEventBytes = function(event) {
			var bytes = event.toBytes();
			trackLength += bytes.length;
			eventBytes.push.apply(eventBytes, bytes);
		};

		this.events.forEach(addEventBytes);

		// Add the end-of-track bytes to the sum of bytes for the track, since
		// they are counted (unlike the start-of-track ones).
		trackLength += endBytes.length;

		// Makes sure that track length will fill up 4 bytes with 0s in case
		// the length is less than that (the usual case).
		var lengthBytes = Util.str2Bytes(trackLength.toString(16), 4);

		return startBytes.concat(lengthBytes, eventBytes, endBytes);
	};

	/* ******************************************************************
	 * File class
	 ****************************************************************** */

	/**
	 * Construct a file object.
	 *
	 * Parameters include:
	 *  - ticks [optional number] - Number of ticks per beat, defaults to 128.
	 *    Must be 1-32767.
	 *  - tracks [optional array] - Track data.
	 */
	var File = function(config){
		if (!this) return new File(config);

		var c = config || {};
		if (c.ticks) {
			if (typeof c.ticks !== 'number') {
				throw new Error('Ticks per beat must be a number!');
				return;
			}
			if (c.ticks <= 0 || c.ticks >= (1 << 15) || c.ticks % 1 !== 0) {
				throw new Error('Ticks per beat must be an integer between 1 and 32767!');
				return;
			}
		}

		this.ticks = c.ticks || 128;
		this.tracks = c.tracks || [];
	};

	File.HDR_CHUNKID     = "MThd";             // File magic cookie
	File.HDR_CHUNK_SIZE  = "\x00\x00\x00\x06"; // Header length for SMF
	File.HDR_TYPE0       = "\x00\x00";         // Midi Type 0 id
	File.HDR_TYPE1       = "\x00\x01";         // Midi Type 1 id

	/**
	 * Add a track to the file.
	 *
	 * @param {Track} track - The track to add.
	 */
	File.prototype.addTrack = function(track) {
		if (track) {
			this.tracks.push(track);
			return this;
		} else {
			track = new Track();
			this.tracks.push(track);
			return track;
		}
	};

	/**
	 * Serialize the MIDI file to an array of bytes.
	 *
	 * @returns {Array} The array of serialized bytes.
	 */
	File.prototype.toBytes = function() {
		var trackCount = this.tracks.length.toString(16);

		// prepare the file header
		var bytes = File.HDR_CHUNKID + File.HDR_CHUNK_SIZE;

		// set Midi type based on number of tracks
		if (parseInt(trackCount, 16) > 1) {
			bytes += File.HDR_TYPE1;
		} else {
			bytes += File.HDR_TYPE0;
		}

		// add the number of tracks (2 bytes)
		bytes += Util.codes2Str(Util.str2Bytes(trackCount, 2));
		// add the number of ticks per beat (currently hardcoded)
		bytes += String.fromCharCode((this.ticks/256),  this.ticks%256);;

		// iterate over the tracks, converting to bytes too
		this.tracks.forEach(function(track) {
			bytes += Util.codes2Str(track.toBytes());
		});

		return bytes;
	};

	/* ******************************************************************
	 * Exports
	 ****************************************************************** */

	exported.Util = Util;
	exported.File = File;
	exported.Track = Track;
	exported.Event = MidiEvent;
	exported.MetaEvent = MetaEvent;

})( Midi );

if (typeof module != 'undefined' && module !== null) {
	module.exports = Midi;
} else if (typeof exports != 'undefined' && exports !== null) {
	exports = Midi;
} else {
	this.Midi = Midi;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)(module)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// https://github.com/gasman/jasmid
//
//

module.exports = function(file){
	return MidiFile(file)
};

function MidiFile(data) {
	function readChunk(stream) {
		var id = stream.read(4);
		var length = stream.readInt32();
		return {
			'id': id,
			'length': length,
			'data': stream.read(length)
		};
	}
	
	var lastEventTypeByte;
	
	function readEvent(stream) {
		var event = {};
		event.deltaTime = stream.readVarInt();
		var eventTypeByte = stream.readInt8();
		if ((eventTypeByte & 0xf0) == 0xf0) {
			/* system / meta event */
			if (eventTypeByte == 0xff) {
				/* meta event */
				event.type = 'meta';
				var subtypeByte = stream.readInt8();
				var length = stream.readVarInt();
				switch(subtypeByte) {
					case 0x00:
						event.subtype = 'sequenceNumber';
						if (length != 2) throw "Expected length for sequenceNumber event is 2, got " + length;
						event.number = stream.readInt16();
						return event;
					case 0x01:
						event.subtype = 'text';
						event.text = stream.read(length);
						return event;
					case 0x02:
						event.subtype = 'copyrightNotice';
						event.text = stream.read(length);
						return event;
					case 0x03:
						event.subtype = 'trackName';
						event.text = stream.read(length);
						return event;
					case 0x04:
						event.subtype = 'instrumentName';
						event.text = stream.read(length);
						return event;
					case 0x05:
						event.subtype = 'lyrics';
						event.text = stream.read(length);
						return event;
					case 0x06:
						event.subtype = 'marker';
						event.text = stream.read(length);
						return event;
					case 0x07:
						event.subtype = 'cuePoint';
						event.text = stream.read(length);
						return event;
					case 0x20:
						event.subtype = 'midiChannelPrefix';
						if (length != 1) throw "Expected length for midiChannelPrefix event is 1, got " + length;
						event.channel = stream.readInt8();
						return event;
					case 0x2f:
						event.subtype = 'endOfTrack';
						if (length != 0) throw "Expected length for endOfTrack event is 0, got " + length;
						return event;
					case 0x51:
						event.subtype = 'setTempo';
						if (length != 3) throw "Expected length for setTempo event is 3, got " + length;
						event.microsecondsPerBeat = (
							(stream.readInt8() << 16)
							+ (stream.readInt8() << 8)
							+ stream.readInt8()
						)
						return event;
					case 0x54:
						event.subtype = 'smpteOffset';
						if (length != 5) throw "Expected length for smpteOffset event is 5, got " + length;
						var hourByte = stream.readInt8();
						event.frameRate = {
							0x00: 24, 0x20: 25, 0x40: 29, 0x60: 30
						}[hourByte & 0x60];
						event.hour = hourByte & 0x1f;
						event.min = stream.readInt8();
						event.sec = stream.readInt8();
						event.frame = stream.readInt8();
						event.subframe = stream.readInt8();
						return event;
					case 0x58:
						event.subtype = 'timeSignature';
						if (length != 4) throw "Expected length for timeSignature event is 4, got " + length;
						event.numerator = stream.readInt8();
						event.denominator = Math.pow(2, stream.readInt8());
						event.metronome = stream.readInt8();
						event.thirtyseconds = stream.readInt8();
						return event;
					case 0x59:
						event.subtype = 'keySignature';
						if (length != 2) throw "Expected length for keySignature event is 2, got " + length;
						event.key = stream.readInt8(true);
						event.scale = stream.readInt8();
						return event;
					case 0x7f:
						event.subtype = 'sequencerSpecific';
						event.data = stream.read(length);
						return event;
					default:
						// console.log("Unrecognised meta event subtype: " + subtypeByte);
						event.subtype = 'unknown'
						event.data = stream.read(length);
						return event;
				}
				event.data = stream.read(length);
				return event;
			} else if (eventTypeByte == 0xf0) {
				event.type = 'sysEx';
				var length = stream.readVarInt();
				event.data = stream.read(length);
				return event;
			} else if (eventTypeByte == 0xf7) {
				event.type = 'dividedSysEx';
				var length = stream.readVarInt();
				event.data = stream.read(length);
				return event;
			} else {
				throw "Unrecognised MIDI event type byte: " + eventTypeByte;
			}
		} else {
			/* channel event */
			var param1;
			if ((eventTypeByte & 0x80) == 0) {
				/* running status - reuse lastEventTypeByte as the event type.
					eventTypeByte is actually the first parameter
				*/
				param1 = eventTypeByte;
				eventTypeByte = lastEventTypeByte;
			} else {
				param1 = stream.readInt8();
				lastEventTypeByte = eventTypeByte;
			}
			var eventType = eventTypeByte >> 4;
			event.channel = eventTypeByte & 0x0f;
			event.type = 'channel';
			switch (eventType) {
				case 0x08:
					event.subtype = 'noteOff';
					event.noteNumber = param1;
					event.velocity = stream.readInt8();
					return event;
				case 0x09:
					event.noteNumber = param1;
					event.velocity = stream.readInt8();
					if (event.velocity == 0) {
						event.subtype = 'noteOff';
					} else {
						event.subtype = 'noteOn';
					}
					return event;
				case 0x0a:
					event.subtype = 'noteAftertouch';
					event.noteNumber = param1;
					event.amount = stream.readInt8();
					return event;
				case 0x0b:
					event.subtype = 'controller';
					event.controllerType = param1;
					event.value = stream.readInt8();
					return event;
				case 0x0c:
					event.subtype = 'programChange';
					event.programNumber = param1;
					return event;
				case 0x0d:
					event.subtype = 'channelAftertouch';
					event.amount = param1;
					return event;
				case 0x0e:
					event.subtype = 'pitchBend';
					event.value = param1 + (stream.readInt8() << 7);
					return event;
				default:
					throw "Unrecognised MIDI event type: " + eventType
					/* 
					console.log("Unrecognised MIDI event type: " + eventType);
					stream.readInt8();
					event.subtype = 'unknown';
					return event;
					*/
			}
		}
	}
	
	stream = Stream(data);
	var headerChunk = readChunk(stream);
	if (headerChunk.id != 'MThd' || headerChunk.length != 6) {
		throw "Bad .mid file - header not found";
	}
	var headerStream = Stream(headerChunk.data);
	var formatType = headerStream.readInt16();
	var trackCount = headerStream.readInt16();
	var timeDivision = headerStream.readInt16();
	
	if (timeDivision & 0x8000) {
		throw "Expressing time division in SMTPE frames is not supported yet"
	} else {
		ticksPerBeat = timeDivision;
	}
	
	var header = {
		'formatType': formatType,
		'trackCount': trackCount,
		'ticksPerBeat': ticksPerBeat
	}
	var tracks = [];
	for (var i = 0; i < header.trackCount; i++) {
		tracks[i] = [];
		var trackChunk = readChunk(stream);
		if (trackChunk.id != 'MTrk') {
			throw "Unexpected chunk - expected MTrk, got "+ trackChunk.id;
		}
		var trackStream = Stream(trackChunk.data);
		while (!trackStream.eof()) {
			var event = readEvent(trackStream);
			tracks[i].push(event);
			//console.log(event);
		}
	}
	
	return {
		'header': header,
		'tracks': tracks
	}
};

/* Wrapper for accessing strings through sequential reads */
function Stream(str) {
	var position = 0;
	
	function read(length) {
		var result = str.substr(position, length);
		position += length;
		return result;
	}
	
	/* read a big-endian 32-bit integer */
	function readInt32() {
		var result = (
			(str.charCodeAt(position) << 24)
			+ (str.charCodeAt(position + 1) << 16)
			+ (str.charCodeAt(position + 2) << 8)
			+ str.charCodeAt(position + 3));
		position += 4;
		return result;
	}

	/* read a big-endian 16-bit integer */
	function readInt16() {
		var result = (
			(str.charCodeAt(position) << 8)
			+ str.charCodeAt(position + 1));
		position += 2;
		return result;
	}
	
	/* read an 8-bit integer */
	function readInt8(signed) {
		var result = str.charCodeAt(position);
		if (signed && result > 127) result -= 256;
		position += 1;
		return result;
	}
	
	function eof() {
		return position >= str.length;
	}
	
	/* read a MIDI-style variable-length integer
		(big-endian value in groups of 7 bits,
		with top bit set to signify that another byte follows)
	*/
	function readVarInt() {
		var result = 0;
		while (true) {
			var b = readInt8();
			if (b & 0x80) {
				result += (b & 0x7f);
				result <<= 7;
			} else {
				/* b is the last byte */
				return result + b;
			}
		}
	}
	
	return {
		'eof': eof,
		'read': read,
		'readInt32': readInt32,
		'readInt16': readInt16,
		'readInt8': readInt8,
		'readVarInt': readVarInt
	}
}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=MidiConvert.js.map