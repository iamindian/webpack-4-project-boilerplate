const webpack = require("webpack");
const path = require("path");
const env = process.env.NODE_ENV
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLess = new ExtractTextPlugin({
	filename: "[name].[contenthash].css"
});
module.exports = {
	mode: 'development',
	entry: {
		index: path.join(__dirname, 'src', 'index.js'),
		gallary: path.join(__dirname, 'src' , 'gallary.js')
	},
	output: {
		path: __dirname + '/public',
		filename: '[name].[chunkhash].js',
		publicPath: '/dist'
	},
	watchOptions: {
		ignored: /node_modules/
	},
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/
			},
			{
				test: /\.jsx?/,
				loaders: 'babel',
				include: __dirname + './index.js',
				query: {
					presets: 'es2015'
				}
			},
			{
				test: /\.less$/,
				use: extractLess.extract({
					use: [{
						loader: "css-loader"
					}, {
						loader: "less-loader"
					}]
				})
			},
			{
				test: /\.(png|jpg)$/,
				loaders: 'url',
				query: {
					limit: 8192
				}
			},

			{
				test: /\.js$/,
				use: ["source-map-loader"],
				enforce: "pre"
			},
			{
				test: /\.(jpg|ico)$/,
				use: ["file-loader?name=[name].[ext]"]
			},
			{
				test: /\.png$/,
				use: ["url-loader?mimetype=image/png"]
			}

		]
	},
	plugins: [
		extractLess,
		new webpack.ProvidePlugin({
			$: 'jQuery',
			'window.$': 'jQuery'
		}),
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			favicon: 'src/assets/images/favicon/favicon.ico',
			hash: true,
			cache: true,
			title: "webpack4-boilerplate",
			inlineSource: '.(js|css)$'
		}),
		//new UglifyJSPlugin(),
		//new CopyWebpackPlugin([]),
		new webpack.HashedModuleIdsPlugin({
			hashFunction: "sha256",
			hashDigest: "hex",
			hashDigestLength: 20
		})

	],
	optimization: {
		splitChunks: {
			minSize:30,
			cacheGroups: {
			    default:false,
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks:"all"
				},
				commons: {
					name: 'commons',
					chunks: 'initial',
					minChunks: 2
				}
			}
			
		}
	}
}
