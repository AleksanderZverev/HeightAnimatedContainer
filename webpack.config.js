const path = require("path");
const webpack = require('webpack');
const ForkTypeCheckPlugin = require("fork-ts-checker-webpack-plugin");
const dotenv = require('dotenv').config();

module.exports = {
    devtool: "source-map",
    entry: "./src/index.ts",
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, "./build/"),
        filename: "bundle.[fullhash].js",
    },

    devtool: "inline-source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css"],
        alias: {
            src: path.resolve(__dirname, "src"),
        },
        modules: ["node_modules"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                },
            },
        ],
    },
    plugins: [
        new ForkTypeCheckPlugin(),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.parsed),
          }),
    ],
    devServer: {
        port: 5000,
        historyApiFallback: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
        },
        proxy: {
            "/api": {
                target: "http://localhost:5000"
            },
        },
    },
};