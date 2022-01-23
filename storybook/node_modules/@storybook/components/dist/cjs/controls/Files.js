"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilesControl = void 0;

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.string.starts-with.js");

require("core-js/modules/web.url.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.from.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _form = require("../form");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileInput = (0, _theming.styled)(_form.Form.Input)({
  padding: 10
});

function revokeOldUrls(urls) {
  urls.forEach(function (url) {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  });
}

var FilesControl = function FilesControl(_ref) {
  var onChange = _ref.onChange,
      name = _ref.name,
      _ref$accept = _ref.accept,
      accept = _ref$accept === void 0 ? 'image/*' : _ref$accept,
      value = _ref.value;

  function handleFileChange(e) {
    if (!e.target.files) {
      return;
    }

    var fileUrls = Array.from(e.target.files).map(function (file) {
      return URL.createObjectURL(file);
    });
    onChange(fileUrls);
    revokeOldUrls(value);
  }

  return /*#__PURE__*/_react.default.createElement(FileInput, {
    id: (0, _helpers.getControlId)(name),
    type: "file",
    name: name,
    multiple: true,
    onChange: handleFileChange,
    accept: accept,
    size: "flex"
  });
};

exports.FilesControl = FilesControl;
FilesControl.displayName = "FilesControl";