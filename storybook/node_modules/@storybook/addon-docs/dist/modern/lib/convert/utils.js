const QUOTE_REGEX = /^['"]|['"]$/g;
export const trimQuotes = str => str.replace(QUOTE_REGEX, '');