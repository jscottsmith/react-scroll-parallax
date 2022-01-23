"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToCanvasLinkFocused = exports.NoBrand = exports.CustomBrandImageUnsizedSVG = exports.CustomBrandImageTall = exports.CustomBrandImage = exports.LongText = exports.OnlyText = exports.LinkAndText = exports.StandardNoLink = exports.Standard = exports.standardData = exports.MenuHighlighted = exports.default = void 0;

require("core-js/modules/es.object.assign.js");

require("core-js/modules/web.dom-collections.for-each.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _addonActions = require("@storybook/addon-actions");

var _dom = require("@testing-library/dom");

var _Heading = require("./Heading");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable storybook/use-storybook-testing-library */
// @TODO: use addon-interactions and remove the rule disable above
var _default = {
  component: _Heading.Heading,
  title: 'UI/Sidebar/Heading',
  excludeStories: /.*Data$/,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [function (storyFn) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        padding: '0 20px',
        maxWidth: '230px'
      }
    }, storyFn());
  }]
};
exports.default = _default;
var menuItems = [{
  title: 'Menu Item 1',
  onClick: (0, _addonActions.action)('onActivateMenuItem'),
  id: '1'
}, {
  title: 'Menu Item 2',
  onClick: (0, _addonActions.action)('onActivateMenuItem'),
  id: '2'
}, {
  title: 'Menu Item 3',
  onClick: (0, _addonActions.action)('onActivateMenuItem'),
  id: '3'
}];

var MenuHighlighted = function MenuHighlighted() {
  return /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menuHighlighted: true,
    menu: menuItems
  });
};

exports.MenuHighlighted = MenuHighlighted;
MenuHighlighted.displayName = "MenuHighlighted";
var standardData = {
  menu: menuItems
};
exports.standardData = standardData;

var Standard = function Standard() {
  var theme = (0, _theming.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: undefined,
        url: undefined,
        image: undefined
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menu: menuItems
  }));
};

exports.Standard = Standard;
Standard.displayName = "Standard";

var StandardNoLink = function StandardNoLink() {
  var theme = (0, _theming.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: undefined,
        url: null,
        image: undefined
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menu: menuItems
  }));
};

exports.StandardNoLink = StandardNoLink;
StandardNoLink.displayName = "StandardNoLink";

var LinkAndText = function LinkAndText() {
  var theme = (0, _theming.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My title',
        url: 'https://example.com',
        image: null
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menu: menuItems
  }));
};

exports.LinkAndText = LinkAndText;
LinkAndText.displayName = "LinkAndText";

var OnlyText = function OnlyText() {
  var theme = (0, _theming.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My title',
        url: null,
        image: null
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menu: menuItems
  }));
};

exports.OnlyText = OnlyText;
OnlyText.displayName = "OnlyText";

var LongText = function LongText() {
  var theme = (0, _theming.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My title is way to long to actually fit',
        url: null,
        image: null
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menu: menuItems
  }));
};

exports.LongText = LongText;
LongText.displayName = "LongText";

var CustomBrandImage = function CustomBrandImage() {
  var theme = (0, _theming.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My Title',
        url: 'https://example.com',
        image: 'https://via.placeholder.com/150x22'
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menu: menuItems
  }));
};

exports.CustomBrandImage = CustomBrandImage;
CustomBrandImage.displayName = "CustomBrandImage";

var CustomBrandImageTall = function CustomBrandImageTall() {
  var theme = (0, _theming.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My Title',
        url: 'https://example.com',
        image: 'https://via.placeholder.com/100x150'
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menu: menuItems
  }));
};

exports.CustomBrandImageTall = CustomBrandImageTall;
CustomBrandImageTall.displayName = "CustomBrandImageTall";

var CustomBrandImageUnsizedSVG = function CustomBrandImageUnsizedSVG() {
  var theme = (0, _theming.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My Title',
        url: 'https://example.com',
        image: 'https://s.cdpn.io/91525/potofgold.svg'
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menu: menuItems
  }));
};

exports.CustomBrandImageUnsizedSVG = CustomBrandImageUnsizedSVG;
CustomBrandImageUnsizedSVG.displayName = "CustomBrandImageUnsizedSVG";

var NoBrand = function NoBrand() {
  var theme = (0, _theming.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: null,
        url: null,
        image: null
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    menu: menuItems
  }));
};

exports.NoBrand = NoBrand;
NoBrand.displayName = "NoBrand";
var SkipToCanvasLinkFocused = {
  args: {
    menu: menuItems,
    skipLinkHref: '#storybook-preview-wrapper'
  },
  parameters: {
    layout: 'padded',
    chromatic: {
      delay: 300
    }
  },
  play: function play() {
    // focus each instance for chromatic/storybook's stacked theme
    _dom.screen.getAllByText('Skip to canvas').forEach(function (x) {
      return x.focus();
    });
  }
};
exports.SkipToCanvasLinkFocused = SkipToCanvasLinkFocused;