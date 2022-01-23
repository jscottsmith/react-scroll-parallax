import React from 'react';
import { styled, withTheme } from '@storybook/theming';
import { StorybookLogo } from '@storybook/components';
export var StorybookLogoStyled = styled(StorybookLogo)({
  width: 'auto',
  height: '22px !important',
  display: 'block'
});
export var Img = styled.img({
  width: 'auto',
  height: 'auto',
  display: 'block',
  maxWidth: '100%'
});
export var LogoLink = styled.a(function (_ref) {
  var theme = _ref.theme;
  return {
    display: 'inline-block',
    height: '100%',
    margin: '-3px -4px',
    padding: '2px 3px',
    border: '1px solid transparent',
    borderRadius: 3,
    color: 'inherit',
    textDecoration: 'none',
    '&:focus': {
      outline: 0,
      borderColor: theme.color.secondary
    }
  };
});
export var Brand = withTheme(function (_ref2) {
  var theme = _ref2.theme;
  var _theme$brand = theme.brand,
      _theme$brand$title = _theme$brand.title,
      title = _theme$brand$title === void 0 ? 'Storybook' : _theme$brand$title,
      _theme$brand$url = _theme$brand.url,
      url = _theme$brand$url === void 0 ? './' : _theme$brand$url,
      image = _theme$brand.image;
  var targetValue = url === './' ? '' : '_blank'; // When image is explicitly set to null, enable custom HTML support

  if (image === null) {
    if (title === null) return null; // eslint-disable-next-line react/no-danger

    if (!url) return /*#__PURE__*/React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: title
      }
    });
    return /*#__PURE__*/React.createElement(LogoLink, {
      href: url,
      target: targetValue,
      dangerouslySetInnerHTML: {
        __html: title
      }
    });
  }

  var logo = image ? /*#__PURE__*/React.createElement(Img, {
    src: image,
    alt: title
  }) : /*#__PURE__*/React.createElement(StorybookLogoStyled, {
    alt: title
  });

  if (url) {
    return /*#__PURE__*/React.createElement(LogoLink, {
      title: title,
      href: url,
      target: targetValue
    }, logo);
  } // The wrapper div serves to prevent image misalignment


  return /*#__PURE__*/React.createElement("div", null, logo);
});