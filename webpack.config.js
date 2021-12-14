const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// if(process.env.NODE_ENV === 'development'){
//     require('dotenv').config({path: './config/dev.env'});
// }

module.exports = (env) => {
    const isProduction = env === 'production';
    return {
        // entry:['babel-polyfill', './src/index.js'],
        entry:'./src/index.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js',
            // filename: '[name].bundle.js',
            // chunkFilename: '[name].bundle.js'
        },
        // optimization: {
        //     splitChunks: {
        //         chunks: 'all',
        //     },
        // },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: [".js", ".jsx"]
                  },
            },
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: {sourceMap: true}
                },{
                    loader: 'sass-loader',
                    options: {sourceMap: true}
                }]
            },
            {
                test: /\.svg/,
                use: ["@svgr/webpack"],
              },
        ]},
        // resolve: {
        //     extensions: [ '.js', '.jsx'],
        // },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles_bundle.css',
                chunkFilename: "styles/[id].css"
            }),
            
            //For webpack loading baseurl values 
            //from our environment dev file or env values while deploying.
            
            // new webpack.DefinePlugin({
            //     'process.env.BASEURL': JSON.stringify(process.env.BASEURL)  
            // })
        //here, first one is the name given to the value. 
        //Second is the converting the value taken from the dev.env file to string and assigning it to the first.
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            // contentBase: path.join(__dirname, 'public'),

            //For redirect to / on 404.
            historyApiFallback: true,
            
            static: {
                directory: path.join(__dirname, 'public'),

                //our baseurl to which we want to serve our bundle:
                // publicPath: '/dist/',
                
                // publicPath: '/',
                },
                // compress: true,
                // devMiddleware: {
                //     index: true,
                //     publicPath: '/dist/',
                //     writeToDisk: true,
                //   },
                // port: 3000,
        }
    }
}