const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = (env) => {
    const {isProduction} = env;
    return {
        entry:'./src/index.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js',
        },
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
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles_bundle.css',
                chunkFilename: "styles/[id].css"
            }),
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            historyApiFallback: true,
            
            static: {
                directory: path.join(__dirname, 'public'),
                },
        }
    }
}