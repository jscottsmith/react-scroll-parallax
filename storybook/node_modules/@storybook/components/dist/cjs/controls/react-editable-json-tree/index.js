"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ADD_DELTA_TYPE", {
  enumerable: true,
  get: function get() {
    return _deltaTypes.ADD_DELTA_TYPE;
  }
});
Object.defineProperty(exports, "REMOVE_DELTA_TYPE", {
  enumerable: true,
  get: function get() {
    return _deltaTypes.REMOVE_DELTA_TYPE;
  }
});
Object.defineProperty(exports, "UPDATE_DELTA_TYPE", {
  enumerable: true,
  get: function get() {
    return _deltaTypes.UPDATE_DELTA_TYPE;
  }
});
Object.defineProperty(exports, "getObjectType", {
  enumerable: true,
  get: function get() {
    return _objectTypes.getObjectType;
  }
});
Object.defineProperty(exports, "DATA_TYPES", {
  enumerable: true,
  get: function get() {
    return _dataTypes.default;
  }
});
Object.defineProperty(exports, "INPUT_USAGE_TYPES", {
  enumerable: true,
  get: function get() {
    return _inputUsageTypes.default;
  }
});
exports.JsonTree = void 0;

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.object.to-string.js");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _JsonNode = _interopRequireDefault(require("./components/JsonNode"));

var _styles = require("./utils/styles");

var _deltaTypes = require("./types/deltaTypes");

var _objectTypes = require("./utils/objectTypes");

var _dataTypes = _interopRequireDefault(require("./types/dataTypes"));

var _inputUsageTypes = _interopRequireDefault(require("./types/inputUsageTypes"));

var _parse = _interopRequireDefault(require("./utils/parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var JsonTree = /*#__PURE__*/function (_Component) {
  _inherits(JsonTree, _Component);

  var _super = _createSuper(JsonTree);

  function JsonTree(props) {
    var _this;

    _classCallCheck(this, JsonTree);

    _this = _super.call(this, props);
    _this.state = {
      data: props.data,
      rootName: props.rootName
    }; // Bind

    _this.onUpdate = _this.onUpdate.bind(_assertThisInitialized(_this));
    _this.removeRoot = _this.removeRoot.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(JsonTree, [{
    key: "onUpdate",
    value: function onUpdate(key, data) {
      this.setState({
        data: data
      });
      this.props.onFullyUpdate(data);
    }
  }, {
    key: "removeRoot",
    value: function removeRoot() {
      this.onUpdate(null, null);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          data = _this$state.data,
          rootName = _this$state.rootName;
      var _this$props = this.props,
          isCollapsed = _this$props.isCollapsed,
          onDeltaUpdate = _this$props.onDeltaUpdate,
          readOnly = _this$props.readOnly,
          getStyle = _this$props.getStyle,
          addButtonElement = _this$props.addButtonElement,
          cancelButtonElement = _this$props.cancelButtonElement,
          editButtonElement = _this$props.editButtonElement,
          inputElement = _this$props.inputElement,
          textareaElement = _this$props.textareaElement,
          minusMenuElement = _this$props.minusMenuElement,
          plusMenuElement = _this$props.plusMenuElement,
          beforeRemoveAction = _this$props.beforeRemoveAction,
          beforeAddAction = _this$props.beforeAddAction,
          beforeUpdateAction = _this$props.beforeUpdateAction,
          logger = _this$props.logger,
          onSubmitValueParser = _this$props.onSubmitValueParser,
          fallback = _this$props.fallback; // Node type

      var dataType = (0, _objectTypes.getObjectType)(data);
      var readOnlyFunction = readOnly;

      if ((0, _objectTypes.getObjectType)(readOnly) === 'Boolean') {
        readOnlyFunction = function readOnlyFunction() {
          return readOnly;
        };
      }

      var inputElementFunction = inputElement;

      if (inputElement && (0, _objectTypes.getObjectType)(inputElement) !== 'Function') {
        inputElementFunction = function inputElementFunction() {
          return inputElement;
        };
      }

      var textareaElementFunction = textareaElement;

      if (textareaElement && (0, _objectTypes.getObjectType)(textareaElement) !== 'Function') {
        textareaElementFunction = function textareaElementFunction() {
          return textareaElement;
        };
      }

      if (dataType === 'Object' || dataType === 'Array') {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "rejt-tree"
        }, /*#__PURE__*/_react.default.createElement(_JsonNode.default, {
          data: data,
          name: rootName,
          collapsed: false,
          deep: -1,
          isCollapsed: isCollapsed,
          onUpdate: this.onUpdate,
          onDeltaUpdate: onDeltaUpdate,
          readOnly: readOnlyFunction,
          getStyle: getStyle,
          addButtonElement: addButtonElement,
          cancelButtonElement: cancelButtonElement,
          editButtonElement: editButtonElement,
          inputElementGenerator: inputElementFunction,
          textareaElementGenerator: textareaElementFunction,
          minusMenuElement: minusMenuElement,
          plusMenuElement: plusMenuElement,
          handleRemove: this.removeRoot,
          beforeRemoveAction: beforeRemoveAction,
          beforeAddAction: beforeAddAction,
          beforeUpdateAction: beforeUpdateAction,
          logger: logger,
          onSubmitValueParser: onSubmitValueParser
        }));
      }

      return fallback;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.data !== state.data || props.rootName !== state.rootName) {
        return {
          data: props.data,
          rootName: props.rootName
        };
      }

      return null;
    }
  }]);

  return JsonTree;
}(_react.Component);

exports.JsonTree = JsonTree;
JsonTree.displayName = "JsonTree";
JsonTree.propTypes = {
  data: _propTypes.default.any.isRequired,
  rootName: _propTypes.default.string,
  isCollapsed: _propTypes.default.func,
  onFullyUpdate: _propTypes.default.func,
  onDeltaUpdate: _propTypes.default.func,
  readOnly: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  getStyle: _propTypes.default.func,
  addButtonElement: _propTypes.default.element,
  cancelButtonElement: _propTypes.default.element,
  editButtonElement: _propTypes.default.element,
  inputElement: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
  textareaElement: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
  minusMenuElement: _propTypes.default.element,
  plusMenuElement: _propTypes.default.element,
  beforeRemoveAction: _propTypes.default.func,
  beforeAddAction: _propTypes.default.func,
  beforeUpdateAction: _propTypes.default.func,
  logger: _propTypes.default.object,
  onSubmitValueParser: _propTypes.default.func
};
JsonTree.defaultProps = {
  rootName: 'root',
  isCollapsed: function isCollapsed(keyPath, deep) {
    return deep !== -1;
  },
  getStyle: function getStyle(keyName, data, keyPath, deep, dataType) {
    switch (dataType) {
      case 'Object':
      case 'Error':
        return _styles.object;

      case 'Array':
        return _styles.array;

      default:
        return _styles.value;
    }
  },

  /* eslint-disable no-unused-vars */
  readOnly: function readOnly(keyName, data, keyPath, deep, dataType) {
    return false;
  },
  onFullyUpdate: function onFullyUpdate(data) {},
  onDeltaUpdate: function onDeltaUpdate(_ref) {
    var type = _ref.type,
        keyPath = _ref.keyPath,
        deep = _ref.deep,
        key = _ref.key,
        newValue = _ref.newValue,
        oldValue = _ref.oldValue;
  },
  beforeRemoveAction: function beforeRemoveAction(key, keyPath, deep, oldValue) {
    return new Promise(function (resolve) {
      return resolve();
    });
  },
  beforeAddAction: function beforeAddAction(key, keyPath, deep, newValue) {
    return new Promise(function (resolve) {
      return resolve();
    });
  },
  beforeUpdateAction: function beforeUpdateAction(key, keyPath, deep, oldValue, newValue) {
    return new Promise(function (resolve) {
      return resolve();
    });
  },
  logger: {
    error: function error() {}
  },
  onSubmitValueParser: function onSubmitValueParser(isEditMode, keyPath, deep, name, rawValue) {
    return (0, _parse.default)(rawValue);
  },
  inputElement: function inputElement(usage, keyPath, deep, keyName, data, dataType) {
    return /*#__PURE__*/_react.default.createElement("input", null);
  },
  textareaElement: function textareaElement(usage, keyPath, deep, keyName, data, dataType) {
    return /*#__PURE__*/_react.default.createElement("textarea", null);
  },

  /* eslint-enable */
  fallback: null
};