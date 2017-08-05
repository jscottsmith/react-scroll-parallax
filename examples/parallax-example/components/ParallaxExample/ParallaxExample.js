import React, { Component } from 'react';
import {
    Intro,
    IntroCopy,
    Marquee,
    TriangleGrid,
    Overlap,
    Svg,
    ShapeField,
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
                <ShapeField />
                <Marquee />
                <Overlap />
                <TriangleGrid />

                {/** Shared SVG patterns */}
                <div className="visually-hidden">
                    <Svg svg={noisePattern} />
                    <Svg svg={dotPattern} />
                </div>
            </div>
        );
    }
}
