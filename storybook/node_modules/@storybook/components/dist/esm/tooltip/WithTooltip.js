import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.freeze.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.function.name.js";

var _templateObject, _templateObject2;

import "core-js/modules/es.array.from.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.for-each.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { useCallback, useState, useEffect } from 'react';
import { styled } from '@storybook/theming';
import global from 'global';
import TooltipTrigger from 'react-popper-tooltip';
import { Tooltip } from './Tooltip';
var document = global.document; // A target that doesn't speak popper

var TargetContainer = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: inline-block;\n  cursor: ", ";\n"])), function (props) {
  return props.mode === 'hover' ? 'default' : 'pointer';
});
var TargetSvgContainer = styled.g(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  cursor: ", ";\n"])), function (props) {
  return props.mode === 'hover' ? 'default' : 'pointer';
});

// Pure, does not bind to the body
var WithTooltipPure = function WithTooltipPure(_ref) {
  var svg = _ref.svg,
      trigger = _ref.trigger,
      closeOnClick = _ref.closeOnClick,
      placement = _ref.placement,
      modifiers = _ref.modifiers,
      hasChrome = _ref.hasChrome,
      _tooltip = _ref.tooltip,
      children = _ref.children,
      tooltipShown = _ref.tooltipShown,
      onVisibilityChange = _ref.onVisibilityChange,
      props = _objectWithoutProperties(_ref, ["svg", "trigger", "closeOnClick", "placement", "modifiers", "hasChrome", "tooltip", "children", "tooltipShown", "onVisibilityChange"]);

  var Container = svg ? TargetSvgContainer : TargetContainer;
  return /*#__PURE__*/React.createElement(TooltipTrigger, {
    placement: placement,
    trigger: trigger,
    modifiers: modifiers,
    tooltipShown: tooltipShown,
    onVisibilityChange: onVisibilityChange,
    tooltip: function tooltip(_ref2) {
      var getTooltipProps = _ref2.getTooltipProps,
          getArrowProps = _ref2.getArrowProps,
          tooltipRef = _ref2.tooltipRef,
          arrowRef = _ref2.arrowRef,
          tooltipPlacement = _ref2.placement;
      return /*#__PURE__*/React.createElement(Tooltip, _extends({
        hasChrome: hasChrome,
        placement: tooltipPlacement,
        tooltipRef: tooltipRef,
        arrowRef: arrowRef,
        arrowProps: getArrowProps()
      }, getTooltipProps()), typeof _tooltip === 'function' ? _tooltip({
        onHide: function onHide() {
          return onVisibilityChange(false);
        }
      }) : _tooltip);
    }
  }, function (_ref3) {
    var getTriggerProps = _ref3.getTriggerProps,
        triggerRef = _ref3.triggerRef;
    return (
      /*#__PURE__*/
      // @ts-ignore
      React.createElement(Container, _extends({
        ref: triggerRef
      }, getTriggerProps(), props), children)
    );
  });
};

WithTooltipPure.displayName = "WithTooltipPure";
WithTooltipPure.defaultProps = {
  svg: false,
  trigger: 'hover',
  closeOnClick: false,
  placement: 'top',
  modifiers: [{
    name: 'preventOverflow',
    options: {
      padding: 8
    }
  }, {
    name: 'offset',
    options: {
      offset: [8, 8]
    }
  }, {
    name: 'arrow',
    options: {
      padding: 8
    }
  }],
  hasChrome: true,
  tooltipShown: false
};

var WithToolTipState = function WithToolTipState(_ref4) {
  var startOpen = _ref4.startOpen,
      onChange = _ref4.onVisibilityChange,
      rest = _objectWithoutProperties(_ref4, ["startOpen", "onVisibilityChange"]);

  var _useState = useState(startOpen || false),
      _useState2 = _slicedToArray(_useState, 2),
      tooltipShown = _useState2[0],
      setTooltipShown = _useState2[1];

  var onVisibilityChange = useCallback(function (visibility) {
    if (onChange && onChange(visibility) === false) return;
    setTooltipShown(visibility);
  }, [onChange]);
  useEffect(function () {
    var hide = function hide() {
      return onVisibilityChange(false);
    };

    document.addEventListener('keydown', hide, false); // Find all iframes on the screen and bind to clicks inside them (waiting until the iframe is ready)

    var iframes = Array.from(document.getElementsByTagName('iframe'));
    var unbinders = [];
    iframes.forEach(function (iframe) {
      var bind = function bind() {
        try {
          if (iframe.contentWindow.document) {
            iframe.contentWindow.document.addEventListener('click', hide);
            unbinders.push(function () {
              try {
                iframe.contentWindow.document.removeEventListener('click', hide);
              } catch (e) {// logger.debug('Removing a click listener from iframe failed: ', e);
              }
            });
          }
        } catch (e) {// logger.debug('Adding a click listener to iframe failed: ', e);
        }
      };

      bind(); // I don't know how to find out if it's already loaded so I potentially will bind twice

      iframe.addEventListener('load', bind);
      unbinders.push(function () {
        iframe.removeEventListener('load', bind);
      });
    });
    return function () {
      document.removeEventListener('keydown', hide);
      unbinders.forEach(function (unbind) {
        unbind();
      });
    };
  });
  return /*#__PURE__*/React.createElement(WithTooltipPure, _extends({}, rest, {
    tooltipShown: tooltipShown,
    onVisibilityChange: onVisibilityChange
  }));
};

WithToolTipState.displayName = "WithToolTipState";
export { WithTooltipPure, WithToolTipState, WithToolTipState as WithTooltip };