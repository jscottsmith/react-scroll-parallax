"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.freeze.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShortcutsScreen = exports.SuccessIcon = exports.Fade = exports.TextInput = exports.Description = exports.GridWrapper = exports.Row = exports.GridHeaderRow = exports.HeaderItem = void 0;

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.string.bold.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.array.map.js");

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _shortcut = require("@storybook/api/shortcut");

var _components = require("@storybook/components");

var _SettingsFooter = _interopRequireDefault(require("./SettingsFooter"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Button = _components.Form.Button,
    Input = _components.Form.Input;

var Header = _theming.styled.header(function (_ref) {
  var theme = _ref.theme;
  return {
    marginBottom: 20,
    fontSize: theme.typography.size.m3,
    fontWeight: theme.typography.weight.black,
    alignItems: 'center',
    display: 'flex'
  };
}); // Grid


var HeaderItem = _theming.styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return {
    fontWeight: theme.typography.weight.bold
  };
});

exports.HeaderItem = HeaderItem;

var GridHeaderRow = _theming.styled.div({
  alignSelf: 'flex-end',
  display: 'grid',
  margin: '10px 0',
  gridTemplateColumns: '1fr 1fr 12px',
  '& > *:last-of-type': {
    gridColumn: '2 / 2',
    justifySelf: 'flex-end',
    gridRow: '1'
  }
});

exports.GridHeaderRow = GridHeaderRow;

var Row = _theming.styled.div(function (_ref3) {
  var theme = _ref3.theme;
  return {
    padding: '6px 0',
    borderTop: "1px solid ".concat(theme.appBorderColor),
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 0px'
  };
});

exports.Row = Row;

var GridWrapper = _theming.styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridAutoRows: 'minmax(auto, auto)',
  marginBottom: 20
}); // Form


exports.GridWrapper = GridWrapper;

var Description = _theming.styled.div({
  alignSelf: 'center'
});

exports.Description = Description;
var TextInput = (0, _theming.styled)(Input)(function (_ref4) {
  var valid = _ref4.valid,
      theme = _ref4.theme;
  return valid === 'error' ? {
    animation: "".concat(theme.animation.jiggle, " 700ms ease-out")
  } : {};
}, {
  display: 'flex',
  width: 80,
  flexDirection: 'column',
  justifySelf: 'flex-end',
  paddingLeft: 4,
  paddingRight: 4,
  textAlign: 'center'
});
exports.TextInput = TextInput;
var Fade = (0, _theming.keyframes)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n0%,100% { opacity: 0; }\n  50% { opacity: 1; }\n"])));
exports.Fade = Fade;
var SuccessIcon = (0, _theming.styled)(_components.Icons)(function (_ref5) {
  var valid = _ref5.valid,
      theme = _ref5.theme;
  return valid === 'valid' ? {
    color: theme.color.positive,
    animation: "".concat(Fade, " 2s ease forwards")
  } : {
    opacity: 0
  };
}, {
  alignSelf: 'center',
  display: 'flex',
  marginLeft: 10,
  height: 14,
  width: 14
});
exports.SuccessIcon = SuccessIcon;

var Container = _theming.styled.div(function (_ref6) {
  var theme = _ref6.theme;
  return {
    fontSize: theme.typography.size.s2,
    padding: "3rem 20px",
    maxWidth: 600,
    margin: '0 auto'
  };
});

var shortcutLabels = {
  fullScreen: 'Go full screen',
  togglePanel: 'Toggle addons',
  panelPosition: 'Toggle addons orientation',
  toggleNav: 'Toggle sidebar',
  toolbar: 'Toggle canvas toolbar',
  search: 'Focus search',
  focusNav: 'Focus sidebar',
  focusIframe: 'Focus canvas',
  focusPanel: 'Focus addons',
  prevComponent: 'Previous component',
  nextComponent: 'Next component',
  prevStory: 'Previous story',
  nextStory: 'Next story',
  shortcutsPage: 'Go to shortcuts page',
  aboutPage: 'Go to about page',
  collapseAll: 'Collapse all items on sidebar',
  expandAll: 'Expand all items on sidebar'
};
// Shortcuts that cannot be configured
var fixedShortcuts = ['escape'];

function toShortcutState(shortcutKeys) {
  return Object.entries(shortcutKeys).reduce(function (acc, _ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        feature = _ref8[0],
        shortcut = _ref8[1];

    return fixedShortcuts.includes(feature) ? acc : Object.assign({}, acc, _defineProperty({}, feature, {
      shortcut: shortcut,
      error: false
    }));
  }, {});
}

var ShortcutsScreen = /*#__PURE__*/function (_Component) {
  _inherits(ShortcutsScreen, _Component);

  var _super = _createSuper(ShortcutsScreen);

  function ShortcutsScreen(props) {
    var _this;

    _classCallCheck(this, ShortcutsScreen);

    _this = _super.call(this, props);

    _this.onKeyDown = function (e) {
      var _this$state = _this.state,
          activeFeature = _this$state.activeFeature,
          shortcutKeys = _this$state.shortcutKeys;

      if (e.key === 'Backspace') {
        return _this.restoreDefault();
      }

      var shortcut = (0, _shortcut.eventToShortcut)(e); // Keypress is not a potential shortcut

      if (!shortcut) {
        return false;
      } // Check we don't match any other shortcuts


      var error = !!Object.entries(shortcutKeys).find(function (_ref9) {
        var _ref10 = _slicedToArray(_ref9, 2),
            feature = _ref10[0],
            existingShortcut = _ref10[1].shortcut;

        return feature !== activeFeature && existingShortcut && (0, _shortcut.shortcutMatchesShortcut)(shortcut, existingShortcut);
      });
      return _this.setState({
        shortcutKeys: Object.assign({}, shortcutKeys, _defineProperty({}, activeFeature, {
          shortcut: shortcut,
          error: error
        }))
      });
    };

    _this.onFocus = function (focusedInput) {
      return function () {
        var shortcutKeys = _this.state.shortcutKeys;

        _this.setState({
          activeFeature: focusedInput,
          shortcutKeys: Object.assign({}, shortcutKeys, _defineProperty({}, focusedInput, {
            shortcut: null,
            error: false
          }))
        });
      };
    };

    _this.onBlur = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this$state2, shortcutKeys, activeFeature, _shortcutKeys$activeF, shortcut, error;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$state2 = _this.state, shortcutKeys = _this$state2.shortcutKeys, activeFeature = _this$state2.activeFeature;

              if (!shortcutKeys[activeFeature]) {
                _context.next = 6;
                break;
              }

              _shortcutKeys$activeF = shortcutKeys[activeFeature], shortcut = _shortcutKeys$activeF.shortcut, error = _shortcutKeys$activeF.error;

              if (!(!shortcut || error)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", _this.restoreDefault());

            case 5:
              return _context.abrupt("return", _this.saveShortcut());

            case 6:
              return _context.abrupt("return", false);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    _this.saveShortcut = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _this$state3, activeFeature, shortcutKeys, setShortcut;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$state3 = _this.state, activeFeature = _this$state3.activeFeature, shortcutKeys = _this$state3.shortcutKeys;
              setShortcut = _this.props.setShortcut;
              _context2.next = 4;
              return setShortcut(activeFeature, shortcutKeys[activeFeature].shortcut);

            case 4:
              _this.setState({
                successField: activeFeature
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    _this.restoreDefaults = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var restoreAllDefaultShortcuts, defaultShortcuts;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              restoreAllDefaultShortcuts = _this.props.restoreAllDefaultShortcuts;
              _context3.next = 3;
              return restoreAllDefaultShortcuts();

            case 3:
              defaultShortcuts = _context3.sent;
              return _context3.abrupt("return", _this.setState({
                shortcutKeys: toShortcutState(defaultShortcuts)
              }));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    _this.restoreDefault = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _this$state4, activeFeature, shortcutKeys, restoreDefaultShortcut, defaultShortcut;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _this$state4 = _this.state, activeFeature = _this$state4.activeFeature, shortcutKeys = _this$state4.shortcutKeys;
              restoreDefaultShortcut = _this.props.restoreDefaultShortcut;
              _context4.next = 4;
              return restoreDefaultShortcut(activeFeature);

            case 4:
              defaultShortcut = _context4.sent;
              return _context4.abrupt("return", _this.setState({
                shortcutKeys: Object.assign({}, shortcutKeys, toShortcutState(_defineProperty({}, activeFeature, defaultShortcut)))
              }));

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    _this.displaySuccessMessage = function (activeElement) {
      var _this$state5 = _this.state,
          successField = _this$state5.successField,
          shortcutKeys = _this$state5.shortcutKeys;
      return activeElement === successField && shortcutKeys[activeElement].error === false ? 'valid' : undefined;
    };

    _this.displayError = function (activeElement) {
      var _this$state6 = _this.state,
          activeFeature = _this$state6.activeFeature,
          shortcutKeys = _this$state6.shortcutKeys;
      return activeElement === activeFeature && shortcutKeys[activeElement].error === true ? 'error' : undefined;
    };

    _this.renderKeyInput = function () {
      var _this$state7 = _this.state,
          shortcutKeys = _this$state7.shortcutKeys,
          addonsShortcutLabels = _this$state7.addonsShortcutLabels;
      var arr = Object.entries(shortcutKeys).map(function (_ref15) {
        var _ref16 = _slicedToArray(_ref15, 2),
            feature = _ref16[0],
            shortcut = _ref16[1].shortcut;

        return /*#__PURE__*/_react.default.createElement(Row, {
          key: feature
        }, /*#__PURE__*/_react.default.createElement(Description, null, shortcutLabels[feature] || addonsShortcutLabels[feature]), /*#__PURE__*/_react.default.createElement(TextInput, {
          spellCheck: "false",
          valid: _this.displayError(feature),
          className: "modalInput",
          onBlur: _this.onBlur,
          onFocus: _this.onFocus(feature) // @ts-ignore
          ,
          onKeyDown: _this.onKeyDown,
          value: shortcut ? (0, _shortcut.shortcutToHumanString)(shortcut) : '',
          placeholder: "Type keys",
          readOnly: true
        }), /*#__PURE__*/_react.default.createElement(SuccessIcon, {
          valid: _this.displaySuccessMessage(feature),
          icon: "check"
        }));
      });
      return arr;
    };

    _this.renderKeyForm = function () {
      return /*#__PURE__*/_react.default.createElement(GridWrapper, null, /*#__PURE__*/_react.default.createElement(GridHeaderRow, null, /*#__PURE__*/_react.default.createElement(HeaderItem, null, "Commands"), /*#__PURE__*/_react.default.createElement(HeaderItem, null, "Shortcut")), _this.renderKeyInput());
    };

    _this.state = {
      activeFeature: undefined,
      successField: undefined,
      // The initial shortcutKeys that come from props are the defaults/what was saved
      // As the user interacts with the page, the state stores the temporary, unsaved shortcuts
      // This object also includes the error attached to each shortcut
      shortcutKeys: toShortcutState(props.shortcutKeys),
      addonsShortcutLabels: props.addonsShortcutLabels
    };
    return _this;
  }

  _createClass(ShortcutsScreen, [{
    key: "render",
    value: function render() {
      var layout = this.renderKeyForm();
      return /*#__PURE__*/_react.default.createElement(Container, null, /*#__PURE__*/_react.default.createElement(Header, null, "Keyboard shortcuts"), layout, /*#__PURE__*/_react.default.createElement(Button, {
        tertiary: true,
        small: true,
        id: "restoreDefaultsHotkeys",
        onClick: this.restoreDefaults
      }, "Restore defaults"), /*#__PURE__*/_react.default.createElement(_SettingsFooter.default, null));
    }
  }]);

  return ShortcutsScreen;
}(_react.Component);

exports.ShortcutsScreen = ShortcutsScreen;
ShortcutsScreen.displayName = "ShortcutsScreen";