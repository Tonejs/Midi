var webpack = require("webpack");

module.exports = {
	"context": __dirname,
	entry: {
		"MidiToScore": "src/MidiToScore",
	},
	output: {
		filename: "./build/[name].js",
		sourceMapFilename : "[file].map",
		library : "MidiToScore",
		libraryTarget : "umd"
	},
	externals: { 
		Tone : "Tone",
	},
	resolve: {
		root: __dirname,
		modulesDirectories : ["src", "node_modules"],
	},
	devtool: "#eval"
};