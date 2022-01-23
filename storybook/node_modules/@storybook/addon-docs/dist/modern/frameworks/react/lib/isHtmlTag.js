import htmlTags from 'html-tags';
export function isHtmlTag(tagName) {
  return htmlTags.includes(tagName.toLowerCase());
}