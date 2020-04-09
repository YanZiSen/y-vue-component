const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        'index': path.resolve(__dirname, '../src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: [{
                    loader: 'babel-loader'
                }] 
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.styl/,
                use: [
                    'css-loader', // 分离js中css
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}