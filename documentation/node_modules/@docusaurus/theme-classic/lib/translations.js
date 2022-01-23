"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTranslationFiles = getTranslationFiles;
exports.translateThemeConfig = translateThemeConfig;

var _lodash = require("lodash");

var _utils = require("@docusaurus/utils");

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function getNavbarTranslationFile(navbar) {
  // TODO handle properly all the navbar item types here!
  function flattenNavbarItems(items) {
    const subItems = items.flatMap(item => {
      var _item$items;

      const allSubItems = [(_item$items = item.items) !== null && _item$items !== void 0 ? _item$items : []].flat();
      return flattenNavbarItems(allSubItems);
    });
    return [...items, ...subItems];
  }

  const allNavbarItems = flattenNavbarItems(navbar.items);
  const navbarItemsTranslations = (0, _lodash.chain)(allNavbarItems.filter(navbarItem => !!navbarItem.label)).keyBy(navbarItem => `item.label.${navbarItem.label}`).mapValues(navbarItem => ({
    message: navbarItem.label,
    description: `Navbar item with label ${navbarItem.label}`
  })).value();
  const titleTranslations = navbar.title ? {
    title: {
      message: navbar.title,
      description: 'The title in the navbar'
    }
  } : {};
  return (0, _utils.mergeTranslations)([titleTranslations, navbarItemsTranslations]);
}

function translateNavbar(navbar, navbarTranslations) {
  var _navbarTranslations$t, _navbarTranslations$t2;

  return { ...navbar,
    title: (_navbarTranslations$t = (_navbarTranslations$t2 = navbarTranslations.title) === null || _navbarTranslations$t2 === void 0 ? void 0 : _navbarTranslations$t2.message) !== null && _navbarTranslations$t !== void 0 ? _navbarTranslations$t : navbar.title,
    //  TODO handle properly all the navbar item types here!
    items: navbar.items.map(item => {
      var _item$items2, _navbarTranslations$$2, _navbarTranslations$2;

      const subItems = (_item$items2 = item.items) === null || _item$items2 === void 0 ? void 0 : _item$items2.map(subItem => {
        var _navbarTranslations$$, _navbarTranslations$;

        return { ...subItem,
          label: (_navbarTranslations$$ = (_navbarTranslations$ = navbarTranslations[`item.label.${subItem.label}`]) === null || _navbarTranslations$ === void 0 ? void 0 : _navbarTranslations$.message) !== null && _navbarTranslations$$ !== void 0 ? _navbarTranslations$$ : subItem.label
        };
      });
      return { ...item,
        label: (_navbarTranslations$$2 = (_navbarTranslations$2 = navbarTranslations[`item.label.${item.label}`]) === null || _navbarTranslations$2 === void 0 ? void 0 : _navbarTranslations$2.message) !== null && _navbarTranslations$$2 !== void 0 ? _navbarTranslations$$2 : item.label,
        ...(subItems ? {
          items: subItems
        } : undefined)
      };
    })
  };
}

function isMultiColumnFooterLinks(links) {
  return links.length > 0 && 'title' in links[0];
}

function getFooterTranslationFile(footer) {
  const footerLinkTitles = (0, _lodash.chain)(isMultiColumnFooterLinks(footer.links) ? footer.links.filter(link => !!link.title) : []).keyBy(link => `link.title.${link.title}`).mapValues(link => ({
    message: link.title,
    description: `The title of the footer links column with title=${link.title} in the footer`
  })).value();
  const footerLinkLabels = (0, _lodash.chain)(isMultiColumnFooterLinks(footer.links) ? footer.links.flatMap(link => link.items).filter(link => !!link.label) : footer.links.filter(link => !!link.label)).keyBy(linkItem => `link.item.label.${linkItem.label}`).mapValues(linkItem => {
    var _linkItem$to;

    return {
      message: linkItem.label,
      description: `The label of footer link with label=${linkItem.label} linking to ${(_linkItem$to = linkItem.to) !== null && _linkItem$to !== void 0 ? _linkItem$to : linkItem.href}`
    };
  }).value();
  const copyright = footer.copyright ? {
    copyright: {
      message: footer.copyright,
      description: 'The footer copyright'
    }
  } : {};
  return (0, _utils.mergeTranslations)([footerLinkTitles, footerLinkLabels, copyright]);
}

function translateFooter(footer, footerTranslations) {
  var _footerTranslations$c, _footerTranslations$c2;

  const links = isMultiColumnFooterLinks(footer.links) ? footer.links.map(link => {
    var _footerTranslations$$, _footerTranslations$;

    return { ...link,
      title: (_footerTranslations$$ = (_footerTranslations$ = footerTranslations[`link.title.${link.title}`]) === null || _footerTranslations$ === void 0 ? void 0 : _footerTranslations$.message) !== null && _footerTranslations$$ !== void 0 ? _footerTranslations$$ : link.title,
      items: link.items.map(linkItem => {
        var _footerTranslations$$2, _footerTranslations$2;

        return { ...linkItem,
          label: (_footerTranslations$$2 = (_footerTranslations$2 = footerTranslations[`link.item.label.${linkItem.label}`]) === null || _footerTranslations$2 === void 0 ? void 0 : _footerTranslations$2.message) !== null && _footerTranslations$$2 !== void 0 ? _footerTranslations$$2 : linkItem.label
        };
      })
    };
  }) : footer.links.map(link => {
    var _footerTranslations$$3, _footerTranslations$3;

    return { ...link,
      label: (_footerTranslations$$3 = (_footerTranslations$3 = footerTranslations[`link.item.label.${link.label}`]) === null || _footerTranslations$3 === void 0 ? void 0 : _footerTranslations$3.message) !== null && _footerTranslations$$3 !== void 0 ? _footerTranslations$$3 : link.label
    };
  });
  const copyright = (_footerTranslations$c = (_footerTranslations$c2 = footerTranslations.copyright) === null || _footerTranslations$c2 === void 0 ? void 0 : _footerTranslations$c2.message) !== null && _footerTranslations$c !== void 0 ? _footerTranslations$c : footer.copyright;
  return { ...footer,
    links,
    copyright
  };
}

function getTranslationFiles({
  themeConfig
}) {
  const translationFiles = [{
    path: 'navbar',
    content: getNavbarTranslationFile(themeConfig.navbar)
  }, themeConfig.footer ? {
    path: 'footer',
    content: getFooterTranslationFile(themeConfig.footer)
  } : undefined];
  return translationFiles.filter(Boolean);
}

function translateThemeConfig({
  themeConfig,
  translationFiles
}) {
  const translationFilesMap = (0, _lodash.keyBy)(translationFiles, f => f.path);
  return { ...themeConfig,
    navbar: translateNavbar(themeConfig.navbar, translationFilesMap.navbar.content),
    footer: themeConfig.footer ? translateFooter(themeConfig.footer, translationFilesMap.footer.content) : undefined
  };
}