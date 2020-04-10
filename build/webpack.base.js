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
        library: 'ysmallView',
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
                    'style-loader', // 将css插入到html中的css中,没有此loader则组件样式不生效
                    'css-loader', // 处理js中 import‘css’将css处理成commonjs模块引入js中
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}