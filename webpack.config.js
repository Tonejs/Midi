var webpack = require('webpack');

var PROD = process.argv.indexOf('-p') !== -1

module.exports = {
	'context': __dirname,
	entry: {
		'MidiConvert': 'src/MidiConvert',
	},
	output: {
		filename: './build/[name].js',
		sourceMapFilename : '[file].map',
		library : 'MidiConvert',
		libraryTarget : 'umd'
	},
	resolve: {
		root: __dirname,
		modulesDirectories : ['src', 'node_modules'],
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		],
	},
	plugins: PROD ? [new webpack.optimize.UglifyJsPlugin({minimize: true})] : [],
	devtool: PROD ? '' : '#source-map'
};
