import global from 'global';
import { ZoomElement as Element } from './ZoomElement';
import { ZoomIFrame as IFrame } from './ZoomIFrame';
var globalWindow = global.window;
export var browserSupportsCssZoom = function browserSupportsCssZoom() {
  try {
    return globalWindow.document.implementation.createHTMLDocument('').body.style.zoom !== undefined;
  } catch (error) {
    return false;
  }
};
export var Zoom = {
  Element: Element,
  IFrame: IFrame
};