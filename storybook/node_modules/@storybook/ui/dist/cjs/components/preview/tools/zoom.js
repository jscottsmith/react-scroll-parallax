"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

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
exports.zoomTool = exports.ZoomProvider = exports.ZoomConsumer = exports.Zoom = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _react = _interopRequireWildcard(require("react"));

var _components = require("@storybook/components");

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

var initialZoom = 1;

var Context = /*#__PURE__*/_react.default.createContext({
  value: initialZoom,
  set: function set(v) {}
});

var ZoomProvider = /*#__PURE__*/function (_Component) {
  _inherits(ZoomProvider, _Component);

  var _super = _createSuper(ZoomProvider);

  function ZoomProvider() {
    var _this;

    _classCallCheck(this, ZoomProvider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      value: initialZoom
    };

    _this.set = function (value) {
      return _this.setState({
        value: value
      });
    };

    return _this;
  }

  _createClass(ZoomProvider, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          shouldScale = _this$props.shouldScale;
      var set = this.set;
      var value = this.state.value;
      return /*#__PURE__*/_react.default.createElement(Context.Provider, {
        value: {
          value: shouldScale ? value : initialZoom,
          set: set
        }
      }, children);
    }
  }]);

  return ZoomProvider;
}(_react.Component);

exports.ZoomProvider = ZoomProvider;
ZoomProvider.displayName = "ZoomProvider";
var ZoomConsumer = Context.Consumer;
exports.ZoomConsumer = ZoomConsumer;

var Zoom = /*#__PURE__*/_react.default.memo(function (_ref) {
  var zoomIn = _ref.zoomIn,
      zoomOut = _ref.zoomOut,
      reset = _ref.reset;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_components.IconButton, {
    key: "zoomin",
    onClick: zoomIn,
    title: "Zoom in"
  }, /*#__PURE__*/_react.default.createElement(_components.Icons, {
    icon: "zoom"
  })), /*#__PURE__*/_react.default.createElement(_components.IconButton, {
    key: "zoomout",
    onClick: zoomOut,
    title: "Zoom out"
  }, /*#__PURE__*/_react.default.createElement(_components.Icons, {
    icon: "zoomout"
  })), /*#__PURE__*/_react.default.createElement(_components.IconButton, {
    key: "zoomreset",
    onClick: reset,
    title: "Reset zoom"
  }, /*#__PURE__*/_react.default.createElement(_components.Icons, {
    icon: "zoomreset"
  })));
});

exports.Zoom = Zoom;

var ZoomWrapper = /*#__PURE__*/_react.default.memo(function (_ref2) {
  var set = _ref2.set,
      value = _ref2.value;
  var zoomIn = (0, _react.useCallback)(function (e) {
    e.preventDefault();
    set(0.8 * value);
  }, [set, value]);
  var zoomOut = (0, _react.useCallback)(function (e) {
    e.preventDefault();
    set(1.25 * value);
  }, [set, value]);
  var reset = (0, _react.useCallback)(function (e) {
    e.preventDefault();
    set(initialZoom);
  }, [set, initialZoom]);
  return /*#__PURE__*/_react.default.createElement(Zoom, {
    key: "zoom",
    zoomIn: zoomIn,
    zoomOut: zoomOut,
    reset: reset
  });
});

var zoomTool = {
  title: 'zoom',
  id: 'zoom',
  match: function match(_ref3) {
    var viewMode = _ref3.viewMode;
    return viewMode === 'story';
  },
  render: /*#__PURE__*/_react.default.memo(function () {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(ZoomConsumer, null, function (_ref4) {
      var set = _ref4.set,
          value = _ref4.value;
      return /*#__PURE__*/_react.default.createElement(ZoomWrapper, {
        set: set,
        value: value
      });
    }), /*#__PURE__*/_react.default.createElement(_components.Separator, null));
  })
};
exports.zoomTool = zoomTool;