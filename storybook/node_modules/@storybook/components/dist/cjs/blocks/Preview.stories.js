"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
exports.WithAdditionalActions = exports.WithCenteredMulti = exports.WithCenteredSingle = exports.WithFullscreenMulti = exports.WithFullscreenSingle = exports.WithToolbarMulti = exports.Wide = exports.WithToolbar = exports.GridWith3Columns = exports.Column = exports.Row = exports.Single = exports.CodeError = exports.CodeExpanded = exports.CodeCollapsed = exports.Loading = exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _global = _interopRequireDefault(require("global"));

var _Spaced = require("../spaced/Spaced");

var _Preview = require("./Preview");

var _Story = require("./Story");

var _Button = require("../Button/Button");

var Source = _interopRequireWildcard(require("./Source.stories"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var globalWindow = _global.default.window;
var _default = {
  title: 'Docs/Preview',
  component: _Preview.Preview
};
exports.default = _default;

var Loading = function Loading() {
  return /*#__PURE__*/_react.default.createElement(_Preview.PreviewSkeleton, null);
};

exports.Loading = Loading;
Loading.displayName = "Loading";

var CodeCollapsed = function CodeCollapsed() {
  return /*#__PURE__*/_react.default.createElement(_Preview.Preview, {
    isExpanded: false,
    withSource: Source.JSX.args
  }, /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 1"));
};

exports.CodeCollapsed = CodeCollapsed;
CodeCollapsed.displayName = "CodeCollapsed";

var CodeExpanded = function CodeExpanded() {
  return /*#__PURE__*/_react.default.createElement(_Preview.Preview, {
    isExpanded: true,
    withSource: Source.JSX.args
  }, /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 1"));
};

exports.CodeExpanded = CodeExpanded;
CodeExpanded.displayName = "CodeExpanded";

var CodeError = function CodeError() {
  return /*#__PURE__*/_react.default.createElement(_Preview.Preview, {
    isExpanded: true,
    withSource: Source.SourceUnavailable.args
  }, /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 1"));
};

exports.CodeError = CodeError;
CodeError.displayName = "CodeError";

var Single = function Single() {
  return /*#__PURE__*/_react.default.createElement(_Preview.Preview, null, /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 1"));
};

exports.Single = Single;
Single.displayName = "Single";

var Row = function Row() {
  return /*#__PURE__*/_react.default.createElement(_Preview.Preview, null, /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 1"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 2"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 3"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 4"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 5"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 6"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 7"));
};

exports.Row = Row;
Row.displayName = "Row";

var Column = function Column() {
  return /*#__PURE__*/_react.default.createElement(_Preview.Preview, {
    isColumn: true
  }, /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 1"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 2"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 3"));
};

exports.Column = Column;
Column.displayName = "Column";

var GridWith3Columns = function GridWith3Columns() {
  return /*#__PURE__*/_react.default.createElement(_Preview.Preview, {
    columns: 3
  }, /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 1"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 2"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 3"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 4"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 5"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 6"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 7 long long long long long title"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 8"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 9"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 10"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 11"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 12"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 13"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 14"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 15"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 16"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 17"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 18"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 19"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 20"));
};

exports.GridWith3Columns = GridWith3Columns;
GridWith3Columns.displayName = "GridWith3Columns";

var buttonFn = function buttonFn() {
  return /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Hello Button");
};

buttonFn.displayName = "buttonFn";

var WithToolbar = function WithToolbar() {
  return /*#__PURE__*/_react.default.createElement(_Preview.Preview, {
    withToolbar: true
  }, /*#__PURE__*/_react.default.createElement(_Story.Story, {
    inline: true,
    storyFn: buttonFn,
    title: "with toolbar"
  }));
};

exports.WithToolbar = WithToolbar;
WithToolbar.displayName = "WithToolbar";
var Horizontal = (0, _theming.styled)(function (props) {
  return /*#__PURE__*/_react.default.createElement(_Spaced.Spaced, _extends({
    col: 1
  }, props));
})({
  display: 'grid',
  gridTemplateColumns: '100px calc(100vw + 100px) 100px'
});

var Wide = function Wide() {
  return /*#__PURE__*/_react.default.createElement(_Preview.Preview, {
    withToolbar: true
  }, /*#__PURE__*/_react.default.createElement(Horizontal, null, /*#__PURE__*/_react.default.createElement("div", null, "START"), /*#__PURE__*/_react.default.createElement("div", null, "middle"), /*#__PURE__*/_react.default.createElement("div", null, "END")));
};

exports.Wide = Wide;
Wide.displayName = "Wide";

var WithToolbarMulti = function WithToolbarMulti() {
  return /*#__PURE__*/_react.default.createElement(_Preview.Preview, {
    withToolbar: true
  }, /*#__PURE__*/_react.default.createElement(_Story.Story, {
    inline: true,
    storyFn: buttonFn,
    title: "story1"
  }), /*#__PURE__*/_react.default.createElement(_Story.Story, {
    inline: true,
    storyFn: buttonFn,
    title: "story2"
  }));
};

exports.WithToolbarMulti = WithToolbarMulti;
WithToolbarMulti.displayName = "WithToolbarMulti";

var WithFullscreenSingle = function WithFullscreenSingle() {
  return /*#__PURE__*/_react.default.createElement(_Preview.Preview, {
    withToolbar: true
  }, /*#__PURE__*/_react.default.createElement(_Story.Story, {
    inline: true,
    storyFn: buttonFn,
    title: "story1",
    parameters: {
      layout: 'fullscreen'
    }
  }));
};

exports.WithFullscreenSingle = WithFullscreenSingle;
WithFullscreenSingle.displayName = "WithFullscreenSingle";

var WithFullscreenMulti = function WithFullscreenMulti() {
  return /*#__PURE__*/_react.default.createElement(_Preview.Preview, {
    withToolbar: true
  }, /*#__PURE__*/_react.default.createElement(_Story.Story, {
    inline: true,
    storyFn: buttonFn,
    title: "story1",
    parameters: {
      layout: 'fullscreen'
    }
  }), /*#__PURE__*/_react.default.createElement(_Story.Story, {
    inline: true,
    storyFn: buttonFn,
    title: "story2",
    parameters: {
      layout: 'fullscreen'
    }
  }));
};

exports.WithFullscreenMulti = WithFullscreenMulti;
WithFullscreenMulti.displayName = "WithFullscreenMulti";

var WithCenteredSingle = function WithCenteredSingle() {
  return /*#__PURE__*/_react.default.createElement(_Preview.Preview, {
    withToolbar: true
  }, /*#__PURE__*/_react.default.createElement(_Story.Story, {
    inline: true,
    storyFn: buttonFn,
    title: "story1",
    parameters: {
      layout: 'centered'
    }
  }));
};

exports.WithCenteredSingle = WithCenteredSingle;
WithCenteredSingle.displayName = "WithCenteredSingle";

var WithCenteredMulti = function WithCenteredMulti() {
  return /*#__PURE__*/_react.default.createElement(_Preview.Preview, {
    withToolbar: true
  }, /*#__PURE__*/_react.default.createElement(_Story.Story, {
    inline: true,
    storyFn: buttonFn,
    title: "story1",
    parameters: {
      layout: 'centered'
    }
  }), /*#__PURE__*/_react.default.createElement(_Story.Story, {
    inline: true,
    storyFn: buttonFn,
    title: "story2",
    parameters: {
      layout: 'centered'
    }
  }));
};

exports.WithCenteredMulti = WithCenteredMulti;
WithCenteredMulti.displayName = "WithCenteredMulti";

var WithAdditionalActions = function WithAdditionalActions() {
  return /*#__PURE__*/_react.default.createElement(_Preview.Preview, {
    additionalActions: [{
      title: 'Open on GitHub',
      onClick: function onClick() {
        globalWindow.location.href = 'https://github.com/storybookjs/storybook/blob/next/lib/components/src/blocks/Preview.stories.tsx#L140-L147';
      }
    }]
  }, /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Button 1"));
};

exports.WithAdditionalActions = WithAdditionalActions;
WithAdditionalActions.displayName = "WithAdditionalActions";