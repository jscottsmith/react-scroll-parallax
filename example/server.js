import path from 'path';
import fs from 'fs';
import express from 'express';

import React from 'react';
import ReactServer from 'react-dom/server';
import { App } from 'components';

import 'babel-polyfill';

const server = express();

server.use('/static', express.static(path.resolve(__dirname, './dist')));

server.get('*', (req, res) => {
    const html = fs
        .readFileSync(path.resolve(__dirname, './index.html'))
        .toString();

    const markup = ReactServer.renderToString(<App />);

    res.send(html.replace('$react', markup));
});

server.listen(3000, () => {
    console.log('Listening on: http://localhost:3000');
});
