'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var invariant = require('invariant');
var throttleDebounce = require('throttle-debounce');
var createResizeDetector = require('element-resize-detector');
var isShallowEqual = require('shallowequal');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
var invariant__default = /*#__PURE__*/_interopDefaultLegacy(invariant);
var createResizeDetector__default = /*#__PURE__*/_interopDefaultLegacy(createResizeDetector);
var isShallowEqual__default = /*#__PURE__*/_interopDefaultLegacy(isShallowEqual);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var instances = {}; // Lazily require to not cause bug
// https://github.com/ctrlplusb/react-sizeme/issues/6

function resizeDetector() {
  var strategy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'scroll';

  if (!instances[strategy]) {
    instances[strategy] = createResizeDetector__default['default']({
      strategy: strategy
    });
  }

  return instances[strategy];
}

var _excluded$1 = ["explicitRef", "className", "style", "size", "disablePlaceholder", "onSize"];
var errMsg = 'react-sizeme: an error occurred whilst stopping to listen to node size changes';
var defaultConfig = {
  monitorWidth: true,
  monitorHeight: false,
  refreshRate: 16,
  refreshMode: 'throttle',
  noPlaceholder: false,
  resizeDetectorStrategy: 'scroll'
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
/**
 * This is a utility wrapper component that will allow our higher order
 * component to get a ref handle on our wrapped components html.
 * @see https://gist.github.com/jimfb/32b587ee6177665fb4cf
 */


var ReferenceWrapper = /*#__PURE__*/function (_Component) {
  _inherits(ReferenceWrapper, _Component);

  var _super = _createSuper(ReferenceWrapper);

  function ReferenceWrapper() {
    _classCallCheck(this, ReferenceWrapper);

    return _super.apply(this, arguments);
  }

  _createClass(ReferenceWrapper, [{
    key: "render",
    value: function render() {
      return React.Children.only(this.props.children);
    }
  }]);

  return ReferenceWrapper;
}(React.Component);

_defineProperty(ReferenceWrapper, "displayName", 'SizeMeReferenceWrapper');

function Placeholder(_ref) {
  var className = _ref.className,
      style = _ref.style;
  // Lets create the props for the temp element.
  var phProps = {}; // We will use any provided className/style or else make the temp
  // container take the full available space.

  if (!className && !style) {
    phProps.style = {
      width: '100%',
      height: '100%'
    };
  } else {
    if (className) {
      phProps.className = className;
    }

    if (style) {
      phProps.style = style;
    }
  }

  return /*#__PURE__*/React__default['default'].createElement("div", phProps);
}

Placeholder.displayName = 'SizeMePlaceholder';
/**
 * As we need to maintain a ref on the root node that is rendered within our
 * SizeMe component we need to wrap our entire render in a sub component.
 * Without this, we lose the DOM ref after the placeholder is removed from
 * the render and the actual component is rendered.
 * It took me forever to figure this out, so tread extra careful on this one!
 */

var renderWrapper = function renderWrapper(WrappedComponent) {
  function SizeMeRenderer(props) {
    var explicitRef = props.explicitRef,
        className = props.className,
        style = props.style,
        size = props.size,
        disablePlaceholder = props.disablePlaceholder;
        props.onSize;
        var restProps = _objectWithoutProperties(props, _excluded$1);

    var noSizeData = size == null || size.width == null && size.height == null;
    var renderPlaceholder = noSizeData && !disablePlaceholder;
    var renderProps = {
      className: className,
      style: style
    };

    if (size != null) {
      renderProps.size = size;
    }

    var toRender = renderPlaceholder ? /*#__PURE__*/React__default['default'].createElement(Placeholder, {
      className: className,
      style: style
    }) : /*#__PURE__*/React__default['default'].createElement(WrappedComponent, _extends({}, renderProps, restProps));
    return /*#__PURE__*/React__default['default'].createElement(ReferenceWrapper, {
      ref: explicitRef
    }, toRender);
  }

  SizeMeRenderer.displayName = "SizeMeRenderer(".concat(getDisplayName(WrappedComponent), ")");
  return SizeMeRenderer;
};
/**
 * :: config -> Component -> WrappedComponent
 *
 * Higher order component that allows the wrapped component to become aware
 * of it's size, by receiving it as an object within it's props.
 *
 * @param  monitorWidth
 *   Default true, whether changes in the element's width should be monitored,
 *   causing a size property to be broadcast.
 * @param  monitorHeight
 *   Default false, whether changes in the element's height should be monitored,
 *   causing a size property to be broadcast.
 *
 * @return The wrapped component.
 */


function withSize() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultConfig;
  var _config$monitorWidth = config.monitorWidth,
      monitorWidth = _config$monitorWidth === void 0 ? defaultConfig.monitorWidth : _config$monitorWidth,
      _config$monitorHeight = config.monitorHeight,
      monitorHeight = _config$monitorHeight === void 0 ? defaultConfig.monitorHeight : _config$monitorHeight,
      _config$refreshRate = config.refreshRate,
      refreshRate = _config$refreshRate === void 0 ? defaultConfig.refreshRate : _config$refreshRate,
      _config$refreshMode = config.refreshMode,
      refreshMode = _config$refreshMode === void 0 ? defaultConfig.refreshMode : _config$refreshMode,
      _config$noPlaceholder = config.noPlaceholder,
      noPlaceholder = _config$noPlaceholder === void 0 ? defaultConfig.noPlaceholder : _config$noPlaceholder,
      _config$resizeDetecto = config.resizeDetectorStrategy,
      resizeDetectorStrategy = _config$resizeDetecto === void 0 ? defaultConfig.resizeDetectorStrategy : _config$resizeDetecto;
  invariant__default['default'](monitorWidth || monitorHeight, 'You have to monitor at least one of the width or height when using "sizeMe"');
  invariant__default['default'](refreshRate >= 16, "It is highly recommended that you don't put your refreshRate lower than " + '16 as this may cause layout thrashing.');
  invariant__default['default'](refreshMode === 'throttle' || refreshMode === 'debounce', 'The refreshMode should have a value of "throttle" or "debounce"');
  var refreshDelayStrategy = refreshMode === 'throttle' ? throttleDebounce.throttle : throttleDebounce.debounce;
  return function WrapComponent(WrappedComponent) {
    var SizeMeRenderWrapper = renderWrapper(WrappedComponent);

    var SizeAwareComponent = /*#__PURE__*/function (_React$Component) {
      _inherits(SizeAwareComponent, _React$Component);

      var _super2 = _createSuper(SizeAwareComponent);

      function SizeAwareComponent() {
        var _this;

        _classCallCheck(this, SizeAwareComponent);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _super2.call.apply(_super2, [this].concat(args));

        _defineProperty(_assertThisInitialized(_this), "domEl", null);

        _defineProperty(_assertThisInitialized(_this), "state", {
          width: undefined,
          height: undefined
        });

        _defineProperty(_assertThisInitialized(_this), "uninstall", function () {
          if (_this.domEl) {
            try {
              _this.detector.uninstall(_this.domEl);
            } catch (err) {
              // eslint-disable-next-line no-console
              console.warn(errMsg);
            }

            _this.domEl = null;
          }
        });

        _defineProperty(_assertThisInitialized(_this), "determineStrategy", function (props) {
          if (props.onSize) {
            if (!_this.callbackState) {
              _this.callbackState = _objectSpread2({}, _this.state);
            }

            _this.strategy = 'callback';
          } else {
            _this.strategy = 'render';
          }
        });

        _defineProperty(_assertThisInitialized(_this), "strategisedSetState", function (state) {
          if (_this.strategy === 'callback') {
            _this.callbackState = state;

            _this.props.onSize(state);
          }

          _this.setState(state);
        });

        _defineProperty(_assertThisInitialized(_this), "strategisedGetState", function () {
          return _this.strategy === 'callback' ? _this.callbackState : _this.state;
        });

        _defineProperty(_assertThisInitialized(_this), "refCallback", function (element) {
          _this.element = element;
        });

        _defineProperty(_assertThisInitialized(_this), "hasSizeChanged", function (current, next) {
          var c = current;
          var n = next;
          return monitorWidth && c.width !== n.width || monitorHeight && c.height !== n.height;
        });

        _defineProperty(_assertThisInitialized(_this), "checkIfSizeChanged", refreshDelayStrategy(refreshRate, function (el) {
          var _el$getBoundingClient = el.getBoundingClientRect(),
              width = _el$getBoundingClient.width,
              height = _el$getBoundingClient.height;

          var next = {
            width: monitorWidth ? width : null,
            height: monitorHeight ? height : null
          };

          if (_this.hasSizeChanged(_this.strategisedGetState(), next)) {
            _this.strategisedSetState(next);
          }
        }));

        return _this;
      }

      _createClass(SizeAwareComponent, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.detector = resizeDetector(resizeDetectorStrategy);
          this.determineStrategy(this.props);
          this.handleDOMNode();
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
          this.determineStrategy(this.props);
          this.handleDOMNode();
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          // Change our size checker to a noop just in case we have some
          // late running events.
          this.hasSizeChanged = function () {
            return undefined;
          };

          this.checkIfSizeChanged = function () {
            return undefined;
          };

          this.uninstall();
        }
      }, {
        key: "handleDOMNode",
        value: function handleDOMNode() {
          var found = this.element && ReactDOM__default['default'].findDOMNode(this.element);

          if (!found) {
            // If we previously had a dom node then we need to ensure that
            // we remove any existing listeners to avoid memory leaks.
            this.uninstall();
            return;
          }

          if (!this.domEl) {
            this.domEl = found;
            this.detector.listenTo(this.domEl, this.checkIfSizeChanged);
          } else if (this.domEl.isSameNode && !this.domEl.isSameNode(found) || this.domEl !== found) {
            this.uninstall();
            this.domEl = found;
            this.detector.listenTo(this.domEl, this.checkIfSizeChanged);
          } else ;
        }
      }, {
        key: "render",
        value: function render() {
          var disablePlaceholder = withSize.enableSSRBehaviour || withSize.noPlaceholders || noPlaceholder || this.strategy === 'callback';

          var size = _objectSpread2({}, this.state);

          return /*#__PURE__*/React__default['default'].createElement(SizeMeRenderWrapper, _extends({
            explicitRef: this.refCallback,
            size: this.strategy === 'callback' ? null : size,
            disablePlaceholder: disablePlaceholder
          }, this.props));
        }
      }]);

      return SizeAwareComponent;
    }(React__default['default'].Component);

    _defineProperty(SizeAwareComponent, "displayName", "SizeMe(".concat(getDisplayName(WrappedComponent), ")"));

    SizeAwareComponent.WrappedComponent = WrappedComponent;
    return SizeAwareComponent;
  };
}
/**
 * Allow SizeMe to run within SSR environments.  This is a "global" behaviour
 * flag that should be set within the initialisation phase of your application.
 *
 * Warning: don't set this flag unless you need to as using it may cause
 * extra render cycles to happen within your components depending on the logic
 * contained within them around the usage of the `size` data.
 *
 * DEPRECATED: Please use the global noPlaceholders
 */


withSize.enableSSRBehaviour = false;
/**
 * Global configuration allowing to disable placeholder rendering for all
 * sizeMe components.
 */

withSize.noPlaceholders = false;

var _excluded = ["children", "render"],
    _excluded2 = ["children", "render"],
    _excluded3 = ["children", "render"];

var SizeMe = /*#__PURE__*/function (_Component) {
  _inherits(SizeMe, _Component);

  var _super = _createSuper(SizeMe);

  function SizeMe(props) {
    var _this;

    _classCallCheck(this, SizeMe);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "createComponent", function (config) {
      _this.SizeAware = withSize(config)(function (_ref) {
        var children = _ref.children;
        return children;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSize", function (size) {
      return _this.setState({
        size: size
      });
    });

    props.children;
        props.render;
        var sizeMeConfig = _objectWithoutProperties(props, _excluded);

    _this.createComponent(sizeMeConfig);

    _this.state = {
      size: {
        width: undefined,
        height: undefined
      }
    };
    return _this;
  }

  _createClass(SizeMe, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props;
          _this$props.children;
          _this$props.render;
          var currentSizeMeConfig = _objectWithoutProperties(_this$props, _excluded2);

      prevProps.children;
          prevProps.render;
          var prevSizeMeConfig = _objectWithoutProperties(prevProps, _excluded3);

      if (!isShallowEqual__default['default'](currentSizeMeConfig, prevSizeMeConfig)) {
        this.createComponent(currentSizeMeConfig);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var SizeAware = this.SizeAware;
      var render = this.props.children || this.props.render;
      return /*#__PURE__*/React__default['default'].createElement(SizeAware, {
        onSize: this.onSize
      }, render({
        size: this.state.size
      }));
    }
  }]);

  return SizeMe;
}(React.Component);

_defineProperty(SizeMe, "defaultProps", {
  children: undefined,
  render: undefined
});

withSize.SizeMe = SizeMe;
withSize.withSize = withSize;

module.exports = withSize;
//# sourceMappingURL=react-sizeme.js.map
