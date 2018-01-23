// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require('path');
const SRC = path.resolve('./src');
const STORIES = path.resolve('./stories');

module.exports = {
    plugins: [
        // your custom plugins
    ],

    resolve: {
        alias: {
            'react-scroll-parallax': SRC,
            components: path.resolve(SRC + 'components'),
        },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: SRC,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                include: STORIES,
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
