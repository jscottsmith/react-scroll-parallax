import React, { Component } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { Svg } from 'components';

import style from './ShapeField.scss';

import cluster01HemiLeft from '!!raw-loader!./cluster-01-hemi-left.svg';
import cluster01HemiRight from '!!raw-loader!./cluster-01-hemi-right.svg';
import cluster01Rect from '!!raw-loader!./cluster-01-rect.svg';

import cluster02Hemi from '!!raw-loader!./cluster-02-hemi.svg';
import cluster02TriangleBig from '!!raw-loader!./cluster-02-triangle-big.svg';
import cluster02TriangleSmall
    from '!!raw-loader!./cluster-02-triangle-small.svg';

import cluster03TriangleTop from '!!raw-loader!./cluster-03-triangle-top.svg';
import cluster03TriangleBottom
    from '!!raw-loader!./cluster-03-triangle-bottom.svg';
import cluster03TriangleBig from '!!raw-loader!./cluster-03-triangle-big.svg';

import cluster04Triangle from '!!raw-loader!./cluster-04-triangle.svg';
import cluster04Square from '!!raw-loader!./cluster-04-square.svg';
import cluster04HemiRight from '!!raw-loader!./cluster-04-hemi-right.svg';

export default class ShapeField extends Component {
    render() {
        return (
            <div className={style.root}>

                <div className={style.shapeCluster01}>
                    <Parallax
                        offsetYMax={100}
                        offsetYMin={-100}
                        className="hemi-left"
                        slowerScrollRate
                    >
                        <Svg svg={cluster01HemiLeft} />
                    </Parallax>
                    <Svg svg={cluster01Rect} />
                    <Parallax
                        offsetYMax={100}
                        offsetYMin={-100}
                        className="hemi-right"
                    >
                        <Svg svg={cluster01HemiRight} />
                    </Parallax>
                </div>

                <div className={style.shapeCluster02}>
                    <Svg svg={cluster02Hemi} className="hemi" />
                    <Parallax
                        offsetYMax={30}
                        offsetYMin={-30}
                        className="triangle-big"
                    >
                        <Svg svg={cluster02TriangleBig} />
                    </Parallax>
                    <Parallax
                        offsetYMax={30}
                        offsetYMin={-30}
                        className="triangle-small"
                        slowerScrollRate
                    >
                        <Svg svg={cluster02TriangleSmall} />
                    </Parallax>
                </div>

                <div className={style.shapeCluster03}>
                    <Parallax
                        offsetYMax={60}
                        offsetYMin={-20}
                        className="triangle-top"
                        slowerScrollRate
                    >
                        <Svg svg={cluster03TriangleTop} />
                    </Parallax>

                    <Svg
                        svg={cluster03TriangleBottom}
                        className="triangle-top"
                    />
                    <Parallax
                        offsetYMax={60}
                        offsetYMin={-60}
                        className="triangle-big"
                    >
                        <Svg svg={cluster03TriangleBig} />
                    </Parallax>
                </div>

                <div className={style.shapeCluster04}>
                    <Svg svg={cluster04Square} className="square" />
                    <Parallax
                        offsetYMax={60}
                        offsetYMin={-60}
                        className="triangle"
                    >
                        <Svg svg={cluster04Triangle} />
                    </Parallax>
                    <Parallax
                        offsetYMax={30}
                        offsetYMin={-30}
                        className="hemi-right"
                    >
                        <Svg svg={cluster04HemiRight} />
                    </Parallax>
                </div>

            </div>
        );
    }
}
