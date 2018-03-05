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

const absoluteStyle = {
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
            {layers.map(
                (
                    {
                        image,
                        amount,
                        slowerScrollRate,
                        children,
                        expanded = true,
                    },
                    i
                ) => {
                    // if this is an expanded layer overwrite the top/bottom styles with negative margins
                    const expandedStyle = expanded
                        ? {
                              top: amount * 100 * -1 + '%',
                              bottom: amount * 100 * -1 + '%',
                          }
                        : {};

                    return (
                        <Parallax
                            key={`layer-${i}`}
                            offsetYMax={amount * 100 + '%'}
                            offsetYMin={amount * -1 * 100 + '%'}
                            slowerScrollRate={slowerScrollRate}
                            styleInner={absoluteStyle}
                            styleOuter={absoluteStyle}
                            disabled={disabled}
                        >
                            {image ? (
                                <div
                                    className={`parallax-banner-layer-${i}`}
                                    style={{
                                        backgroundImage: `url(${image})`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        ...absoluteStyle,
                                        ...expandedStyle,
                                    }}
                                />
                            ) : (
                                <div
                                    className={`parallax-banner-layer-${i}`}
                                    style={{
                                        ...absoluteStyle,
                                        ...expandedStyle,
                                    }}
                                >
                                    {children}
                                </div>
                            )}
                        </Parallax>
                    );
                }
            )}
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
            children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
            expanded: PropTypes.bool,
            image: PropTypes.string,
            slowerScrollRate: PropTypes.bool,
        })
    ),
    style: PropTypes.object,
};

export default ParallaxBanner;
