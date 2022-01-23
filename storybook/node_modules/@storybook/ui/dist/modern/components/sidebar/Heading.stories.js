/* eslint-disable storybook/use-storybook-testing-library */
// @TODO: use addon-interactions and remove the rule disable above
import React from 'react';
import { ThemeProvider, useTheme } from '@storybook/theming';
import { action } from '@storybook/addon-actions';
import { screen } from '@testing-library/dom';
import { Heading } from './Heading';
export default {
  component: Heading,
  title: 'UI/Sidebar/Heading',
  excludeStories: /.*Data$/,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [storyFn => /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px',
      maxWidth: '230px'
    }
  }, storyFn())]
};
const menuItems = [{
  title: 'Menu Item 1',
  onClick: action('onActivateMenuItem'),
  id: '1'
}, {
  title: 'Menu Item 2',
  onClick: action('onActivateMenuItem'),
  id: '2'
}, {
  title: 'Menu Item 3',
  onClick: action('onActivateMenuItem'),
  id: '3'
}];
export const MenuHighlighted = () => /*#__PURE__*/React.createElement(Heading, {
  menuHighlighted: true,
  menu: menuItems
});
MenuHighlighted.displayName = "MenuHighlighted";
export const standardData = {
  menu: menuItems
};
export const Standard = () => {
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: undefined,
        url: undefined,
        image: undefined
      }
    })
  }, /*#__PURE__*/React.createElement(Heading, {
    menu: menuItems
  }));
};
Standard.displayName = "Standard";
export const StandardNoLink = () => {
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: undefined,
        url: null,
        image: undefined
      }
    })
  }, /*#__PURE__*/React.createElement(Heading, {
    menu: menuItems
  }));
};
StandardNoLink.displayName = "StandardNoLink";
export const LinkAndText = () => {
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My title',
        url: 'https://example.com',
        image: null
      }
    })
  }, /*#__PURE__*/React.createElement(Heading, {
    menu: menuItems
  }));
};
LinkAndText.displayName = "LinkAndText";
export const OnlyText = () => {
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My title',
        url: null,
        image: null
      }
    })
  }, /*#__PURE__*/React.createElement(Heading, {
    menu: menuItems
  }));
};
OnlyText.displayName = "OnlyText";
export const LongText = () => {
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My title is way to long to actually fit',
        url: null,
        image: null
      }
    })
  }, /*#__PURE__*/React.createElement(Heading, {
    menu: menuItems
  }));
};
LongText.displayName = "LongText";
export const CustomBrandImage = () => {
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My Title',
        url: 'https://example.com',
        image: 'https://via.placeholder.com/150x22'
      }
    })
  }, /*#__PURE__*/React.createElement(Heading, {
    menu: menuItems
  }));
};
CustomBrandImage.displayName = "CustomBrandImage";
export const CustomBrandImageTall = () => {
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My Title',
        url: 'https://example.com',
        image: 'https://via.placeholder.com/100x150'
      }
    })
  }, /*#__PURE__*/React.createElement(Heading, {
    menu: menuItems
  }));
};
CustomBrandImageTall.displayName = "CustomBrandImageTall";
export const CustomBrandImageUnsizedSVG = () => {
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My Title',
        url: 'https://example.com',
        image: 'https://s.cdpn.io/91525/potofgold.svg'
      }
    })
  }, /*#__PURE__*/React.createElement(Heading, {
    menu: menuItems
  }));
};
CustomBrandImageUnsizedSVG.displayName = "CustomBrandImageUnsizedSVG";
export const NoBrand = () => {
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: null,
        url: null,
        image: null
      }
    })
  }, /*#__PURE__*/React.createElement(Heading, {
    menu: menuItems
  }));
};
NoBrand.displayName = "NoBrand";
export const SkipToCanvasLinkFocused = {
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
  play: () => {
    // focus each instance for chromatic/storybook's stacked theme
    screen.getAllByText('Skip to canvas').forEach(x => x.focus());
  }
};