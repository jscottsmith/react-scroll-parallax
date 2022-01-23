import global from 'global';
const {
  window: globalWindow
} = global;
export function browserSupportsCssZoom() {
  try {
    return globalWindow.document.implementation.createHTMLDocument('').body.style.zoom !== undefined;
  } catch (error) {
    return false;
  }
}