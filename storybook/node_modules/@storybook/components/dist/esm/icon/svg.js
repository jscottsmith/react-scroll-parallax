import { styled } from '@storybook/theming';
var Svg = styled.svg({
  // Fix rendering bugs in Chrome for hdpi
  shapeRendering: 'inherit',
  transform: 'translate3d(0,0,0)'
}, function (_ref) {
  var inline = _ref.inline;
  return inline ? {
    display: 'inline-block'
  } : {
    display: 'block'
  };
});
Svg.displayName = 'Svg';
export { Svg as default };