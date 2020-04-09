const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const config = merge(baseConfig, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin()
    ]
})

module.exports = config