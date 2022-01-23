import global from 'global';
import { ZoomElement as Element } from './ZoomElement';
import { ZoomIFrame as IFrame } from './ZoomIFrame';
const {
  window: globalWindow
} = global;
export const browserSupportsCssZoom = () => {
  try {
    return globalWindow.document.implementation.createHTMLDocument('').body.style.zoom !== undefined;
  } catch (error) {
    return false;
  }
};
export const Zoom = {
  Element,
  IFrame
};