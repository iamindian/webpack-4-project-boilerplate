const path = require('path');
const webpack = require("webpack");
module.exports = {
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
			path: path.join(__dirname, "dist",'[name]-manifest.json'),
		})
	]
}
