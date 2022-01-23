"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilteredAddons = exports.AllAddons = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: 'UI/Addon Panel'
};
exports.default = _default;

var AllAddons = function AllAddons() {
  return /*#__PURE__*/_react.default.createElement("div", null, "By default all addon panels are rendered");
};

exports.AllAddons = AllAddons;
AllAddons.displayName = "AllAddons";

var FilteredAddons = function FilteredAddons() {
  return /*#__PURE__*/_react.default.createElement("div", null, "By default all addon panels are rendered");
};

exports.FilteredAddons = FilteredAddons;
FilteredAddons.displayName = "FilteredAddons";
FilteredAddons.parameters = {
  a11y: {
    disable: true
  },
  actions: {
    disable: true
  }
};