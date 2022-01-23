function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.object.get-prototype-of.js";
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
import JsonValue from './JsonValue';
import JsonObject from './JsonObject';
import JsonArray from './JsonArray';
import JsonFunctionValue from './JsonFunctionValue';
import { getObjectType } from '../utils/objectTypes';
import dataTypes from '../types/dataTypes';

var JsonNode = /*#__PURE__*/function (_Component) {
  _inherits(JsonNode, _Component);

  var _super = _createSuper(JsonNode);

  function JsonNode(props) {
    var _this;

    _classCallCheck(this, JsonNode);

    _this = _super.call(this, props);
    _this.state = {
      data: props.data,
      name: props.name,
      keyPath: props.keyPath,
      deep: props.deep
    };
    return _this;
  }

  _createClass(JsonNode, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          data = _this$state.data,
          name = _this$state.name,
          keyPath = _this$state.keyPath,
          deep = _this$state.deep;
      var _this$props = this.props,
          isCollapsed = _this$props.isCollapsed,
          handleRemove = _this$props.handleRemove,
          handleUpdateValue = _this$props.handleUpdateValue,
          onUpdate = _this$props.onUpdate,
          onDeltaUpdate = _this$props.onDeltaUpdate,
          readOnly = _this$props.readOnly,
          getStyle = _this$props.getStyle,
          addButtonElement = _this$props.addButtonElement,
          cancelButtonElement = _this$props.cancelButtonElement,
          editButtonElement = _this$props.editButtonElement,
          inputElementGenerator = _this$props.inputElementGenerator,
          textareaElementGenerator = _this$props.textareaElementGenerator,
          minusMenuElement = _this$props.minusMenuElement,
          plusMenuElement = _this$props.plusMenuElement,
          beforeRemoveAction = _this$props.beforeRemoveAction,
          beforeAddAction = _this$props.beforeAddAction,
          beforeUpdateAction = _this$props.beforeUpdateAction,
          logger = _this$props.logger,
          onSubmitValueParser = _this$props.onSubmitValueParser;

      var readOnlyTrue = function readOnlyTrue() {
        return true;
      };

      var dataType = getObjectType(data);

      switch (dataType) {
        case dataTypes.ERROR:
          return /*#__PURE__*/React.createElement(JsonObject, {
            data: data,
            name: name,
            isCollapsed: isCollapsed,
            keyPath: keyPath,
            deep: deep,
            handleRemove: handleRemove,
            onUpdate: onUpdate,
            onDeltaUpdate: onDeltaUpdate,
            readOnly: readOnlyTrue,
            dataType: dataType,
            getStyle: getStyle,
            addButtonElement: addButtonElement,
            cancelButtonElement: cancelButtonElement,
            editButtonElement: editButtonElement,
            inputElementGenerator: inputElementGenerator,
            textareaElementGenerator: textareaElementGenerator,
            minusMenuElement: minusMenuElement,
            plusMenuElement: plusMenuElement,
            beforeRemoveAction: beforeRemoveAction,
            beforeAddAction: beforeAddAction,
            beforeUpdateAction: beforeUpdateAction,
            logger: logger,
            onSubmitValueParser: onSubmitValueParser
          });

        case dataTypes.OBJECT:
          return /*#__PURE__*/React.createElement(JsonObject, {
            data: data,
            name: name,
            isCollapsed: isCollapsed,
            keyPath: keyPath,
            deep: deep,
            handleRemove: handleRemove,
            onUpdate: onUpdate,
            onDeltaUpdate: onDeltaUpdate,
            readOnly: readOnly,
            dataType: dataType,
            getStyle: getStyle,
            addButtonElement: addButtonElement,
            cancelButtonElement: cancelButtonElement,
            editButtonElement: editButtonElement,
            inputElementGenerator: inputElementGenerator,
            textareaElementGenerator: textareaElementGenerator,
            minusMenuElement: minusMenuElement,
            plusMenuElement: plusMenuElement,
            beforeRemoveAction: beforeRemoveAction,
            beforeAddAction: beforeAddAction,
            beforeUpdateAction: beforeUpdateAction,
            logger: logger,
            onSubmitValueParser: onSubmitValueParser
          });

        case dataTypes.ARRAY:
          return /*#__PURE__*/React.createElement(JsonArray, {
            data: data,
            name: name,
            isCollapsed: isCollapsed,
            keyPath: keyPath,
            deep: deep,
            handleRemove: handleRemove,
            onUpdate: onUpdate,
            onDeltaUpdate: onDeltaUpdate,
            readOnly: readOnly,
            dataType: dataType,
            getStyle: getStyle,
            addButtonElement: addButtonElement,
            cancelButtonElement: cancelButtonElement,
            editButtonElement: editButtonElement,
            inputElementGenerator: inputElementGenerator,
            textareaElementGenerator: textareaElementGenerator,
            minusMenuElement: minusMenuElement,
            plusMenuElement: plusMenuElement,
            beforeRemoveAction: beforeRemoveAction,
            beforeAddAction: beforeAddAction,
            beforeUpdateAction: beforeUpdateAction,
            logger: logger,
            onSubmitValueParser: onSubmitValueParser
          });

        case dataTypes.STRING:
          return /*#__PURE__*/React.createElement(JsonValue, {
            name: name,
            value: "\"".concat(data, "\""),
            originalValue: data,
            keyPath: keyPath,
            deep: deep,
            handleRemove: handleRemove,
            handleUpdateValue: handleUpdateValue,
            readOnly: readOnly,
            dataType: dataType,
            getStyle: getStyle,
            cancelButtonElement: cancelButtonElement,
            editButtonElement: editButtonElement,
            inputElementGenerator: inputElementGenerator,
            minusMenuElement: minusMenuElement,
            logger: logger,
            onSubmitValueParser: onSubmitValueParser
          });

        case dataTypes.NUMBER:
          return /*#__PURE__*/React.createElement(JsonValue, {
            name: name,
            value: data,
            originalValue: data,
            keyPath: keyPath,
            deep: deep,
            handleRemove: handleRemove,
            handleUpdateValue: handleUpdateValue,
            readOnly: readOnly,
            dataType: dataType,
            getStyle: getStyle,
            cancelButtonElement: cancelButtonElement,
            editButtonElement: editButtonElement,
            inputElementGenerator: inputElementGenerator,
            minusMenuElement: minusMenuElement,
            logger: logger,
            onSubmitValueParser: onSubmitValueParser
          });

        case dataTypes.BOOLEAN:
          return /*#__PURE__*/React.createElement(JsonValue, {
            name: name,
            value: data ? 'true' : 'false',
            originalValue: data,
            keyPath: keyPath,
            deep: deep,
            handleRemove: handleRemove,
            handleUpdateValue: handleUpdateValue,
            readOnly: readOnly,
            dataType: dataType,
            getStyle: getStyle,
            cancelButtonElement: cancelButtonElement,
            editButtonElement: editButtonElement,
            inputElementGenerator: inputElementGenerator,
            minusMenuElement: minusMenuElement,
            logger: logger,
            onSubmitValueParser: onSubmitValueParser
          });

        case dataTypes.DATE:
          return /*#__PURE__*/React.createElement(JsonValue, {
            name: name,
            value: data.toISOString(),
            originalValue: data,
            keyPath: keyPath,
            deep: deep,
            handleRemove: handleRemove,
            handleUpdateValue: handleUpdateValue,
            readOnly: readOnlyTrue,
            dataType: dataType,
            getStyle: getStyle,
            cancelButtonElement: cancelButtonElement,
            editButtonElement: editButtonElement,
            inputElementGenerator: inputElementGenerator,
            minusMenuElement: minusMenuElement,
            logger: logger,
            onSubmitValueParser: onSubmitValueParser
          });

        case dataTypes.NULL:
          return /*#__PURE__*/React.createElement(JsonValue, {
            name: name,
            value: 'null',
            originalValue: 'null',
            keyPath: keyPath,
            deep: deep,
            handleRemove: handleRemove,
            handleUpdateValue: handleUpdateValue,
            readOnly: readOnly,
            dataType: dataType,
            getStyle: getStyle,
            cancelButtonElement: cancelButtonElement,
            editButtonElement: editButtonElement,
            inputElementGenerator: inputElementGenerator,
            minusMenuElement: minusMenuElement,
            logger: logger,
            onSubmitValueParser: onSubmitValueParser
          });

        case dataTypes.UNDEFINED:
          return /*#__PURE__*/React.createElement(JsonValue, {
            name: name,
            value: 'undefined',
            originalValue: 'undefined',
            keyPath: keyPath,
            deep: deep,
            handleRemove: handleRemove,
            handleUpdateValue: handleUpdateValue,
            readOnly: readOnly,
            dataType: dataType,
            getStyle: getStyle,
            cancelButtonElement: cancelButtonElement,
            editButtonElement: editButtonElement,
            inputElementGenerator: inputElementGenerator,
            minusMenuElement: minusMenuElement,
            logger: logger,
            onSubmitValueParser: onSubmitValueParser
          });

        case dataTypes.FUNCTION:
          return /*#__PURE__*/React.createElement(JsonFunctionValue, {
            name: name,
            value: data.toString(),
            originalValue: data,
            keyPath: keyPath,
            deep: deep,
            handleRemove: handleRemove,
            handleUpdateValue: handleUpdateValue,
            readOnly: readOnly,
            dataType: dataType,
            getStyle: getStyle,
            cancelButtonElement: cancelButtonElement,
            editButtonElement: editButtonElement,
            textareaElementGenerator: textareaElementGenerator,
            minusMenuElement: minusMenuElement,
            logger: logger,
            onSubmitValueParser: onSubmitValueParser
          });

        case dataTypes.SYMBOL:
          return /*#__PURE__*/React.createElement(JsonValue, {
            name: name,
            value: data.toString(),
            originalValue: data,
            keyPath: keyPath,
            deep: deep,
            handleRemove: handleRemove,
            handleUpdateValue: handleUpdateValue,
            readOnly: readOnlyTrue,
            dataType: dataType,
            getStyle: getStyle,
            cancelButtonElement: cancelButtonElement,
            editButtonElement: editButtonElement,
            inputElementGenerator: inputElementGenerator,
            minusMenuElement: minusMenuElement,
            logger: logger,
            onSubmitValueParser: onSubmitValueParser
          });

        default:
          return null;
      }
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return props.data !== state.data ? {
        data: props.data
      } : null;
    }
  }]);

  return JsonNode;
}(Component);

JsonNode.displayName = "JsonNode";
JsonNode.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.any,
  isCollapsed: PropTypes.func.isRequired,
  keyPath: PropTypes.array,
  deep: PropTypes.number,
  handleRemove: PropTypes.func,
  handleUpdateValue: PropTypes.func,
  onUpdate: PropTypes.func.isRequired,
  onDeltaUpdate: PropTypes.func.isRequired,
  readOnly: PropTypes.func.isRequired,
  getStyle: PropTypes.func.isRequired,
  addButtonElement: PropTypes.element,
  cancelButtonElement: PropTypes.element,
  editButtonElement: PropTypes.element,
  inputElementGenerator: PropTypes.func.isRequired,
  textareaElementGenerator: PropTypes.func.isRequired,
  minusMenuElement: PropTypes.element,
  plusMenuElement: PropTypes.element,
  beforeRemoveAction: PropTypes.func,
  beforeAddAction: PropTypes.func,
  beforeUpdateAction: PropTypes.func,
  logger: PropTypes.object.isRequired,
  onSubmitValueParser: PropTypes.func.isRequired
};
JsonNode.defaultProps = {
  keyPath: [],
  deep: 0
};
export default JsonNode;