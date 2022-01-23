function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
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

import React from 'react';
import { styled } from '@storybook/theming';
import { addons } from '@storybook/addons';
import Provider from './provider';
export var FakeProvider = /*#__PURE__*/function (_Provider) {
  _inherits(FakeProvider, _Provider);

  var _super = _createSuper(FakeProvider);

  function FakeProvider() {
    var _this;

    _classCallCheck(this, FakeProvider);

    _this = _super.call(this); // @ts-ignore

    _this.addons = addons; // @ts-ignore

    _this.channel = {
      on: function on() {},
      off: function off() {},
      emit: function emit() {},
      addListener: function addListener() {},
      removeListener: function removeListener() {}
    };
    return _this;
  } // @ts-ignore


  _createClass(FakeProvider, [{
    key: "getElements",
    value: function getElements(type) {
      return addons.getElements(type);
    }
  }, {
    key: "renderPreview",
    value: function renderPreview() {
      return /*#__PURE__*/React.createElement("div", null, "This is from a 'renderPreview' call from FakeProvider");
    } // @ts-ignore

  }, {
    key: "handleAPI",
    value: function handleAPI(api) {
      addons.loadAddons(api);
    } // @ts-ignore

  }, {
    key: "getConfig",
    value: function getConfig() {
      return {};
    }
  }]);

  return FakeProvider;
}(Provider);
export var Centered = styled.div({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
});
export var PrettyFakeProvider = /*#__PURE__*/function (_FakeProvider) {
  _inherits(PrettyFakeProvider, _FakeProvider);

  var _super2 = _createSuper(PrettyFakeProvider);

  function PrettyFakeProvider() {
    _classCallCheck(this, PrettyFakeProvider);

    return _super2.apply(this, arguments);
  }

  _createClass(PrettyFakeProvider, [{
    key: "renderPreview",
    value: function renderPreview() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return /*#__PURE__*/React.createElement(Centered, null, "This is from a 'renderPreview' call from FakeProvider", /*#__PURE__*/React.createElement("hr", null), "'renderPreview' was called with:", /*#__PURE__*/React.createElement("pre", null, JSON.stringify(args, null, 2)));
    }
  }]);

  return PrettyFakeProvider;
}(FakeProvider);