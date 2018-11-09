'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Parallax = require('./Parallax');

var _Parallax2 = _interopRequireDefault(_Parallax);

var _propValidation = require('../utils/propValidation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var constainerStyle = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '50vh'
};

var absoluteStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};

var ParallaxBanner = function ParallaxBanner(_ref) {
    var children = _ref.children,
        className = _ref.className,
        layers = _ref.layers,
        style = _ref.style,
        disabled = _ref.disabled;

    return _react2.default.createElement(
        'div',
        {
            style: _extends({}, constainerStyle, style),
            className: 'parallax-banner' + (className ? ' ' + className : '')
        },
        layers.map(function (_ref2, i) {
            var image = _ref2.image,
                amount = _ref2.amount,
                slowerScrollRate = _ref2.slowerScrollRate,
                children = _ref2.children,
                _ref2$expanded = _ref2.expanded,
                expanded = _ref2$expanded === undefined ? true : _ref2$expanded;

            // if this is an expanded layer overwrite the top/bottom styles with negative margins
            var expandedStyle = expanded ? {
                top: amount * 100 * -1 + '%',
                bottom: amount * 100 * -1 + '%'
            } : {};

            return _react2.default.createElement(
                _Parallax2.default,
                {
                    key: 'layer-' + i,
                    offsetYMax: amount * 100 + '%',
                    offsetYMin: amount * -1 * 100 + '%',
                    slowerScrollRate: slowerScrollRate,
                    styleInner: absoluteStyle,
                    styleOuter: absoluteStyle,
                    disabled: disabled
                },
                image ? _react2.default.createElement('div', {
                    className: 'parallax-banner-layer-' + i,
                    style: _extends({
                        backgroundImage: 'url(' + image + ')',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }, absoluteStyle, expandedStyle)
                }) : _react2.default.createElement(
                    'div',
                    {
                        className: 'parallax-banner-layer-' + i,
                        style: _extends({}, absoluteStyle, expandedStyle)
                    },
                    children
                )
            );
        }),
        children
    );
};

ParallaxBanner.defaultProps = {
    disabled: false
};

ParallaxBanner.propTypes = {
    className: _propTypes2.default.string,
    children: _propTypes2.default.node,
    disabled: _propTypes2.default.bool.isRequired,
    layers: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        amount: _propTypes2.default.number.isRequired,
        children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
        expanded: _propTypes2.default.bool,
        image: _propTypes2.default.string,
        slowerScrollRate: _propTypes2.default.bool
    })),
    style: _propTypes2.default.object
};

exports.default = ParallaxBanner;
module.exports = exports['default'];