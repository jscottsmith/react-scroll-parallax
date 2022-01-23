"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _ = _interopRequireWildcard(require("lodash"));

var ReactDocgen = _interopRequireWildcard(require("react-docgen"));

var _actualNameHandler = _interopRequireDefault(require("./actualNameHandler"));

var _relativePath = require("./relativePath");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultHandlers = Object.values(ReactDocgen.handlers).map(function (handler) {
  return handler;
});

function _default(_ref) {
  var t = _ref.types;
  return {
    visitor: {
      Program: {
        exit: function exit(path, state) {
          injectReactDocgenInfo(path, state, this.file.code, t);
        }
      }
    }
  };
}

function injectReactDocgenInfo(path, state, code, t) {
  var filename = state.file.opts.filename;
  var program = path.scope.getProgramParent().path;

  var _state$opts = state.opts,
      resolverOpt = _state$opts.resolver,
      handlersOpt = _state$opts.handlers,
      DOC_GEN_COLLECTION_NAME = _state$opts.DOC_GEN_COLLECTION_NAME,
      opts = _objectWithoutProperties(_state$opts, ["resolver", "handlers", "DOC_GEN_COLLECTION_NAME"]);

  var docgenResults = [];

  try {
    var resolver = ReactDocgen.resolver.findAllExportedComponentDefinitions;

    if (typeof resolverOpt === 'string') {
      resolver = ReactDocgen.resolver[resolverOpt];
    } else if (typeof resolverOpt === 'function') {
      resolver = resolverOpt;
    }

    var customHandlers = [];

    if (handlersOpt) {
      handlersOpt.forEach(function (handler) {
        if (typeof handler === 'string') {
          customHandlers.push(require(handler));
        } else if (typeof handler === 'function') {
          customHandlers.push(handler);
        }
      });
    }

    var handlers = [].concat(_toConsumableArray(defaultHandlers), customHandlers, [_actualNameHandler["default"]]);
    docgenResults = ReactDocgen.parse(code, resolver, handlers, _objectSpread({}, opts, {
      filename: filename
    }));

    if (docgenResults && !Array.isArray(docgenResults)) {
      docgenResults = [docgenResults];
    }

    if (state.opts.removeMethods) {
      docgenResults.forEach(function (docgenResult) {
        delete docgenResult.methods;
      });
    }
  } catch (e) {
    // this is for debugging the error only, do not ship this console log or else it pollutes the webpack output
    // console.log(e);
    return;
  }

  docgenResults.forEach(function (docgenResult, index) {
    var exportName = docgenResult.actualName; // If the result doesn't have an actualName,
    // it's probably on arrow functions.

    if (!exportName) {
      return;
    }

    var docNode = buildObjectExpression(docgenResult, t);
    var docgenInfo = t.expressionStatement(t.assignmentExpression('=', t.memberExpression(t.identifier(exportName), t.identifier('__docgenInfo')), docNode));
    var exportPath = program.get('body').find(function (node) {
      return isExportCurrent(node, exportName, t);
    });

    if (exportPath) {
      exportPath.insertBefore(docgenInfo);
    } else {
      program.pushContainer('body', docgenInfo);
    }

    injectDocgenGlobal(exportName, path, state, t);
  });
}

function injectDocgenGlobal(className, path, state, t) {
  var program = path.scope.getProgramParent().path;

  if (!state.opts.DOC_GEN_COLLECTION_NAME) {
    return;
  }

  var globalName = state.opts.DOC_GEN_COLLECTION_NAME;
  var filePath = (0, _relativePath.relativePath)(path.hub.file.opts.filename);
  var globalNode = t.ifStatement(t.binaryExpression('!==', t.unaryExpression('typeof', t.identifier(globalName)), t.stringLiteral('undefined')), t.blockStatement([t.expressionStatement(t.assignmentExpression('=', t.memberExpression(t.identifier(globalName), t.stringLiteral(filePath), true), t.objectExpression([t.objectProperty(t.identifier('name'), t.stringLiteral(className)), t.objectProperty(t.identifier('docgenInfo'), t.memberExpression(t.identifier(className), t.identifier('__docgenInfo'))), t.objectProperty(t.identifier('path'), t.stringLiteral(filePath))])))]));
  program.pushContainer('body', globalNode);
}

function buildObjectExpression(obj, t) {
  if (_.isPlainObject(obj)) {
    var children = [];

    for (var key in obj) {
      if (key === 'actualName') continue;
      if (!obj.hasOwnProperty(key) || _.isUndefined(obj[key])) continue;
      children.push(t.objectProperty(t.stringLiteral(key), buildObjectExpression(obj[key], t)));
    }

    return t.objectExpression(children);
  } else if (_.isString(obj)) {
    return t.stringLiteral(obj);
  } else if (_.isBoolean(obj)) {
    return t.booleanLiteral(obj);
  } else if (_.isNumber(obj)) {
    return t.numericLiteral(obj);
  } else if (_.isArray(obj)) {
    var _children = [];
    obj.forEach(function (val) {
      _children.push(buildObjectExpression(val, t));
    });
    return t.ArrayExpression(_children);
  } else if (_.isNull(obj)) {
    return t.nullLiteral();
  }
}

function getComponentFromHoC(path) {
  if (path.isCallExpression()) {
    return getComponentFromHoC(path.get('arguments.0'));
  }

  return path.isIdentifier() ? path.node.name : null;
}

function isExportCurrent(path, exportName, t) {
  if (t.isExportDefaultDeclaration(path)) {
    var decl = path.get('declaration');
    var identifier = decl.isIdentifier() // export default MyComp
    ? decl.node.name : getComponentFromHoC(decl); // export default withHoC(MyComp)

    if (identifier === exportName) {
      return true;
    }
  }

  if (t.isExportNamedDeclaration(path)) {
    return path.get('specifiers').find(function (sp) {
      return sp.node.exported.name === exportName;
    });
  }

  return false;
}