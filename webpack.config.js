// Change this root to point to the desired example when
const EXAMPLE_ROOT = './examples/parallax-example/';

const createBabelConfig = require('./babelrc');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

const baseConfig = {
    resolve: {
        alias: {
            'react-scroll-parallax': path.resolve('./src'),
            'components': path.resolve(EXAMPLE_ROOT + 'components'),
        },
    },
};

const clientConfig = merge(baseConfig, {
    entry: path.resolve(EXAMPLE_ROOT + 'client.js'),

    output: {
        path: path.resolve(
            EXAMPLE_ROOT + 'dist'
        ),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(EXAMPLE_ROOT),
                    path.resolve('./src'),
                ],
                loader: 'babel-loader',
                query: createBabelConfig(),
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|cur)$/,
                loader: 'url-loader',
                include: [
                    path.resolve(EXAMPLE_ROOT),
                ],
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(EXAMPLE_ROOT),
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
});

const serverConfig = merge(baseConfig, {
    target: 'node',

    watch: true,

    externals: [nodeExternals()],

    node: {
        __dirname: true,
    },

    entry: path.resolve(EXAMPLE_ROOT + 'server.js'),

    output: {
        path: path.resolve(
            EXAMPLE_ROOT + 'dist'
        ),
        filename: 'server.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(EXAMPLE_ROOT),
                    path.resolve('./src'),
                ],
                loader: 'babel-loader',
                query: createBabelConfig({ server: true }),
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(EXAMPLE_ROOT),
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
});

module.exports = [clientConfig, serverConfig];
