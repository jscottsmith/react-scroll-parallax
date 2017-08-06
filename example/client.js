import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { ParallaxTest } from 'components';
import { ParallaxController } from 'react-scroll-parallax';

ParallaxController.init();

const root = document.getElementById('root');

ReactDOM.render(<ParallaxTest />, root);
