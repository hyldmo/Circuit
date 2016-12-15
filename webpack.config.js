'use strict';

const webpack = require("webpack");

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "[name].js",
        path: __dirname + "/dist",
        publicPath: "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ["react-hot-loader", "ts-loader"],
            },
            {
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: ["node_modules"],
                enforce: "pre",
            }
        ]
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".js"]
    }
};