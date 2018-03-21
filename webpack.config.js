const webpack = require("webpack");
const path = require("path");
const env = process.env.NODE_ENV
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const proxy = require('http-proxy-middleware');
const convert = require('koa-connect');
const Router = require('koa-router');
const router = new Router();
const proxyOptions = {
  target: 'http://www.baidu.com',
  changeOrigin: true
};
router.get('/api', convert(proxy(proxyOptions)));
module.exports = {
    mode: env || 'development',
    devtool:"inline-source-map",
    entry: {
        app: __dirname + '/index.js',
        vendors: path.join(__dirname, 'dist', "vendors.js")
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        publicPath: '/'
    },
    watchOptions:{
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
            },

            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            }

        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jQuery',
            'window.$': 'jQuery'
        }),
        new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname, 'dist', 'vendors-manifest.json'))
        }),
        new UglifyJSPlugin(),
    ],
    serve: {
        dev: {
            stats:"normal",
        },
        add: (app, middleware, options) => {
                middleware.webpack();
                middleware.content();
                app.use(router.routes());
                app.use(router.allowedMethods());
        }
    }
}