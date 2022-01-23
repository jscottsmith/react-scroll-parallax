import { styled } from '@storybook/theming';
const Svg = styled.svg({
  // Fix rendering bugs in Chrome for hdpi
  shapeRendering: 'inherit',
  transform: 'translate3d(0,0,0)'
}, ({
  inline
}) => inline ? {
  display: 'inline-block'
} : {
  display: 'block'
});
Svg.displayName = 'Svg';
export { Svg as default };