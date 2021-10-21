
const DotEnv = require('dotenv');
const {merge} = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./base.config.js');
DotEnv.config({path: '.env.prod'});
const path = require('path');



module.exports = merge(baseConfig, {
    output: {
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[id]/[chunkhash].js'
    },
    mode: 'production',
    devTool: 'source-map',
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                },
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        },
        minimize: [
            new OptimizeCssAssetPlugin({}),
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/index.html'),
            template: 'index.html',
            inject: true,
            minify:{
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new HtmlWebPackPlugin({
            filename: path.resolve(__dirname, '../dist/404.html'),
            template: '404.html',
            inject: true,
            minify:{
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        // new CopyWebackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../static'),
        //         to: 'static',
        //         ignore: ['*']
        //     }
        // ]),
        new webpack.DefinePlugin({
            'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
            'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
            'process.env.FIREBASE_DB_URL': JSON.stringify(process.env.FIREBASE_DB_URL),
            'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
            'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
            'process.env.FIREBASE_MSG_SENDER_ID': JSON.stringify(process.env.FIREBASE_MSG_SENDER_ID),
            'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
        }),
        new WorkboxPlugin.GenerateSW({
            cacheId: 'Jezishoreke',
            swDest: 'sw.js',
            navigateFallback: '/index.html',
            navigateFallbackWhitelist: [/^\/[^\_]+\/?/],
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [{
                urlPattern: new RegExp('https://fonts.(?.googleapis|gstatic).com/(.*)'),
                handler: 'CacheFirst'
            },
            {
                urlPattern: new RegExp(process.env.FIREBASE_DB_URL),
                handler: 'NetworkFirst'
            }, 
            {
                urlPattern: /.*/,
                handler: 'NetworkFirst'
            }]
            })
        ]
});

