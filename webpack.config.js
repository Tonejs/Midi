var path = require('path')
var webpack = require('webpack')

module.exports = {
	context : __dirname,
	entry : {
		Midi : './src/Midi.js',
	},
	output : {
		path : path.resolve(__dirname, 'build'),
		filename : '[name].js',
		sourceMapFilename : '[file].map',
		library : 'Midi',
		libraryExport : 'Midi',
		libraryTarget : 'umd',
		globalObject: "typeof self !== 'undefined' ? self : this"
	},
	module : {
		rules : [
			{
				test : /\.js$/,
				exclude : /(node_modules)/,
				use : {
					loader : 'babel-loader',
				}
			}
		]
	},
	devtool : '#source-map'
}
