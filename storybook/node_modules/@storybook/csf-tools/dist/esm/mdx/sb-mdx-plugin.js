function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import "core-js/modules/es.array.find.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.split.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.string.trim.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.from.js";
import { toJSX } from '@mdx-js/mdx/mdx-hast-to-jsx';
import { parse, parseExpression } from '@babel/parser';
import * as t from '@babel/types';
import generate from '@babel/generator';
import camelCase from 'lodash/camelCase';
import jsStringEscape from 'js-string-escape'; // Defined in MDX2.0

// Generate the MDX as is, but append named exports for every
// story in the contents
var STORY_REGEX = /^<Story[\s>]/;
var CANVAS_REGEX = /^<(Preview|Canvas)[\s>]/;
var META_REGEX = /^<Meta[\s>]/;
var RESERVED = /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|await|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/;

function getAttr(elt, what) {
  var attr = elt.attributes.find(function (n) {
    return n.name.name === what;
  });
  return attr === null || attr === void 0 ? void 0 : attr.value;
}

var isReserved = function isReserved(name) {
  return RESERVED.exec(name);
};

var startsWithNumber = function startsWithNumber(name) {
  return /^\d/.exec(name);
};

var sanitizeName = function sanitizeName(name) {
  var key = camelCase(name);

  if (startsWithNumber(key)) {
    key = "_".concat(key);
  } else if (isReserved(key)) {
    key = "".concat(key, "Story");
  }

  return key;
};

var getStoryKey = function getStoryKey(name, counter) {
  return name ? sanitizeName(name) : "story".concat(counter);
};

function genAttribute(key, element) {
  var value = getAttr(element, key);

  if (t.isJSXExpressionContainer(value)) {
    var _generate = generate(value.expression, {}),
        code = _generate.code;

    return code;
  }

  return undefined;
}

function genImportStory(ast, storyDef, storyName, context) {
  var _generate2 = generate(storyDef.expression, {}),
      story = _generate2.code;

  var storyKey = "_".concat(story.split('.').pop(), "_");
  var statements = ["export const ".concat(storyKey, " = ").concat(story, ";")];

  if (storyName) {
    context.storyNameToKey[storyName] = storyKey;
    statements.push("".concat(storyKey, ".storyName = '").concat(storyName, "';"));
  } else {
    context.storyNameToKey[storyKey] = storyKey;
    ast.openingElement.attributes.push(t.jsxAttribute(t.jsxIdentifier('name'), t.stringLiteral(storyKey)));
  }

  return _defineProperty({}, storyKey, statements.join('\n'));
}

function getBodyPart(bodyNode, context) {
  var body = t.isJSXExpressionContainer(bodyNode) ? bodyNode.expression : bodyNode;
  var sourceBody = body;

  if (t.isCallExpression(body) && t.isMemberExpression(body.callee) && t.isIdentifier(body.callee.object) && t.isIdentifier(body.callee.property) && body.callee.property.name === 'bind' && (body.arguments.length === 0 || body.arguments.length === 1 && t.isObjectExpression(body.arguments[0]) && body.arguments[0].properties.length === 0)) {
    var bound = body.callee.object.name;
    var namedExport = context.namedExports[bound];

    if (namedExport) {
      sourceBody = namedExport;
    }
  }

  var _generate3 = generate(body, {}),
      storyCode = _generate3.code;

  var _generate4 = generate(sourceBody, {}),
      sourceCode = _generate4.code;

  return {
    storyCode: storyCode,
    sourceCode: sourceCode,
    body: body
  };
}

var idOrNull = function idOrNull(attr) {
  return t.isStringLiteral(attr) ? attr.value : null;
};

var expressionOrNull = function expressionOrNull(attr) {
  return t.isJSXExpressionContainer(attr) ? attr.expression : null;
};

function genStoryExport(ast, context) {
  var storyName = idOrNull(getAttr(ast.openingElement, 'name'));
  var storyId = idOrNull(getAttr(ast.openingElement, 'id'));
  var storyRef = getAttr(ast.openingElement, 'story');

  if (!storyId && !storyName && !storyRef) {
    throw new Error('Expected a Story name, id, or story attribute');
  } // We don't generate exports for story references or the smart "current story"


  if (storyId) {
    return null;
  }

  if (storyRef) {
    return genImportStory(ast, storyRef, storyName, context);
  }

  var statements = [];
  var storyKey = getStoryKey(storyName, context.counter);
  var bodyNodes = ast.children.filter(function (n) {
    return !t.isJSXText(n);
  });
  var storyCode = null;
  var sourceCode = null;
  var storyVal = null;

  if (!bodyNodes.length) {
    if (ast.children.length > 0) {
      // plain text node
      var _generate5 = generate(ast.children[0], {}),
          code = _generate5.code;

      storyCode = "'".concat(code, "'");
      sourceCode = storyCode;
      storyVal = "() => (\n        ".concat(storyCode, "\n      )");
    } else {
      sourceCode = '{}';
      storyVal = '{}';
    }
  } else {
    var bodyParts = bodyNodes.map(function (bodyNode) {
      return getBodyPart(bodyNode, context);
    }); // if we have more than two children
    // 1. Add line breaks
    // 2. Enclose in <> ... </>

    storyCode = bodyParts.map(function (_ref2) {
      var code = _ref2.storyCode;
      return code;
    }).join('\n');
    sourceCode = bodyParts.map(function (_ref3) {
      var code = _ref3.sourceCode;
      return code;
    }).join('\n');
    var storyReactCode = bodyParts.length > 1 ? "<>\n".concat(storyCode, "\n</>") : storyCode; // keep track if an identifier or function call
    // avoid breaking change for 5.3

    var BIND_REGEX = /\.bind\(.*\)/;

    if (bodyParts.length === 1) {
      if (BIND_REGEX.test(bodyParts[0].storyCode)) {
        storyVal = bodyParts[0].storyCode;
      } else if (t.isIdentifier(bodyParts[0].body)) {
        storyVal = "assertIsFn(".concat(storyCode, ")");
      } else if (t.isArrowFunctionExpression(bodyParts[0].body)) {
        storyVal = "(".concat(storyCode, ")");
      } else {
        storyVal = "() => (\n          ".concat(storyReactCode, "\n        )");
      }
    } else {
      storyVal = "() => (\n        ".concat(storyReactCode, "\n      )");
    }
  }

  statements.push("export const ".concat(storyKey, " = ").concat(storyVal, ";")); // always preserve the name, since CSF exports can get modified by displayName

  statements.push("".concat(storyKey, ".storyName = '").concat(storyName, "';"));
  var argTypes = genAttribute('argTypes', ast.openingElement);
  if (argTypes) statements.push("".concat(storyKey, ".argTypes = ").concat(argTypes, ";"));
  var args = genAttribute('args', ast.openingElement);
  if (args) statements.push("".concat(storyKey, ".args = ").concat(args, ";"));
  var parameters = expressionOrNull(getAttr(ast.openingElement, 'parameters'));
  var source = jsStringEscape(sourceCode);
  var sourceParam = "storySource: { source: '".concat(source, "' }");

  if (parameters) {
    var _generate6 = generate(parameters, {}),
        params = _generate6.code;

    statements.push("".concat(storyKey, ".parameters = { ").concat(sourceParam, ", ...").concat(params, " };"));
  } else {
    statements.push("".concat(storyKey, ".parameters = { ").concat(sourceParam, " };"));
  }

  var decorators = expressionOrNull(getAttr(ast.openingElement, 'decorators'));

  if (decorators) {
    var _generate7 = generate(decorators, {}),
        decos = _generate7.code;

    statements.push("".concat(storyKey, ".decorators = ").concat(decos, ";"));
  }

  var loaders = expressionOrNull(getAttr(ast.openingElement, 'loaders'));

  if (loaders) {
    var _generate8 = generate(loaders, {}),
        loaderCode = _generate8.code;

    statements.push("".concat(storyKey, ".loaders = ").concat(loaderCode, ";"));
  }

  var play = expressionOrNull(getAttr(ast.openingElement, 'play'));

  if (play) {
    var _generate9 = generate(play, {}),
        playCode = _generate9.code;

    statements.push("".concat(storyKey, ".play = ").concat(playCode, ";"));
  }

  var render = expressionOrNull(getAttr(ast.openingElement, 'render'));

  if (render) {
    var _generate10 = generate(render, {}),
        renderCode = _generate10.code;

    statements.push("".concat(storyKey, ".render = ").concat(renderCode, ";"));
  }

  context.storyNameToKey[storyName] = storyKey;
  return _defineProperty({}, storyKey, statements.join('\n'));
}

function genCanvasExports(ast, context) {
  var canvasExports = {};

  for (var i = 0; i < ast.children.length; i += 1) {
    var child = ast.children[i];

    if (t.isJSXElement(child) && t.isJSXIdentifier(child.openingElement.name) && child.openingElement.name.name === 'Story') {
      var storyExport = genStoryExport(child, context);

      var _generate11 = generate(child, {}),
          code = _generate11.code; // @ts-ignore


      child.value = code;

      if (storyExport) {
        Object.assign(canvasExports, storyExport);
        context.counter += 1;
      }
    }
  }

  return canvasExports;
}

function genMeta(ast, options) {
  var titleAttr = getAttr(ast.openingElement, 'title');
  var idAttr = getAttr(ast.openingElement, 'id');
  var title = null;

  if (titleAttr) {
    if (t.isStringLiteral(titleAttr)) {
      title = "'".concat(jsStringEscape(titleAttr.value), "'");
    } else if (t.isJSXExpressionContainer(titleAttr)) {
      try {
        // generate code, so the expression is evaluated by the CSF compiler
        var _generate12 = generate(titleAttr.expression, {}),
            code = _generate12.code; // remove the curly brackets at start and end of code


        title = code.replace(/^\{(.+)\}$/, '$1');
      } catch (e) {
        // eat exception if title parsing didn't go well
        // eslint-disable-next-line no-console
        console.warn('Invalid title:', options.filepath);
        title = undefined;
      }
    } else {
      console.warn("Unknown title attr: ".concat(titleAttr.type));
    }
  }

  var id = t.isStringLiteral(idAttr) ? "'".concat(idAttr.value, "'") : null;
  var parameters = genAttribute('parameters', ast.openingElement);
  var decorators = genAttribute('decorators', ast.openingElement);
  var loaders = genAttribute('loaders', ast.openingElement);
  var component = genAttribute('component', ast.openingElement);
  var subcomponents = genAttribute('subcomponents', ast.openingElement);
  var args = genAttribute('args', ast.openingElement);
  var argTypes = genAttribute('argTypes', ast.openingElement);
  var render = genAttribute('render', ast.openingElement);
  return {
    title: title,
    id: id,
    parameters: parameters,
    decorators: decorators,
    loaders: loaders,
    component: component,
    subcomponents: subcomponents,
    args: args,
    argTypes: argTypes,
    render: render
  };
}

function getExports(node, context, options) {
  var value = node.value,
      type = node.type;

  if (type === 'jsx') {
    if (STORY_REGEX.exec(value)) {
      // Single story
      var ast = parseExpression(value, {
        plugins: ['jsx']
      });
      var storyExport = genStoryExport(ast, context);

      var _generate13 = generate(ast, {}),
          code = _generate13.code; // eslint-disable-next-line no-param-reassign


      node.value = code;
      return storyExport && {
        stories: storyExport
      };
    }

    if (CANVAS_REGEX.exec(value)) {
      // Canvas/Preview, possibly containing multiple stories
      var _ast = parseExpression(value, {
        plugins: ['jsx']
      });

      var canvasExports = genCanvasExports(_ast, context); // We're overwriting the Canvas tag here with a version that
      // has the `name` attribute (e.g. `<Story name="..." story={...} />`)
      // even if the user didn't provide one. We need the name attribute when
      // we render the node at runtime.

      var _generate14 = generate(_ast, {}),
          _code = _generate14.code; // eslint-disable-next-line no-param-reassign


      node.value = _code;
      return {
        stories: canvasExports
      };
    }

    if (META_REGEX.exec(value)) {
      var _ast2 = parseExpression(value, {
        plugins: ['jsx']
      });

      return {
        meta: genMeta(_ast2, options)
      };
    }
  }

  return null;
} // insert `mdxStoryNameToKey` and `mdxComponentMeta` into the context so that we
// can reconstruct the Story ID dynamically from the `name` at render time


var wrapperJs = "\ncomponentMeta.parameters = componentMeta.parameters || {};\ncomponentMeta.parameters.docs = {\n  ...(componentMeta.parameters.docs || {}),\n  page: () => <AddContext mdxStoryNameToKey={mdxStoryNameToKey} mdxComponentAnnotations={componentMeta}><MDXContent /></AddContext>,\n};\n".trim(); // Use this rather than JSON.stringify because `Meta`'s attributes
// are already valid code strings, so we want to insert them raw
// rather than add an extra set of quotes

function stringifyMeta(meta) {
  var result = '{ ';
  Object.entries(meta).forEach(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        key = _ref6[0],
        val = _ref6[1];

    if (val) {
      result += "".concat(key, ": ").concat(val, ", ");
    }
  });
  result += ' }';
  return result;
}

var hasStoryChild = function hasStoryChild(node) {
  if (node.openingElement && t.isJSXIdentifier(node.openingElement.name) && node.openingElement.name.name === 'Story') {
    return !!node;
  }

  if (node.children && node.children.length > 0) {
    return !!node.children.find(function (child) {
      return hasStoryChild(child);
    });
  }

  return false;
};

var getMdxSource = function getMdxSource(children) {
  return encodeURI(children.map(function (el) {
    return generate(el).code;
  }).join('\n'));
}; // Parse out the named exports from a node, where the key
// is the variable name and the value is the AST of the
// variable declaration initializer


var getNamedExports = function getNamedExports(node) {
  var namedExports = {};
  var ast = parse(node.value, {
    sourceType: 'module',
    plugins: ['jsx'] // FIXME!!! presets: ['env]

  });

  if (t.isFile(ast) && t.isProgram(ast.program) && ast.program.body.length === 1) {
    var exported = ast.program.body[0];

    if (t.isExportNamedDeclaration(exported) && t.isVariableDeclaration(exported.declaration) && exported.declaration.declarations.length === 1) {
      var declaration = exported.declaration.declarations[0];

      if (t.isVariableDeclarator(declaration) && t.isIdentifier(declaration.id)) {
        var name = declaration.id.name;
        namedExports[name] = declaration.init;
      }
    }
  }

  return namedExports;
};

function extractExports(root, options) {
  var namedExports = {};
  root.children.forEach(function (child) {
    if (child.type === 'jsx') {
      try {
        var ast = parseExpression(child.value, {
          plugins: ['jsx']
        });

        if (t.isJSXOpeningElement(ast.openingElement) && ['Preview', 'Canvas'].includes(ast.openingElement.name.name) && !hasStoryChild(ast)) {
          var canvasAst = ast.openingElement;
          canvasAst.attributes.push(t.jsxAttribute(t.jsxIdentifier('mdxSource'), t.stringLiteral(getMdxSource(ast.children))));
        }

        var _generate15 = generate(ast, {}),
            code = _generate15.code; // eslint-disable-next-line no-param-reassign


        child.value = code;
      } catch (_unused) {
        /** catch erroneous child.value string where the babel parseExpression makes exception
         * https://github.com/mdx-js/mdx/issues/767
         * eg <button>
         *      <div>hello world</div>
         *
         *    </button>
         * generates error
         * 1. child.value =`<button>\n  <div>hello world</div`
         * 2. child.value =`\n`
         * 3. child.value =`</button>`
         *
         */
      }
    } else if (child.type === 'export') {
      Object.assign(namedExports, getNamedExports(child));
    }
  }); // we're overriding default export

  var storyExports = [];
  var includeStories = [];
  var metaExport = null;
  var context = {
    counter: 0,
    storyNameToKey: {},
    root: root,
    namedExports: namedExports
  };
  root.children.forEach(function (n) {
    var exports = getExports(n, context, options);

    if (exports) {
      var stories = exports.stories,
          meta = exports.meta;

      if (stories) {
        Object.entries(stories).forEach(function (_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2),
              key = _ref8[0],
              story = _ref8[1];

          includeStories.push(key);
          storyExports.push(story);
        });
      }

      if (meta) {
        if (metaExport) {
          throw new Error('Meta can only be declared once');
        }

        metaExport = meta;
      }
    }
  });

  if (metaExport) {
    if (!storyExports.length) {
      storyExports.push('export const __page = () => { throw new Error("Docs-only story"); };');
      storyExports.push('__page.parameters = { docsOnly: true };');
      includeStories.push('__page');
    }
  } else {
    metaExport = {};
  }

  metaExport.includeStories = JSON.stringify(includeStories);
  var defaultJsx = toJSX(root, {}, Object.assign({}, options, {
    skipExport: true
  }));
  var fullJsx = ['import { assertIsFn, AddContext } from "@storybook/addon-docs";', defaultJsx].concat(storyExports, ["const componentMeta = ".concat(stringifyMeta(metaExport), ";"), "const mdxStoryNameToKey = ".concat(JSON.stringify(context.storyNameToKey), ";"), wrapperJs, 'export default componentMeta;']).join('\n\n');
  return fullJsx;
}

export function createCompiler(mdxOptions) {
  return function compiler() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.Compiler = function (root) {
      return extractExports(root, options);
    };
  };
}