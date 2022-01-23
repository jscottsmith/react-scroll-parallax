(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('preact'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['exports', 'preact', 'prop-types'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Downshift = {}, global.preact, global.PropTypes));
}(this, (function (exports, preact, PropTypes) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

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

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }

  var reactIs = {exports: {}};

  /** @license React v17.0.2
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  if("function"===typeof Symbol&&Symbol.for){var x=Symbol.for;x("react.element");x("react.portal");x("react.fragment");x("react.strict_mode");x("react.profiler");x("react.provider");x("react.context");x("react.forward_ref");x("react.suspense");x("react.suspense_list");x("react.memo");x("react.lazy");x("react.block");x("react.server.block");x("react.fundamental");x("react.debug_trace_mode");x("react.legacy_hidden");}

  var reactIs_development = {};

  /** @license React v17.0.2
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    (function() {

  // ATTENTION
  // When adding new symbols to this file,
  // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var REACT_ELEMENT_TYPE = 0xeac7;
  var REACT_PORTAL_TYPE = 0xeaca;
  var REACT_FRAGMENT_TYPE = 0xeacb;
  var REACT_STRICT_MODE_TYPE = 0xeacc;
  var REACT_PROFILER_TYPE = 0xead2;
  var REACT_PROVIDER_TYPE = 0xeacd;
  var REACT_CONTEXT_TYPE = 0xeace;
  var REACT_FORWARD_REF_TYPE = 0xead0;
  var REACT_SUSPENSE_TYPE = 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = 0xead8;
  var REACT_MEMO_TYPE = 0xead3;
  var REACT_LAZY_TYPE = 0xead4;
  var REACT_BLOCK_TYPE = 0xead9;
  var REACT_SERVER_BLOCK_TYPE = 0xeada;
  var REACT_FUNDAMENTAL_TYPE = 0xead5;
  var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
  var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

  if (typeof Symbol === 'function' && Symbol.for) {
    var symbolFor = Symbol.for;
    REACT_ELEMENT_TYPE = symbolFor('react.element');
    REACT_PORTAL_TYPE = symbolFor('react.portal');
    REACT_FRAGMENT_TYPE = symbolFor('react.fragment');
    REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
    REACT_PROFILER_TYPE = symbolFor('react.profiler');
    REACT_PROVIDER_TYPE = symbolFor('react.provider');
    REACT_CONTEXT_TYPE = symbolFor('react.context');
    REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
    REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
    REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
    REACT_MEMO_TYPE = symbolFor('react.memo');
    REACT_LAZY_TYPE = symbolFor('react.lazy');
    REACT_BLOCK_TYPE = symbolFor('react.block');
    REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
    REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
    symbolFor('react.scope');
    symbolFor('react.opaque.id');
    REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
    symbolFor('react.offscreen');
    REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
  }

  // Filter certain DOM attributes (e.g. src, href) if their values are empty strings.

  var enableScopeAPI = false; // Experimental Create Event Handle API.

  function isValidElementType(type) {
    if (typeof type === 'string' || typeof type === 'function') {
      return true;
    } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


    if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI ) {
      return true;
    }

    if (typeof type === 'object' && type !== null) {
      if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
        return true;
      }
    }

    return false;
  }

  function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
      var $$typeof = object.$$typeof;

      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = object.type;

          switch (type) {
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
            case REACT_SUSPENSE_TYPE:
            case REACT_SUSPENSE_LIST_TYPE:
              return type;

            default:
              var $$typeofType = type && type.$$typeof;

              switch ($$typeofType) {
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_LAZY_TYPE:
                case REACT_MEMO_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;

                default:
                  return $$typeof;
              }

          }

        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }

    return undefined;
  }
  var ContextConsumer = REACT_CONTEXT_TYPE;
  var ContextProvider = REACT_PROVIDER_TYPE;
  var Element = REACT_ELEMENT_TYPE;
  var ForwardRef = REACT_FORWARD_REF_TYPE;
  var Fragment = REACT_FRAGMENT_TYPE;
  var Lazy = REACT_LAZY_TYPE;
  var Memo = REACT_MEMO_TYPE;
  var Portal = REACT_PORTAL_TYPE;
  var Profiler = REACT_PROFILER_TYPE;
  var StrictMode = REACT_STRICT_MODE_TYPE;
  var Suspense = REACT_SUSPENSE_TYPE;
  var hasWarnedAboutDeprecatedIsAsyncMode = false;
  var hasWarnedAboutDeprecatedIsConcurrentMode = false; // AsyncMode should be deprecated

  function isAsyncMode(object) {
    {
      if (!hasWarnedAboutDeprecatedIsAsyncMode) {
        hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

        console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
      }
    }

    return false;
  }
  function isConcurrentMode(object) {
    {
      if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
        hasWarnedAboutDeprecatedIsConcurrentMode = true; // Using console['warn'] to evade Babel and ESLint

        console['warn']('The ReactIs.isConcurrentMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
      }
    }

    return false;
  }
  function isContextConsumer(object) {
    return typeOf(object) === REACT_CONTEXT_TYPE;
  }
  function isContextProvider(object) {
    return typeOf(object) === REACT_PROVIDER_TYPE;
  }
  function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function isForwardRef(object) {
    return typeOf(object) === REACT_FORWARD_REF_TYPE;
  }
  function isFragment(object) {
    return typeOf(object) === REACT_FRAGMENT_TYPE;
  }
  function isLazy(object) {
    return typeOf(object) === REACT_LAZY_TYPE;
  }
  function isMemo(object) {
    return typeOf(object) === REACT_MEMO_TYPE;
  }
  function isPortal(object) {
    return typeOf(object) === REACT_PORTAL_TYPE;
  }
  function isProfiler(object) {
    return typeOf(object) === REACT_PROFILER_TYPE;
  }
  function isStrictMode(object) {
    return typeOf(object) === REACT_STRICT_MODE_TYPE;
  }
  function isSuspense(object) {
    return typeOf(object) === REACT_SUSPENSE_TYPE;
  }

  reactIs_development.ContextConsumer = ContextConsumer;
  reactIs_development.ContextProvider = ContextProvider;
  reactIs_development.Element = Element;
  reactIs_development.ForwardRef = ForwardRef;
  reactIs_development.Fragment = Fragment;
  reactIs_development.Lazy = Lazy;
  reactIs_development.Memo = Memo;
  reactIs_development.Portal = Portal;
  reactIs_development.Profiler = Profiler;
  reactIs_development.StrictMode = StrictMode;
  reactIs_development.Suspense = Suspense;
  reactIs_development.isAsyncMode = isAsyncMode;
  reactIs_development.isConcurrentMode = isConcurrentMode;
  reactIs_development.isContextConsumer = isContextConsumer;
  reactIs_development.isContextProvider = isContextProvider;
  reactIs_development.isElement = isElement;
  reactIs_development.isForwardRef = isForwardRef;
  reactIs_development.isFragment = isFragment;
  reactIs_development.isLazy = isLazy;
  reactIs_development.isMemo = isMemo;
  reactIs_development.isPortal = isPortal;
  reactIs_development.isProfiler = isProfiler;
  reactIs_development.isStrictMode = isStrictMode;
  reactIs_development.isSuspense = isSuspense;
  reactIs_development.isValidElementType = isValidElementType;
  reactIs_development.typeOf = typeOf;
    })();
  }

  {
    reactIs.exports = reactIs_development;
  }

  function t(t){return "object"==typeof t&&null!=t&&1===t.nodeType}function e(t,e){return (!e||"hidden"!==t)&&"visible"!==t&&"clip"!==t}function n(t,n){if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){var r=getComputedStyle(t,null);return e(r.overflowY,n)||e(r.overflowX,n)||function(t){var e=function(t){if(!t.ownerDocument||!t.ownerDocument.defaultView)return null;try{return t.ownerDocument.defaultView.frameElement}catch(t){return null}}(t);return !!e&&(e.clientHeight<t.scrollHeight||e.clientWidth<t.scrollWidth)}(t)}return !1}function r(t,e,n,r,i,o,l,d){return o<t&&l>e||o>t&&l<e?0:o<=t&&d<=n||l>=e&&d>=n?o-t-r:l>e&&d<n||o<t&&d>n?l-e+i:0}function computeScrollIntoView(e,i){var o=window,l=i.scrollMode,d=i.block,u=i.inline,h=i.boundary,a=i.skipOverflowHiddenElements,c="function"==typeof h?h:function(t){return t!==h};if(!t(e))throw new TypeError("Invalid target");for(var f=document.scrollingElement||document.documentElement,s=[],p=e;t(p)&&c(p);){if((p=p.parentElement)===f){s.push(p);break}null!=p&&p===document.body&&n(p)&&!n(document.documentElement)||null!=p&&n(p,a)&&s.push(p);}for(var m=o.visualViewport?o.visualViewport.width:innerWidth,g=o.visualViewport?o.visualViewport.height:innerHeight,w=window.scrollX||pageXOffset,v=window.scrollY||pageYOffset,W=e.getBoundingClientRect(),b=W.height,H=W.width,y=W.top,E=W.right,M=W.bottom,V=W.left,x="start"===d||"nearest"===d?y:"end"===d?M:y+b/2,I="center"===u?V+H/2:"end"===u?E:V,C=[],T=0;T<s.length;T++){var k=s[T],B=k.getBoundingClientRect(),D=B.height,O=B.width,R=B.top,X=B.right,Y=B.bottom,L=B.left;if("if-needed"===l&&y>=0&&V>=0&&M<=g&&E<=m&&y>=R&&M<=Y&&V>=L&&E<=X)return C;var S=getComputedStyle(k),j=parseInt(S.borderLeftWidth,10),q=parseInt(S.borderTopWidth,10),z=parseInt(S.borderRightWidth,10),A=parseInt(S.borderBottomWidth,10),F=0,G=0,J="offsetWidth"in k?k.offsetWidth-k.clientWidth-j-z:0,K="offsetHeight"in k?k.offsetHeight-k.clientHeight-q-A:0;if(f===k)F="start"===d?x:"end"===d?x-g:"nearest"===d?r(v,v+g,g,q,A,v+x,v+x+b,b):x-g/2,G="start"===u?I:"center"===u?I-m/2:"end"===u?I-m:r(w,w+m,m,j,z,w+I,w+I+H,H),F=Math.max(0,F+v),G=Math.max(0,G+w);else {F="start"===d?x-R-q:"end"===d?x-Y+A+K:"nearest"===d?r(R,Y,D,q,A+K,x,x+b,b):x-(R+D/2)+K/2,G="start"===u?I-L-j:"center"===u?I-(L+O/2)+J/2:"end"===u?I-X+z+J:r(L,X,O,j,z+J,I,I+H,H);var N=k.scrollLeft,P=k.scrollTop;x+=P-(F=Math.max(0,Math.min(P+F,k.scrollHeight-D+K))),I+=N-(G=Math.max(0,Math.min(N+G,k.scrollWidth-O+J)));}C.push({el:k,top:F,left:G});}return C}

  var idCounter = 0;
  /**
   * Accepts a parameter and returns it if it's a function
   * or a noop function if it's not. This allows us to
   * accept a callback, but not worry about it if it's not
   * passed.
   * @param {Function} cb the callback
   * @return {Function} a function
   */

  function cbToCb(cb) {
    return typeof cb === 'function' ? cb : noop;
  }

  function noop() {}
  /**
   * Scroll node into view if necessary
   * @param {HTMLElement} node the element that should scroll into view
   * @param {HTMLElement} menuNode the menu element of the component
   */


  function scrollIntoView(node, menuNode) {
    if (!node) {
      return;
    }

    var actions = computeScrollIntoView(node, {
      boundary: menuNode,
      block: 'nearest',
      scrollMode: 'if-needed'
    });
    actions.forEach(function (_ref) {
      var el = _ref.el,
          top = _ref.top,
          left = _ref.left;
      el.scrollTop = top;
      el.scrollLeft = left;
    });
  }
  /**
   * @param {HTMLElement} parent the parent node
   * @param {HTMLElement} child the child node
   * @param {Window} environment The window context where downshift renders.
   * @return {Boolean} whether the parent is the child or the child is in the parent
   */


  function isOrContainsNode(parent, child, environment) {
    var result = parent === child || child instanceof environment.Node && parent.contains && parent.contains(child);
    return result;
  }
  /**
   * Simple debounce implementation. Will call the given
   * function once after the time given has passed since
   * it was last called.
   * @param {Function} fn the function to call after the time
   * @param {Number} time the time to wait
   * @return {Function} the debounced function
   */


  function debounce(fn, time) {
    var timeoutId;

    function cancel() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }

    function wrapper() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      cancel();
      timeoutId = setTimeout(function () {
        timeoutId = null;
        fn.apply(void 0, args);
      }, time);
    }

    wrapper.cancel = cancel;
    return wrapper;
  }
  /**
   * This is intended to be used to compose event handlers.
   * They are executed in order until one of them sets
   * `event.preventDownshiftDefault = true`.
   * @param {...Function} fns the event handler functions
   * @return {Function} the event handler to add to an element
   */


  function callAllEventHandlers() {
    for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      fns[_key2] = arguments[_key2];
    }

    return function (event) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      return fns.some(function (fn) {
        if (fn) {
          fn.apply(void 0, [event].concat(args));
        }

        return event.preventDownshiftDefault || event.hasOwnProperty('nativeEvent') && event.nativeEvent.preventDownshiftDefault;
      });
    };
  }

  function handleRefs() {
    for (var _len4 = arguments.length, refs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      refs[_key4] = arguments[_key4];
    }

    return function (node) {
      refs.forEach(function (ref) {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      });
    };
  }
  /**
   * This generates a unique ID for an instance of Downshift
   * @return {String} the unique ID
   */


  function generateId() {
    return String(idCounter++);
  }
  /**
   * Resets idCounter to 0. Used for SSR.
   */


  function resetIdCounter() {
    idCounter = 0;
  }
  /**
   * Default implementation for status message. Only added when menu is open.
   * Will specify if there are results in the list, and if so, how many,
   * and what keys are relevant.
   *
   * @param {Object} param the downshift state and other relevant properties
   * @return {String} the a11y status message
   */


  function getA11yStatusMessage$1(_ref2) {
    var isOpen = _ref2.isOpen,
        resultCount = _ref2.resultCount,
        previousResultCount = _ref2.previousResultCount;

    if (!isOpen) {
      return '';
    }

    if (!resultCount) {
      return 'No results are available.';
    }

    if (resultCount !== previousResultCount) {
      return resultCount + " result" + (resultCount === 1 ? ' is' : 's are') + " available, use up and down arrow keys to navigate. Press Enter key to select.";
    }

    return '';
  }
  /**
   * Takes an argument and if it's an array, returns the first item in the array
   * otherwise returns the argument
   * @param {*} arg the maybe-array
   * @param {*} defaultValue the value if arg is falsey not defined
   * @return {*} the arg or it's first item
   */


  function unwrapArray(arg, defaultValue) {
    arg = Array.isArray(arg) ?
    /* istanbul ignore next (preact) */
    arg[0] : arg;

    if (!arg && defaultValue) {
      return defaultValue;
    } else {
      return arg;
    }
  }
  /**
   * @param {Object} element (P)react element
   * @return {Boolean} whether it's a DOM element
   */


  function isDOMElement(element) {
    /* istanbul ignore if */
    {
      // then this is preact or preact X
      return typeof element.type === 'string' || typeof element.nodeName === 'string';
    } // then we assume this is react
  }
  /**
   * @param {Object} element (P)react element
   * @return {Object} the props
   */


  function getElementProps(element) {
    // props for react, attributes for preact

    /* istanbul ignore if */
    {
      return element.props || element.attributes;
    }
  }
  /**
   * Throws a helpful error message for required properties. Useful
   * to be used as a default in destructuring or object params.
   * @param {String} fnName the function name
   * @param {String} propName the prop name
   */


  function requiredProp(fnName, propName) {
    // eslint-disable-next-line no-console
    console.error("The property \"" + propName + "\" is required in \"" + fnName + "\"");
  }

  var stateKeys = ['highlightedIndex', 'inputValue', 'isOpen', 'selectedItem', 'type'];
  /**
   * @param {Object} state the state object
   * @return {Object} state that is relevant to downshift
   */

  function pickState(state) {
    if (state === void 0) {
      state = {};
    }

    var result = {};
    stateKeys.forEach(function (k) {
      if (state.hasOwnProperty(k)) {
        result[k] = state[k];
      }
    });
    return result;
  }
  /**
   * This will perform a shallow merge of the given state object
   * with the state coming from props
   * (for the controlled component scenario)
   * This is used in state updater functions so they're referencing
   * the right state regardless of where it comes from.
   *
   * @param {Object} state The state of the component/hook.
   * @param {Object} props The props that may contain controlled values.
   * @returns {Object} The merged controlled state.
   */


  function getState(state, props) {
    return Object.keys(state).reduce(function (prevState, key) {
      prevState[key] = isControlledProp(props, key) ? props[key] : state[key];
      return prevState;
    }, {});
  }
  /**
   * This determines whether a prop is a "controlled prop" meaning it is
   * state which is controlled by the outside of this component rather
   * than within this component.
   *
   * @param {Object} props The props that may contain controlled values.
   * @param {String} key the key to check
   * @return {Boolean} whether it is a controlled controlled prop
   */


  function isControlledProp(props, key) {
    return props[key] !== undefined;
  }
  /**
   * Normalizes the 'key' property of a KeyboardEvent in IE/Edge
   * @param {Object} event a keyboardEvent object
   * @return {String} keyboard key
   */


  function normalizeArrowKey(event) {
    var key = event.key,
        keyCode = event.keyCode;
    /* istanbul ignore next (ie) */

    if (keyCode >= 37 && keyCode <= 40 && key.indexOf('Arrow') !== 0) {
      return "Arrow" + key;
    }

    return key;
  }
  /**
   * Simple check if the value passed is object literal
   * @param {*} obj any things
   * @return {Boolean} whether it's object literal
   */


  function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
  /**
   * Returns the new index in the list, in a circular way. If next value is out of bonds from the total,
   * it will wrap to either 0 or itemCount - 1.
   *
   * @param {number} moveAmount Number of positions to move. Negative to move backwards, positive forwards.
   * @param {number} baseIndex The initial position to move from.
   * @param {number} itemCount The total number of items.
   * @param {Function} getItemNodeFromIndex Used to check if item is disabled.
   * @param {boolean} circular Specify if navigation is circular. Default is true.
   * @returns {number} The new index after the move.
   */


  function getNextWrappingIndex(moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular) {
    if (circular === void 0) {
      circular = true;
    }

    if (itemCount === 0) {
      return -1;
    }

    var itemsLastIndex = itemCount - 1;

    if (typeof baseIndex !== 'number' || baseIndex < 0 || baseIndex >= itemCount) {
      baseIndex = moveAmount > 0 ? -1 : itemsLastIndex + 1;
    }

    var newIndex = baseIndex + moveAmount;

    if (newIndex < 0) {
      newIndex = circular ? itemsLastIndex : 0;
    } else if (newIndex > itemsLastIndex) {
      newIndex = circular ? 0 : itemsLastIndex;
    }

    var nonDisabledNewIndex = getNextNonDisabledIndex(moveAmount, newIndex, itemCount, getItemNodeFromIndex, circular);

    if (nonDisabledNewIndex === -1) {
      return baseIndex >= itemCount ? -1 : baseIndex;
    }

    return nonDisabledNewIndex;
  }
  /**
   * Returns the next index in the list of an item that is not disabled.
   *
   * @param {number} moveAmount Number of positions to move. Negative to move backwards, positive forwards.
   * @param {number} baseIndex The initial position to move from.
   * @param {number} itemCount The total number of items.
   * @param {Function} getItemNodeFromIndex Used to check if item is disabled.
   * @param {boolean} circular Specify if navigation is circular. Default is true.
   * @returns {number} The new index. Returns baseIndex if item is not disabled. Returns next non-disabled item otherwise. If no non-disabled found it will return -1.
   */


  function getNextNonDisabledIndex(moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular) {
    var currentElementNode = getItemNodeFromIndex(baseIndex);

    if (!currentElementNode || !currentElementNode.hasAttribute('disabled')) {
      return baseIndex;
    }

    if (moveAmount > 0) {
      for (var index = baseIndex + 1; index < itemCount; index++) {
        if (!getItemNodeFromIndex(index).hasAttribute('disabled')) {
          return index;
        }
      }
    } else {
      for (var _index = baseIndex - 1; _index >= 0; _index--) {
        if (!getItemNodeFromIndex(_index).hasAttribute('disabled')) {
          return _index;
        }
      }
    }

    if (circular) {
      return moveAmount > 0 ? getNextNonDisabledIndex(1, 0, itemCount, getItemNodeFromIndex, false) : getNextNonDisabledIndex(-1, itemCount - 1, itemCount, getItemNodeFromIndex, false);
    }

    return -1;
  }
  /**
   * Checks if event target is within the downshift elements.
   *
   * @param {EventTarget} target Target to check.
   * @param {HTMLElement[]} downshiftElements The elements that form downshift (list, toggle button etc).
   * @param {Window} environment The window context where downshift renders.
   * @param {boolean} checkActiveElement Whether to also check activeElement.
   *
   * @returns {boolean} Whether or not the target is within downshift elements.
   */


  function targetWithinDownshift(target, downshiftElements, environment, checkActiveElement) {
    if (checkActiveElement === void 0) {
      checkActiveElement = true;
    }

    return downshiftElements.some(function (contextNode) {
      return contextNode && (isOrContainsNode(contextNode, target, environment) || checkActiveElement && isOrContainsNode(contextNode, environment.document.activeElement, environment));
    });
  } // eslint-disable-next-line import/no-mutable-exports


  var validateControlledUnchanged = noop;
  /* istanbul ignore next */

  {
    validateControlledUnchanged = function validateControlledUnchanged(state, prevProps, nextProps) {
      var warningDescription = "This prop should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled Downshift element for the lifetime of the component. More info: https://github.com/downshift-js/downshift#control-props";
      Object.keys(state).forEach(function (propKey) {
        if (prevProps[propKey] !== undefined && nextProps[propKey] === undefined) {
          // eslint-disable-next-line no-console
          console.error("downshift: A component has changed the controlled prop \"" + propKey + "\" to be uncontrolled. " + warningDescription);
        } else if (prevProps[propKey] === undefined && nextProps[propKey] !== undefined) {
          // eslint-disable-next-line no-console
          console.error("downshift: A component has changed the uncontrolled prop \"" + propKey + "\" to be controlled. " + warningDescription);
        }
      });
    };
  }

  var cleanupStatus = debounce(function (documentProp) {
    getStatusDiv(documentProp).textContent = '';
  }, 500);
  /**
   * @param {String} status the status message
   * @param {Object} documentProp document passed by the user.
   */

  function setStatus(status, documentProp) {
    var div = getStatusDiv(documentProp);

    if (!status) {
      return;
    }

    div.textContent = status;
    cleanupStatus(documentProp);
  }
  /**
   * Get the status node or create it if it does not already exist.
   * @param {Object} documentProp document passed by the user.
   * @return {HTMLElement} the status node.
   */


  function getStatusDiv(documentProp) {
    if (documentProp === void 0) {
      documentProp = document;
    }

    var statusDiv = documentProp.getElementById('a11y-status-message');

    if (statusDiv) {
      return statusDiv;
    }

    statusDiv = documentProp.createElement('div');
    statusDiv.setAttribute('id', 'a11y-status-message');
    statusDiv.setAttribute('role', 'status');
    statusDiv.setAttribute('aria-live', 'polite');
    statusDiv.setAttribute('aria-relevant', 'additions text');
    Object.assign(statusDiv.style, {
      border: '0',
      clip: 'rect(0 0 0 0)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: '0',
      position: 'absolute',
      width: '1px'
    });
    documentProp.body.appendChild(statusDiv);
    return statusDiv;
  }

  var unknown = '__autocomplete_unknown__' ;
  var mouseUp = '__autocomplete_mouseup__' ;
  var itemMouseEnter = '__autocomplete_item_mouseenter__' ;
  var keyDownArrowUp = '__autocomplete_keydown_arrow_up__' ;
  var keyDownArrowDown = '__autocomplete_keydown_arrow_down__' ;
  var keyDownEscape = '__autocomplete_keydown_escape__' ;
  var keyDownEnter = '__autocomplete_keydown_enter__' ;
  var keyDownHome = '__autocomplete_keydown_home__' ;
  var keyDownEnd = '__autocomplete_keydown_end__' ;
  var clickItem = '__autocomplete_click_item__' ;
  var blurInput = '__autocomplete_blur_input__' ;
  var changeInput = '__autocomplete_change_input__' ;
  var keyDownSpaceButton = '__autocomplete_keydown_space_button__' ;
  var clickButton = '__autocomplete_click_button__' ;
  var blurButton = '__autocomplete_blur_button__' ;
  var controlledPropUpdatedSelectedItem = '__autocomplete_controlled_prop_updated_selected_item__' ;
  var touchEnd = '__autocomplete_touchend__' ;

  var stateChangeTypes$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    unknown: unknown,
    mouseUp: mouseUp,
    itemMouseEnter: itemMouseEnter,
    keyDownArrowUp: keyDownArrowUp,
    keyDownArrowDown: keyDownArrowDown,
    keyDownEscape: keyDownEscape,
    keyDownEnter: keyDownEnter,
    keyDownHome: keyDownHome,
    keyDownEnd: keyDownEnd,
    clickItem: clickItem,
    blurInput: blurInput,
    changeInput: changeInput,
    keyDownSpaceButton: keyDownSpaceButton,
    clickButton: clickButton,
    blurButton: blurButton,
    controlledPropUpdatedSelectedItem: controlledPropUpdatedSelectedItem,
    touchEnd: touchEnd
  });

  var _excluded$4 = ["refKey", "ref"],
      _excluded2$3 = ["onClick", "onPress", "onKeyDown", "onKeyUp", "onBlur"],
      _excluded3$2 = ["onKeyDown", "onBlur", "onChange", "onInput", "onChangeText"],
      _excluded4$1 = ["refKey", "ref"],
      _excluded5$1 = ["onMouseMove", "onMouseDown", "onClick", "onPress", "index", "item"];

  var Downshift = /*#__PURE__*/function () {
    var Downshift = /*#__PURE__*/function (_Component) {
      _inheritsLoose(Downshift, _Component);

      function Downshift(_props) {
        var _this;

        _this = _Component.call(this, _props) || this; // fancy destructuring + defaults + aliases
        // this basically says each value of state should either be set to
        // the initial value or the default value if the initial value is not provided

        _this.id = _this.props.id || "downshift-" + generateId();
        _this.menuId = _this.props.menuId || _this.id + "-menu";
        _this.labelId = _this.props.labelId || _this.id + "-label";
        _this.inputId = _this.props.inputId || _this.id + "-input";

        _this.getItemId = _this.props.getItemId || function (index) {
          return _this.id + "-item-" + index;
        };

        _this.input = null;
        _this.items = [];
        _this.itemCount = null;
        _this.previousResultCount = 0;
        _this.timeoutIds = [];

        _this.internalSetTimeout = function (fn, time) {
          var id = setTimeout(function () {
            _this.timeoutIds = _this.timeoutIds.filter(function (i) {
              return i !== id;
            });
            fn();
          }, time);

          _this.timeoutIds.push(id);
        };

        _this.setItemCount = function (count) {
          _this.itemCount = count;
        };

        _this.unsetItemCount = function () {
          _this.itemCount = null;
        };

        _this.setHighlightedIndex = function (highlightedIndex, otherStateToSet) {
          if (highlightedIndex === void 0) {
            highlightedIndex = _this.props.defaultHighlightedIndex;
          }

          if (otherStateToSet === void 0) {
            otherStateToSet = {};
          }

          otherStateToSet = pickState(otherStateToSet);

          _this.internalSetState(_extends({
            highlightedIndex: highlightedIndex
          }, otherStateToSet));
        };

        _this.clearSelection = function (cb) {
          _this.internalSetState({
            selectedItem: null,
            inputValue: '',
            highlightedIndex: _this.props.defaultHighlightedIndex,
            isOpen: _this.props.defaultIsOpen
          }, cb);
        };

        _this.selectItem = function (item, otherStateToSet, cb) {
          otherStateToSet = pickState(otherStateToSet);

          _this.internalSetState(_extends({
            isOpen: _this.props.defaultIsOpen,
            highlightedIndex: _this.props.defaultHighlightedIndex,
            selectedItem: item,
            inputValue: _this.props.itemToString(item)
          }, otherStateToSet), cb);
        };

        _this.selectItemAtIndex = function (itemIndex, otherStateToSet, cb) {
          var item = _this.items[itemIndex];

          if (item == null) {
            return;
          }

          _this.selectItem(item, otherStateToSet, cb);
        };

        _this.selectHighlightedItem = function (otherStateToSet, cb) {
          return _this.selectItemAtIndex(_this.getState().highlightedIndex, otherStateToSet, cb);
        };

        _this.internalSetState = function (stateToSet, cb) {
          var isItemSelected, onChangeArg;
          var onStateChangeArg = {};
          var isStateToSetFunction = typeof stateToSet === 'function'; // we want to call `onInputValueChange` before the `setState` call
          // so someone controlling the `inputValue` state gets notified of
          // the input change as soon as possible. This avoids issues with
          // preserving the cursor position.
          // See https://github.com/downshift-js/downshift/issues/217 for more info.

          if (!isStateToSetFunction && stateToSet.hasOwnProperty('inputValue')) {
            _this.props.onInputValueChange(stateToSet.inputValue, _extends({}, _this.getStateAndHelpers(), stateToSet));
          }

          return _this.setState(function (state) {
            state = _this.getState(state);
            var newStateToSet = isStateToSetFunction ? stateToSet(state) : stateToSet; // Your own function that could modify the state that will be set.

            newStateToSet = _this.props.stateReducer(state, newStateToSet); // checks if an item is selected, regardless of if it's different from
            // what was selected before
            // used to determine if onSelect and onChange callbacks should be called

            isItemSelected = newStateToSet.hasOwnProperty('selectedItem'); // this keeps track of the object we want to call with setState

            var nextState = {}; // this is just used to tell whether the state changed

            var nextFullState = {}; // we need to call on change if the outside world is controlling any of our state
            // and we're trying to update that state. OR if the selection has changed and we're
            // trying to update the selection

            if (isItemSelected && newStateToSet.selectedItem !== state.selectedItem) {
              onChangeArg = newStateToSet.selectedItem;
            }

            newStateToSet.type = newStateToSet.type || unknown;
            Object.keys(newStateToSet).forEach(function (key) {
              // onStateChangeArg should only have the state that is
              // actually changing
              if (state[key] !== newStateToSet[key]) {
                onStateChangeArg[key] = newStateToSet[key];
              } // the type is useful for the onStateChangeArg
              // but we don't actually want to set it in internal state.
              // this is an undocumented feature for now... Not all internalSetState
              // calls support it and I'm not certain we want them to yet.
              // But it enables users controlling the isOpen state to know when
              // the isOpen state changes due to mouseup events which is quite handy.


              if (key === 'type') {
                return;
              }

              nextFullState[key] = newStateToSet[key]; // if it's coming from props, then we don't care to set it internally

              if (!isControlledProp(_this.props, key)) {
                nextState[key] = newStateToSet[key];
              }
            }); // if stateToSet is a function, then we weren't able to call onInputValueChange
            // earlier, so we'll call it now that we know what the inputValue state will be.

            if (isStateToSetFunction && newStateToSet.hasOwnProperty('inputValue')) {
              _this.props.onInputValueChange(newStateToSet.inputValue, _extends({}, _this.getStateAndHelpers(), newStateToSet));
            }

            return nextState;
          }, function () {
            // call the provided callback if it's a function
            cbToCb(cb)(); // only call the onStateChange and onChange callbacks if
            // we have relevant information to pass them.

            var hasMoreStateThanType = Object.keys(onStateChangeArg).length > 1;

            if (hasMoreStateThanType) {
              _this.props.onStateChange(onStateChangeArg, _this.getStateAndHelpers());
            }

            if (isItemSelected) {
              _this.props.onSelect(stateToSet.selectedItem, _this.getStateAndHelpers());
            }

            if (onChangeArg !== undefined) {
              _this.props.onChange(onChangeArg, _this.getStateAndHelpers());
            } // this is currently undocumented and therefore subject to change
            // We'll try to not break it, but just be warned.


            _this.props.onUserAction(onStateChangeArg, _this.getStateAndHelpers());
          });
        };

        _this.rootRef = function (node) {
          return _this._rootNode = node;
        };

        _this.getRootProps = function (_temp, _temp2) {
          var _extends2;

          var _ref = _temp === void 0 ? {} : _temp,
              _ref$refKey = _ref.refKey,
              refKey = _ref$refKey === void 0 ? 'ref' : _ref$refKey,
              ref = _ref.ref,
              rest = _objectWithoutPropertiesLoose(_ref, _excluded$4);

          var _ref2 = _temp2 === void 0 ? {} : _temp2,
              _ref2$suppressRefErro = _ref2.suppressRefError,
              suppressRefError = _ref2$suppressRefErro === void 0 ? false : _ref2$suppressRefErro;

          // this is used in the render to know whether the user has called getRootProps.
          // It uses that to know whether to apply the props automatically
          _this.getRootProps.called = true;
          _this.getRootProps.refKey = refKey;
          _this.getRootProps.suppressRefError = suppressRefError;

          var _this$getState = _this.getState(),
              isOpen = _this$getState.isOpen;

          return _extends((_extends2 = {}, _extends2[refKey] = handleRefs(ref, _this.rootRef), _extends2.role = 'combobox', _extends2['aria-expanded'] = isOpen, _extends2['aria-haspopup'] = 'listbox', _extends2['aria-owns'] = isOpen ? _this.menuId : null, _extends2['aria-labelledby'] = _this.labelId, _extends2), rest);
        };

        _this.keyDownHandlers = {
          ArrowDown: function ArrowDown(event) {
            var _this2 = this;

            event.preventDefault();

            if (this.getState().isOpen) {
              var amount = event.shiftKey ? 5 : 1;
              this.moveHighlightedIndex(amount, {
                type: keyDownArrowDown
              });
            } else {
              this.internalSetState({
                isOpen: true,
                type: keyDownArrowDown
              }, function () {
                var itemCount = _this2.getItemCount();

                if (itemCount > 0) {
                  var _this2$getState = _this2.getState(),
                      highlightedIndex = _this2$getState.highlightedIndex;

                  var nextHighlightedIndex = getNextWrappingIndex(1, highlightedIndex, itemCount, function (index) {
                    return _this2.getItemNodeFromIndex(index);
                  });

                  _this2.setHighlightedIndex(nextHighlightedIndex, {
                    type: keyDownArrowDown
                  });
                }
              });
            }
          },
          ArrowUp: function ArrowUp(event) {
            var _this3 = this;

            event.preventDefault();

            if (this.getState().isOpen) {
              var amount = event.shiftKey ? -5 : -1;
              this.moveHighlightedIndex(amount, {
                type: keyDownArrowUp
              });
            } else {
              this.internalSetState({
                isOpen: true,
                type: keyDownArrowUp
              }, function () {
                var itemCount = _this3.getItemCount();

                if (itemCount > 0) {
                  var _this3$getState = _this3.getState(),
                      highlightedIndex = _this3$getState.highlightedIndex;

                  var nextHighlightedIndex = getNextWrappingIndex(-1, highlightedIndex, itemCount, function (index) {
                    return _this3.getItemNodeFromIndex(index);
                  });

                  _this3.setHighlightedIndex(nextHighlightedIndex, {
                    type: keyDownArrowUp
                  });
                }
              });
            }
          },
          Enter: function Enter(event) {
            if (event.which === 229) {
              return;
            }

            var _this$getState2 = this.getState(),
                isOpen = _this$getState2.isOpen,
                highlightedIndex = _this$getState2.highlightedIndex;

            if (isOpen && highlightedIndex != null) {
              event.preventDefault();
              var item = this.items[highlightedIndex];
              var itemNode = this.getItemNodeFromIndex(highlightedIndex);

              if (item == null || itemNode && itemNode.hasAttribute('disabled')) {
                return;
              }

              this.selectHighlightedItem({
                type: keyDownEnter
              });
            }
          },
          Escape: function Escape(event) {
            event.preventDefault();
            this.reset(_extends({
              type: keyDownEscape
            }, !this.state.isOpen && {
              selectedItem: null,
              inputValue: ''
            }));
          }
        };
        _this.buttonKeyDownHandlers = _extends({}, _this.keyDownHandlers, {
          ' ': function _(event) {
            event.preventDefault();
            this.toggleMenu({
              type: keyDownSpaceButton
            });
          }
        });
        _this.inputKeyDownHandlers = _extends({}, _this.keyDownHandlers, {
          Home: function Home(event) {
            var _this4 = this;

            var _this$getState3 = this.getState(),
                isOpen = _this$getState3.isOpen;

            if (!isOpen) {
              return;
            }

            event.preventDefault();
            var itemCount = this.getItemCount();

            if (itemCount <= 0 || !isOpen) {
              return;
            } // get next non-disabled starting downwards from 0 if that's disabled.


            var newHighlightedIndex = getNextNonDisabledIndex(1, 0, itemCount, function (index) {
              return _this4.getItemNodeFromIndex(index);
            }, false);
            this.setHighlightedIndex(newHighlightedIndex, {
              type: keyDownHome
            });
          },
          End: function End(event) {
            var _this5 = this;

            var _this$getState4 = this.getState(),
                isOpen = _this$getState4.isOpen;

            if (!isOpen) {
              return;
            }

            event.preventDefault();
            var itemCount = this.getItemCount();

            if (itemCount <= 0 || !isOpen) {
              return;
            } // get next non-disabled starting upwards from last index if that's disabled.


            var newHighlightedIndex = getNextNonDisabledIndex(-1, itemCount - 1, itemCount, function (index) {
              return _this5.getItemNodeFromIndex(index);
            }, false);
            this.setHighlightedIndex(newHighlightedIndex, {
              type: keyDownEnd
            });
          }
        });

        _this.getToggleButtonProps = function (_temp3) {
          var _ref3 = _temp3 === void 0 ? {} : _temp3,
              onClick = _ref3.onClick;
              _ref3.onPress;
              var onKeyDown = _ref3.onKeyDown,
              onKeyUp = _ref3.onKeyUp,
              onBlur = _ref3.onBlur,
              rest = _objectWithoutPropertiesLoose(_ref3, _excluded2$3);

          var _this$getState5 = _this.getState(),
              isOpen = _this$getState5.isOpen;

          var enabledEventHandlers = {
            onClick: callAllEventHandlers(onClick, _this.buttonHandleClick),
            onKeyDown: callAllEventHandlers(onKeyDown, _this.buttonHandleKeyDown),
            onKeyUp: callAllEventHandlers(onKeyUp, _this.buttonHandleKeyUp),
            onBlur: callAllEventHandlers(onBlur, _this.buttonHandleBlur)
          };
          var eventHandlers = rest.disabled ? {} : enabledEventHandlers;
          return _extends({
            type: 'button',
            role: 'button',
            'aria-label': isOpen ? 'close menu' : 'open menu',
            'aria-haspopup': true,
            'data-toggle': true
          }, eventHandlers, rest);
        };

        _this.buttonHandleKeyUp = function (event) {
          // Prevent click event from emitting in Firefox
          event.preventDefault();
        };

        _this.buttonHandleKeyDown = function (event) {
          var key = normalizeArrowKey(event);

          if (_this.buttonKeyDownHandlers[key]) {
            _this.buttonKeyDownHandlers[key].call(_assertThisInitialized(_this), event);
          }
        };

        _this.buttonHandleClick = function (event) {
          event.preventDefault(); // handle odd case for Safari and Firefox which
          // don't give the button the focus properly.

          /* istanbul ignore if (can't reasonably test this) */

          if (_this.props.environment.document.activeElement === _this.props.environment.document.body) {
            event.target.focus();
          } // to simplify testing components that use downshift, we'll not wrap this in a setTimeout
          // if the NODE_ENV is test. With the proper build system, this should be dead code eliminated
          // when building for production and should therefore have no impact on production code.


          {
            // Ensure that toggle of menu occurs after the potential blur event in iOS
            _this.internalSetTimeout(function () {
              return _this.toggleMenu({
                type: clickButton
              });
            });
          }
        };

        _this.buttonHandleBlur = function (event) {
          var blurTarget = event.target; // Save blur target for comparison with activeElement later
          // Need setTimeout, so that when the user presses Tab, the activeElement is the next focused element, not body element

          _this.internalSetTimeout(function () {
            if (!_this.isMouseDown && (_this.props.environment.document.activeElement == null || _this.props.environment.document.activeElement.id !== _this.inputId) && _this.props.environment.document.activeElement !== blurTarget // Do nothing if we refocus the same element again (to solve issue in Safari on iOS)
            ) {
              _this.reset({
                type: blurButton
              });
            }
          });
        };

        _this.getLabelProps = function (props) {
          return _extends({
            htmlFor: _this.inputId,
            id: _this.labelId
          }, props);
        };

        _this.getInputProps = function (_temp4) {
          var _ref4 = _temp4 === void 0 ? {} : _temp4,
              onKeyDown = _ref4.onKeyDown,
              onBlur = _ref4.onBlur,
              onChange = _ref4.onChange,
              onInput = _ref4.onInput;
              _ref4.onChangeText;
              var rest = _objectWithoutPropertiesLoose(_ref4, _excluded3$2);

          var onChangeKey;
          var eventHandlers = {};
          /* istanbul ignore next (preact) */

          {
            onChangeKey = 'onInput';
          }

          var _this$getState6 = _this.getState(),
              inputValue = _this$getState6.inputValue,
              isOpen = _this$getState6.isOpen,
              highlightedIndex = _this$getState6.highlightedIndex;

          if (!rest.disabled) {
            var _eventHandlers;

            eventHandlers = (_eventHandlers = {}, _eventHandlers[onChangeKey] = callAllEventHandlers(onChange, onInput, _this.inputHandleChange), _eventHandlers.onKeyDown = callAllEventHandlers(onKeyDown, _this.inputHandleKeyDown), _eventHandlers.onBlur = callAllEventHandlers(onBlur, _this.inputHandleBlur), _eventHandlers);
          }

          return _extends({
            'aria-autocomplete': 'list',
            'aria-activedescendant': isOpen && typeof highlightedIndex === 'number' && highlightedIndex >= 0 ? _this.getItemId(highlightedIndex) : null,
            'aria-controls': isOpen ? _this.menuId : null,
            'aria-labelledby': _this.labelId,
            // https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
            // revert back since autocomplete="nope" is ignored on latest Chrome and Opera
            autoComplete: 'off',
            value: inputValue,
            id: _this.inputId
          }, eventHandlers, rest);
        };

        _this.inputHandleKeyDown = function (event) {
          var key = normalizeArrowKey(event);

          if (key && _this.inputKeyDownHandlers[key]) {
            _this.inputKeyDownHandlers[key].call(_assertThisInitialized(_this), event);
          }
        };

        _this.inputHandleChange = function (event) {
          _this.internalSetState({
            type: changeInput,
            isOpen: true,
            inputValue: event.target.value,
            highlightedIndex: _this.props.defaultHighlightedIndex
          });
        };

        _this.inputHandleBlur = function () {
          // Need setTimeout, so that when the user presses Tab, the activeElement is the next focused element, not the body element
          _this.internalSetTimeout(function () {
            var downshiftButtonIsActive = _this.props.environment.document && !!_this.props.environment.document.activeElement && !!_this.props.environment.document.activeElement.dataset && _this.props.environment.document.activeElement.dataset.toggle && _this._rootNode && _this._rootNode.contains(_this.props.environment.document.activeElement);

            if (!_this.isMouseDown && !downshiftButtonIsActive) {
              _this.reset({
                type: blurInput
              });
            }
          });
        };

        _this.menuRef = function (node) {
          _this._menuNode = node;
        };

        _this.getMenuProps = function (_temp5, _temp6) {
          var _extends3;

          var _ref5 = _temp5 === void 0 ? {} : _temp5,
              _ref5$refKey = _ref5.refKey,
              refKey = _ref5$refKey === void 0 ? 'ref' : _ref5$refKey,
              ref = _ref5.ref,
              props = _objectWithoutPropertiesLoose(_ref5, _excluded4$1);

          var _ref6 = _temp6 === void 0 ? {} : _temp6,
              _ref6$suppressRefErro = _ref6.suppressRefError,
              suppressRefError = _ref6$suppressRefErro === void 0 ? false : _ref6$suppressRefErro;

          _this.getMenuProps.called = true;
          _this.getMenuProps.refKey = refKey;
          _this.getMenuProps.suppressRefError = suppressRefError;
          return _extends((_extends3 = {}, _extends3[refKey] = handleRefs(ref, _this.menuRef), _extends3.role = 'listbox', _extends3['aria-labelledby'] = props && props['aria-label'] ? null : _this.labelId, _extends3.id = _this.menuId, _extends3), props);
        };

        _this.getItemProps = function (_temp7) {
          var _enabledEventHandlers;

          var _ref7 = _temp7 === void 0 ? {} : _temp7,
              onMouseMove = _ref7.onMouseMove,
              onMouseDown = _ref7.onMouseDown,
              onClick = _ref7.onClick;
              _ref7.onPress;
              var index = _ref7.index,
              _ref7$item = _ref7.item,
              item = _ref7$item === void 0 ? requiredProp('getItemProps', 'item') : _ref7$item,
              rest = _objectWithoutPropertiesLoose(_ref7, _excluded5$1);

          if (index === undefined) {
            _this.items.push(item);

            index = _this.items.indexOf(item);
          } else {
            _this.items[index] = item;
          }

          var onSelectKey = 'onClick';
          var customClickHandler = onClick;
          var enabledEventHandlers = (_enabledEventHandlers = {
            // onMouseMove is used over onMouseEnter here. onMouseMove
            // is only triggered on actual mouse movement while onMouseEnter
            // can fire on DOM changes, interrupting keyboard navigation
            onMouseMove: callAllEventHandlers(onMouseMove, function () {
              if (index === _this.getState().highlightedIndex) {
                return;
              }

              _this.setHighlightedIndex(index, {
                type: itemMouseEnter
              }); // We never want to manually scroll when changing state based
              // on `onMouseMove` because we will be moving the element out
              // from under the user which is currently scrolling/moving the
              // cursor


              _this.avoidScrolling = true;

              _this.internalSetTimeout(function () {
                return _this.avoidScrolling = false;
              }, 250);
            }),
            onMouseDown: callAllEventHandlers(onMouseDown, function (event) {
              // This prevents the activeElement from being changed
              // to the item so it can remain with the current activeElement
              // which is a more common use case.
              event.preventDefault();
            })
          }, _enabledEventHandlers[onSelectKey] = callAllEventHandlers(customClickHandler, function () {
            _this.selectItemAtIndex(index, {
              type: clickItem
            });
          }), _enabledEventHandlers); // Passing down the onMouseDown handler to prevent redirect
          // of the activeElement if clicking on disabled items

          var eventHandlers = rest.disabled ? {
            onMouseDown: enabledEventHandlers.onMouseDown
          } : enabledEventHandlers;
          return _extends({
            id: _this.getItemId(index),
            role: 'option',
            'aria-selected': _this.getState().highlightedIndex === index
          }, eventHandlers, rest);
        };

        _this.clearItems = function () {
          _this.items = [];
        };

        _this.reset = function (otherStateToSet, cb) {
          if (otherStateToSet === void 0) {
            otherStateToSet = {};
          }

          otherStateToSet = pickState(otherStateToSet);

          _this.internalSetState(function (_ref8) {
            var selectedItem = _ref8.selectedItem;
            return _extends({
              isOpen: _this.props.defaultIsOpen,
              highlightedIndex: _this.props.defaultHighlightedIndex,
              inputValue: _this.props.itemToString(selectedItem)
            }, otherStateToSet);
          }, cb);
        };

        _this.toggleMenu = function (otherStateToSet, cb) {
          if (otherStateToSet === void 0) {
            otherStateToSet = {};
          }

          otherStateToSet = pickState(otherStateToSet);

          _this.internalSetState(function (_ref9) {
            var isOpen = _ref9.isOpen;
            return _extends({
              isOpen: !isOpen
            }, isOpen && {
              highlightedIndex: _this.props.defaultHighlightedIndex
            }, otherStateToSet);
          }, function () {
            var _this$getState7 = _this.getState(),
                isOpen = _this$getState7.isOpen,
                highlightedIndex = _this$getState7.highlightedIndex;

            if (isOpen) {
              if (_this.getItemCount() > 0 && typeof highlightedIndex === 'number') {
                _this.setHighlightedIndex(highlightedIndex, otherStateToSet);
              }
            }

            cbToCb(cb)();
          });
        };

        _this.openMenu = function (cb) {
          _this.internalSetState({
            isOpen: true
          }, cb);
        };

        _this.closeMenu = function (cb) {
          _this.internalSetState({
            isOpen: false
          }, cb);
        };

        _this.updateStatus = debounce(function () {
          var state = _this.getState();

          var item = _this.items[state.highlightedIndex];

          var resultCount = _this.getItemCount();

          var status = _this.props.getA11yStatusMessage(_extends({
            itemToString: _this.props.itemToString,
            previousResultCount: _this.previousResultCount,
            resultCount: resultCount,
            highlightedItem: item
          }, state));

          _this.previousResultCount = resultCount;
          setStatus(status, _this.props.environment.document);
        }, 200);

        var _this$props = _this.props,
            defaultHighlightedIndex = _this$props.defaultHighlightedIndex,
            _this$props$initialHi = _this$props.initialHighlightedIndex,
            _highlightedIndex = _this$props$initialHi === void 0 ? defaultHighlightedIndex : _this$props$initialHi,
            defaultIsOpen = _this$props.defaultIsOpen,
            _this$props$initialIs = _this$props.initialIsOpen,
            _isOpen = _this$props$initialIs === void 0 ? defaultIsOpen : _this$props$initialIs,
            _this$props$initialIn = _this$props.initialInputValue,
            _inputValue = _this$props$initialIn === void 0 ? '' : _this$props$initialIn,
            _this$props$initialSe = _this$props.initialSelectedItem,
            _selectedItem = _this$props$initialSe === void 0 ? null : _this$props$initialSe;

        var _state = _this.getState({
          highlightedIndex: _highlightedIndex,
          isOpen: _isOpen,
          inputValue: _inputValue,
          selectedItem: _selectedItem
        });

        if (_state.selectedItem != null && _this.props.initialInputValue === undefined) {
          _state.inputValue = _this.props.itemToString(_state.selectedItem);
        }

        _this.state = _state;
        return _this;
      }

      var _proto = Downshift.prototype;

      /**
       * Clear all running timeouts
       */
      _proto.internalClearTimeouts = function internalClearTimeouts() {
        this.timeoutIds.forEach(function (id) {
          clearTimeout(id);
        });
        this.timeoutIds = [];
      }
      /**
       * Gets the state based on internal state or props
       * If a state value is passed via props, then that
       * is the value given, otherwise it's retrieved from
       * stateToMerge
       *
       * @param {Object} stateToMerge defaults to this.state
       * @return {Object} the state
       */
      ;

      _proto.getState = function getState$1(stateToMerge) {
        if (stateToMerge === void 0) {
          stateToMerge = this.state;
        }

        return getState(stateToMerge, this.props);
      };

      _proto.getItemCount = function getItemCount() {
        // things read better this way. They're in priority order:
        // 1. `this.itemCount`
        // 2. `this.props.itemCount`
        // 3. `this.items.length`
        var itemCount = this.items.length;

        if (this.itemCount != null) {
          itemCount = this.itemCount;
        } else if (this.props.itemCount !== undefined) {
          itemCount = this.props.itemCount;
        }

        return itemCount;
      };

      _proto.getItemNodeFromIndex = function getItemNodeFromIndex(index) {
        return this.props.environment.document.getElementById(this.getItemId(index));
      };

      _proto.scrollHighlightedItemIntoView = function scrollHighlightedItemIntoView() {
        /* istanbul ignore else (react-native) */
        {
          var node = this.getItemNodeFromIndex(this.getState().highlightedIndex);
          this.props.scrollIntoView(node, this._menuNode);
        }
      };

      _proto.moveHighlightedIndex = function moveHighlightedIndex(amount, otherStateToSet) {
        var _this6 = this;

        var itemCount = this.getItemCount();

        var _this$getState8 = this.getState(),
            highlightedIndex = _this$getState8.highlightedIndex;

        if (itemCount > 0) {
          var nextHighlightedIndex = getNextWrappingIndex(amount, highlightedIndex, itemCount, function (index) {
            return _this6.getItemNodeFromIndex(index);
          });
          this.setHighlightedIndex(nextHighlightedIndex, otherStateToSet);
        }
      };

      _proto.getStateAndHelpers = function getStateAndHelpers() {
        var _this$getState9 = this.getState(),
            highlightedIndex = _this$getState9.highlightedIndex,
            inputValue = _this$getState9.inputValue,
            selectedItem = _this$getState9.selectedItem,
            isOpen = _this$getState9.isOpen;

        var itemToString = this.props.itemToString;
        var id = this.id;
        var getRootProps = this.getRootProps,
            getToggleButtonProps = this.getToggleButtonProps,
            getLabelProps = this.getLabelProps,
            getMenuProps = this.getMenuProps,
            getInputProps = this.getInputProps,
            getItemProps = this.getItemProps,
            openMenu = this.openMenu,
            closeMenu = this.closeMenu,
            toggleMenu = this.toggleMenu,
            selectItem = this.selectItem,
            selectItemAtIndex = this.selectItemAtIndex,
            selectHighlightedItem = this.selectHighlightedItem,
            setHighlightedIndex = this.setHighlightedIndex,
            clearSelection = this.clearSelection,
            clearItems = this.clearItems,
            reset = this.reset,
            setItemCount = this.setItemCount,
            unsetItemCount = this.unsetItemCount,
            setState = this.internalSetState;
        return {
          // prop getters
          getRootProps: getRootProps,
          getToggleButtonProps: getToggleButtonProps,
          getLabelProps: getLabelProps,
          getMenuProps: getMenuProps,
          getInputProps: getInputProps,
          getItemProps: getItemProps,
          // actions
          reset: reset,
          openMenu: openMenu,
          closeMenu: closeMenu,
          toggleMenu: toggleMenu,
          selectItem: selectItem,
          selectItemAtIndex: selectItemAtIndex,
          selectHighlightedItem: selectHighlightedItem,
          setHighlightedIndex: setHighlightedIndex,
          clearSelection: clearSelection,
          clearItems: clearItems,
          setItemCount: setItemCount,
          unsetItemCount: unsetItemCount,
          setState: setState,
          // props
          itemToString: itemToString,
          // derived
          id: id,
          // state
          highlightedIndex: highlightedIndex,
          inputValue: inputValue,
          isOpen: isOpen,
          selectedItem: selectedItem
        };
      } //////////////////////////// ROOT
      ;

      _proto.componentDidMount = function componentDidMount() {
        var _this7 = this;

        /* istanbul ignore if (react-native) */
        if (this.getMenuProps.called && !this.getMenuProps.suppressRefError) {
          validateGetMenuPropsCalledCorrectly(this._menuNode, this.getMenuProps);
        }
        /* istanbul ignore if (react-native) */


        {
          // this.isMouseDown helps us track whether the mouse is currently held down.
          // This is useful when the user clicks on an item in the list, but holds the mouse
          // down long enough for the list to disappear (because the blur event fires on the input)
          // this.isMouseDown is used in the blur handler on the input to determine whether the blur event should
          // trigger hiding the menu.
          var onMouseDown = function onMouseDown() {
            _this7.isMouseDown = true;
          };

          var onMouseUp = function onMouseUp(event) {
            _this7.isMouseDown = false; // if the target element or the activeElement is within a downshift node
            // then we don't want to reset downshift

            var contextWithinDownshift = targetWithinDownshift(event.target, [_this7._rootNode, _this7._menuNode], _this7.props.environment);

            if (!contextWithinDownshift && _this7.getState().isOpen) {
              _this7.reset({
                type: mouseUp
              }, function () {
                return _this7.props.onOuterClick(_this7.getStateAndHelpers());
              });
            }
          }; // Touching an element in iOS gives focus and hover states, but touching out of
          // the element will remove hover, and persist the focus state, resulting in the
          // blur event not being triggered.
          // this.isTouchMove helps us track whether the user is tapping or swiping on a touch screen.
          // If the user taps outside of Downshift, the component should be reset,
          // but not if the user is swiping


          var onTouchStart = function onTouchStart() {
            _this7.isTouchMove = false;
          };

          var onTouchMove = function onTouchMove() {
            _this7.isTouchMove = true;
          };

          var onTouchEnd = function onTouchEnd(event) {
            var contextWithinDownshift = targetWithinDownshift(event.target, [_this7._rootNode, _this7._menuNode], _this7.props.environment, false);

            if (!_this7.isTouchMove && !contextWithinDownshift && _this7.getState().isOpen) {
              _this7.reset({
                type: touchEnd
              }, function () {
                return _this7.props.onOuterClick(_this7.getStateAndHelpers());
              });
            }
          };

          var environment = this.props.environment;
          environment.addEventListener('mousedown', onMouseDown);
          environment.addEventListener('mouseup', onMouseUp);
          environment.addEventListener('touchstart', onTouchStart);
          environment.addEventListener('touchmove', onTouchMove);
          environment.addEventListener('touchend', onTouchEnd);

          this.cleanup = function () {
            _this7.internalClearTimeouts();

            _this7.updateStatus.cancel();

            environment.removeEventListener('mousedown', onMouseDown);
            environment.removeEventListener('mouseup', onMouseUp);
            environment.removeEventListener('touchstart', onTouchStart);
            environment.removeEventListener('touchmove', onTouchMove);
            environment.removeEventListener('touchend', onTouchEnd);
          };
        }
      };

      _proto.shouldScroll = function shouldScroll(prevState, prevProps) {
        var _ref10 = this.props.highlightedIndex === undefined ? this.getState() : this.props,
            currentHighlightedIndex = _ref10.highlightedIndex;

        var _ref11 = prevProps.highlightedIndex === undefined ? prevState : prevProps,
            prevHighlightedIndex = _ref11.highlightedIndex;

        var scrollWhenOpen = currentHighlightedIndex && this.getState().isOpen && !prevState.isOpen;
        var scrollWhenNavigating = currentHighlightedIndex !== prevHighlightedIndex;
        return scrollWhenOpen || scrollWhenNavigating;
      };

      _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        {
          validateControlledUnchanged(this.state, prevProps, this.props);
          /* istanbul ignore if (react-native) */

          if (this.getMenuProps.called && !this.getMenuProps.suppressRefError) {
            validateGetMenuPropsCalledCorrectly(this._menuNode, this.getMenuProps);
          }
        }

        if (isControlledProp(this.props, 'selectedItem') && this.props.selectedItemChanged(prevProps.selectedItem, this.props.selectedItem)) {
          this.internalSetState({
            type: controlledPropUpdatedSelectedItem,
            inputValue: this.props.itemToString(this.props.selectedItem)
          });
        }

        if (!this.avoidScrolling && this.shouldScroll(prevState, prevProps)) {
          this.scrollHighlightedItemIntoView();
        }
        /* istanbul ignore else (react-native) */


        {
          this.updateStatus();
        }
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        this.cleanup(); // avoids memory leak
      };

      _proto.render = function render() {
        var children = unwrapArray(this.props.children, noop); // because the items are rerendered every time we call the children
        // we clear this out each render and it will be populated again as
        // getItemProps is called.

        this.clearItems(); // we reset this so we know whether the user calls getRootProps during
        // this render. If they do then we don't need to do anything,
        // if they don't then we need to clone the element they return and
        // apply the props for them.

        this.getRootProps.called = false;
        this.getRootProps.refKey = undefined;
        this.getRootProps.suppressRefError = undefined; // we do something similar for getMenuProps

        this.getMenuProps.called = false;
        this.getMenuProps.refKey = undefined;
        this.getMenuProps.suppressRefError = undefined; // we do something similar for getLabelProps

        this.getLabelProps.called = false; // and something similar for getInputProps

        this.getInputProps.called = false;
        var element = unwrapArray(children(this.getStateAndHelpers()));

        if (!element) {
          return null;
        }

        if (this.getRootProps.called || this.props.suppressRefError) {
          if (!this.getRootProps.suppressRefError && !this.props.suppressRefError) {
            validateGetRootPropsCalledCorrectly(element, this.getRootProps);
          }

          return element;
        } else if (isDOMElement(element)) {
          // they didn't apply the root props, but we can clone
          // this and apply the props ourselves
          return preact.cloneElement(element, this.getRootProps(getElementProps(element)));
        }
        /* istanbul ignore else */


        {
          // they didn't apply the root props, but they need to
          // otherwise we can't query around the autocomplete
          throw new Error('downshift: If you return a non-DOM element, you must apply the getRootProps function');
        }
      };

      return Downshift;
    }(preact.Component);

    Downshift.defaultProps = {
      defaultHighlightedIndex: null,
      defaultIsOpen: false,
      getA11yStatusMessage: getA11yStatusMessage$1,
      itemToString: function itemToString(i) {
        if (i == null) {
          return '';
        }

        if (isPlainObject(i) && !i.hasOwnProperty('toString')) {
          // eslint-disable-next-line no-console
          console.warn('downshift: An object was passed to the default implementation of `itemToString`. You should probably provide your own `itemToString` implementation. Please refer to the `itemToString` API documentation.', 'The object that was passed:', i);
        }

        return String(i);
      },
      onStateChange: noop,
      onInputValueChange: noop,
      onUserAction: noop,
      onChange: noop,
      onSelect: noop,
      onOuterClick: noop,
      selectedItemChanged: function selectedItemChanged(prevItem, item) {
        return prevItem !== item;
      },
      environment:
      /* istanbul ignore next (ssr) */
      typeof window === 'undefined' ? {} : window,
      stateReducer: function stateReducer(state, stateToSet) {
        return stateToSet;
      },
      suppressRefError: false,
      scrollIntoView: scrollIntoView
    };
    Downshift.stateChangeTypes = stateChangeTypes$3;
    return Downshift;
  }();

  var Downshift$1 = Downshift;

  function validateGetMenuPropsCalledCorrectly(node, _ref12) {
    var refKey = _ref12.refKey;

    if (!node) {
      // eslint-disable-next-line no-console
      console.error("downshift: The ref prop \"" + refKey + "\" from getMenuProps was not applied correctly on your menu element.");
    }
  }

  function validateGetRootPropsCalledCorrectly(element, _ref13) {
    var refKey = _ref13.refKey;
    var refKeySpecified = refKey !== 'ref';
    var isComposite = !isDOMElement(element);

    if (isComposite && !refKeySpecified && !reactIs.exports.isForwardRef(element)) {
      // eslint-disable-next-line no-console
      console.error('downshift: You returned a non-DOM element. You must specify a refKey in getRootProps');
    } else if (!isComposite && refKeySpecified) {
      // eslint-disable-next-line no-console
      console.error("downshift: You returned a DOM element. You should not specify a refKey in getRootProps. You specified \"" + refKey + "\"");
    }

    if (!reactIs.exports.isForwardRef(element) && !getElementProps(element)[refKey]) {
      // eslint-disable-next-line no-console
      console.error("downshift: You must apply the ref prop \"" + refKey + "\" from getRootProps onto your root element.");
    }
  }

  var _excluded$3 = ["isInitialMount", "highlightedIndex", "items", "environment"];
  var dropdownDefaultStateValues = {
    highlightedIndex: -1,
    isOpen: false,
    selectedItem: null,
    inputValue: ''
  };

  function callOnChangeProps(action, state, newState) {
    var props = action.props,
        type = action.type;
    var changes = {};
    Object.keys(state).forEach(function (key) {
      invokeOnChangeHandler(key, action, state, newState);

      if (newState[key] !== state[key]) {
        changes[key] = newState[key];
      }
    });

    if (props.onStateChange && Object.keys(changes).length) {
      props.onStateChange(_extends({
        type: type
      }, changes));
    }
  }

  function invokeOnChangeHandler(key, action, state, newState) {
    var props = action.props,
        type = action.type;
    var handler = "on" + capitalizeString(key) + "Change";

    if (props[handler] && newState[key] !== undefined && newState[key] !== state[key]) {
      props[handler](_extends({
        type: type
      }, newState));
    }
  }
  /**
   * Default state reducer that returns the changes.
   *
   * @param {Object} s state.
   * @param {Object} a action with changes.
   * @returns {Object} changes.
   */


  function stateReducer(s, a) {
    return a.changes;
  }
  /**
   * Returns a message to be added to aria-live region when item is selected.
   *
   * @param {Object} selectionParameters Parameters required to build the message.
   * @returns {string} The a11y message.
   */


  function getA11ySelectionMessage(selectionParameters) {
    var selectedItem = selectionParameters.selectedItem,
        itemToStringLocal = selectionParameters.itemToString;
    return selectedItem ? itemToStringLocal(selectedItem) + " has been selected." : '';
  }
  /**
   * Debounced call for updating the a11y message.
   */


  var updateA11yStatus = debounce(function (getA11yMessage, document) {
    setStatus(getA11yMessage(), document);
  }, 200); // istanbul ignore next

  var useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? preact.useLayoutEffect : preact.useEffect;

  function useElementIds(_ref) {
    var _ref$id = _ref.id,
        id = _ref$id === void 0 ? "downshift-" + generateId() : _ref$id,
        labelId = _ref.labelId,
        menuId = _ref.menuId,
        getItemId = _ref.getItemId,
        toggleButtonId = _ref.toggleButtonId,
        inputId = _ref.inputId;
    var elementIdsRef = preact.useRef({
      labelId: labelId || id + "-label",
      menuId: menuId || id + "-menu",
      getItemId: getItemId || function (index) {
        return id + "-item-" + index;
      },
      toggleButtonId: toggleButtonId || id + "-toggle-button",
      inputId: inputId || id + "-input"
    });
    return elementIdsRef.current;
  }

  function getItemIndex(index, item, items) {
    if (index !== undefined) {
      return index;
    }

    if (items.length === 0) {
      return -1;
    }

    return items.indexOf(item);
  }

  function itemToString(item) {
    return item ? String(item) : '';
  }

  function isAcceptedCharacterKey(key) {
    return /^\S{1}$/.test(key);
  }

  function capitalizeString(string) {
    return "" + string.slice(0, 1).toUpperCase() + string.slice(1);
  }

  function useLatestRef(val) {
    var ref = preact.useRef(val); // technically this is not "concurrent mode safe" because we're manipulating
    // the value during render (so it's not idempotent). However, the places this
    // hook is used is to support memoizing callbacks which will be called
    // *during* render, so we need the latest values *during* render.
    // If not for this, then we'd probably want to use useLayoutEffect instead.

    ref.current = val;
    return ref;
  }
  /**
   * Computes the controlled state using a the previous state, props,
   * two reducers, one from downshift and an optional one from the user.
   * Also calls the onChange handlers for state values that have changed.
   *
   * @param {Function} reducer Reducer function from downshift.
   * @param {Object} initialState Initial state of the hook.
   * @param {Object} props The hook props.
   * @returns {Array} An array with the state and an action dispatcher.
   */


  function useEnhancedReducer(reducer, initialState, props) {
    var prevStateRef = preact.useRef();
    var actionRef = preact.useRef();
    var enhancedReducer = preact.useCallback(function (state, action) {
      actionRef.current = action;
      state = getState(state, action.props);
      var changes = reducer(state, action);
      var newState = action.props.stateReducer(state, _extends({}, action, {
        changes: changes
      }));
      return newState;
    }, [reducer]);

    var _useReducer = preact.useReducer(enhancedReducer, initialState),
        state = _useReducer[0],
        dispatch = _useReducer[1];

    var propsRef = useLatestRef(props);
    var dispatchWithProps = preact.useCallback(function (action) {
      return dispatch(_extends({
        props: propsRef.current
      }, action));
    }, [propsRef]);
    var action = actionRef.current;
    preact.useEffect(function () {
      if (action && prevStateRef.current && prevStateRef.current !== state) {
        callOnChangeProps(action, getState(prevStateRef.current, action.props), state);
      }

      prevStateRef.current = state;
    }, [state, props, action]);
    return [state, dispatchWithProps];
  }
  /**
   * Wraps the useEnhancedReducer and applies the controlled prop values before
   * returning the new state.
   *
   * @param {Function} reducer Reducer function from downshift.
   * @param {Object} initialState Initial state of the hook.
   * @param {Object} props The hook props.
   * @returns {Array} An array with the state and an action dispatcher.
   */


  function useControlledReducer$1(reducer, initialState, props) {
    var _useEnhancedReducer = useEnhancedReducer(reducer, initialState, props),
        state = _useEnhancedReducer[0],
        dispatch = _useEnhancedReducer[1];

    return [getState(state, props), dispatch];
  }

  var defaultProps$3 = {
    itemToString: itemToString,
    stateReducer: stateReducer,
    getA11ySelectionMessage: getA11ySelectionMessage,
    scrollIntoView: scrollIntoView,
    circularNavigation: false,
    environment:
    /* istanbul ignore next (ssr) */
    typeof window === 'undefined' ? {} : window
  };

  function getDefaultValue$1(props, propKey, defaultStateValues) {
    if (defaultStateValues === void 0) {
      defaultStateValues = dropdownDefaultStateValues;
    }

    var defaultPropKey = "default" + capitalizeString(propKey);

    if (defaultPropKey in props) {
      return props[defaultPropKey];
    }

    return defaultStateValues[propKey];
  }

  function getInitialValue$1(props, propKey, defaultStateValues) {
    if (defaultStateValues === void 0) {
      defaultStateValues = dropdownDefaultStateValues;
    }

    if (propKey in props) {
      return props[propKey];
    }

    var initialPropKey = "initial" + capitalizeString(propKey);

    if (initialPropKey in props) {
      return props[initialPropKey];
    }

    return getDefaultValue$1(props, propKey, defaultStateValues);
  }

  function getInitialState$2(props) {
    var selectedItem = getInitialValue$1(props, 'selectedItem');
    var isOpen = getInitialValue$1(props, 'isOpen');
    var highlightedIndex = getInitialValue$1(props, 'highlightedIndex');
    var inputValue = getInitialValue$1(props, 'inputValue');
    return {
      highlightedIndex: highlightedIndex < 0 && selectedItem && isOpen ? props.items.indexOf(selectedItem) : highlightedIndex,
      isOpen: isOpen,
      selectedItem: selectedItem,
      inputValue: inputValue
    };
  }

  function getHighlightedIndexOnOpen(props, state, offset, getItemNodeFromIndex) {
    var items = props.items,
        initialHighlightedIndex = props.initialHighlightedIndex,
        defaultHighlightedIndex = props.defaultHighlightedIndex;
    var selectedItem = state.selectedItem,
        highlightedIndex = state.highlightedIndex;

    if (items.length === 0) {
      return -1;
    } // initialHighlightedIndex will give value to highlightedIndex on initial state only.


    if (initialHighlightedIndex !== undefined && highlightedIndex === initialHighlightedIndex) {
      return initialHighlightedIndex;
    }

    if (defaultHighlightedIndex !== undefined) {
      return defaultHighlightedIndex;
    }

    if (selectedItem) {
      if (offset === 0) {
        return items.indexOf(selectedItem);
      }

      return getNextWrappingIndex(offset, items.indexOf(selectedItem), items.length, getItemNodeFromIndex, false);
    }

    if (offset === 0) {
      return -1;
    }

    return offset < 0 ? items.length - 1 : 0;
  }
  /**
   * Reuse the movement tracking of mouse and touch events.
   *
   * @param {boolean} isOpen Whether the dropdown is open or not.
   * @param {Array<Object>} downshiftElementRefs Downshift element refs to track movement (toggleButton, menu etc.)
   * @param {Object} environment Environment where component/hook exists.
   * @param {Function} handleBlur Handler on blur from mouse or touch.
   * @returns {Object} Ref containing whether mouseDown or touchMove event is happening
   */


  function useMouseAndTouchTracker(isOpen, downshiftElementRefs, environment, handleBlur) {
    var mouseAndTouchTrackersRef = preact.useRef({
      isMouseDown: false,
      isTouchMove: false
    });
    preact.useEffect(function () {
      // The same strategy for checking if a click occurred inside or outside downsift
      // as in downshift.js.
      var onMouseDown = function onMouseDown() {
        mouseAndTouchTrackersRef.current.isMouseDown = true;
      };

      var onMouseUp = function onMouseUp(event) {
        mouseAndTouchTrackersRef.current.isMouseDown = false;

        if (isOpen && !targetWithinDownshift(event.target, downshiftElementRefs.map(function (ref) {
          return ref.current;
        }), environment)) {
          handleBlur();
        }
      };

      var onTouchStart = function onTouchStart() {
        mouseAndTouchTrackersRef.current.isTouchMove = false;
      };

      var onTouchMove = function onTouchMove() {
        mouseAndTouchTrackersRef.current.isTouchMove = true;
      };

      var onTouchEnd = function onTouchEnd(event) {
        if (isOpen && !mouseAndTouchTrackersRef.current.isTouchMove && !targetWithinDownshift(event.target, downshiftElementRefs.map(function (ref) {
          return ref.current;
        }), environment, false)) {
          handleBlur();
        }
      };

      environment.addEventListener('mousedown', onMouseDown);
      environment.addEventListener('mouseup', onMouseUp);
      environment.addEventListener('touchstart', onTouchStart);
      environment.addEventListener('touchmove', onTouchMove);
      environment.addEventListener('touchend', onTouchEnd);
      return function cleanup() {
        environment.removeEventListener('mousedown', onMouseDown);
        environment.removeEventListener('mouseup', onMouseUp);
        environment.removeEventListener('touchstart', onTouchStart);
        environment.removeEventListener('touchmove', onTouchMove);
        environment.removeEventListener('touchend', onTouchEnd);
      }; // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, environment]);
    return mouseAndTouchTrackersRef;
  }
  /* istanbul ignore next */
  // eslint-disable-next-line import/no-mutable-exports


  var useGetterPropsCalledChecker = function useGetterPropsCalledChecker() {
    return noop;
  };
  /**
   * Custom hook that checks if getter props are called correctly.
   *
   * @param  {...any} propKeys Getter prop names to be handled.
   * @returns {Function} Setter function called inside getter props to set call information.
   */

  /* istanbul ignore next */


  {
    useGetterPropsCalledChecker = function useGetterPropsCalledChecker() {
      var isInitialMountRef = preact.useRef(true);

      for (var _len = arguments.length, propKeys = new Array(_len), _key = 0; _key < _len; _key++) {
        propKeys[_key] = arguments[_key];
      }

      var getterPropsCalledRef = preact.useRef(propKeys.reduce(function (acc, propKey) {
        acc[propKey] = {};
        return acc;
      }, {}));
      preact.useEffect(function () {
        Object.keys(getterPropsCalledRef.current).forEach(function (propKey) {
          var propCallInfo = getterPropsCalledRef.current[propKey];

          if (isInitialMountRef.current) {
            if (!Object.keys(propCallInfo).length) {
              // eslint-disable-next-line no-console
              console.error("downshift: You forgot to call the " + propKey + " getter function on your component / element.");
              return;
            }
          }

          var suppressRefError = propCallInfo.suppressRefError,
              refKey = propCallInfo.refKey,
              elementRef = propCallInfo.elementRef;

          if ((!elementRef || !elementRef.current) && !suppressRefError) {
            // eslint-disable-next-line no-console
            console.error("downshift: The ref prop \"" + refKey + "\" from " + propKey + " was not applied correctly on your element.");
          }
        });
        isInitialMountRef.current = false;
      });
      var setGetterPropCallInfo = preact.useCallback(function (propKey, suppressRefError, refKey, elementRef) {
        getterPropsCalledRef.current[propKey] = {
          suppressRefError: suppressRefError,
          refKey: refKey,
          elementRef: elementRef
        };
      }, []);
      return setGetterPropCallInfo;
    };
  }

  function useA11yMessageSetter(getA11yMessage, dependencyArray, _ref2) {
    var isInitialMount = _ref2.isInitialMount,
        highlightedIndex = _ref2.highlightedIndex,
        items = _ref2.items,
        environment = _ref2.environment,
        rest = _objectWithoutPropertiesLoose(_ref2, _excluded$3);

    // Sets a11y status message on changes in state.
    preact.useEffect(function () {
      if (isInitialMount || false) {
        return;
      }

      updateA11yStatus(function () {
        return getA11yMessage(_extends({
          highlightedIndex: highlightedIndex,
          highlightedItem: items[highlightedIndex],
          resultCount: items.length
        }, rest));
      }, environment.document); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencyArray);
  }

  function useScrollIntoView(_ref3) {
    var highlightedIndex = _ref3.highlightedIndex,
        isOpen = _ref3.isOpen,
        itemRefs = _ref3.itemRefs,
        getItemNodeFromIndex = _ref3.getItemNodeFromIndex,
        menuElement = _ref3.menuElement,
        scrollIntoViewProp = _ref3.scrollIntoView;
    // used not to scroll on highlight by mouse.
    var shouldScrollRef = preact.useRef(true); // Scroll on highlighted item if change comes from keyboard.

    useIsomorphicLayoutEffect(function () {
      if (highlightedIndex < 0 || !isOpen || !Object.keys(itemRefs.current).length) {
        return;
      }

      if (shouldScrollRef.current === false) {
        shouldScrollRef.current = true;
      } else {
        scrollIntoViewProp(getItemNodeFromIndex(highlightedIndex), menuElement);
      } // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [highlightedIndex]);
    return shouldScrollRef;
  } // eslint-disable-next-line import/no-mutable-exports


  var useControlPropsValidator = noop;
  /* istanbul ignore next */

  {
    useControlPropsValidator = function useControlPropsValidator(_ref4) {
      var isInitialMount = _ref4.isInitialMount,
          props = _ref4.props,
          state = _ref4.state;
      // used for checking when props are moving from controlled to uncontrolled.
      var prevPropsRef = preact.useRef(props);
      preact.useEffect(function () {
        if (isInitialMount) {
          return;
        }

        validateControlledUnchanged(state, prevPropsRef.current, props);
        prevPropsRef.current = props;
      }, [state, props, isInitialMount]);
    };
  }

  /* eslint-disable complexity */

  function downshiftCommonReducer(state, action, stateChangeTypes) {
    var type = action.type,
        props = action.props;
    var changes;

    switch (type) {
      case stateChangeTypes.ItemMouseMove:
        changes = {
          highlightedIndex: action.index
        };
        break;

      case stateChangeTypes.MenuMouseLeave:
        changes = {
          highlightedIndex: -1
        };
        break;

      case stateChangeTypes.ToggleButtonClick:
      case stateChangeTypes.FunctionToggleMenu:
        changes = {
          isOpen: !state.isOpen,
          highlightedIndex: state.isOpen ? -1 : getHighlightedIndexOnOpen(props, state, 0)
        };
        break;

      case stateChangeTypes.FunctionOpenMenu:
        changes = {
          isOpen: true,
          highlightedIndex: getHighlightedIndexOnOpen(props, state, 0)
        };
        break;

      case stateChangeTypes.FunctionCloseMenu:
        changes = {
          isOpen: false
        };
        break;

      case stateChangeTypes.FunctionSetHighlightedIndex:
        changes = {
          highlightedIndex: action.highlightedIndex
        };
        break;

      case stateChangeTypes.FunctionSetInputValue:
        changes = {
          inputValue: action.inputValue
        };
        break;

      case stateChangeTypes.FunctionReset:
        changes = {
          highlightedIndex: getDefaultValue$1(props, 'highlightedIndex'),
          isOpen: getDefaultValue$1(props, 'isOpen'),
          selectedItem: getDefaultValue$1(props, 'selectedItem'),
          inputValue: getDefaultValue$1(props, 'inputValue')
        };
        break;

      default:
        throw new Error('Reducer called without proper action type.');
    }

    return _extends({}, state, changes);
  }
  /* eslint-enable complexity */

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function getItemIndexByCharacterKey(_a) {
      var keysSoFar = _a.keysSoFar, highlightedIndex = _a.highlightedIndex, items = _a.items, itemToString = _a.itemToString, getItemNodeFromIndex = _a.getItemNodeFromIndex;
      var lowerCasedKeysSoFar = keysSoFar.toLowerCase();
      for (var index = 0; index < items.length; index++) {
          var offsetIndex = (index + highlightedIndex + 1) % items.length;
          var item = items[offsetIndex];
          if (item !== undefined &&
              itemToString(item)
                  .toLowerCase()
                  .startsWith(lowerCasedKeysSoFar)) {
              var element = getItemNodeFromIndex(offsetIndex);
              if (!(element === null || element === void 0 ? void 0 : element.hasAttribute('disabled'))) {
                  return offsetIndex;
              }
          }
      }
      return highlightedIndex;
  }
  var propTypes$2 = {
      items: PropTypes__default['default'].array.isRequired,
      itemToString: PropTypes__default['default'].func,
      getA11yStatusMessage: PropTypes__default['default'].func,
      getA11ySelectionMessage: PropTypes__default['default'].func,
      circularNavigation: PropTypes__default['default'].bool,
      highlightedIndex: PropTypes__default['default'].number,
      defaultHighlightedIndex: PropTypes__default['default'].number,
      initialHighlightedIndex: PropTypes__default['default'].number,
      isOpen: PropTypes__default['default'].bool,
      defaultIsOpen: PropTypes__default['default'].bool,
      initialIsOpen: PropTypes__default['default'].bool,
      selectedItem: PropTypes__default['default'].any,
      initialSelectedItem: PropTypes__default['default'].any,
      defaultSelectedItem: PropTypes__default['default'].any,
      id: PropTypes__default['default'].string,
      labelId: PropTypes__default['default'].string,
      menuId: PropTypes__default['default'].string,
      getItemId: PropTypes__default['default'].func,
      toggleButtonId: PropTypes__default['default'].string,
      stateReducer: PropTypes__default['default'].func,
      onSelectedItemChange: PropTypes__default['default'].func,
      onHighlightedIndexChange: PropTypes__default['default'].func,
      onStateChange: PropTypes__default['default'].func,
      onIsOpenChange: PropTypes__default['default'].func,
      environment: PropTypes__default['default'].shape({
          addEventListener: PropTypes__default['default'].func,
          removeEventListener: PropTypes__default['default'].func,
          document: PropTypes__default['default'].shape({
              getElementById: PropTypes__default['default'].func,
              activeElement: PropTypes__default['default'].any,
              body: PropTypes__default['default'].any
          })
      })
  };
  /**
   * Default implementation for status message. Only added when menu is open.
   * Will specift if there are results in the list, and if so, how many,
   * and what keys are relevant.
   *
   * @param {Object} param the downshift state and other relevant properties
   * @return {String} the a11y status message
   */
  function getA11yStatusMessage(_a) {
      var isOpen = _a.isOpen, resultCount = _a.resultCount, previousResultCount = _a.previousResultCount;
      if (!isOpen) {
          return '';
      }
      if (!resultCount) {
          return 'No results are available.';
      }
      if (resultCount !== previousResultCount) {
          return resultCount + " result" + (resultCount === 1 ? ' is' : 's are') + " available, use up and down arrow keys to navigate. Press Enter or Space Bar keys to select.";
      }
      return '';
  }
  var defaultProps$2 = __assign(__assign({}, defaultProps$3), { getA11yStatusMessage: getA11yStatusMessage });
  // eslint-disable-next-line import/no-mutable-exports
  var validatePropTypes$2 = noop;
  /* istanbul ignore next */
  {
      validatePropTypes$2 = function (options, caller) {
          PropTypes__default['default'].checkPropTypes(propTypes$2, options, 'prop', caller.name);
      };
  }

  var MenuKeyDownArrowDown = '__menu_keydown_arrow_down__' ;
  var MenuKeyDownArrowUp = '__menu_keydown_arrow_up__' ;
  var MenuKeyDownEscape = '__menu_keydown_escape__' ;
  var MenuKeyDownHome = '__menu_keydown_home__' ;
  var MenuKeyDownEnd = '__menu_keydown_end__' ;
  var MenuKeyDownEnter = '__menu_keydown_enter__' ;
  var MenuKeyDownSpaceButton = '__menu_keydown_space_button__' ;
  var MenuKeyDownCharacter = '__menu_keydown_character__' ;
  var MenuBlur = '__menu_blur__' ;
  var MenuMouseLeave$1 = '__menu_mouse_leave__' ;
  var ItemMouseMove$1 = '__item_mouse_move__' ;
  var ItemClick$1 = '__item_click__' ;
  var ToggleButtonClick$1 = '__togglebutton_click__' ;
  var ToggleButtonKeyDownArrowDown = '__togglebutton_keydown_arrow_down__' ;
  var ToggleButtonKeyDownArrowUp = '__togglebutton_keydown_arrow_up__' ;
  var ToggleButtonKeyDownCharacter = '__togglebutton_keydown_character__' ;
  var FunctionToggleMenu$1 = '__function_toggle_menu__' ;
  var FunctionOpenMenu$1 = '__function_open_menu__' ;
  var FunctionCloseMenu$1 = '__function_close_menu__' ;
  var FunctionSetHighlightedIndex$1 = '__function_set_highlighted_index__' ;
  var FunctionSelectItem$1 = '__function_select_item__' ;
  var FunctionSetInputValue$1 = '__function_set_input_value__' ;
  var FunctionReset$2 = '__function_reset__' ;

  var stateChangeTypes$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MenuKeyDownArrowDown: MenuKeyDownArrowDown,
    MenuKeyDownArrowUp: MenuKeyDownArrowUp,
    MenuKeyDownEscape: MenuKeyDownEscape,
    MenuKeyDownHome: MenuKeyDownHome,
    MenuKeyDownEnd: MenuKeyDownEnd,
    MenuKeyDownEnter: MenuKeyDownEnter,
    MenuKeyDownSpaceButton: MenuKeyDownSpaceButton,
    MenuKeyDownCharacter: MenuKeyDownCharacter,
    MenuBlur: MenuBlur,
    MenuMouseLeave: MenuMouseLeave$1,
    ItemMouseMove: ItemMouseMove$1,
    ItemClick: ItemClick$1,
    ToggleButtonClick: ToggleButtonClick$1,
    ToggleButtonKeyDownArrowDown: ToggleButtonKeyDownArrowDown,
    ToggleButtonKeyDownArrowUp: ToggleButtonKeyDownArrowUp,
    ToggleButtonKeyDownCharacter: ToggleButtonKeyDownCharacter,
    FunctionToggleMenu: FunctionToggleMenu$1,
    FunctionOpenMenu: FunctionOpenMenu$1,
    FunctionCloseMenu: FunctionCloseMenu$1,
    FunctionSetHighlightedIndex: FunctionSetHighlightedIndex$1,
    FunctionSelectItem: FunctionSelectItem$1,
    FunctionSetInputValue: FunctionSetInputValue$1,
    FunctionReset: FunctionReset$2
  });

  /* eslint-disable complexity */

  function downshiftSelectReducer(state, action) {
    var type = action.type,
        props = action.props,
        shiftKey = action.shiftKey;
    var changes;

    switch (type) {
      case ItemClick$1:
        changes = {
          isOpen: getDefaultValue$1(props, 'isOpen'),
          highlightedIndex: getDefaultValue$1(props, 'highlightedIndex'),
          selectedItem: props.items[action.index]
        };
        break;

      case ToggleButtonKeyDownCharacter:
        {
          var lowercasedKey = action.key;
          var inputValue = "" + state.inputValue + lowercasedKey;
          var itemIndex = getItemIndexByCharacterKey({
            keysSoFar: inputValue,
            highlightedIndex: state.selectedItem ? props.items.indexOf(state.selectedItem) : -1,
            items: props.items,
            itemToString: props.itemToString,
            getItemNodeFromIndex: action.getItemNodeFromIndex
          });
          changes = _extends({
            inputValue: inputValue
          }, itemIndex >= 0 && {
            selectedItem: props.items[itemIndex]
          });
        }
        break;

      case ToggleButtonKeyDownArrowDown:
        changes = {
          highlightedIndex: getHighlightedIndexOnOpen(props, state, 1, action.getItemNodeFromIndex),
          isOpen: true
        };
        break;

      case ToggleButtonKeyDownArrowUp:
        changes = {
          highlightedIndex: getHighlightedIndexOnOpen(props, state, -1, action.getItemNodeFromIndex),
          isOpen: true
        };
        break;

      case MenuKeyDownEnter:
      case MenuKeyDownSpaceButton:
        changes = _extends({
          isOpen: getDefaultValue$1(props, 'isOpen'),
          highlightedIndex: getDefaultValue$1(props, 'highlightedIndex')
        }, state.highlightedIndex >= 0 && {
          selectedItem: props.items[state.highlightedIndex]
        });
        break;

      case MenuKeyDownHome:
        changes = {
          highlightedIndex: getNextNonDisabledIndex(1, 0, props.items.length, action.getItemNodeFromIndex, false)
        };
        break;

      case MenuKeyDownEnd:
        changes = {
          highlightedIndex: getNextNonDisabledIndex(-1, props.items.length - 1, props.items.length, action.getItemNodeFromIndex, false)
        };
        break;

      case MenuKeyDownEscape:
        changes = {
          isOpen: false,
          highlightedIndex: -1
        };
        break;

      case MenuBlur:
        changes = {
          isOpen: false,
          highlightedIndex: -1
        };
        break;

      case MenuKeyDownCharacter:
        {
          var _lowercasedKey = action.key;

          var _inputValue = "" + state.inputValue + _lowercasedKey;

          var highlightedIndex = getItemIndexByCharacterKey({
            keysSoFar: _inputValue,
            highlightedIndex: state.highlightedIndex,
            items: props.items,
            itemToString: props.itemToString,
            getItemNodeFromIndex: action.getItemNodeFromIndex
          });
          changes = _extends({
            inputValue: _inputValue
          }, highlightedIndex >= 0 && {
            highlightedIndex: highlightedIndex
          });
        }
        break;

      case MenuKeyDownArrowDown:
        changes = {
          highlightedIndex: getNextWrappingIndex(shiftKey ? 5 : 1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, props.circularNavigation)
        };
        break;

      case MenuKeyDownArrowUp:
        changes = {
          highlightedIndex: getNextWrappingIndex(shiftKey ? -5 : -1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, props.circularNavigation)
        };
        break;

      case FunctionSelectItem$1:
        changes = {
          selectedItem: action.selectedItem
        };
        break;

      default:
        return downshiftCommonReducer(state, action, stateChangeTypes$2);
    }

    return _extends({}, state, changes);
  }
  /* eslint-enable complexity */

  var _excluded$2 = ["onMouseLeave", "refKey", "onKeyDown", "onBlur", "ref"],
      _excluded2$2 = ["onClick", "onKeyDown", "refKey", "ref"],
      _excluded3$1 = ["item", "index", "onMouseMove", "onClick", "refKey", "ref"];
  useSelect.stateChangeTypes = stateChangeTypes$2;

  function useSelect(userProps) {
    if (userProps === void 0) {
      userProps = {};
    }

    validatePropTypes$2(userProps, useSelect); // Props defaults and destructuring.

    var props = _extends({}, defaultProps$2, userProps);

    var items = props.items,
        scrollIntoView = props.scrollIntoView,
        environment = props.environment,
        initialIsOpen = props.initialIsOpen,
        defaultIsOpen = props.defaultIsOpen,
        itemToString = props.itemToString,
        getA11ySelectionMessage = props.getA11ySelectionMessage,
        getA11yStatusMessage = props.getA11yStatusMessage; // Initial state depending on controlled props.

    var initialState = getInitialState$2(props);

    var _useControlledReducer = useControlledReducer$1(downshiftSelectReducer, initialState, props),
        state = _useControlledReducer[0],
        dispatch = _useControlledReducer[1];

    var isOpen = state.isOpen,
        highlightedIndex = state.highlightedIndex,
        selectedItem = state.selectedItem,
        inputValue = state.inputValue; // Element efs.

    var toggleButtonRef = preact.useRef(null);
    var menuRef = preact.useRef(null);
    var itemRefs = preact.useRef({}); // used not to trigger menu blur action in some scenarios.

    var shouldBlurRef = preact.useRef(true); // used to keep the inputValue clearTimeout object between renders.

    var clearTimeoutRef = preact.useRef(null); // prevent id re-generation between renders.

    var elementIds = useElementIds(props); // used to keep track of how many items we had on previous cycle.

    var previousResultCountRef = preact.useRef();
    var isInitialMountRef = preact.useRef(true); // utility callback to get item element.

    var latest = useLatestRef({
      state: state,
      props: props
    }); // Some utils.

    var getItemNodeFromIndex = preact.useCallback(function (index) {
      return itemRefs.current[elementIds.getItemId(index)];
    }, [elementIds]); // Effects.
    // Sets a11y status message on changes in state.

    useA11yMessageSetter(getA11yStatusMessage, [isOpen, highlightedIndex, inputValue, items], _extends({
      isInitialMount: isInitialMountRef.current,
      previousResultCount: previousResultCountRef.current,
      items: items,
      environment: environment,
      itemToString: itemToString
    }, state)); // Sets a11y status message on changes in selectedItem.

    useA11yMessageSetter(getA11ySelectionMessage, [selectedItem], _extends({
      isInitialMount: isInitialMountRef.current,
      previousResultCount: previousResultCountRef.current,
      items: items,
      environment: environment,
      itemToString: itemToString
    }, state)); // Scroll on highlighted item if change comes from keyboard.

    var shouldScrollRef = useScrollIntoView({
      menuElement: menuRef.current,
      highlightedIndex: highlightedIndex,
      isOpen: isOpen,
      itemRefs: itemRefs,
      scrollIntoView: scrollIntoView,
      getItemNodeFromIndex: getItemNodeFromIndex
    }); // Sets cleanup for the keysSoFar callback, debounded after 500ms.

    preact.useEffect(function () {
      // init the clean function here as we need access to dispatch.
      clearTimeoutRef.current = debounce(function (outerDispatch) {
        outerDispatch({
          type: FunctionSetInputValue$1,
          inputValue: ''
        });
      }, 500); // Cancel any pending debounced calls on mount

      return function () {
        clearTimeoutRef.current.cancel();
      };
    }, []); // Invokes the keysSoFar callback set up above.

    preact.useEffect(function () {
      if (!inputValue) {
        return;
      }

      clearTimeoutRef.current(dispatch);
    }, [dispatch, inputValue]);
    useControlPropsValidator({
      isInitialMount: isInitialMountRef.current,
      props: props,
      state: state
    });
    /* Controls the focus on the menu or the toggle button. */

    preact.useEffect(function () {
      // Don't focus menu on first render.
      if (isInitialMountRef.current) {
        // Unless it was initialised as open.
        if ((initialIsOpen || defaultIsOpen || isOpen) && menuRef.current) {
          menuRef.current.focus();
        }

        return;
      } // Focus menu on open.


      if (isOpen) {
        // istanbul ignore else
        if (menuRef.current) {
          menuRef.current.focus();
        }

        return;
      } // Focus toggleButton on close, but not if it was closed with (Shift+)Tab.


      if (environment.document.activeElement === menuRef.current) {
        // istanbul ignore else
        if (toggleButtonRef.current) {
          shouldBlurRef.current = false;
          toggleButtonRef.current.focus();
        }
      } // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [isOpen]);
    preact.useEffect(function () {
      if (isInitialMountRef.current) {
        return;
      }

      previousResultCountRef.current = items.length;
    }); // Add mouse/touch events to document.

    var mouseAndTouchTrackersRef = useMouseAndTouchTracker(isOpen, [menuRef, toggleButtonRef], environment, function () {
      dispatch({
        type: MenuBlur
      });
    });
    var setGetterPropCallInfo = useGetterPropsCalledChecker('getMenuProps', 'getToggleButtonProps'); // Make initial ref false.

    preact.useEffect(function () {
      isInitialMountRef.current = false;
    }, []); // Reset itemRefs on close.

    preact.useEffect(function () {
      if (!isOpen) {
        itemRefs.current = {};
      }
    }, [isOpen]); // Event handler functions.

    var toggleButtonKeyDownHandlers = preact.useMemo(function () {
      return {
        ArrowDown: function ArrowDown(event) {
          event.preventDefault();
          dispatch({
            type: ToggleButtonKeyDownArrowDown,
            getItemNodeFromIndex: getItemNodeFromIndex,
            shiftKey: event.shiftKey
          });
        },
        ArrowUp: function ArrowUp(event) {
          event.preventDefault();
          dispatch({
            type: ToggleButtonKeyDownArrowUp,
            getItemNodeFromIndex: getItemNodeFromIndex,
            shiftKey: event.shiftKey
          });
        }
      };
    }, [dispatch, getItemNodeFromIndex]);
    var menuKeyDownHandlers = preact.useMemo(function () {
      return {
        ArrowDown: function ArrowDown(event) {
          event.preventDefault();
          dispatch({
            type: MenuKeyDownArrowDown,
            getItemNodeFromIndex: getItemNodeFromIndex,
            shiftKey: event.shiftKey
          });
        },
        ArrowUp: function ArrowUp(event) {
          event.preventDefault();
          dispatch({
            type: MenuKeyDownArrowUp,
            getItemNodeFromIndex: getItemNodeFromIndex,
            shiftKey: event.shiftKey
          });
        },
        Home: function Home(event) {
          event.preventDefault();
          dispatch({
            type: MenuKeyDownHome,
            getItemNodeFromIndex: getItemNodeFromIndex
          });
        },
        End: function End(event) {
          event.preventDefault();
          dispatch({
            type: MenuKeyDownEnd,
            getItemNodeFromIndex: getItemNodeFromIndex
          });
        },
        Escape: function Escape() {
          dispatch({
            type: MenuKeyDownEscape
          });
        },
        Enter: function Enter(event) {
          event.preventDefault();
          dispatch({
            type: MenuKeyDownEnter
          });
        },
        ' ': function _(event) {
          event.preventDefault();
          dispatch({
            type: MenuKeyDownSpaceButton
          });
        }
      };
    }, [dispatch, getItemNodeFromIndex]); // Action functions.

    var toggleMenu = preact.useCallback(function () {
      dispatch({
        type: FunctionToggleMenu$1
      });
    }, [dispatch]);
    var closeMenu = preact.useCallback(function () {
      dispatch({
        type: FunctionCloseMenu$1
      });
    }, [dispatch]);
    var openMenu = preact.useCallback(function () {
      dispatch({
        type: FunctionOpenMenu$1
      });
    }, [dispatch]);
    var setHighlightedIndex = preact.useCallback(function (newHighlightedIndex) {
      dispatch({
        type: FunctionSetHighlightedIndex$1,
        highlightedIndex: newHighlightedIndex
      });
    }, [dispatch]);
    var selectItem = preact.useCallback(function (newSelectedItem) {
      dispatch({
        type: FunctionSelectItem$1,
        selectedItem: newSelectedItem
      });
    }, [dispatch]);
    var reset = preact.useCallback(function () {
      dispatch({
        type: FunctionReset$2
      });
    }, [dispatch]);
    var setInputValue = preact.useCallback(function (newInputValue) {
      dispatch({
        type: FunctionSetInputValue$1,
        inputValue: newInputValue
      });
    }, [dispatch]); // Getter functions.

    var getLabelProps = preact.useCallback(function (labelProps) {
      return _extends({
        id: elementIds.labelId,
        htmlFor: elementIds.toggleButtonId
      }, labelProps);
    }, [elementIds]);
    var getMenuProps = preact.useCallback(function (_temp, _temp2) {
      var _extends2;

      var _ref = _temp === void 0 ? {} : _temp,
          onMouseLeave = _ref.onMouseLeave,
          _ref$refKey = _ref.refKey,
          refKey = _ref$refKey === void 0 ? 'ref' : _ref$refKey,
          onKeyDown = _ref.onKeyDown,
          onBlur = _ref.onBlur,
          ref = _ref.ref,
          rest = _objectWithoutPropertiesLoose(_ref, _excluded$2);

      var _ref2 = _temp2 === void 0 ? {} : _temp2,
          _ref2$suppressRefErro = _ref2.suppressRefError,
          suppressRefError = _ref2$suppressRefErro === void 0 ? false : _ref2$suppressRefErro;

      var latestState = latest.current.state;

      var menuHandleKeyDown = function menuHandleKeyDown(event) {
        var key = normalizeArrowKey(event);

        if (key && menuKeyDownHandlers[key]) {
          menuKeyDownHandlers[key](event);
        } else if (isAcceptedCharacterKey(key)) {
          dispatch({
            type: MenuKeyDownCharacter,
            key: key,
            getItemNodeFromIndex: getItemNodeFromIndex
          });
        }
      };

      var menuHandleBlur = function menuHandleBlur() {
        // if the blur was a result of selection, we don't trigger this action.
        if (shouldBlurRef.current === false) {
          shouldBlurRef.current = true;
          return;
        }

        var shouldBlur = !mouseAndTouchTrackersRef.current.isMouseDown;
        /* istanbul ignore else */

        if (shouldBlur) {
          dispatch({
            type: MenuBlur
          });
        }
      };

      var menuHandleMouseLeave = function menuHandleMouseLeave() {
        dispatch({
          type: MenuMouseLeave$1
        });
      };

      setGetterPropCallInfo('getMenuProps', suppressRefError, refKey, menuRef);
      return _extends((_extends2 = {}, _extends2[refKey] = handleRefs(ref, function (menuNode) {
        menuRef.current = menuNode;
      }), _extends2.id = elementIds.menuId, _extends2.role = 'listbox', _extends2['aria-labelledby'] = elementIds.labelId, _extends2.tabIndex = -1, _extends2), latestState.isOpen && latestState.highlightedIndex > -1 && {
        'aria-activedescendant': elementIds.getItemId(latestState.highlightedIndex)
      }, {
        onMouseLeave: callAllEventHandlers(onMouseLeave, menuHandleMouseLeave),
        onKeyDown: callAllEventHandlers(onKeyDown, menuHandleKeyDown),
        onBlur: callAllEventHandlers(onBlur, menuHandleBlur)
      }, rest);
    }, [dispatch, latest, menuKeyDownHandlers, mouseAndTouchTrackersRef, setGetterPropCallInfo, elementIds, getItemNodeFromIndex]);
    var getToggleButtonProps = preact.useCallback(function (_temp3, _temp4) {
      var _extends3;

      var _ref3 = _temp3 === void 0 ? {} : _temp3,
          onClick = _ref3.onClick,
          onKeyDown = _ref3.onKeyDown,
          _ref3$refKey = _ref3.refKey,
          refKey = _ref3$refKey === void 0 ? 'ref' : _ref3$refKey,
          ref = _ref3.ref,
          rest = _objectWithoutPropertiesLoose(_ref3, _excluded2$2);

      var _ref4 = _temp4 === void 0 ? {} : _temp4,
          _ref4$suppressRefErro = _ref4.suppressRefError,
          suppressRefError = _ref4$suppressRefErro === void 0 ? false : _ref4$suppressRefErro;

      var toggleButtonHandleClick = function toggleButtonHandleClick() {
        dispatch({
          type: ToggleButtonClick$1
        });
      };

      var toggleButtonHandleKeyDown = function toggleButtonHandleKeyDown(event) {
        var key = normalizeArrowKey(event);

        if (key && toggleButtonKeyDownHandlers[key]) {
          toggleButtonKeyDownHandlers[key](event);
        } else if (isAcceptedCharacterKey(key)) {
          dispatch({
            type: ToggleButtonKeyDownCharacter,
            key: key,
            getItemNodeFromIndex: getItemNodeFromIndex
          });
        }
      };

      var toggleProps = _extends((_extends3 = {}, _extends3[refKey] = handleRefs(ref, function (toggleButtonNode) {
        toggleButtonRef.current = toggleButtonNode;
      }), _extends3.id = elementIds.toggleButtonId, _extends3['aria-haspopup'] = 'listbox', _extends3['aria-expanded'] = latest.current.state.isOpen, _extends3['aria-labelledby'] = elementIds.labelId + " " + elementIds.toggleButtonId, _extends3), rest);

      if (!rest.disabled) {
        toggleProps.onClick = callAllEventHandlers(onClick, toggleButtonHandleClick);
        toggleProps.onKeyDown = callAllEventHandlers(onKeyDown, toggleButtonHandleKeyDown);
      }

      setGetterPropCallInfo('getToggleButtonProps', suppressRefError, refKey, toggleButtonRef);
      return toggleProps;
    }, [dispatch, latest, toggleButtonKeyDownHandlers, setGetterPropCallInfo, elementIds, getItemNodeFromIndex]);
    var getItemProps = preact.useCallback(function (_temp5) {
      var _extends4;

      var _ref5 = _temp5 === void 0 ? {} : _temp5,
          item = _ref5.item,
          index = _ref5.index,
          onMouseMove = _ref5.onMouseMove,
          onClick = _ref5.onClick,
          _ref5$refKey = _ref5.refKey,
          refKey = _ref5$refKey === void 0 ? 'ref' : _ref5$refKey,
          ref = _ref5.ref,
          rest = _objectWithoutPropertiesLoose(_ref5, _excluded3$1);

      var _latest$current = latest.current,
          latestState = _latest$current.state,
          latestProps = _latest$current.props;

      var itemHandleMouseMove = function itemHandleMouseMove() {
        if (index === latestState.highlightedIndex) {
          return;
        }

        shouldScrollRef.current = false;
        dispatch({
          type: ItemMouseMove$1,
          index: index
        });
      };

      var itemHandleClick = function itemHandleClick() {
        dispatch({
          type: ItemClick$1,
          index: index
        });
      };

      var itemIndex = getItemIndex(index, item, latestProps.items);

      if (itemIndex < 0) {
        throw new Error('Pass either item or item index in getItemProps!');
      }

      var itemProps = _extends((_extends4 = {
        role: 'option',
        'aria-selected': "" + (itemIndex === latestState.highlightedIndex),
        id: elementIds.getItemId(itemIndex)
      }, _extends4[refKey] = handleRefs(ref, function (itemNode) {
        if (itemNode) {
          itemRefs.current[elementIds.getItemId(itemIndex)] = itemNode;
        }
      }), _extends4), rest);

      if (!rest.disabled) {
        itemProps.onMouseMove = callAllEventHandlers(onMouseMove, itemHandleMouseMove);
        itemProps.onClick = callAllEventHandlers(onClick, itemHandleClick);
      }

      return itemProps;
    }, [dispatch, latest, shouldScrollRef, elementIds]);
    return {
      // prop getters.
      getToggleButtonProps: getToggleButtonProps,
      getLabelProps: getLabelProps,
      getMenuProps: getMenuProps,
      getItemProps: getItemProps,
      // actions.
      toggleMenu: toggleMenu,
      openMenu: openMenu,
      closeMenu: closeMenu,
      setHighlightedIndex: setHighlightedIndex,
      selectItem: selectItem,
      reset: reset,
      setInputValue: setInputValue,
      // state.
      highlightedIndex: highlightedIndex,
      isOpen: isOpen,
      selectedItem: selectedItem,
      inputValue: inputValue
    };
  }

  var InputKeyDownArrowDown = '__input_keydown_arrow_down__' ;
  var InputKeyDownArrowUp = '__input_keydown_arrow_up__' ;
  var InputKeyDownEscape = '__input_keydown_escape__' ;
  var InputKeyDownHome = '__input_keydown_home__' ;
  var InputKeyDownEnd = '__input_keydown_end__' ;
  var InputKeyDownEnter = '__input_keydown_enter__' ;
  var InputChange = '__input_change__' ;
  var InputBlur = '__input_blur__' ;
  var MenuMouseLeave = '__menu_mouse_leave__' ;
  var ItemMouseMove = '__item_mouse_move__' ;
  var ItemClick = '__item_click__' ;
  var ToggleButtonClick = '__togglebutton_click__' ;
  var FunctionToggleMenu = '__function_toggle_menu__' ;
  var FunctionOpenMenu = '__function_open_menu__' ;
  var FunctionCloseMenu = '__function_close_menu__' ;
  var FunctionSetHighlightedIndex = '__function_set_highlighted_index__' ;
  var FunctionSelectItem = '__function_select_item__' ;
  var FunctionSetInputValue = '__function_set_input_value__' ;
  var FunctionReset$1 = '__function_reset__' ;
  var ControlledPropUpdatedSelectedItem = '__controlled_prop_updated_selected_item__' ;

  var stateChangeTypes$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    InputKeyDownArrowDown: InputKeyDownArrowDown,
    InputKeyDownArrowUp: InputKeyDownArrowUp,
    InputKeyDownEscape: InputKeyDownEscape,
    InputKeyDownHome: InputKeyDownHome,
    InputKeyDownEnd: InputKeyDownEnd,
    InputKeyDownEnter: InputKeyDownEnter,
    InputChange: InputChange,
    InputBlur: InputBlur,
    MenuMouseLeave: MenuMouseLeave,
    ItemMouseMove: ItemMouseMove,
    ItemClick: ItemClick,
    ToggleButtonClick: ToggleButtonClick,
    FunctionToggleMenu: FunctionToggleMenu,
    FunctionOpenMenu: FunctionOpenMenu,
    FunctionCloseMenu: FunctionCloseMenu,
    FunctionSetHighlightedIndex: FunctionSetHighlightedIndex,
    FunctionSelectItem: FunctionSelectItem,
    FunctionSetInputValue: FunctionSetInputValue,
    FunctionReset: FunctionReset$1,
    ControlledPropUpdatedSelectedItem: ControlledPropUpdatedSelectedItem
  });

  function getInitialState$1(props) {
    var initialState = getInitialState$2(props);
    var selectedItem = initialState.selectedItem;
    var inputValue = initialState.inputValue;

    if (inputValue === '' && selectedItem && props.defaultInputValue === undefined && props.initialInputValue === undefined && props.inputValue === undefined) {
      inputValue = props.itemToString(selectedItem);
    }

    return _extends({}, initialState, {
      inputValue: inputValue
    });
  }

  var propTypes$1 = {
    items: PropTypes__default['default'].array.isRequired,
    itemToString: PropTypes__default['default'].func,
    getA11yStatusMessage: PropTypes__default['default'].func,
    getA11ySelectionMessage: PropTypes__default['default'].func,
    circularNavigation: PropTypes__default['default'].bool,
    highlightedIndex: PropTypes__default['default'].number,
    defaultHighlightedIndex: PropTypes__default['default'].number,
    initialHighlightedIndex: PropTypes__default['default'].number,
    isOpen: PropTypes__default['default'].bool,
    defaultIsOpen: PropTypes__default['default'].bool,
    initialIsOpen: PropTypes__default['default'].bool,
    selectedItem: PropTypes__default['default'].any,
    initialSelectedItem: PropTypes__default['default'].any,
    defaultSelectedItem: PropTypes__default['default'].any,
    inputValue: PropTypes__default['default'].string,
    defaultInputValue: PropTypes__default['default'].string,
    initialInputValue: PropTypes__default['default'].string,
    id: PropTypes__default['default'].string,
    labelId: PropTypes__default['default'].string,
    menuId: PropTypes__default['default'].string,
    getItemId: PropTypes__default['default'].func,
    inputId: PropTypes__default['default'].string,
    toggleButtonId: PropTypes__default['default'].string,
    stateReducer: PropTypes__default['default'].func,
    onSelectedItemChange: PropTypes__default['default'].func,
    onHighlightedIndexChange: PropTypes__default['default'].func,
    onStateChange: PropTypes__default['default'].func,
    onIsOpenChange: PropTypes__default['default'].func,
    onInputValueChange: PropTypes__default['default'].func,
    environment: PropTypes__default['default'].shape({
      addEventListener: PropTypes__default['default'].func,
      removeEventListener: PropTypes__default['default'].func,
      document: PropTypes__default['default'].shape({
        getElementById: PropTypes__default['default'].func,
        activeElement: PropTypes__default['default'].any,
        body: PropTypes__default['default'].any
      })
    })
  };
  /**
   * The useCombobox version of useControlledReducer, which also
   * checks if the controlled prop selectedItem changed between
   * renders. If so, it will also update inputValue with its
   * string equivalent. It uses the common useEnhancedReducer to
   * compute the rest of the state.
   *
   * @param {Function} reducer Reducer function from downshift.
   * @param {Object} initialState Initial state of the hook.
   * @param {Object} props The hook props.
   * @returns {Array} An array with the state and an action dispatcher.
   */

  function useControlledReducer(reducer, initialState, props) {
    var previousSelectedItemRef = preact.useRef();

    var _useEnhancedReducer = useEnhancedReducer(reducer, initialState, props),
        state = _useEnhancedReducer[0],
        dispatch = _useEnhancedReducer[1]; // ToDo: if needed, make same approach as selectedItemChanged from Downshift.


    preact.useEffect(function () {
      if (isControlledProp(props, 'selectedItem')) {
        if (previousSelectedItemRef.current !== props.selectedItem) {
          dispatch({
            type: ControlledPropUpdatedSelectedItem,
            inputValue: props.itemToString(props.selectedItem)
          });
        }

        previousSelectedItemRef.current = state.selectedItem === previousSelectedItemRef.current ? props.selectedItem : state.selectedItem;
      }
    });
    return [getState(state, props), dispatch];
  } // eslint-disable-next-line import/no-mutable-exports


  var validatePropTypes$1 = noop;
  /* istanbul ignore next */

  {
    validatePropTypes$1 = function validatePropTypes(options, caller) {
      PropTypes__default['default'].checkPropTypes(propTypes$1, options, 'prop', caller.name);
    };
  }

  var defaultProps$1 = _extends({}, defaultProps$3, {
    getA11yStatusMessage: getA11yStatusMessage$1,
    circularNavigation: true
  });

  /* eslint-disable complexity */

  function downshiftUseComboboxReducer(state, action) {
    var type = action.type,
        props = action.props,
        shiftKey = action.shiftKey;
    var changes;

    switch (type) {
      case ItemClick:
        changes = {
          isOpen: getDefaultValue$1(props, 'isOpen'),
          highlightedIndex: getDefaultValue$1(props, 'highlightedIndex'),
          selectedItem: props.items[action.index],
          inputValue: props.itemToString(props.items[action.index])
        };
        break;

      case InputKeyDownArrowDown:
        if (state.isOpen) {
          changes = {
            highlightedIndex: getNextWrappingIndex(shiftKey ? 5 : 1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, props.circularNavigation)
          };
        } else {
          changes = {
            highlightedIndex: getHighlightedIndexOnOpen(props, state, 1, action.getItemNodeFromIndex),
            isOpen: props.items.length >= 0
          };
        }

        break;

      case InputKeyDownArrowUp:
        if (state.isOpen) {
          changes = {
            highlightedIndex: getNextWrappingIndex(shiftKey ? -5 : -1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, props.circularNavigation)
          };
        } else {
          changes = {
            highlightedIndex: getHighlightedIndexOnOpen(props, state, -1, action.getItemNodeFromIndex),
            isOpen: props.items.length >= 0
          };
        }

        break;

      case InputKeyDownEnter:
        changes = _extends({}, state.isOpen && state.highlightedIndex >= 0 && {
          selectedItem: props.items[state.highlightedIndex],
          isOpen: getDefaultValue$1(props, 'isOpen'),
          highlightedIndex: getDefaultValue$1(props, 'highlightedIndex'),
          inputValue: props.itemToString(props.items[state.highlightedIndex])
        });
        break;

      case InputKeyDownEscape:
        changes = _extends({
          isOpen: false,
          highlightedIndex: -1
        }, !state.isOpen && {
          selectedItem: null,
          inputValue: ''
        });
        break;

      case InputKeyDownHome:
        changes = {
          highlightedIndex: getNextNonDisabledIndex(1, 0, props.items.length, action.getItemNodeFromIndex, false)
        };
        break;

      case InputKeyDownEnd:
        changes = {
          highlightedIndex: getNextNonDisabledIndex(-1, props.items.length - 1, props.items.length, action.getItemNodeFromIndex, false)
        };
        break;

      case InputBlur:
        changes = _extends({
          isOpen: false,
          highlightedIndex: -1
        }, state.highlightedIndex >= 0 && action.selectItem && {
          selectedItem: props.items[state.highlightedIndex],
          inputValue: props.itemToString(props.items[state.highlightedIndex])
        });
        break;

      case InputChange:
        changes = {
          isOpen: true,
          highlightedIndex: getDefaultValue$1(props, 'highlightedIndex'),
          inputValue: action.inputValue
        };
        break;

      case FunctionSelectItem:
        changes = {
          selectedItem: action.selectedItem,
          inputValue: props.itemToString(action.selectedItem)
        };
        break;

      case ControlledPropUpdatedSelectedItem:
        changes = {
          inputValue: action.inputValue
        };
        break;

      default:
        return downshiftCommonReducer(state, action, stateChangeTypes$1);
    }

    return _extends({}, state, changes);
  }
  /* eslint-enable complexity */

  var _excluded$1 = ["onMouseLeave", "refKey", "ref"],
      _excluded2$1 = ["item", "index", "refKey", "ref", "onMouseMove", "onClick", "onPress"],
      _excluded3 = ["onClick", "onPress", "refKey", "ref"],
      _excluded4 = ["onKeyDown", "onChange", "onInput", "onBlur", "onChangeText", "refKey", "ref"],
      _excluded5 = ["refKey", "ref"];
  useCombobox.stateChangeTypes = stateChangeTypes$1;

  function useCombobox(userProps) {
    if (userProps === void 0) {
      userProps = {};
    }

    validatePropTypes$1(userProps, useCombobox); // Props defaults and destructuring.

    var props = _extends({}, defaultProps$1, userProps);

    var initialIsOpen = props.initialIsOpen,
        defaultIsOpen = props.defaultIsOpen,
        items = props.items,
        scrollIntoView = props.scrollIntoView,
        environment = props.environment,
        getA11yStatusMessage = props.getA11yStatusMessage,
        getA11ySelectionMessage = props.getA11ySelectionMessage,
        itemToString = props.itemToString; // Initial state depending on controlled props.

    var initialState = getInitialState$1(props);

    var _useControlledReducer = useControlledReducer(downshiftUseComboboxReducer, initialState, props),
        state = _useControlledReducer[0],
        dispatch = _useControlledReducer[1];

    var isOpen = state.isOpen,
        highlightedIndex = state.highlightedIndex,
        selectedItem = state.selectedItem,
        inputValue = state.inputValue; // Element refs.

    var menuRef = preact.useRef(null);
    var itemRefs = preact.useRef({});
    var inputRef = preact.useRef(null);
    var toggleButtonRef = preact.useRef(null);
    var comboboxRef = preact.useRef(null);
    var isInitialMountRef = preact.useRef(true); // prevent id re-generation between renders.

    var elementIds = useElementIds(props); // used to keep track of how many items we had on previous cycle.

    var previousResultCountRef = preact.useRef(); // utility callback to get item element.

    var latest = useLatestRef({
      state: state,
      props: props
    });
    var getItemNodeFromIndex = preact.useCallback(function (index) {
      return itemRefs.current[elementIds.getItemId(index)];
    }, [elementIds]); // Effects.
    // Sets a11y status message on changes in state.

    useA11yMessageSetter(getA11yStatusMessage, [isOpen, highlightedIndex, inputValue, items], _extends({
      isInitialMount: isInitialMountRef.current,
      previousResultCount: previousResultCountRef.current,
      items: items,
      environment: environment,
      itemToString: itemToString
    }, state)); // Sets a11y status message on changes in selectedItem.

    useA11yMessageSetter(getA11ySelectionMessage, [selectedItem], _extends({
      isInitialMount: isInitialMountRef.current,
      previousResultCount: previousResultCountRef.current,
      items: items,
      environment: environment,
      itemToString: itemToString
    }, state)); // Scroll on highlighted item if change comes from keyboard.

    var shouldScrollRef = useScrollIntoView({
      menuElement: menuRef.current,
      highlightedIndex: highlightedIndex,
      isOpen: isOpen,
      itemRefs: itemRefs,
      scrollIntoView: scrollIntoView,
      getItemNodeFromIndex: getItemNodeFromIndex
    });
    useControlPropsValidator({
      isInitialMount: isInitialMountRef.current,
      props: props,
      state: state
    }); // Focus the input on first render if required.

    preact.useEffect(function () {
      var focusOnOpen = initialIsOpen || defaultIsOpen || isOpen;

      if (focusOnOpen && inputRef.current) {
        inputRef.current.focus();
      } // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);
    preact.useEffect(function () {
      if (isInitialMountRef.current) {
        return;
      }

      previousResultCountRef.current = items.length;
    }); // Add mouse/touch events to document.

    var mouseAndTouchTrackersRef = useMouseAndTouchTracker(isOpen, [comboboxRef, menuRef, toggleButtonRef], environment, function () {
      dispatch({
        type: InputBlur,
        selectItem: false
      });
    });
    var setGetterPropCallInfo = useGetterPropsCalledChecker('getInputProps', 'getComboboxProps', 'getMenuProps'); // Make initial ref false.

    preact.useEffect(function () {
      isInitialMountRef.current = false;
    }, []); // Reset itemRefs on close.

    preact.useEffect(function () {
      if (!isOpen) {
        itemRefs.current = {};
      }
    }, [isOpen]);
    /* Event handler functions */

    var inputKeyDownHandlers = preact.useMemo(function () {
      return {
        ArrowDown: function ArrowDown(event) {
          event.preventDefault();
          dispatch({
            type: InputKeyDownArrowDown,
            shiftKey: event.shiftKey,
            getItemNodeFromIndex: getItemNodeFromIndex
          });
        },
        ArrowUp: function ArrowUp(event) {
          event.preventDefault();
          dispatch({
            type: InputKeyDownArrowUp,
            shiftKey: event.shiftKey,
            getItemNodeFromIndex: getItemNodeFromIndex
          });
        },
        Home: function Home(event) {
          if (!latest.current.state.isOpen) {
            return;
          }

          event.preventDefault();
          dispatch({
            type: InputKeyDownHome,
            getItemNodeFromIndex: getItemNodeFromIndex
          });
        },
        End: function End(event) {
          if (!latest.current.state.isOpen) {
            return;
          }

          event.preventDefault();
          dispatch({
            type: InputKeyDownEnd,
            getItemNodeFromIndex: getItemNodeFromIndex
          });
        },
        Escape: function Escape() {
          var latestState = latest.current.state;

          if (latestState.isOpen || latestState.inputValue || latestState.selectedItem || latestState.highlightedIndex > -1) {
            dispatch({
              type: InputKeyDownEscape
            });
          }
        },
        Enter: function Enter(event) {
          var latestState = latest.current.state; // if closed or no highlighted index, do nothing.

          if (!latestState.isOpen || latestState.highlightedIndex < 0 || event.which === 229 // if IME composing, wait for next Enter keydown event.
          ) {
            return;
          }

          event.preventDefault();
          dispatch({
            type: InputKeyDownEnter,
            getItemNodeFromIndex: getItemNodeFromIndex
          });
        }
      };
    }, [dispatch, latest, getItemNodeFromIndex]); // Getter props.

    var getLabelProps = preact.useCallback(function (labelProps) {
      return _extends({
        id: elementIds.labelId,
        htmlFor: elementIds.inputId
      }, labelProps);
    }, [elementIds]);
    var getMenuProps = preact.useCallback(function (_temp, _temp2) {
      var _extends2;

      var _ref = _temp === void 0 ? {} : _temp,
          onMouseLeave = _ref.onMouseLeave,
          _ref$refKey = _ref.refKey,
          refKey = _ref$refKey === void 0 ? 'ref' : _ref$refKey,
          ref = _ref.ref,
          rest = _objectWithoutPropertiesLoose(_ref, _excluded$1);

      var _ref2 = _temp2 === void 0 ? {} : _temp2,
          _ref2$suppressRefErro = _ref2.suppressRefError,
          suppressRefError = _ref2$suppressRefErro === void 0 ? false : _ref2$suppressRefErro;

      setGetterPropCallInfo('getMenuProps', suppressRefError, refKey, menuRef);
      return _extends((_extends2 = {}, _extends2[refKey] = handleRefs(ref, function (menuNode) {
        menuRef.current = menuNode;
      }), _extends2.id = elementIds.menuId, _extends2.role = 'listbox', _extends2['aria-labelledby'] = elementIds.labelId, _extends2.onMouseLeave = callAllEventHandlers(onMouseLeave, function () {
        dispatch({
          type: MenuMouseLeave
        });
      }), _extends2), rest);
    }, [dispatch, setGetterPropCallInfo, elementIds]);
    var getItemProps = preact.useCallback(function (_temp3) {
      var _extends3, _ref4;

      var _ref3 = _temp3 === void 0 ? {} : _temp3,
          item = _ref3.item,
          index = _ref3.index,
          _ref3$refKey = _ref3.refKey,
          refKey = _ref3$refKey === void 0 ? 'ref' : _ref3$refKey,
          ref = _ref3.ref,
          onMouseMove = _ref3.onMouseMove,
          onClick = _ref3.onClick;
          _ref3.onPress;
          var rest = _objectWithoutPropertiesLoose(_ref3, _excluded2$1);

      var _latest$current = latest.current,
          latestProps = _latest$current.props,
          latestState = _latest$current.state;
      var itemIndex = getItemIndex(index, item, latestProps.items);

      if (itemIndex < 0) {
        throw new Error('Pass either item or item index in getItemProps!');
      }

      var onSelectKey = 'onClick';
      var customClickHandler = onClick;

      var itemHandleMouseMove = function itemHandleMouseMove() {
        if (index === latestState.highlightedIndex) {
          return;
        }

        shouldScrollRef.current = false;
        dispatch({
          type: ItemMouseMove,
          index: index
        });
      };

      var itemHandleClick = function itemHandleClick() {
        dispatch({
          type: ItemClick,
          index: index
        });

        if (inputRef.current) {
          inputRef.current.focus();
        }
      };

      return _extends((_extends3 = {}, _extends3[refKey] = handleRefs(ref, function (itemNode) {
        if (itemNode) {
          itemRefs.current[elementIds.getItemId(itemIndex)] = itemNode;
        }
      }), _extends3.role = 'option', _extends3['aria-selected'] = "" + (itemIndex === latestState.highlightedIndex), _extends3.id = elementIds.getItemId(itemIndex), _extends3), !rest.disabled && (_ref4 = {
        onMouseMove: callAllEventHandlers(onMouseMove, itemHandleMouseMove)
      }, _ref4[onSelectKey] = callAllEventHandlers(customClickHandler, itemHandleClick), _ref4), rest);
    }, [dispatch, latest, shouldScrollRef, elementIds]);
    var getToggleButtonProps = preact.useCallback(function (_temp4) {
      var _extends4;

      var _ref5 = _temp4 === void 0 ? {} : _temp4,
          onClick = _ref5.onClick;
          _ref5.onPress;
          var _ref5$refKey = _ref5.refKey,
          refKey = _ref5$refKey === void 0 ? 'ref' : _ref5$refKey,
          ref = _ref5.ref,
          rest = _objectWithoutPropertiesLoose(_ref5, _excluded3);

      var toggleButtonHandleClick = function toggleButtonHandleClick() {
        dispatch({
          type: ToggleButtonClick
        });

        if (!latest.current.state.isOpen && inputRef.current) {
          inputRef.current.focus();
        }
      };

      return _extends((_extends4 = {}, _extends4[refKey] = handleRefs(ref, function (toggleButtonNode) {
        toggleButtonRef.current = toggleButtonNode;
      }), _extends4.id = elementIds.toggleButtonId, _extends4.tabIndex = -1, _extends4), !rest.disabled && _extends({}, {
        onClick: callAllEventHandlers(onClick, toggleButtonHandleClick)
      }), rest);
    }, [dispatch, latest, elementIds]);
    var getInputProps = preact.useCallback(function (_temp5, _temp6) {
      var _extends5;

      var _ref6 = _temp5 === void 0 ? {} : _temp5,
          onKeyDown = _ref6.onKeyDown,
          onChange = _ref6.onChange,
          onInput = _ref6.onInput,
          onBlur = _ref6.onBlur;
          _ref6.onChangeText;
          var _ref6$refKey = _ref6.refKey,
          refKey = _ref6$refKey === void 0 ? 'ref' : _ref6$refKey,
          ref = _ref6.ref,
          rest = _objectWithoutPropertiesLoose(_ref6, _excluded4);

      var _ref7 = _temp6 === void 0 ? {} : _temp6,
          _ref7$suppressRefErro = _ref7.suppressRefError,
          suppressRefError = _ref7$suppressRefErro === void 0 ? false : _ref7$suppressRefErro;

      setGetterPropCallInfo('getInputProps', suppressRefError, refKey, inputRef);
      var latestState = latest.current.state;

      var inputHandleKeyDown = function inputHandleKeyDown(event) {
        var key = normalizeArrowKey(event);

        if (key && inputKeyDownHandlers[key]) {
          inputKeyDownHandlers[key](event);
        }
      };

      var inputHandleChange = function inputHandleChange(event) {
        dispatch({
          type: InputChange,
          inputValue: event.target.value
        });
      };

      var inputHandleBlur = function inputHandleBlur() {
        /* istanbul ignore else */
        if (latestState.isOpen && !mouseAndTouchTrackersRef.current.isMouseDown) {
          dispatch({
            type: InputBlur,
            selectItem: true
          });
        }
      };
      /* istanbul ignore next (preact) */


      var onChangeKey = 'onInput' ;
      var eventHandlers = {};

      if (!rest.disabled) {
        var _eventHandlers;

        eventHandlers = (_eventHandlers = {}, _eventHandlers[onChangeKey] = callAllEventHandlers(onChange, onInput, inputHandleChange), _eventHandlers.onKeyDown = callAllEventHandlers(onKeyDown, inputHandleKeyDown), _eventHandlers.onBlur = callAllEventHandlers(onBlur, inputHandleBlur), _eventHandlers);
      }

      return _extends((_extends5 = {}, _extends5[refKey] = handleRefs(ref, function (inputNode) {
        inputRef.current = inputNode;
      }), _extends5.id = elementIds.inputId, _extends5['aria-autocomplete'] = 'list', _extends5['aria-controls'] = elementIds.menuId, _extends5), latestState.isOpen && latestState.highlightedIndex > -1 && {
        'aria-activedescendant': elementIds.getItemId(latestState.highlightedIndex)
      }, {
        'aria-labelledby': elementIds.labelId,
        // https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
        // revert back since autocomplete="nope" is ignored on latest Chrome and Opera
        autoComplete: 'off',
        value: latestState.inputValue
      }, eventHandlers, rest);
    }, [dispatch, inputKeyDownHandlers, latest, mouseAndTouchTrackersRef, setGetterPropCallInfo, elementIds]);
    var getComboboxProps = preact.useCallback(function (_temp7, _temp8) {
      var _extends6;

      var _ref8 = _temp7 === void 0 ? {} : _temp7,
          _ref8$refKey = _ref8.refKey,
          refKey = _ref8$refKey === void 0 ? 'ref' : _ref8$refKey,
          ref = _ref8.ref,
          rest = _objectWithoutPropertiesLoose(_ref8, _excluded5);

      var _ref9 = _temp8 === void 0 ? {} : _temp8,
          _ref9$suppressRefErro = _ref9.suppressRefError,
          suppressRefError = _ref9$suppressRefErro === void 0 ? false : _ref9$suppressRefErro;

      setGetterPropCallInfo('getComboboxProps', suppressRefError, refKey, comboboxRef);
      return _extends((_extends6 = {}, _extends6[refKey] = handleRefs(ref, function (comboboxNode) {
        comboboxRef.current = comboboxNode;
      }), _extends6.role = 'combobox', _extends6['aria-haspopup'] = 'listbox', _extends6['aria-owns'] = elementIds.menuId, _extends6['aria-expanded'] = latest.current.state.isOpen, _extends6), rest);
    }, [latest, setGetterPropCallInfo, elementIds]); // returns

    var toggleMenu = preact.useCallback(function () {
      dispatch({
        type: FunctionToggleMenu
      });
    }, [dispatch]);
    var closeMenu = preact.useCallback(function () {
      dispatch({
        type: FunctionCloseMenu
      });
    }, [dispatch]);
    var openMenu = preact.useCallback(function () {
      dispatch({
        type: FunctionOpenMenu
      });
    }, [dispatch]);
    var setHighlightedIndex = preact.useCallback(function (newHighlightedIndex) {
      dispatch({
        type: FunctionSetHighlightedIndex,
        highlightedIndex: newHighlightedIndex
      });
    }, [dispatch]);
    var selectItem = preact.useCallback(function (newSelectedItem) {
      dispatch({
        type: FunctionSelectItem,
        selectedItem: newSelectedItem
      });
    }, [dispatch]);
    var setInputValue = preact.useCallback(function (newInputValue) {
      dispatch({
        type: FunctionSetInputValue,
        inputValue: newInputValue
      });
    }, [dispatch]);
    var reset = preact.useCallback(function () {
      dispatch({
        type: FunctionReset$1
      });
    }, [dispatch]);
    return {
      // prop getters.
      getItemProps: getItemProps,
      getLabelProps: getLabelProps,
      getMenuProps: getMenuProps,
      getInputProps: getInputProps,
      getComboboxProps: getComboboxProps,
      getToggleButtonProps: getToggleButtonProps,
      // actions.
      toggleMenu: toggleMenu,
      openMenu: openMenu,
      closeMenu: closeMenu,
      setHighlightedIndex: setHighlightedIndex,
      setInputValue: setInputValue,
      selectItem: selectItem,
      reset: reset,
      // state.
      highlightedIndex: highlightedIndex,
      isOpen: isOpen,
      selectedItem: selectedItem,
      inputValue: inputValue
    };
  }

  var defaultStateValues = {
    activeIndex: -1,
    selectedItems: []
  };
  /**
   * Returns the initial value for a state key in the following order:
   * 1. controlled prop, 2. initial prop, 3. default prop, 4. default
   * value from Downshift.
   *
   * @param {Object} props Props passed to the hook.
   * @param {string} propKey Props key to generate the value for.
   * @returns {any} The initial value for that prop.
   */

  function getInitialValue(props, propKey) {
    return getInitialValue$1(props, propKey, defaultStateValues);
  }
  /**
   * Returns the default value for a state key in the following order:
   * 1. controlled prop, 2. default prop, 3. default value from Downshift.
   *
   * @param {Object} props Props passed to the hook.
   * @param {string} propKey Props key to generate the value for.
   * @returns {any} The initial value for that prop.
   */


  function getDefaultValue(props, propKey) {
    return getDefaultValue$1(props, propKey, defaultStateValues);
  }
  /**
   * Gets the initial state based on the provided props. It uses initial, default
   * and controlled props related to state in order to compute the initial value.
   *
   * @param {Object} props Props passed to the hook.
   * @returns {Object} The initial state.
   */


  function getInitialState(props) {
    var activeIndex = getInitialValue(props, 'activeIndex');
    var selectedItems = getInitialValue(props, 'selectedItems');
    return {
      activeIndex: activeIndex,
      selectedItems: selectedItems
    };
  }
  /**
   * Returns true if dropdown keydown operation is permitted. Should not be
   * allowed on keydown with modifier keys (ctrl, alt, shift, meta), on
   * input element with text content that is either highlighted or selection
   * cursor is not at the starting position.
   *
   * @param {KeyboardEvent} event The event from keydown.
   * @returns {boolean} Whether the operation is allowed.
   */


  function isKeyDownOperationPermitted(event) {
    if (event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
      return false;
    }

    var element = event.target;

    if (element instanceof HTMLInputElement && // if element is a text input
    element.value !== '' && (element.selectionStart !== 0 || element.selectionEnd !== 0)) {
      return false;
    }

    return true;
  }
  /**
   * Returns a message to be added to aria-live region when item is removed.
   *
   * @param {Object} selectionParameters Parameters required to build the message.
   * @returns {string} The a11y message.
   */


  function getA11yRemovalMessage(selectionParameters) {
    var removedSelectedItem = selectionParameters.removedSelectedItem,
        itemToStringLocal = selectionParameters.itemToString;
    return itemToStringLocal(removedSelectedItem) + " has been removed.";
  }

  var propTypes = {
    selectedItems: PropTypes__default['default'].array,
    initialSelectedItems: PropTypes__default['default'].array,
    defaultSelectedItems: PropTypes__default['default'].array,
    itemToString: PropTypes__default['default'].func,
    getA11yRemovalMessage: PropTypes__default['default'].func,
    stateReducer: PropTypes__default['default'].func,
    activeIndex: PropTypes__default['default'].number,
    initialActiveIndex: PropTypes__default['default'].number,
    defaultActiveIndex: PropTypes__default['default'].number,
    onActiveIndexChange: PropTypes__default['default'].func,
    onSelectedItemsChange: PropTypes__default['default'].func,
    keyNavigationNext: PropTypes__default['default'].string,
    keyNavigationPrevious: PropTypes__default['default'].string,
    environment: PropTypes__default['default'].shape({
      addEventListener: PropTypes__default['default'].func,
      removeEventListener: PropTypes__default['default'].func,
      document: PropTypes__default['default'].shape({
        getElementById: PropTypes__default['default'].func,
        activeElement: PropTypes__default['default'].any,
        body: PropTypes__default['default'].any
      })
    })
  };
  var defaultProps = {
    itemToString: defaultProps$3.itemToString,
    stateReducer: defaultProps$3.stateReducer,
    environment: defaultProps$3.environment,
    getA11yRemovalMessage: getA11yRemovalMessage,
    keyNavigationNext: 'ArrowRight',
    keyNavigationPrevious: 'ArrowLeft'
  }; // eslint-disable-next-line import/no-mutable-exports

  var validatePropTypes = noop;
  /* istanbul ignore next */

  {
    validatePropTypes = function validatePropTypes(options, caller) {
      PropTypes__default['default'].checkPropTypes(propTypes, options, 'prop', caller.name);
    };
  }

  var SelectedItemClick = '__selected_item_click__' ;
  var SelectedItemKeyDownDelete = '__selected_item_keydown_delete__' ;
  var SelectedItemKeyDownBackspace = '__selected_item_keydown_backspace__' ;
  var SelectedItemKeyDownNavigationNext = '__selected_item_keydown_navigation_next__' ;
  var SelectedItemKeyDownNavigationPrevious = '__selected_item_keydown_navigation_previous__' ;
  var DropdownKeyDownNavigationPrevious = '__dropdown_keydown_navigation_previous__' ;
  var DropdownKeyDownBackspace = '__dropdown_keydown_backspace__' ;
  var DropdownClick = '__dropdown_click__' ;
  var FunctionAddSelectedItem = '__function_add_selected_item__' ;
  var FunctionRemoveSelectedItem = '__function_remove_selected_item__' ;
  var FunctionSetSelectedItems = '__function_set_selected_items__' ;
  var FunctionSetActiveIndex = '__function_set_active_index__' ;
  var FunctionReset = '__function_reset__' ;

  var stateChangeTypes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SelectedItemClick: SelectedItemClick,
    SelectedItemKeyDownDelete: SelectedItemKeyDownDelete,
    SelectedItemKeyDownBackspace: SelectedItemKeyDownBackspace,
    SelectedItemKeyDownNavigationNext: SelectedItemKeyDownNavigationNext,
    SelectedItemKeyDownNavigationPrevious: SelectedItemKeyDownNavigationPrevious,
    DropdownKeyDownNavigationPrevious: DropdownKeyDownNavigationPrevious,
    DropdownKeyDownBackspace: DropdownKeyDownBackspace,
    DropdownClick: DropdownClick,
    FunctionAddSelectedItem: FunctionAddSelectedItem,
    FunctionRemoveSelectedItem: FunctionRemoveSelectedItem,
    FunctionSetSelectedItems: FunctionSetSelectedItems,
    FunctionSetActiveIndex: FunctionSetActiveIndex,
    FunctionReset: FunctionReset
  });

  /* eslint-disable complexity */

  function downshiftMultipleSelectionReducer(state, action) {
    var type = action.type,
        index = action.index,
        props = action.props,
        selectedItem = action.selectedItem;
    var activeIndex = state.activeIndex,
        selectedItems = state.selectedItems;
    var changes;

    switch (type) {
      case SelectedItemClick:
        changes = {
          activeIndex: index
        };
        break;

      case SelectedItemKeyDownNavigationPrevious:
        changes = {
          activeIndex: activeIndex - 1 < 0 ? 0 : activeIndex - 1
        };
        break;

      case SelectedItemKeyDownNavigationNext:
        changes = {
          activeIndex: activeIndex + 1 >= selectedItems.length ? -1 : activeIndex + 1
        };
        break;

      case SelectedItemKeyDownBackspace:
      case SelectedItemKeyDownDelete:
        {
          var newActiveIndex = activeIndex;

          if (selectedItems.length === 1) {
            newActiveIndex = -1;
          } else if (activeIndex === selectedItems.length - 1) {
            newActiveIndex = selectedItems.length - 2;
          }

          changes = _extends({
            selectedItems: [].concat(selectedItems.slice(0, activeIndex), selectedItems.slice(activeIndex + 1))
          }, {
            activeIndex: newActiveIndex
          });
          break;
        }

      case DropdownKeyDownNavigationPrevious:
        changes = {
          activeIndex: selectedItems.length - 1
        };
        break;

      case DropdownKeyDownBackspace:
        changes = {
          selectedItems: selectedItems.slice(0, selectedItems.length - 1)
        };
        break;

      case FunctionAddSelectedItem:
        changes = {
          selectedItems: [].concat(selectedItems, [selectedItem])
        };
        break;

      case DropdownClick:
        changes = {
          activeIndex: -1
        };
        break;

      case FunctionRemoveSelectedItem:
        {
          var _newActiveIndex = activeIndex;
          var selectedItemIndex = selectedItems.indexOf(selectedItem);

          if (selectedItems.length === 1) {
            _newActiveIndex = -1;
          } else if (selectedItemIndex === selectedItems.length - 1) {
            _newActiveIndex = selectedItems.length - 2;
          }

          changes = _extends({
            selectedItems: [].concat(selectedItems.slice(0, selectedItemIndex), selectedItems.slice(selectedItemIndex + 1))
          }, {
            activeIndex: _newActiveIndex
          });
          break;
        }

      case FunctionSetSelectedItems:
        {
          var newSelectedItems = action.selectedItems;
          changes = {
            selectedItems: newSelectedItems
          };
          break;
        }

      case FunctionSetActiveIndex:
        {
          var _newActiveIndex2 = action.activeIndex;
          changes = {
            activeIndex: _newActiveIndex2
          };
          break;
        }

      case FunctionReset:
        changes = {
          activeIndex: getDefaultValue(props, 'activeIndex'),
          selectedItems: getDefaultValue(props, 'selectedItems')
        };
        break;

      default:
        throw new Error('Reducer called without proper action type.');
    }

    return _extends({}, state, changes);
  }

  var _excluded = ["refKey", "ref", "onClick", "onKeyDown", "selectedItem", "index"],
      _excluded2 = ["refKey", "ref", "onKeyDown", "onClick", "preventKeyAction"];
  useMultipleSelection.stateChangeTypes = stateChangeTypes;

  function useMultipleSelection(userProps) {
    if (userProps === void 0) {
      userProps = {};
    }

    validatePropTypes(userProps, useMultipleSelection); // Props defaults and destructuring.

    var props = _extends({}, defaultProps, userProps);

    var getA11yRemovalMessage = props.getA11yRemovalMessage,
        itemToString = props.itemToString,
        environment = props.environment,
        keyNavigationNext = props.keyNavigationNext,
        keyNavigationPrevious = props.keyNavigationPrevious; // Reducer init.

    var _useControlledReducer = useControlledReducer$1(downshiftMultipleSelectionReducer, getInitialState(props), props),
        state = _useControlledReducer[0],
        dispatch = _useControlledReducer[1];

    var activeIndex = state.activeIndex,
        selectedItems = state.selectedItems; // Refs.

    var isInitialMountRef = preact.useRef(true);
    var dropdownRef = preact.useRef(null);
    var previousSelectedItemsRef = preact.useRef(selectedItems);
    var selectedItemRefs = preact.useRef();
    selectedItemRefs.current = [];
    var latest = useLatestRef({
      state: state,
      props: props
    }); // Effects.

    /* Sets a11y status message on changes in selectedItem. */

    preact.useEffect(function () {
      if (isInitialMountRef.current) {
        return;
      }

      if (selectedItems.length < previousSelectedItemsRef.current.length) {
        var removedSelectedItem = previousSelectedItemsRef.current.find(function (item) {
          return selectedItems.indexOf(item) < 0;
        });
        setStatus(getA11yRemovalMessage({
          itemToString: itemToString,
          resultCount: selectedItems.length,
          removedSelectedItem: removedSelectedItem,
          activeIndex: activeIndex,
          activeSelectedItem: selectedItems[activeIndex]
        }), environment.document);
      }

      previousSelectedItemsRef.current = selectedItems; // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItems.length]); // Sets focus on active item.

    preact.useEffect(function () {
      if (isInitialMountRef.current) {
        return;
      }

      if (activeIndex === -1 && dropdownRef.current) {
        dropdownRef.current.focus();
      } else if (selectedItemRefs.current[activeIndex]) {
        selectedItemRefs.current[activeIndex].focus();
      }
    }, [activeIndex]);
    useControlPropsValidator({
      isInitialMount: isInitialMountRef.current,
      props: props,
      state: state
    });
    var setGetterPropCallInfo = useGetterPropsCalledChecker('getDropdownProps'); // Make initial ref false.

    preact.useEffect(function () {
      isInitialMountRef.current = false;
    }, []); // Event handler functions.

    var selectedItemKeyDownHandlers = preact.useMemo(function () {
      var _ref;

      return _ref = {}, _ref[keyNavigationPrevious] = function () {
        dispatch({
          type: SelectedItemKeyDownNavigationPrevious
        });
      }, _ref[keyNavigationNext] = function () {
        dispatch({
          type: SelectedItemKeyDownNavigationNext
        });
      }, _ref.Delete = function Delete() {
        dispatch({
          type: SelectedItemKeyDownDelete
        });
      }, _ref.Backspace = function Backspace() {
        dispatch({
          type: SelectedItemKeyDownBackspace
        });
      }, _ref;
    }, [dispatch, keyNavigationNext, keyNavigationPrevious]);
    var dropdownKeyDownHandlers = preact.useMemo(function () {
      var _ref2;

      return _ref2 = {}, _ref2[keyNavigationPrevious] = function (event) {
        if (isKeyDownOperationPermitted(event)) {
          dispatch({
            type: DropdownKeyDownNavigationPrevious
          });
        }
      }, _ref2.Backspace = function Backspace(event) {
        if (isKeyDownOperationPermitted(event)) {
          dispatch({
            type: DropdownKeyDownBackspace
          });
        }
      }, _ref2;
    }, [dispatch, keyNavigationPrevious]); // Getter props.

    var getSelectedItemProps = preact.useCallback(function (_temp) {
      var _extends2;

      var _ref3 = _temp === void 0 ? {} : _temp,
          _ref3$refKey = _ref3.refKey,
          refKey = _ref3$refKey === void 0 ? 'ref' : _ref3$refKey,
          ref = _ref3.ref,
          onClick = _ref3.onClick,
          onKeyDown = _ref3.onKeyDown,
          selectedItem = _ref3.selectedItem,
          index = _ref3.index,
          rest = _objectWithoutPropertiesLoose(_ref3, _excluded);

      var latestState = latest.current.state;
      var itemIndex = getItemIndex(index, selectedItem, latestState.selectedItems);

      if (itemIndex < 0) {
        throw new Error('Pass either selectedItem or index in getSelectedItemProps!');
      }

      var selectedItemHandleClick = function selectedItemHandleClick() {
        dispatch({
          type: SelectedItemClick,
          index: index
        });
      };

      var selectedItemHandleKeyDown = function selectedItemHandleKeyDown(event) {
        var key = normalizeArrowKey(event);

        if (key && selectedItemKeyDownHandlers[key]) {
          selectedItemKeyDownHandlers[key](event);
        }
      };

      return _extends((_extends2 = {}, _extends2[refKey] = handleRefs(ref, function (selectedItemNode) {
        if (selectedItemNode) {
          selectedItemRefs.current.push(selectedItemNode);
        }
      }), _extends2.tabIndex = index === latestState.activeIndex ? 0 : -1, _extends2.onClick = callAllEventHandlers(onClick, selectedItemHandleClick), _extends2.onKeyDown = callAllEventHandlers(onKeyDown, selectedItemHandleKeyDown), _extends2), rest);
    }, [dispatch, latest, selectedItemKeyDownHandlers]);
    var getDropdownProps = preact.useCallback(function (_temp2, _temp3) {
      var _extends3;

      var _ref4 = _temp2 === void 0 ? {} : _temp2,
          _ref4$refKey = _ref4.refKey,
          refKey = _ref4$refKey === void 0 ? 'ref' : _ref4$refKey,
          ref = _ref4.ref,
          onKeyDown = _ref4.onKeyDown,
          onClick = _ref4.onClick,
          _ref4$preventKeyActio = _ref4.preventKeyAction,
          preventKeyAction = _ref4$preventKeyActio === void 0 ? false : _ref4$preventKeyActio,
          rest = _objectWithoutPropertiesLoose(_ref4, _excluded2);

      var _ref5 = _temp3 === void 0 ? {} : _temp3,
          _ref5$suppressRefErro = _ref5.suppressRefError,
          suppressRefError = _ref5$suppressRefErro === void 0 ? false : _ref5$suppressRefErro;

      setGetterPropCallInfo('getDropdownProps', suppressRefError, refKey, dropdownRef);

      var dropdownHandleKeyDown = function dropdownHandleKeyDown(event) {
        var key = normalizeArrowKey(event);

        if (key && dropdownKeyDownHandlers[key]) {
          dropdownKeyDownHandlers[key](event);
        }
      };

      var dropdownHandleClick = function dropdownHandleClick() {
        dispatch({
          type: DropdownClick
        });
      };

      return _extends((_extends3 = {}, _extends3[refKey] = handleRefs(ref, function (dropdownNode) {
        if (dropdownNode) {
          dropdownRef.current = dropdownNode;
        }
      }), _extends3), !preventKeyAction && {
        onKeyDown: callAllEventHandlers(onKeyDown, dropdownHandleKeyDown),
        onClick: callAllEventHandlers(onClick, dropdownHandleClick)
      }, rest);
    }, [dispatch, dropdownKeyDownHandlers, setGetterPropCallInfo]); // returns

    var addSelectedItem = preact.useCallback(function (selectedItem) {
      dispatch({
        type: FunctionAddSelectedItem,
        selectedItem: selectedItem
      });
    }, [dispatch]);
    var removeSelectedItem = preact.useCallback(function (selectedItem) {
      dispatch({
        type: FunctionRemoveSelectedItem,
        selectedItem: selectedItem
      });
    }, [dispatch]);
    var setSelectedItems = preact.useCallback(function (newSelectedItems) {
      dispatch({
        type: FunctionSetSelectedItems,
        selectedItems: newSelectedItems
      });
    }, [dispatch]);
    var setActiveIndex = preact.useCallback(function (newActiveIndex) {
      dispatch({
        type: FunctionSetActiveIndex,
        activeIndex: newActiveIndex
      });
    }, [dispatch]);
    var reset = preact.useCallback(function () {
      dispatch({
        type: FunctionReset
      });
    }, [dispatch]);
    return {
      getSelectedItemProps: getSelectedItemProps,
      getDropdownProps: getDropdownProps,
      addSelectedItem: addSelectedItem,
      removeSelectedItem: removeSelectedItem,
      setSelectedItems: setSelectedItems,
      setActiveIndex: setActiveIndex,
      reset: reset,
      selectedItems: selectedItems,
      activeIndex: activeIndex
    };
  }

  exports['default'] = Downshift$1;
  exports.resetIdCounter = resetIdCounter;
  exports.useCombobox = useCombobox;
  exports.useMultipleSelection = useMultipleSelection;
  exports.useSelect = useSelect;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=downshift.umd.js.map
