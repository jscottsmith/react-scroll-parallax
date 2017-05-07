import React from 'react';
import style from './TriangleGrid.scss';
import { Svg } from 'components';
import { Parallax } from 'react-scroll-parallax';
import gridPurple from '!!raw-loader!./grid-purple.svg';
import gridWhite from '!!raw-loader!./grid-white.svg';
import angleTop from '!!raw-loader!../shared/angle-dark-top.svg';

const TriangleGrid = () => (
    <div className={style.root}>
        <Svg
            svg={angleTop}
            className={style.angleTop}
        />
        <div className={style.container}>
            <Parallax
                offsetYMax={25}
                offsetYMin={-25}
            >
                <Svg
                    svg={gridPurple}
                    className={style.trianglesPurple}
                />
            </Parallax>
            <Parallax
                offsetYMax={50}
                offsetYMin={-50}
                offsetXMax={13}
                offsetXMin={-13}
            >
                <Svg
                    svg={gridWhite}
                    className={style.trianglesWhite}
                />
            </Parallax>
        </div>
    </div>
);

export default TriangleGrid;
