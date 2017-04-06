const PRODUCTION = process.env.NODE_ENV === 'production';

const path = require('path');
const webpack = require('webpack');
const createBabelConfig = require('./babelrc');
const nodeExternals = require('webpack-node-externals');
const MinifierPlugin = webpack.optimize.UglifyJsPlugin;

const clientConfig = {
    entry: path.resolve('./examples/client.js'),
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js',
    },

    plugins: [
        PRODUCTION && new MinifierPlugin(),
    ].filter(e => e),

    resolve: {
        alias: {
            'react-scroll-parallax': path.resolve('./src/'),
        },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve('./src'),
                    path.resolve('./examples'),
                ],
                loader: 'babel-loader',
                query: createBabelConfig(),
            },
        ],
    },
};

const serverConfig = {
    target: 'node',

    watch: true,

    externals: [nodeExternals()],

    node: {
        __dirname: true,
    },

    entry: path.resolve('./examples/server.js'),
    output: {
        path: path.resolve('./dist'),
        filename: 'server.js',
    },

    plugins: [
        PRODUCTION && new MinifierPlugin(),
    ].filter(e => e),

    resolve: {
        alias: {
            'react-scroll-parallax': path.resolve('./src/'),
        },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve('./src'),
                    path.resolve('./examples'),
                ],
                loader: 'babel-loader',
                query: createBabelConfig({ server: true }),
            },
        ],
    },
};

module.exports = [clientConfig, serverConfig];
