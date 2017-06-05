var path = require('path');
var webpack = require('webpack');

module.exports = {
	'context': __dirname,
	entry: {
		'MidiConvert': './src/MidiConvert.js',
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: '[name].js',
		sourceMapFilename : '[file].map',
		library : 'MidiConvert',
		libraryTarget : 'umd'
	},
	module: {
	  rules: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: [
	          	[
	          	'es2015',
		            {
	                "modules": false
		            }
	            ],
						]
	        }
	      }
	    }
	  ]
	},
	devtool: '#source-map'
};
