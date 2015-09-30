var webpack = require("webpack");

module.exports = {
	"context": __dirname,
	entry: {
		"MidiConvert": "src/MidiConvert",
	},
	output: {
		filename: "./build/[name].js",
		sourceMapFilename : "[file].map",
		library : "MidiConvert",
		libraryTarget : "umd"
	},
	resolve: {
		root: __dirname,
		modulesDirectories : ["src", "node_modules"],
	},
	plugins: [new webpack.optimize.UglifyJsPlugin({minimize: true})],
};