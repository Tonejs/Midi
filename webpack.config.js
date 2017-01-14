var webpack = require('webpack');

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
	plugins: new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify('production')
		}
	}),
	devtool: '#source-map'
};
