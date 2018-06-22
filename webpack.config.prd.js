const webpack = require("webpack");
const path = require("path");
const env = process.env.NODE_ENV
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineSourcePlugin = require('html-webpack-inline-source-plugin')
const extractLess = new ExtractTextPlugin({
	filename: "[name].[contenthash].css"
});
const CssoPlugin = require('csso-webpack-plugin').default;
const ManifestPlugin = require('webpack-manifest-plugin');
module.exports = {
	mode: 'production',
	entry: {
		index: path.join(__dirname, 'src', 'index.js'),
		gallary: path.join(__dirname, 'src' , 'gallary.js')
	},
	output: {
		path: __dirname + '/public',
		filename: '[name].[chunkhash].js',
		publicPath: '/dist/'
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
			/*{
				test: /\.(png|jpg)$/,
				loaders: 'url',
				query: {
					limit: 8192
				}
			},*/

			{
				test: /\.js$/,
				use: ["source-map-loader"],
				enforce: "pre"
			},
			{
				test: /\.(jpg|ico|png)$/,
				use: ["file-loader?name=[name].[hash].[ext]"]
			},
			/*{
				test: /\.png$/,
				use: ["url-loader?mimetype=image/png"]
			}*/

		]
	},
	plugins: [
		extractLess,
		new webpack.ProvidePlugin({
			$: 'jQuery',
			'window.$': 'jQuery'
		}),
		new CleanWebpackPlugin(['public']),
		new HtmlWebpackPlugin({
			favicon: 'src/assets/images/favicon/favicon.ico',
			cache: true,
			inject:true,
			chunks:['index'],
			filename:'index.html',
			title: "webpack4-boilerplate",
			//inlineSource: '.(js|css)$',
		}),
		new CleanWebpackPlugin(['public']),
		new HtmlWebpackPlugin({
			favicon: 'src/assets/images/favicon/favicon.ico',
			cache: true,
			inject:true,
			chunks:['gallary'],
			filename:'gallary.html',
			title: "webpack4-boilerplate",
			//inlineSource: '.(js|css)$',
		}),
		new CopyWebpackPlugin([]),
		new webpack.HashedModuleIdsPlugin({
			hashFunction: "sha256",
			hashDigest: "hex",
			hashDigestLength: 20
		}),
		new ManifestPlugin({publicPath:'/public/'}),
		new CssoPlugin()

	],
	optimization: {
		runtimeChunk:true,
		splitChunks: {
			name:false,
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
