const ROOT = './example/';
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

const baseConfig = {
    resolve: {
        alias: {
            'react-scroll-parallax': path.resolve('./src'),
            components: path.resolve(ROOT + 'components'),
        },
    },
};

const clientConfig = merge(baseConfig, {
    entry: path.resolve(ROOT + 'client.js'),

    output: {
        path: path.resolve(ROOT + 'dist'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(ROOT), path.resolve('./src')],
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                include: [path.resolve(ROOT)],
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

    entry: path.resolve(ROOT + 'server.js'),

    output: {
        path: path.resolve(ROOT + 'dist'),
        filename: 'server.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(ROOT), path.resolve('./src')],
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                include: [path.resolve(ROOT)],
                loaders: [
                    {
                        loader: 'css-loader/locals',
                        query: {
                            localIdentName: '[name]_[local]_[hash:base64:3]',
                            sourceMap: false,
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

module.exports = [clientConfig, serverConfig];
