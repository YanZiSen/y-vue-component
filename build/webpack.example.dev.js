const merge = require('webpack-merge')
const baseConfig = require('./webpack.example.base')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        contentBase: '../example-dist', // server 的根目录
        hot: true
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ]
})