"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZoomIFrame = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _react = require("react");

var _browserSupportsCssZoom = require("./browserSupportsCssZoom");

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

var ZoomIFrame = /*#__PURE__*/function (_Component) {
  _inherits(ZoomIFrame, _Component);

  var _super = _createSuper(ZoomIFrame);

  function ZoomIFrame() {
    var _this;

    _classCallCheck(this, ZoomIFrame);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.iframe = null;
    return _this;
  }

  _createClass(ZoomIFrame, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var iFrameRef = this.props.iFrameRef;
      this.iframe = iFrameRef.current;
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _this$props = this.props,
          scale = _this$props.scale,
          active = _this$props.active;

      if (scale !== nextProps.scale) {
        this.setIframeInnerZoom(nextProps.scale);
      }

      if (active !== nextProps.active) {
        this.iframe.setAttribute('data-is-storybook', nextProps.active ? 'true' : 'false');
      } // this component renders an iframe, which gets updates via post-messages
      // never update this component, it will cause the iframe to refresh


      return false;
    }
  }, {
    key: "setIframeInnerZoom",
    value: function setIframeInnerZoom(scale) {
      try {
        if ((0, _browserSupportsCssZoom.browserSupportsCssZoom)()) {
          Object.assign(this.iframe.contentDocument.body.style, {
            zoom: 1 / scale
          });
        } else {
          Object.assign(this.iframe.contentDocument.body.style, {
            width: "".concat(scale * 100, "%"),
            height: "".concat(scale * 100, "%"),
            transform: "scale(".concat(1 / scale, ")"),
            transformOrigin: 'top left'
          });
        }
      } catch (e) {
        this.setIframeZoom(scale);
      }
    }
  }, {
    key: "setIframeZoom",
    value: function setIframeZoom(scale) {
      Object.assign(this.iframe.style, {
        width: "".concat(scale * 100, "%"),
        height: "".concat(scale * 100, "%"),
        transform: "scale(".concat(1 / scale, ")"),
        transformOrigin: 'top left'
      });
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return children;
    }
  }]);

  return ZoomIFrame;
}(_react.Component);

exports.ZoomIFrame = ZoomIFrame;
ZoomIFrame.displayName = "ZoomIFrame";