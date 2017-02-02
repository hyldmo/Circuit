'use strict';

const webpack = require('webpack');

module.exports = {
    entry: './app/src/index.tsx',
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.less']
    }
};