import React from 'react';
import PropTypes from 'prop-types';
import Parallax from './Parallax';

const containerStyle = {
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
            style={{ ...containerStyle, ...style }}
            className={'parallax-banner' + (className ? ` ${className}` : '')}
        >
            {layers.map(
                (
                    { image, amount, children: layerChildren, expanded = true },
                    i
                ) => {
                    // if this is an expanded layer overwrite the top/bottom styles with negative margins
                    const expandedStyle = expanded
                        ? {
                              top: Math.abs(amount) * 100 * -1 + '%',
                              bottom: Math.abs(amount) * 100 * -1 + '%',
                          }
                        : {};

                    return (
                        <Parallax
                            key={`layer-${i}`}
                            y={[amount * -1 * 100 + '%', amount * 100 + '%']}
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
                                    {layerChildren}
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
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    layers: PropTypes.arrayOf(
        PropTypes.shape({
            amount: PropTypes.number.isRequired,
            children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
            expanded: PropTypes.bool,
            image: PropTypes.string,
        })
    ),
    style: PropTypes.object,
};

export default ParallaxBanner;
