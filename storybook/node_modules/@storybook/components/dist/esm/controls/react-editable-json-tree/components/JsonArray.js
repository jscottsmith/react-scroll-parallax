function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.splice.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.slice.js";

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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JsonNode from './JsonNode';
import JsonAddValue from './JsonAddValue';
import { ADD_DELTA_TYPE, REMOVE_DELTA_TYPE, UPDATE_DELTA_TYPE } from '../types/deltaTypes';

var JsonArray = /*#__PURE__*/function (_Component) {
  _inherits(JsonArray, _Component);

  var _super = _createSuper(JsonArray);

  function JsonArray(props) {
    var _this;

    _classCallCheck(this, JsonArray);

    _this = _super.call(this, props);
    var keyPath = [].concat(_toConsumableArray(props.keyPath), [props.name]);
    _this.state = {
      data: props.data,
      name: props.name,
      keyPath: keyPath,
      deep: props.deep,
      nextDeep: props.deep + 1,
      collapsed: props.isCollapsed(keyPath, props.deep, props.data),
      addFormVisible: false
    }; // Bind

    _this.handleCollapseMode = _this.handleCollapseMode.bind(_assertThisInitialized(_this));
    _this.handleRemoveItem = _this.handleRemoveItem.bind(_assertThisInitialized(_this));
    _this.handleAddMode = _this.handleAddMode.bind(_assertThisInitialized(_this));
    _this.handleAddValueAdd = _this.handleAddValueAdd.bind(_assertThisInitialized(_this));
    _this.handleAddValueCancel = _this.handleAddValueCancel.bind(_assertThisInitialized(_this));
    _this.handleEditValue = _this.handleEditValue.bind(_assertThisInitialized(_this));
    _this.onChildUpdate = _this.onChildUpdate.bind(_assertThisInitialized(_this));
    _this.renderCollapsed = _this.renderCollapsed.bind(_assertThisInitialized(_this));
    _this.renderNotCollapsed = _this.renderNotCollapsed.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(JsonArray, [{
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
    key: "handleCollapseMode",
    value: function handleCollapseMode() {
      this.setState(function (state) {
        return {
          collapsed: !state.collapsed
        };
      });
    }
  }, {
    key: "handleRemoveItem",
    value: function handleRemoveItem(index) {
      var _this2 = this;

      return function () {
        var _this2$props = _this2.props,
            beforeRemoveAction = _this2$props.beforeRemoveAction,
            logger = _this2$props.logger;
        var _this2$state = _this2.state,
            data = _this2$state.data,
            keyPath = _this2$state.keyPath,
            deep = _this2$state.nextDeep;
        var oldValue = data[index]; // Before Remove Action

        beforeRemoveAction(index, keyPath, deep, oldValue).then(function () {
          var deltaUpdateResult = {
            keyPath: keyPath,
            deep: deep,
            key: index,
            oldValue: oldValue,
            type: REMOVE_DELTA_TYPE
          };
          data.splice(index, 1);

          _this2.setState({
            data: data
          }); // Spread new update


          var _this2$props2 = _this2.props,
              onUpdate = _this2$props2.onUpdate,
              onDeltaUpdate = _this2$props2.onDeltaUpdate;
          onUpdate(keyPath[keyPath.length - 1], data); // Spread delta update

          onDeltaUpdate(deltaUpdateResult);
        }).catch(logger.error);
      };
    }
  }, {
    key: "handleAddValueAdd",
    value: function handleAddValueAdd(_ref) {
      var _this3 = this;

      var newValue = _ref.newValue;
      var _this$state2 = this.state,
          data = _this$state2.data,
          keyPath = _this$state2.keyPath,
          deep = _this$state2.nextDeep;
      var _this$props = this.props,
          beforeAddAction = _this$props.beforeAddAction,
          logger = _this$props.logger;
      beforeAddAction(data.length, keyPath, deep, newValue).then(function () {
        // Update data
        var newData = [].concat(_toConsumableArray(data), [newValue]);

        _this3.setState({
          data: newData
        }); // Cancel add to close


        _this3.handleAddValueCancel(); // Spread new update


        var _this3$props = _this3.props,
            onUpdate = _this3$props.onUpdate,
            onDeltaUpdate = _this3$props.onDeltaUpdate;
        onUpdate(keyPath[keyPath.length - 1], newData); // Spread delta update

        onDeltaUpdate({
          type: ADD_DELTA_TYPE,
          keyPath: keyPath,
          deep: deep,
          key: newData.length - 1,
          newValue: newValue
        });
      }).catch(logger.error);
    }
  }, {
    key: "handleAddValueCancel",
    value: function handleAddValueCancel() {
      this.setState({
        addFormVisible: false
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
            type: UPDATE_DELTA_TYPE,
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
          data = _this$state3.data,
          keyPath = _this$state3.keyPath,
          deep = _this$state3.deep;
      var _this$props2 = this.props,
          handleRemove = _this$props2.handleRemove,
          readOnly = _this$props2.readOnly,
          getStyle = _this$props2.getStyle,
          dataType = _this$props2.dataType,
          minusMenuElement = _this$props2.minusMenuElement;

      var _getStyle = getStyle(name, data, keyPath, deep, dataType),
          minus = _getStyle.minus,
          collapsed = _getStyle.collapsed;

      var isReadOnly = readOnly(name, data, keyPath, deep, dataType);
      var removeItemButton = /*#__PURE__*/React.cloneElement(minusMenuElement, {
        onClick: handleRemove,
        className: 'rejt-minus-menu',
        style: minus
      });
      /* eslint-disable jsx-a11y/no-static-element-interactions */

      return /*#__PURE__*/React.createElement("span", {
        className: "rejt-collapsed"
      }, /*#__PURE__*/React.createElement("span", {
        className: "rejt-collapsed-text",
        style: collapsed,
        onClick: this.handleCollapseMode
      }, "[...] ", data.length, " ", data.length === 1 ? 'item' : 'items'), !isReadOnly && removeItemButton);
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
          addFormVisible = _this$state4.addFormVisible,
          nextDeep = _this$state4.nextDeep;
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
          delimiter = _getStyle2.delimiter,
          ul = _getStyle2.ul,
          addForm = _getStyle2.addForm;

      var isReadOnly = readOnly(name, data, keyPath, deep, dataType);
      var addItemButton = /*#__PURE__*/React.cloneElement(plusMenuElement, {
        onClick: this.handleAddMode,
        className: 'rejt-plus-menu',
        style: plus
      });
      var removeItemButton = /*#__PURE__*/React.cloneElement(minusMenuElement, {
        onClick: handleRemove,
        className: 'rejt-minus-menu',
        style: minus
      });
      var onlyValue = true;
      var startObject = '[';
      var endObject = ']';
      return /*#__PURE__*/React.createElement("span", {
        className: "rejt-not-collapsed"
      }, /*#__PURE__*/React.createElement("span", {
        className: "rejt-not-collapsed-delimiter",
        style: delimiter
      }, startObject), !addFormVisible && addItemButton, /*#__PURE__*/React.createElement("ul", {
        className: "rejt-not-collapsed-list",
        style: ul
      }, data.map(function (item, index) {
        return /*#__PURE__*/React.createElement(JsonNode, {
          key: index,
          name: "".concat(index),
          data: item,
          keyPath: keyPath,
          deep: nextDeep,
          isCollapsed: isCollapsed,
          handleRemove: _this5.handleRemoveItem(index),
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
      })), !isReadOnly && addFormVisible && /*#__PURE__*/React.createElement("div", {
        className: "rejt-add-form",
        style: addForm
      }, /*#__PURE__*/React.createElement(JsonAddValue, {
        handleAdd: this.handleAddValueAdd,
        handleCancel: this.handleAddValueCancel,
        onlyValue: onlyValue,
        addButtonElement: addButtonElement,
        cancelButtonElement: cancelButtonElement,
        inputElementGenerator: inputElementGenerator,
        keyPath: keyPath,
        deep: deep,
        onSubmitValueParser: onSubmitValueParser
      })), /*#__PURE__*/React.createElement("span", {
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
          dataType = _this$props4.dataType,
          getStyle = _this$props4.getStyle;
      var value = collapsed ? this.renderCollapsed() : this.renderNotCollapsed();
      var style = getStyle(name, data, keyPath, deep, dataType);
      /* eslint-disable jsx-a11y/no-static-element-interactions */

      return /*#__PURE__*/React.createElement("div", {
        className: "rejt-array-node"
      }, /*#__PURE__*/React.createElement("span", {
        onClick: this.handleCollapseMode
      }, /*#__PURE__*/React.createElement("span", {
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

  return JsonArray;
}(Component);

JsonArray.displayName = "JsonArray";
JsonArray.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  isCollapsed: PropTypes.func.isRequired,
  keyPath: PropTypes.array,
  deep: PropTypes.number,
  handleRemove: PropTypes.func,
  onUpdate: PropTypes.func.isRequired,
  onDeltaUpdate: PropTypes.func.isRequired,
  readOnly: PropTypes.func.isRequired,
  dataType: PropTypes.string,
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
JsonArray.defaultProps = {
  keyPath: [],
  deep: 0,
  minusMenuElement: /*#__PURE__*/React.createElement("span", null, " - "),
  plusMenuElement: /*#__PURE__*/React.createElement("span", null, " + ")
};
export default JsonArray;