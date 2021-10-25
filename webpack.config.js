const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports =  {
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, 
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use:[
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'postcss-loader'],
         },
         {
             test: /\.jsx?$/,
             use: ['babel-loader', 'astroturf/loader'],
         }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: "index.html",
            filename: "index.html"
        })
    ]
};