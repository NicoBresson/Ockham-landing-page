const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: ['./src/js/index.js', './src/scss/main.scss'],
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new ExtractTextPlugin({
            filename: 'dist/bundle.css',
            allChunks: true,
        })
    ],
    output: {
        filename: 'dist/bundle.js',
    },
}
