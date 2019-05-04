var path = require('path')
var webpack = require('webpack')

module.exports = {
	context : __dirname,
	entry : {
		Midi : './src/Midi.ts',
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
	resolve : {
		extensions: ['.ts', '.js']
	},
	module : {
		rules : [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /(node_modules)/,
			}
		]
	},
	devtool: 'inline-source-map'
}
