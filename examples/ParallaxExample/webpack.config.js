const PRODUCTION = process.env.NODE_ENV === 'production';

const path = require('path');
const webpack = require('webpack');
const createBabelConfig = require('./babelrc');
const nodeExternals = require('webpack-node-externals');
const MinifierPlugin = webpack.optimize.UglifyJsPlugin;

const clientConfig = {
    entry: path.resolve('./client.js'),
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js',
    },

    plugins: [
        PRODUCTION && new MinifierPlugin(),
    ].filter(e => e),

    resolve: {
        alias: {
            'react-scroll-parallax': path.resolve('../../src'),
            'components': path.resolve('./components'),
        },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve('./'),
                    path.resolve('../../src'),
                ],
                loader: 'babel-loader',
                query: createBabelConfig(),
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|cur)$/,
                loader: 'url-loader',
                include: [
                    path.resolve('./'),
                ],
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve('./'),
                ],
                loaders: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        query: {
                            localIdentName: '[name]_[local]_[hash:base64:3]',
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        query: {
                            outputStyle: 'expanded',
                        },
                    },
                ],
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

    entry: path.resolve('./server.js'),
    output: {
        path: path.resolve('./dist'),
        filename: 'server.js',
    },

    plugins: [
        PRODUCTION && new MinifierPlugin(),
    ].filter(e => e),

    resolve: {
        alias: {
            'react-scroll-parallax': path.resolve('../../src/'),
            'components': path.resolve('./components'),
        },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve('./'),
                    path.resolve('../../src'),
                ],
                loader: 'babel-loader',
                query: createBabelConfig({ server: true }),
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve('./'),
                ],
                loaders: [
                    {
                        loader: 'css-loader/locals',
                        query: {
                            localIdentName: '[name]_[local]_[hash:base64:3]',
                            sourceMap: false,
                        },
                    },
                    'postcss-loader', {
                        loader: 'sass-loader',
                        query: {
                            outputStyle: 'expanded',
                        },
                    },
                ],
            },
        ],
    },
};

module.exports = [clientConfig, serverConfig];
