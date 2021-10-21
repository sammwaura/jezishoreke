const baseConfig = require('./base.config.js');
const DotEnv = require('dotenv');
const {merge} = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');




DotEnv.config({path: 'env.dev'});

module.exports = merge(baseConfig,{
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: false,
        publicPath: '/',
        historyApiFallback: true,
        clientLevel: 'warning',
        compress: true
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true 
        })
    ]
})
