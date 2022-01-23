import Draggable from 'react-draggable';
import { styled } from '@storybook/theming';
const Handle = styled.div(({
  theme,
  isDragging
}) => ({
  zIndex: 10,
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: isDragging ? theme.color.secondary : theme.appBorderColor,
  overflow: 'hidden',
  transition: 'color 0.2s linear, background-position 0.2s linear, background-size 0.2s linear, background 0.2s linear',
  '&:hover': {
    color: theme.color.secondary
  }
}), ({
  axis
}) => ({
  cursor: axis === 'x' ? 'col-resize' : 'row-resize'
}), ({
  theme,
  axis
}) => axis === 'x' ? {
  height: '100%',
  width: theme.layoutMargin,
  marginLeft: 0
} : {
  height: theme.layoutMargin,
  width: '100%',
  marginTop: 0
}, ({
  axis,
  isDragging
}) => {
  if (axis === 'y') {
    const style = {
      backgroundImage: `radial-gradient(at center center,rgba(0,0,0,0.2) 0%,transparent 70%,transparent 100%)`,
      backgroundSize: '100% 50px',
      backgroundPosition: '50% 0',
      backgroundRepeat: 'no-repeat'
    };
    return isDragging ? style : Object.assign({}, style, {
      backgroundPosition: '50% 10px',
      '&:hover': style
    });
  }

  if (axis === 'x') {
    const style = {
      backgroundImage: `radial-gradient(at center center,rgba(0,0,0,0.2) 0%,transparent 70%,transparent 100%)`,
      backgroundSize: '50px 100%',
      backgroundPosition: '0 50%',
      backgroundRepeat: 'no-repeat'
    };
    return isDragging ? style : Object.assign({}, style, {
      backgroundPosition: '10px 50%',
      '&:hover': style
    });
  }

  return {};
});
export { Draggable, Handle };