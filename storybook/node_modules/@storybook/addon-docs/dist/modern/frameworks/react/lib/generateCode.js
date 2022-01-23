import { generate } from 'escodegen';
import dedent from 'ts-dedent';
const BASIC_OPTIONS = {
  format: {
    indent: {
      style: '  '
    },
    semicolons: false
  }
};
const COMPACT_OPTIONS = Object.assign({}, BASIC_OPTIONS, {
  format: {
    newline: ''
  }
});
const PRETTY_OPTIONS = Object.assign({}, BASIC_OPTIONS);
export function generateCode(ast, compact = false) {
  return generate(ast, compact ? COMPACT_OPTIONS : PRETTY_OPTIONS);
}
export function generateObjectCode(ast, compact = false) {
  return !compact ? generateCode(ast) : generateCompactObjectCode(ast);
}

function generateCompactObjectCode(ast) {
  let result = generateCode(ast, true); // Cannot get escodegen to add a space before the last } with the compact mode settings.
  // Fix it until a better solution is found.

  if (!result.endsWith(' }')) {
    result = `${result.slice(0, -1)} }`;
  }

  return result;
}

export function generateArrayCode(ast, compact = false) {
  return !compact ? generateMultilineArrayCode(ast) : generateCompactArrayCode(ast);
}

function generateMultilineArrayCode(ast) {
  let result = generateCode(ast); // escodegen add extra spacing before the closing bracket of a multiple line array with a nested object.
  // Fix it until a better solution is found.

  if (result.endsWith('  }]')) {
    result = dedent(result);
  }

  return result;
}

function generateCompactArrayCode(ast) {
  let result = generateCode(ast, true); // escodegen add extra an extra before the opening bracket of a compact array that contains primitive values.
  // Fix it until a better solution is found.

  if (result.startsWith('[    ')) {
    result = result.replace('[    ', '[');
  }

  return result;
}