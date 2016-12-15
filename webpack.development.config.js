const path = require('path');
const CONFIG = require('./webpack.config');
const webpack = require('webpack');

const port = process.env.PORT || 1337;

module.exports = Object.assign({}, CONFIG, {
     entry: [
        'webpack-hot-middleware/client?path=http://localhost:'+port+'/__webpack_hmr',
        CONFIG.entry
    ],
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" },
        historyApiFallback: true
    },

    output: {
        path: path.join(__dirname, 'app'),
        filename: 'bundle.js',
        publicPath: `http://localhost:${port}/dist/`
    },

    module: {
        rules: [
            ...CONFIG.module.rules,
            {
                test: /\.html$/,
                loader: 'file-loader?name=[path][name].[ext]!extract-loader!html-loader',
            },
        ]
    },    

    
  plugins: [
    // https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
    new webpack.HotModuleReplacementPlugin(),

    // “If you are using the CLI, the webpack process will not exit with an error code by enabling this plugin.”
    // https://github.com/webpack/docs/wiki/list-of-plugins#noerrorsplugin
    new webpack.NoErrorsPlugin(),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],

  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-renderer'
});