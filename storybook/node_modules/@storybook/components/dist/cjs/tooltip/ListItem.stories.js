"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _ListItem = _interopRequireDefault(require("./ListItem"));

var _icon = require("../icon/icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)('basics/Tooltip/ListItem', module).add('all', function () {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    loading: true
  }), /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    title: "Default"
  }), /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    title: "Default icon",
    right: /*#__PURE__*/_react.default.createElement(_icon.Icons, {
      icon: "eye"
    })
  }), /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    left: "left",
    title: "title",
    center: "center",
    right: "right"
  }), /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    active: true,
    left: "left",
    title: "active",
    center: "center",
    right: "right"
  }), /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    active: true,
    left: "left",
    title: "active icon",
    center: "center",
    right: /*#__PURE__*/_react.default.createElement(_icon.Icons, {
      icon: "eye"
    })
  }), /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    disabled: true,
    left: "left",
    title: "disabled",
    center: "center",
    right: "right"
  }));
}).add('loading', function () {
  return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    loading: true
  });
}).add('default', function () {
  return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    title: "Default"
  });
}).add('default icon', function () {
  return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    title: "Default icon",
    right: /*#__PURE__*/_react.default.createElement(_icon.Icons, {
      icon: "eye"
    })
  });
}).add('active icon', function () {
  return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    active: true,
    title: "active icon",
    right: /*#__PURE__*/_react.default.createElement(_icon.Icons, {
      icon: "eye"
    })
  });
}).add('w/positions', function () {
  return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    left: "left",
    title: "title",
    center: "center",
    right: "right"
  });
}).add('w/positions active', function () {
  return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    active: true,
    left: "left",
    title: "active",
    center: "center",
    right: "right"
  });
}).add('disabled', function () {
  return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    disabled: true,
    left: "left",
    title: "disabled",
    center: "center",
    right: "right"
  });
});