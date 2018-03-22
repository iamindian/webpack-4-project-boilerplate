const path = require('path');
const webpack = require("webpack");
const env = process.env.NODE_ENV
module.exports = {
	mode: env || 'development',
	entry:{
		vendors: [
			"jquery"
		],
	},
	output: {
		filename:'[name].js',
		path: path.resolve('dist'),
		library:'[name]',
	},
	plugins:[
		new webpack.DllPlugin({
			name:'[name]',
			path: path.join(__dirname, "dist",'vendors-manifest.json'),
		})
	]
}
