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

require("core-js/modules/es.promise.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.object.get-own-property-names.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _JsonNode = _interopRequireDefault(require("./JsonNode"));

var _JsonAddValue = _interopRequireDefault(require("./JsonAddValue"));

var _deltaTypes = require("../types/deltaTypes");

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

var JsonObject = /*#__PURE__*/function (_Component) {
  _inherits(JsonObject, _Component);

  var _super = _createSuper(JsonObject);

  function JsonObject(props) {
    var _this;

    _classCallCheck(this, JsonObject);

    _this = _super.call(this, props);
    var keyPath = props.deep === -1 ? [] : [].concat(_toConsumableArray(props.keyPath), [props.name]);
    _this.state = {
      name: props.name,
      data: props.data,
      keyPath: keyPath,
      deep: props.deep,
      nextDeep: props.deep + 1,
      collapsed: props.isCollapsed(keyPath, props.deep, props.data),
      addFormVisible: false
    }; // Bind

    _this.handleCollapseMode = _this.handleCollapseMode.bind(_assertThisInitialized(_this));
    _this.handleRemoveValue = _this.handleRemoveValue.bind(_assertThisInitialized(_this));
    _this.handleAddMode = _this.handleAddMode.bind(_assertThisInitialized(_this));
    _this.handleAddValueAdd = _this.handleAddValueAdd.bind(_assertThisInitialized(_this));
    _this.handleAddValueCancel = _this.handleAddValueCancel.bind(_assertThisInitialized(_this));
    _this.handleEditValue = _this.handleEditValue.bind(_assertThisInitialized(_this));
    _this.onChildUpdate = _this.onChildUpdate.bind(_assertThisInitialized(_this));
    _this.renderCollapsed = _this.renderCollapsed.bind(_assertThisInitialized(_this));
    _this.renderNotCollapsed = _this.renderNotCollapsed.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(JsonObject, [{
    key: "onChildUpdate",
    value: function onChildUpdate(childKey, childData) {
      var _this$state = this.state,
          data = _this$state.data,
          keyPath = _this$state.keyPath; // Update data

      data[childKey] = childData; // Put new data

      this.setState({
        data: data
      }); // Spread

      var onUpdate = this.props.onUpdate;
      var size = keyPath.length;
      onUpdate(keyPath[size - 1], data);
    }
  }, {
    key: "handleAddMode",
    value: function handleAddMode() {
      this.setState({
        addFormVisible: true
      });
    }
  }, {
    key: "handleAddValueCancel",
    value: function handleAddValueCancel() {
      this.setState({
        addFormVisible: false
      });
    }
  }, {
    key: "handleAddValueAdd",
    value: function handleAddValueAdd(_ref) {
      var _this2 = this;

      var key = _ref.key,
          newValue = _ref.newValue;
      var _this$state2 = this.state,
          data = _this$state2.data,
          keyPath = _this$state2.keyPath,
          deep = _this$state2.nextDeep;
      var _this$props = this.props,
          beforeAddAction = _this$props.beforeAddAction,
          logger = _this$props.logger;
      beforeAddAction(key, keyPath, deep, newValue).then(function () {
        // Update data
        data[key] = newValue;

        _this2.setState({
          data: data
        }); // Cancel add to close


        _this2.handleAddValueCancel(); // Spread new update


        var _this2$props = _this2.props,
            onUpdate = _this2$props.onUpdate,
            onDeltaUpdate = _this2$props.onDeltaUpdate;
        onUpdate(keyPath[keyPath.length - 1], data); // Spread delta update

        onDeltaUpdate({
          type: _deltaTypes.ADD_DELTA_TYPE,
          keyPath: keyPath,
          deep: deep,
          key: key,
          newValue: newValue
        });
      }).catch(logger.error);
    }
  }, {
    key: "handleRemoveValue",
    value: function handleRemoveValue(key) {
      var _this3 = this;

      return function () {
        var _this3$props = _this3.props,
            beforeRemoveAction = _this3$props.beforeRemoveAction,
            logger = _this3$props.logger;
        var _this3$state = _this3.state,
            data = _this3$state.data,
            keyPath = _this3$state.keyPath,
            deep = _this3$state.nextDeep;
        var oldValue = data[key]; // Before Remove Action

        beforeRemoveAction(key, keyPath, deep, oldValue).then(function () {
          var deltaUpdateResult = {
            keyPath: keyPath,
            deep: deep,
            key: key,
            oldValue: oldValue,
            type: _deltaTypes.REMOVE_DELTA_TYPE
          };
          delete data[key];

          _this3.setState({
            data: data
          }); // Spread new update


          var _this3$props2 = _this3.props,
              onUpdate = _this3$props2.onUpdate,
              onDeltaUpdate = _this3$props2.onDeltaUpdate;
          onUpdate(keyPath[keyPath.length - 1], data); // Spread delta update

          onDeltaUpdate(deltaUpdateResult);
        }).catch(logger.error);
      };
    }
  }, {
    key: "handleCollapseMode",
    value: function handleCollapseMode() {
      this.setState(function (state) {
        return {
          collapsed: !state.collapsed
        };
      });
    }
  }, {
    key: "handleEditValue",
    value: function handleEditValue(_ref2) {
      var _this4 = this;

      var key = _ref2.key,
          value = _ref2.value;
      return new Promise(function (resolve, reject) {
        var beforeUpdateAction = _this4.props.beforeUpdateAction;
        var _this4$state = _this4.state,
            data = _this4$state.data,
            keyPath = _this4$state.keyPath,
            deep = _this4$state.nextDeep; // Old value

        var oldValue = data[key]; // Before update action

        beforeUpdateAction(key, keyPath, deep, oldValue, value).then(function () {
          // Update value
          data[key] = value; // Set state

          _this4.setState({
            data: data
          }); // Spread new update


          var _this4$props = _this4.props,
              onUpdate = _this4$props.onUpdate,
              onDeltaUpdate = _this4$props.onDeltaUpdate;
          onUpdate(keyPath[keyPath.length - 1], data); // Spread delta update

          onDeltaUpdate({
            type: _deltaTypes.UPDATE_DELTA_TYPE,
            keyPath: keyPath,
            deep: deep,
            key: key,
            newValue: value,
            oldValue: oldValue
          }); // Resolve

          resolve();
        }).catch(reject);
      });
    }
  }, {
    key: "renderCollapsed",
    value: function renderCollapsed() {
      var _this$state3 = this.state,
          name = _this$state3.name,
          keyPath = _this$state3.keyPath,
          deep = _this$state3.deep,
          data = _this$state3.data;
      var _this$props2 = this.props,
          handleRemove = _this$props2.handleRemove,
          readOnly = _this$props2.readOnly,
          dataType = _this$props2.dataType,
          getStyle = _this$props2.getStyle,
          minusMenuElement = _this$props2.minusMenuElement;

      var _getStyle = getStyle(name, data, keyPath, deep, dataType),
          minus = _getStyle.minus,
          collapsed = _getStyle.collapsed;

      var keyList = Object.getOwnPropertyNames(data);
      var isReadOnly = readOnly(name, data, keyPath, deep, dataType);

      var removeItemButton = /*#__PURE__*/_react.default.cloneElement(minusMenuElement, {
        onClick: handleRemove,
        className: 'rejt-minus-menu',
        style: minus
      });
      /* eslint-disable jsx-a11y/no-static-element-interactions */


      return /*#__PURE__*/_react.default.createElement("span", {
        className: "rejt-collapsed"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "rejt-collapsed-text",
        style: collapsed,
        onClick: this.handleCollapseMode
      }, '{...}', " ", keyList.length, " ", keyList.length === 1 ? 'key' : 'keys'), !isReadOnly && removeItemButton);
      /* eslint-enable */
    }
  }, {
    key: "renderNotCollapsed",
    value: function renderNotCollapsed() {
      var _this5 = this;

      var _this$state4 = this.state,
          name = _this$state4.name,
          data = _this$state4.data,
          keyPath = _this$state4.keyPath,
          deep = _this$state4.deep,
          nextDeep = _this$state4.nextDeep,
          addFormVisible = _this$state4.addFormVisible;
      var _this$props3 = this.props,
          isCollapsed = _this$props3.isCollapsed,
          handleRemove = _this$props3.handleRemove,
          onDeltaUpdate = _this$props3.onDeltaUpdate,
          readOnly = _this$props3.readOnly,
          getStyle = _this$props3.getStyle,
          dataType = _this$props3.dataType,
          addButtonElement = _this$props3.addButtonElement,
          cancelButtonElement = _this$props3.cancelButtonElement,
          editButtonElement = _this$props3.editButtonElement,
          inputElementGenerator = _this$props3.inputElementGenerator,
          textareaElementGenerator = _this$props3.textareaElementGenerator,
          minusMenuElement = _this$props3.minusMenuElement,
          plusMenuElement = _this$props3.plusMenuElement,
          beforeRemoveAction = _this$props3.beforeRemoveAction,
          beforeAddAction = _this$props3.beforeAddAction,
          beforeUpdateAction = _this$props3.beforeUpdateAction,
          logger = _this$props3.logger,
          onSubmitValueParser = _this$props3.onSubmitValueParser;

      var _getStyle2 = getStyle(name, data, keyPath, deep, dataType),
          minus = _getStyle2.minus,
          plus = _getStyle2.plus,
          addForm = _getStyle2.addForm,
          ul = _getStyle2.ul,
          delimiter = _getStyle2.delimiter;

      var keyList = Object.getOwnPropertyNames(data);
      var isReadOnly = readOnly(name, data, keyPath, deep, dataType);

      var addItemButton = /*#__PURE__*/_react.default.cloneElement(plusMenuElement, {
        onClick: this.handleAddMode,
        className: 'rejt-plus-menu',
        style: plus
      });

      var removeItemButton = /*#__PURE__*/_react.default.cloneElement(minusMenuElement, {
        onClick: handleRemove,
        className: 'rejt-minus-menu',
        style: minus
      });

      var list = keyList.map(function (key) {
        return /*#__PURE__*/_react.default.createElement(_JsonNode.default, {
          key: key,
          name: key,
          data: data[key],
          keyPath: keyPath,
          deep: nextDeep,
          isCollapsed: isCollapsed,
          handleRemove: _this5.handleRemoveValue(key),
          handleUpdateValue: _this5.handleEditValue,
          onUpdate: _this5.onChildUpdate,
          onDeltaUpdate: onDeltaUpdate,
          readOnly: readOnly,
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
      });
      var startObject = '{';
      var endObject = '}';
      return /*#__PURE__*/_react.default.createElement("span", {
        className: "rejt-not-collapsed"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "rejt-not-collapsed-delimiter",
        style: delimiter
      }, startObject), !isReadOnly && addItemButton, /*#__PURE__*/_react.default.createElement("ul", {
        className: "rejt-not-collapsed-list",
        style: ul
      }, list), !isReadOnly && addFormVisible && /*#__PURE__*/_react.default.createElement("div", {
        className: "rejt-add-form",
        style: addForm
      }, /*#__PURE__*/_react.default.createElement(_JsonAddValue.default, {
        handleAdd: this.handleAddValueAdd,
        handleCancel: this.handleAddValueCancel,
        addButtonElement: addButtonElement,
        cancelButtonElement: cancelButtonElement,
        inputElementGenerator: inputElementGenerator,
        keyPath: keyPath,
        deep: deep,
        onSubmitValueParser: onSubmitValueParser
      })), /*#__PURE__*/_react.default.createElement("span", {
        className: "rejt-not-collapsed-delimiter",
        style: delimiter
      }, endObject), !isReadOnly && removeItemButton);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state5 = this.state,
          name = _this$state5.name,
          collapsed = _this$state5.collapsed,
          data = _this$state5.data,
          keyPath = _this$state5.keyPath,
          deep = _this$state5.deep;
      var _this$props4 = this.props,
          getStyle = _this$props4.getStyle,
          dataType = _this$props4.dataType;
      var value = collapsed ? this.renderCollapsed() : this.renderNotCollapsed();
      var style = getStyle(name, data, keyPath, deep, dataType);
      /* eslint-disable jsx-a11y/no-static-element-interactions */

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "rejt-object-node"
      }, /*#__PURE__*/_react.default.createElement("span", {
        onClick: this.handleCollapseMode
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "rejt-name",
        style: style.name
      }, name, " :", ' ')), value);
      /* eslint-enable */
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return props.data !== state.data ? {
        data: props.data
      } : null;
    }
  }]);

  return JsonObject;
}(_react.Component);

JsonObject.displayName = "JsonObject";
JsonObject.propTypes = {
  data: _propTypes.default.object.isRequired,
  name: _propTypes.default.string.isRequired,
  isCollapsed: _propTypes.default.func.isRequired,
  keyPath: _propTypes.default.array,
  deep: _propTypes.default.number,
  handleRemove: _propTypes.default.func,
  onUpdate: _propTypes.default.func.isRequired,
  onDeltaUpdate: _propTypes.default.func.isRequired,
  readOnly: _propTypes.default.func.isRequired,
  dataType: _propTypes.default.string,
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
JsonObject.defaultProps = {
  keyPath: [],
  deep: 0,
  minusMenuElement: /*#__PURE__*/_react.default.createElement("span", null, " - "),
  plusMenuElement: /*#__PURE__*/_react.default.createElement("span", null, " + ")
};
var _default = JsonObject;
exports.default = _default;