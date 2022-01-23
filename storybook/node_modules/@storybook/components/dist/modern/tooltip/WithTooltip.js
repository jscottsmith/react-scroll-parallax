function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback, useState, useEffect } from 'react';
import { styled } from '@storybook/theming';
import global from 'global';
import TooltipTrigger from 'react-popper-tooltip';
import { Tooltip } from './Tooltip';
const {
  document
} = global; // A target that doesn't speak popper

const TargetContainer = styled.div`
  display: inline-block;
  cursor: ${props => props.mode === 'hover' ? 'default' : 'pointer'};
`;
const TargetSvgContainer = styled.g`
  cursor: ${props => props.mode === 'hover' ? 'default' : 'pointer'};
`;

// Pure, does not bind to the body
const WithTooltipPure = (_ref) => {
  let {
    svg,
    trigger,
    placement,
    modifiers,
    hasChrome,
    tooltip,
    children,
    tooltipShown,
    onVisibilityChange
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["svg", "trigger", "closeOnClick", "placement", "modifiers", "hasChrome", "tooltip", "children", "tooltipShown", "onVisibilityChange"]);

  const Container = svg ? TargetSvgContainer : TargetContainer;
  return /*#__PURE__*/React.createElement(TooltipTrigger, {
    placement: placement,
    trigger: trigger,
    modifiers: modifiers,
    tooltipShown: tooltipShown,
    onVisibilityChange: onVisibilityChange,
    tooltip: ({
      getTooltipProps,
      getArrowProps,
      tooltipRef,
      arrowRef,
      placement: tooltipPlacement
    }) => /*#__PURE__*/React.createElement(Tooltip, _extends({
      hasChrome: hasChrome,
      placement: tooltipPlacement,
      tooltipRef: tooltipRef,
      arrowRef: arrowRef,
      arrowProps: getArrowProps()
    }, getTooltipProps()), typeof tooltip === 'function' ? tooltip({
      onHide: () => onVisibilityChange(false)
    }) : tooltip)
  }, ({
    getTriggerProps,
    triggerRef
  }) =>
  /*#__PURE__*/
  // @ts-ignore
  React.createElement(Container, _extends({
    ref: triggerRef
  }, getTriggerProps(), props), children));
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

const WithToolTipState = (_ref2) => {
  let {
    startOpen,
    onVisibilityChange: onChange
  } = _ref2,
      rest = _objectWithoutPropertiesLoose(_ref2, ["startOpen", "onVisibilityChange"]);

  const [tooltipShown, setTooltipShown] = useState(startOpen || false);
  const onVisibilityChange = useCallback(visibility => {
    if (onChange && onChange(visibility) === false) return;
    setTooltipShown(visibility);
  }, [onChange]);
  useEffect(() => {
    const hide = () => onVisibilityChange(false);

    document.addEventListener('keydown', hide, false); // Find all iframes on the screen and bind to clicks inside them (waiting until the iframe is ready)

    const iframes = Array.from(document.getElementsByTagName('iframe'));
    const unbinders = [];
    iframes.forEach(iframe => {
      const bind = () => {
        try {
          if (iframe.contentWindow.document) {
            iframe.contentWindow.document.addEventListener('click', hide);
            unbinders.push(() => {
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
      unbinders.push(() => {
        iframe.removeEventListener('load', bind);
      });
    });
    return () => {
      document.removeEventListener('keydown', hide);
      unbinders.forEach(unbind => {
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