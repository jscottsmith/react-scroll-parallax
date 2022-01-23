import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import htmlTags from 'html-tags';
export function isHtmlTag(tagName) {
  return htmlTags.includes(tagName.toLowerCase());
}