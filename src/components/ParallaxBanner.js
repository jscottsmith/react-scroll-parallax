import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Parallax from './Parallax';
import { offsetMin, offsetMax } from '../utils/propValidation';

const constainerStyle = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '50vh',
};

const absolute = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
};

const ParallaxBanner = ({ children, className, layers, style, disabled }) => {
    return (
        <div
            style={{ ...constainerStyle, ...style }}
            className={'parallax-banner' + (className ? ` ${className}` : '')}
        >
            {layers.map((layer, i) => (
                <Parallax
                    key={`layer-${i}`}
                    offsetYMax={layer.amount * 100 + '%'}
                    offsetYMin={layer.amount * -1 * 100 + '%'}
                    slowerScrollRate={layer.slowerScrollRate}
                    styleInner={absolute}
                    styleOuter={absolute}
                    disabled={disabled}
                >
                    <div
                        className={`parallax-banner-layer-${i}`}
                        style={{
                            backgroundImage: `url(${layer.image})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            ...absolute,
                            top: layer.amount * 100 * -1 + '%',
                            bottom: layer.amount * 100 * -1 + '%',
                        }}
                    />
                </Parallax>
            ))}
            {children}
        </div>
    );
};

ParallaxBanner.defaultProps = {
    disabled: false,
};

ParallaxBanner.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool.isRequired,
    layers: PropTypes.arrayOf(
        PropTypes.shape({
            amount: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            slowerScrollRate: PropTypes.bool,
        })
    ),
    style: PropTypes.object,
};

export default ParallaxBanner;
