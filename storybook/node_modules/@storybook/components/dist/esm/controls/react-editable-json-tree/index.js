function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";

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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JsonNode from './components/JsonNode';
import { value, object, array } from './utils/styles';
import { ADD_DELTA_TYPE, REMOVE_DELTA_TYPE, UPDATE_DELTA_TYPE } from './types/deltaTypes';
import { getObjectType } from './utils/objectTypes';
import DATA_TYPES from './types/dataTypes';
import INPUT_USAGE_TYPES from './types/inputUsageTypes';
import parse from './utils/parse';

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

      var dataType = getObjectType(data);
      var readOnlyFunction = readOnly;

      if (getObjectType(readOnly) === 'Boolean') {
        readOnlyFunction = function readOnlyFunction() {
          return readOnly;
        };
      }

      var inputElementFunction = inputElement;

      if (inputElement && getObjectType(inputElement) !== 'Function') {
        inputElementFunction = function inputElementFunction() {
          return inputElement;
        };
      }

      var textareaElementFunction = textareaElement;

      if (textareaElement && getObjectType(textareaElement) !== 'Function') {
        textareaElementFunction = function textareaElementFunction() {
          return textareaElement;
        };
      }

      if (dataType === 'Object' || dataType === 'Array') {
        return /*#__PURE__*/React.createElement("div", {
          className: "rejt-tree"
        }, /*#__PURE__*/React.createElement(JsonNode, {
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
}(Component);

JsonTree.displayName = "JsonTree";
JsonTree.propTypes = {
  data: PropTypes.any.isRequired,
  rootName: PropTypes.string,
  isCollapsed: PropTypes.func,
  onFullyUpdate: PropTypes.func,
  onDeltaUpdate: PropTypes.func,
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  getStyle: PropTypes.func,
  addButtonElement: PropTypes.element,
  cancelButtonElement: PropTypes.element,
  editButtonElement: PropTypes.element,
  inputElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  textareaElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  minusMenuElement: PropTypes.element,
  plusMenuElement: PropTypes.element,
  beforeRemoveAction: PropTypes.func,
  beforeAddAction: PropTypes.func,
  beforeUpdateAction: PropTypes.func,
  logger: PropTypes.object,
  onSubmitValueParser: PropTypes.func
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
        return object;

      case 'Array':
        return array;

      default:
        return value;
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
    return parse(rawValue);
  },
  inputElement: function inputElement(usage, keyPath, deep, keyName, data, dataType) {
    return /*#__PURE__*/React.createElement("input", null);
  },
  textareaElement: function textareaElement(usage, keyPath, deep, keyName, data, dataType) {
    return /*#__PURE__*/React.createElement("textarea", null);
  },

  /* eslint-enable */
  fallback: null
};
export { JsonTree };
export { getObjectType };
export { ADD_DELTA_TYPE };
export { REMOVE_DELTA_TYPE };
export { UPDATE_DELTA_TYPE };
export { DATA_TYPES };
export { INPUT_USAGE_TYPES };