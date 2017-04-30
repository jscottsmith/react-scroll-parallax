import React from 'react';
import style from './Marquee.scss';
import { Svg } from 'components';
import { Parallax } from 'react-scroll-parallax';
import boxBg from '!!raw-loader!./box-bg.svg';
import boxOutline from '!!raw-loader!./box-outline.svg';

const Marquee = () => (
    <div className={style.root}>
        <Parallax
            offsetYMax={20}
            offsetYMin={-20}
            slowerScrollRate
        >
            <hr className={style.hr} />
        </Parallax>
        <div className={style.container}>
            <Svg
                svg={boxBg}
                className={style.boxBg}
            />
            <Parallax
                className={style.text}
                offsetYMax={70}
                offsetYMin={-70}
                offsetXMax={-20}
                offsetXMin={20}
            >
                <h1>
                    Slide
                </h1>
            </Parallax>
            <Parallax
                className={style.boxOutline}
                offsetYMax={35}
                offsetYMin={-35}
            >
                <Svg svg={boxOutline} />
            </Parallax>
        </div>
    </div>
);

export default Marquee;
