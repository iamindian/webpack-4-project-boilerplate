const webpack = require("webpack");
const path = require("path");
const env = process.env.NODE_ENV

module.exports = {
    mode: env || 'development',
    entry: {
      app:__dirname + '/index.js',
      vendors:path.join(__dirname,'dist',"vendors.js")
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        publicPath: ''
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
                loaders: [
                    'style',
                    'css',
                    'less'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loaders: 'url',
                query: {
                    limit: 8192
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jQuery',
            'window.$':'jQuery'
        }),
        new webpack.DllReferencePlugin({
           manifest: require(path.join(__dirname,'dist', 'vendors-manifest.json'))
        }),
    ],
    serve:{
      dev:{
        publicPath:"/"
      }
    }
   
}