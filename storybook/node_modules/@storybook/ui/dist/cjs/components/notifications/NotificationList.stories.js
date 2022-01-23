"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Placement = exports.All = exports.Single = exports.allData = exports.singleData = exports.default = void 0;

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.regexp.exec.js");

var _react = _interopRequireDefault(require("react"));

var _router = require("@storybook/router");

var _NotificationList = _interopRequireDefault(require("./NotificationList"));

var itemStories = _interopRequireWildcard(require("./NotificationItem.stories"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _NotificationList.default,
  title: 'UI/Notifications/NotificationList',
  decorators: [function (StoryFn) {
    return /*#__PURE__*/_react.default.createElement(_router.LocationProvider, null, /*#__PURE__*/_react.default.createElement(StoryFn, null));
  }, function (storyFn) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        width: '240px',
        margin: '1rem',
        position: 'relative',
        height: '100%'
      }
    }, storyFn());
  }],
  excludeStories: /.*Data$/
};
exports.default = _default;
var items = Array.from(Object.entries(itemStories)).filter(function (entry) {
  return itemStories.default.excludeStories.exec(entry[0]);
}).map(function (entry) {
  return entry[1];
});
var singleData = [items[0]];
exports.singleData = singleData;
var allData = items;
exports.allData = allData;

function clearNotification(id) {}

var Single = function Single() {
  return /*#__PURE__*/_react.default.createElement(_NotificationList.default, {
    notifications: singleData,
    clearNotification: clearNotification,
    placement: {
      position: 'relative'
    }
  });
};

exports.Single = Single;
Single.displayName = "Single";

var All = function All() {
  return /*#__PURE__*/_react.default.createElement(_NotificationList.default, {
    notifications: allData,
    clearNotification: clearNotification,
    placement: {
      position: 'relative'
    }
  });
};

exports.All = All;
All.displayName = "All";

var Placement = function Placement() {
  return (
    /*#__PURE__*/
    // Note: position:absolute is only for QA/testing. Use position:fixed when integrating into the real UI.
    _react.default.createElement(_NotificationList.default, {
      placement: {
        position: 'absolute',
        left: 20,
        bottom: 20
      },
      clearNotification: clearNotification,
      notifications: allData
    })
  );
};

exports.Placement = Placement;
Placement.displayName = "Placement";