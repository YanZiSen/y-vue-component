const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const glob = require('glob')
const setMPA = () => {
    const entry = {}
    const webpackPlugins = []
    const entryFiles = glob.sync(path.join(__dirname,'../examples/*/index.js'))
    entryFiles.map(filePath => {
        console.log('filePath', filePath)
        let match = filePath.match(/examples\/(.*)\/index\.js/)
        console.log('match', match)
        let fileName = match && match[1]
        entry[fileName] = filePath
        webpackPlugins.push(new HtmlWebpackPlugin({
            template: path.join(__dirname, `../examples/${fileName}/index.html`),
            chunks: [fileName],
            filename: `${fileName}.html`,
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }))
    })
    return {entry, webpackPlugins}
}
const {entry, webpackPlugins} = setMPA()
module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, '../example-dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
        }
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
            },
            {
                test: /\.css/,
                use: [
                    'style-loader', // 将css插入到html中的css中,没有此loader则组件样式不生效
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|eot|woff2?|ttf|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },

        ]
    },
    // mode: 'development',
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ].concat(webpackPlugins),
}