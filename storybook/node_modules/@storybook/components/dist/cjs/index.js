"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  resetComponents: true,
  components: true,
  Badge: true,
  Link: true,
  DocumentWrapper: true,
  SyntaxHighlighter: true,
  ActionBar: true,
  Spaced: true,
  Placeholder: true,
  ScrollArea: true,
  Zoom: true,
  Button: true,
  Form: true,
  WithTooltip: true,
  WithTooltipPure: true,
  TooltipMessage: true,
  TooltipNote: true,
  TooltipLinkList: true,
  Tabs: true,
  TabsState: true,
  TabBar: true,
  TabWrapper: true,
  IconButton: true,
  TabButton: true,
  Separator: true,
  interleaveSeparators: true,
  Bar: true,
  FlexBar: true,
  AddonPanel: true,
  Icons: true,
  Symbols: true,
  StorybookLogo: true,
  StorybookIcon: true,
  Loader: true
};
Object.defineProperty(exports, "components", {
  enumerable: true,
  get: function get() {
    return _DocumentFormatting.components;
  }
});
Object.defineProperty(exports, "Badge", {
  enumerable: true,
  get: function get() {
    return _Badge.Badge;
  }
});
Object.defineProperty(exports, "Link", {
  enumerable: true,
  get: function get() {
    return _link.Link;
  }
});
Object.defineProperty(exports, "DocumentWrapper", {
  enumerable: true,
  get: function get() {
    return _DocumentWrapper.DocumentWrapper;
  }
});
Object.defineProperty(exports, "SyntaxHighlighter", {
  enumerable: true,
  get: function get() {
    return _lazySyntaxhighlighter.SyntaxHighlighter;
  }
});
Object.defineProperty(exports, "ActionBar", {
  enumerable: true,
  get: function get() {
    return _ActionBar.ActionBar;
  }
});
Object.defineProperty(exports, "Spaced", {
  enumerable: true,
  get: function get() {
    return _Spaced.Spaced;
  }
});
Object.defineProperty(exports, "Placeholder", {
  enumerable: true,
  get: function get() {
    return _placeholder.Placeholder;
  }
});
Object.defineProperty(exports, "ScrollArea", {
  enumerable: true,
  get: function get() {
    return _ScrollArea.ScrollArea;
  }
});
Object.defineProperty(exports, "Zoom", {
  enumerable: true,
  get: function get() {
    return _Zoom.Zoom;
  }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function get() {
    return _Button.Button;
  }
});
Object.defineProperty(exports, "Form", {
  enumerable: true,
  get: function get() {
    return _index.Form;
  }
});
Object.defineProperty(exports, "WithTooltip", {
  enumerable: true,
  get: function get() {
    return _lazyWithTooltip.WithTooltip;
  }
});
Object.defineProperty(exports, "WithTooltipPure", {
  enumerable: true,
  get: function get() {
    return _lazyWithTooltip.WithTooltipPure;
  }
});
Object.defineProperty(exports, "TooltipMessage", {
  enumerable: true,
  get: function get() {
    return _TooltipMessage.TooltipMessage;
  }
});
Object.defineProperty(exports, "TooltipNote", {
  enumerable: true,
  get: function get() {
    return _TooltipNote.TooltipNote;
  }
});
Object.defineProperty(exports, "TooltipLinkList", {
  enumerable: true,
  get: function get() {
    return _TooltipLinkList.TooltipLinkList;
  }
});
Object.defineProperty(exports, "Tabs", {
  enumerable: true,
  get: function get() {
    return _tabs.Tabs;
  }
});
Object.defineProperty(exports, "TabsState", {
  enumerable: true,
  get: function get() {
    return _tabs.TabsState;
  }
});
Object.defineProperty(exports, "TabBar", {
  enumerable: true,
  get: function get() {
    return _tabs.TabBar;
  }
});
Object.defineProperty(exports, "TabWrapper", {
  enumerable: true,
  get: function get() {
    return _tabs.TabWrapper;
  }
});
Object.defineProperty(exports, "IconButton", {
  enumerable: true,
  get: function get() {
    return _button.IconButton;
  }
});
Object.defineProperty(exports, "TabButton", {
  enumerable: true,
  get: function get() {
    return _button.TabButton;
  }
});
Object.defineProperty(exports, "Separator", {
  enumerable: true,
  get: function get() {
    return _separator.Separator;
  }
});
Object.defineProperty(exports, "interleaveSeparators", {
  enumerable: true,
  get: function get() {
    return _separator.interleaveSeparators;
  }
});
Object.defineProperty(exports, "Bar", {
  enumerable: true,
  get: function get() {
    return _bar.Bar;
  }
});
Object.defineProperty(exports, "FlexBar", {
  enumerable: true,
  get: function get() {
    return _bar.FlexBar;
  }
});
Object.defineProperty(exports, "AddonPanel", {
  enumerable: true,
  get: function get() {
    return _addonPanel.AddonPanel;
  }
});
Object.defineProperty(exports, "Icons", {
  enumerable: true,
  get: function get() {
    return _icon.Icons;
  }
});
Object.defineProperty(exports, "Symbols", {
  enumerable: true,
  get: function get() {
    return _icon.Symbols;
  }
});
Object.defineProperty(exports, "StorybookLogo", {
  enumerable: true,
  get: function get() {
    return _StorybookLogo.StorybookLogo;
  }
});
Object.defineProperty(exports, "StorybookIcon", {
  enumerable: true,
  get: function get() {
    return _StorybookIcon.StorybookIcon;
  }
});
Object.defineProperty(exports, "Loader", {
  enumerable: true,
  get: function get() {
    return _Loader.Loader;
  }
});
exports.resetComponents = void 0;

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.object.assign.js");

var _react = require("react");

var _DocumentFormatting = require("./typography/DocumentFormatting");

Object.keys(_DocumentFormatting).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _DocumentFormatting[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DocumentFormatting[key];
    }
  });
});

var _Badge = require("./Badge/Badge");

var _link = require("./typography/link/link");

var _DocumentWrapper = require("./typography/DocumentWrapper");

var _lazySyntaxhighlighter = require("./syntaxhighlighter/lazy-syntaxhighlighter");

var _ActionBar = require("./ActionBar/ActionBar");

var _Spaced = require("./spaced/Spaced");

var _placeholder = require("./placeholder/placeholder");

var _ScrollArea = require("./ScrollArea/ScrollArea");

var _Zoom = require("./Zoom/Zoom");

var _Button = require("./Button/Button");

var _index = require("./form/index");

var _lazyWithTooltip = require("./tooltip/lazy-WithTooltip");

var _TooltipMessage = require("./tooltip/TooltipMessage");

var _TooltipNote = require("./tooltip/TooltipNote");

var _TooltipLinkList = require("./tooltip/TooltipLinkList");

var _tabs = require("./tabs/tabs");

var _button = require("./bar/button");

var _separator = require("./bar/separator");

var _bar = require("./bar/bar");

var _addonPanel = require("./addon-panel/addon-panel");

var _icon = require("./icon/icon");

var _StorybookLogo = require("./brand/StorybookLogo");

var _StorybookIcon = require("./brand/StorybookIcon");

var _blocks = require("./blocks");

Object.keys(_blocks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _blocks[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _blocks[key];
    }
  });
});

var _controls = require("./controls");

Object.keys(_controls).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _controls[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _controls[key];
    }
  });
});

var _Loader = require("./Loader/Loader");

// Typography
// UI
// Forms
// Tooltips
// Toolbar and subcomponents
// Doc blocks
// Loader
var resetComponents = {};
exports.resetComponents = resetComponents;
Object.keys(_DocumentFormatting.components).forEach(function (key) {
  resetComponents[key] = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/(0, _react.createElement)(key, Object.assign({}, props, {
      ref: ref
    }));
  });
});