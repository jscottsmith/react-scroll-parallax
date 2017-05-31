const PRODUCTION = process.env.NODE_ENV === 'production';

const path = require('path');
const webpack = require('webpack');
const createBabelConfig = require('./babelrc');
const nodeExternals = require('webpack-node-externals');

const exampleRoot = './examples/parallax-example/';

const clientConfig = {
    entry: path.resolve(exampleRoot + 'client.js'),
    output: {
        path: path.resolve(
            PRODUCTION ? exampleRoot + 'static' : exampleRoot + 'dist'
        ),
        filename: 'bundle.js',
    },

    resolve: {
        alias: {
            'react-scroll-parallax': path.resolve('./src'),
            'components': path.resolve(exampleRoot + 'components'),
        },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(exampleRoot),
                    path.resolve('./src'),
                ],
                loader: 'babel-loader',
                query: createBabelConfig(),
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|cur)$/,
                loader: 'url-loader',
                include: [
                    path.resolve(exampleRoot),
                ],
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(exampleRoot),
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

    entry: path.resolve(exampleRoot + 'server.js'),
    output: {
        path: path.resolve(
            PRODUCTION ? exampleRoot + 'static' : exampleRoot + 'dist'
        ),
        filename: 'server.js',
    },

    resolve: {
        alias: {
            'react-scroll-parallax': path.resolve('./src'),
            'components': path.resolve(exampleRoot + 'components'),
        },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(exampleRoot),
                    path.resolve('./src'),
                ],
                loader: 'babel-loader',
                query: createBabelConfig({ server: true }),
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(exampleRoot),
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

module.exports = PRODUCTION ? [clientConfig] : [clientConfig, serverConfig];
