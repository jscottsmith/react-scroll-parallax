import global from 'global';
var globalWindow = global.window;
export function browserSupportsCssZoom() {
  try {
    return globalWindow.document.implementation.createHTMLDocument('').body.style.zoom !== undefined;
  } catch (error) {
    return false;
  }
}