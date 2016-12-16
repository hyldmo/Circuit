'use strict'

const path = require('path');
const CONFIG = require('./webpack.config');
const webpack = require('webpack');

const port = process.env.PORT || 1337;

module.exports = Object.assign({}, CONFIG, {
    entry: [
        'webpack-hot-middleware/client?path=http://localhost:' + port + '/__webpack_hmr',
        CONFIG.entry,
        './app/stylesheets/main.less'
    ],
    
    devServer: {
        headers: { 'Access-Control-Allow-Origin': '*' },
        historyApiFallback: true
    },

    output: {
        path: path.join(__dirname, 'app'),
        filename: 'bundle.js',
        publicPath: `http://localhost:${port}/dist/`
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['react-hot-loader', 'ts-loader'],
            },
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: ['node_modules'],
                enforce: 'pre',
            }
        ]
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    plugins: [
        // https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
        new webpack.HotModuleReplacementPlugin(),

        // Allow transpile-time checks in code
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],

    // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
    target: 'electron-renderer'
});