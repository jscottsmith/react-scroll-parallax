import 'babel-polyfill';
import 'intersection-observer';

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'components';

const root = document.getElementById('root');

ReactDOM.hydrate(<App />, root);
