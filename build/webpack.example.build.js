const merge = require('webpack-merge')
const baseConfig = require('./webpack.example.base')

const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = merge(baseConfig, {
    plugins: [
        new CleanWebpackPlugin()
    ],
    mode: 'production'
})