"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.string.repeat.js");

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.object.to-string.js");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _objectTypes = require("../utils/objectTypes");

var _inputUsageTypes = _interopRequireDefault(require("../types/inputUsageTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var JsonValue = /*#__PURE__*/function (_Component) {
  _inherits(JsonValue, _Component);

  var _super = _createSuper(JsonValue);

  function JsonValue(props) {
    var _this;

    _classCallCheck(this, JsonValue);

    _this = _super.call(this, props);
    var keyPath = [].concat(_toConsumableArray(props.keyPath), [props.name]);
    _this.state = {
      value: props.value,
      name: props.name,
      keyPath: keyPath,
      deep: props.deep,
      editEnabled: false,
      inputRef: null
    }; // Bind

    _this.handleEditMode = _this.handleEditMode.bind(_assertThisInitialized(_this));
    _this.refInput = _this.refInput.bind(_assertThisInitialized(_this));
    _this.handleCancelEdit = _this.handleCancelEdit.bind(_assertThisInitialized(_this));
    _this.handleEdit = _this.handleEdit.bind(_assertThisInitialized(_this));
    _this.onKeydown = _this.onKeydown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(JsonValue, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$state = this.state,
          editEnabled = _this$state.editEnabled,
          inputRef = _this$state.inputRef,
          name = _this$state.name,
          value = _this$state.value,
          keyPath = _this$state.keyPath,
          deep = _this$state.deep;
      var _this$props = this.props,
          readOnly = _this$props.readOnly,
          dataType = _this$props.dataType;
      var isReadOnly = readOnly(name, value, keyPath, deep, dataType);

      if (editEnabled && !isReadOnly && typeof inputRef.focus === 'function') {
        inputRef.focus();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('keydown', this.onKeydown);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.onKeydown);
    }
  }, {
    key: "onKeydown",
    value: function onKeydown(event) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat) return;

      if (event.code === 'Enter' || event.key === 'Enter') {
        event.preventDefault();
        this.handleEdit();
      }

      if (event.code === 'Escape' || event.key === 'Escape') {
        event.preventDefault();
        this.handleCancelEdit();
      }
    }
  }, {
    key: "handleEdit",
    value: function handleEdit() {
      var _this2 = this;

      var _this$props2 = this.props,
          handleUpdateValue = _this$props2.handleUpdateValue,
          originalValue = _this$props2.originalValue,
          logger = _this$props2.logger,
          onSubmitValueParser = _this$props2.onSubmitValueParser,
          keyPath = _this$props2.keyPath;
      var _this$state2 = this.state,
          inputRef = _this$state2.inputRef,
          name = _this$state2.name,
          deep = _this$state2.deep;
      if (!inputRef) return;
      var newValue = onSubmitValueParser(true, keyPath, deep, name, inputRef.value);
      var result = {
        value: newValue,
        key: name
      }; // Run update

      handleUpdateValue(result).then(function () {
        // Cancel edit mode if necessary
        if (!(0, _objectTypes.isComponentWillChange)(originalValue, newValue)) {
          _this2.handleCancelEdit();
        }
      }).catch(logger.error);
    }
  }, {
    key: "handleEditMode",
    value: function handleEditMode() {
      this.setState({
        editEnabled: true
      });
    }
  }, {
    key: "refInput",
    value: function refInput(node) {
      this.state.inputRef = node;
    }
  }, {
    key: "handleCancelEdit",
    value: function handleCancelEdit() {
      this.setState({
        editEnabled: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state3 = this.state,
          name = _this$state3.name,
          value = _this$state3.value,
          editEnabled = _this$state3.editEnabled,
          keyPath = _this$state3.keyPath,
          deep = _this$state3.deep;
      var _this$props3 = this.props,
          handleRemove = _this$props3.handleRemove,
          originalValue = _this$props3.originalValue,
          readOnly = _this$props3.readOnly,
          dataType = _this$props3.dataType,
          getStyle = _this$props3.getStyle,
          editButtonElement = _this$props3.editButtonElement,
          cancelButtonElement = _this$props3.cancelButtonElement,
          inputElementGenerator = _this$props3.inputElementGenerator,
          minusMenuElement = _this$props3.minusMenuElement,
          comeFromKeyPath = _this$props3.keyPath;
      var style = getStyle(name, originalValue, keyPath, deep, dataType);
      var isReadOnly = readOnly(name, originalValue, keyPath, deep, dataType);
      var isEditing = editEnabled && !isReadOnly;
      var inputElement = inputElementGenerator(_inputUsageTypes.default.VALUE, comeFromKeyPath, deep, name, originalValue, dataType);

      var editButtonElementLayout = /*#__PURE__*/_react.default.cloneElement(editButtonElement, {
        onClick: this.handleEdit
      });

      var cancelButtonElementLayout = /*#__PURE__*/_react.default.cloneElement(cancelButtonElement, {
        onClick: this.handleCancelEdit
      });

      var inputElementLayout = /*#__PURE__*/_react.default.cloneElement(inputElement, {
        ref: this.refInput,
        defaultValue: JSON.stringify(originalValue)
      });

      var minusMenuLayout = /*#__PURE__*/_react.default.cloneElement(minusMenuElement, {
        onClick: handleRemove,
        className: 'rejt-minus-menu',
        style: style.minus
      });

      return /*#__PURE__*/_react.default.createElement("li", {
        className: "rejt-value-node",
        style: style.li
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "rejt-name",
        style: style.name
      }, name, ' : '), isEditing ? /*#__PURE__*/_react.default.createElement("span", {
        className: "rejt-edit-form",
        style: style.editForm
      }, inputElementLayout, " ", cancelButtonElementLayout, editButtonElementLayout) : /*#__PURE__*/_react.default.createElement("span", {
        className: "rejt-value",
        style: style.value,
        onClick: isReadOnly ? null : this.handleEditMode
      }, String(value)), !isReadOnly && !isEditing && minusMenuLayout);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return props.value !== state.value ? {
        value: props.value
      } : null;
    }
  }]);

  return JsonValue;
}(_react.Component);

JsonValue.displayName = "JsonValue";
JsonValue.propTypes = {
  name: _propTypes.default.string.isRequired,
  value: _propTypes.default.any.isRequired,
  originalValue: _propTypes.default.any,
  keyPath: _propTypes.default.array,
  deep: _propTypes.default.number,
  handleRemove: _propTypes.default.func,
  handleUpdateValue: _propTypes.default.func,
  readOnly: _propTypes.default.func.isRequired,
  dataType: _propTypes.default.string,
  getStyle: _propTypes.default.func.isRequired,
  editButtonElement: _propTypes.default.element,
  cancelButtonElement: _propTypes.default.element,
  inputElementGenerator: _propTypes.default.func.isRequired,
  minusMenuElement: _propTypes.default.element,
  logger: _propTypes.default.object.isRequired,
  onSubmitValueParser: _propTypes.default.func.isRequired
};
JsonValue.defaultProps = {
  keyPath: [],
  deep: 0,
  handleUpdateValue: function handleUpdateValue() {
    return Promise.resolve();
  },
  editButtonElement: /*#__PURE__*/_react.default.createElement("button", null, "e"),
  cancelButtonElement: /*#__PURE__*/_react.default.createElement("button", null, "c"),
  minusMenuElement: /*#__PURE__*/_react.default.createElement("span", null, " - ")
};
var _default = JsonValue;
exports.default = _default;