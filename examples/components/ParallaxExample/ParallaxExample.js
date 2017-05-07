import React, { Component } from 'react';
import {
	Intro,
	IntroCopy,
    Marquee,
    TriangleGrid,
    Overlap,
    Svg,
} from 'components';

import style from './ParallaExample.scss';

import noisePattern from '!!raw-loader!../shared/noise-pattern.svg';
import dotPattern from '!!raw-loader!../shared/dot-pattern.svg';

export default class ParallaxExample extends Component {

    render() {
        return (
            <div className={style.root}>
                <Intro />
                <IntroCopy />
                <Marquee />
                <Overlap />
                <TriangleGrid />

                <Svg svg={noisePattern} />
                <Svg svg={dotPattern} />
            </div>
        );
    }

}
