import React from 'react';
import style from './Intro.scss';
import { Svg } from 'components';
import { Parallax } from 'react-scroll-parallax';
import ring from '!!raw-loader!./ring-of-dots.svg';
import hemispheres from '!!raw-loader!./hemispheres.svg';

const Intro = () => (
    <div className={style.root}>
        <div className={style.container}>
            <Parallax offsetYMin={-100} offsetYMax={100} className={style.ring}>
                <Svg svg={ring} />
            </Parallax>
            <Parallax offsetYMin={-50} offsetYMax={50} className={style.circle}>
                <div className={style.circleInner} />
            </Parallax>
            <Svg className={style.hemispheres} svg={hemispheres} />
        </div>
        <p className={style.scroll}>Scroll</p>
    </div>
);

export default Intro;
