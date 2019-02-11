import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

const Container = ({ children, scrollAxis }) => (
    <ParallaxProvider scrollAxis={scrollAxis}>
        <div className={scrollAxis}>
            <div className="elements">{children}</div>
        </div>
    </ParallaxProvider>
);

export default Container;
