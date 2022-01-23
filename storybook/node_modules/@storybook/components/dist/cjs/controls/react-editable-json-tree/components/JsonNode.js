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
exports.default = void 0;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _JsonValue = _interopRequireDefault(require("./JsonValue"));

var _JsonObject = _interopRequireDefault(require("./JsonObject"));

var _JsonArray = _interopRequireDefault(require("./JsonArray"));

var _JsonFunctionValue = _interopRequireDefault(require("./JsonFunctionValue"));

var _objectTypes = require("../utils/objectTypes");

var _dataTypes = _interopRequireDefault(require("../types/dataTypes"));

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

      var dataType = (0, _objectTypes.getObjectType)(data);

      switch (dataType) {
        case _dataTypes.default.ERROR:
          return /*#__PURE__*/_react.default.createElement(_JsonObject.default, {
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

        case _dataTypes.default.OBJECT:
          return /*#__PURE__*/_react.default.createElement(_JsonObject.default, {
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

        case _dataTypes.default.ARRAY:
          return /*#__PURE__*/_react.default.createElement(_JsonArray.default, {
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

        case _dataTypes.default.STRING:
          return /*#__PURE__*/_react.default.createElement(_JsonValue.default, {
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

        case _dataTypes.default.NUMBER:
          return /*#__PURE__*/_react.default.createElement(_JsonValue.default, {
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

        case _dataTypes.default.BOOLEAN:
          return /*#__PURE__*/_react.default.createElement(_JsonValue.default, {
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

        case _dataTypes.default.DATE:
          return /*#__PURE__*/_react.default.createElement(_JsonValue.default, {
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

        case _dataTypes.default.NULL:
          return /*#__PURE__*/_react.default.createElement(_JsonValue.default, {
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

        case _dataTypes.default.UNDEFINED:
          return /*#__PURE__*/_react.default.createElement(_JsonValue.default, {
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

        case _dataTypes.default.FUNCTION:
          return /*#__PURE__*/_react.default.createElement(_JsonFunctionValue.default, {
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

        case _dataTypes.default.SYMBOL:
          return /*#__PURE__*/_react.default.createElement(_JsonValue.default, {
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
}(_react.Component);

JsonNode.displayName = "JsonNode";
JsonNode.propTypes = {
  name: _propTypes.default.string.isRequired,
  data: _propTypes.default.any,
  isCollapsed: _propTypes.default.func.isRequired,
  keyPath: _propTypes.default.array,
  deep: _propTypes.default.number,
  handleRemove: _propTypes.default.func,
  handleUpdateValue: _propTypes.default.func,
  onUpdate: _propTypes.default.func.isRequired,
  onDeltaUpdate: _propTypes.default.func.isRequired,
  readOnly: _propTypes.default.func.isRequired,
  getStyle: _propTypes.default.func.isRequired,
  addButtonElement: _propTypes.default.element,
  cancelButtonElement: _propTypes.default.element,
  editButtonElement: _propTypes.default.element,
  inputElementGenerator: _propTypes.default.func.isRequired,
  textareaElementGenerator: _propTypes.default.func.isRequired,
  minusMenuElement: _propTypes.default.element,
  plusMenuElement: _propTypes.default.element,
  beforeRemoveAction: _propTypes.default.func,
  beforeAddAction: _propTypes.default.func,
  beforeUpdateAction: _propTypes.default.func,
  logger: _propTypes.default.object.isRequired,
  onSubmitValueParser: _propTypes.default.func.isRequired
};
JsonNode.defaultProps = {
  keyPath: [],
  deep: 0
};
var _default = JsonNode;
exports.default = _default;