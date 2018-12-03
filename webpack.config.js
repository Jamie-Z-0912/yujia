const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 *从./src/pages里面读取所有的js文件。
 */
const pageFiles = fs.readdirSync('./src/pages');

const pageFileNames = [];
pageFiles.map((item) => {
    if(!/\./.test(item)){
        const sonFiles = fs.readdirSync(`./src/pages/${item}`);
        sonFiles.map((i) => {
            if (i.indexOf('.js') > 0) {
                pageFileNames.push(item+'/'+i.substr(0, i.length - 3));
            }
        });
    }else{
        if (item.indexOf('.js') > 0) {
            pageFileNames.push(item.substr(0, item.length - 3));
        }
    }
});

//多页面入口
const pageEntryList = {
    polyfill: 'babel-polyfill',
    index: './src/index.js',
};
pageFileNames.map((item)=>{
    pageEntryList[item] = `./src/pages/${item}.js`;
});

//生成多个html
const HTMLPluginList = [
    new CleanWebpackPlugin('dist',{ root: path.resolve(__dirname)}),
    new HtmlWebpackPlugin({
        title: '索引页',
        filename: 'index.html',
        template: './src/index.ejs',
        chunks: ['polyfill', 'vendor', 'index'],
        pageFileNames,
    }),
];
pageFileNames.map((item) => {
    const temp = new HtmlWebpackPlugin({
        filename: `${item}.html`,
        title:`${item}`,
        template: './src/pages/template.ejs',
        chunks: ['polyfill', 'vendor', item],
    });
    HTMLPluginList.push(temp);
});
HTMLPluginList.push( new ExtractTextPlugin('[name]-[hash:6].css',{ allChunks: true }) );

const entry = pageEntryList;
const config = {
    entry,
    output: {
        path: path.resolve(__dirname, './dist/lime'),
        filename: '[name]-[hash:6].bundle.js',
    },
    devtool: 'source-map',
    node: {
        fs: 'empty'
    },
    devServer: {
        contentBase: './dist',
        // host: '10.0.0.15',
        host: '0.0.0.0',
        proxy: {
            "/app": {
                target: "http://10.0.0.15:8080",
                secure: false, // 处理https
                changeOrigin: true,  // 跨域
            }
        }
            
    },
    optimization: {
        splitChunks: {
            chunks: 'initial',
            name: 'vendor',
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015', 'stage-0', 'env'],
                        plugins: [
                            ['import', { libraryName: 'antd-mobile', style: 'css' }],
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                exclude: /node_modules\/antd|node_modules\/react-weui/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                })
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test:/\.less/,
                exclude: /(node_modules|bower_components)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:[
                        {
                            loader: 'css-loader',
                            options:{
                                sourceMap: true,
                                // modules: true,
                                // localIdentName: '[page][name]-[local]_[hash:6]',
                            },
                        },
                        // { loader: 'postcss-loader'},
                        {
                            loader: 'less-loader',
                            options: { sourceMap: true}
                        }
                    ]
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '../src/[name]-[hash:8].[ext]',
                        },
                    },
                ],
            },
        ]
    },
    plugins: HTMLPluginList
};

module.exports = config;