"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeConfigSchema = exports.DEFAULT_CONFIG = void 0;
exports.validateThemeConfig = validateThemeConfig;

var _utilsValidation = require("@docusaurus/utils-validation");

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const DEFAULT_DOCS_CONFIG = {
  versionPersistence: 'localStorage'
};

const DocsSchema = _utilsValidation.Joi.object({
  versionPersistence: _utilsValidation.Joi.string().equal('localStorage', 'none').default(DEFAULT_DOCS_CONFIG.versionPersistence)
}).default(DEFAULT_DOCS_CONFIG);

const DEFAULT_COLOR_MODE_CONFIG = {
  defaultMode: 'light',
  disableSwitch: false,
  respectPrefersColorScheme: false,
  switchConfig: {
    darkIcon: '🌜',
    darkIconStyle: {},
    lightIcon: '🌞',
    lightIconStyle: {}
  }
};
const DEFAULT_CONFIG = {
  colorMode: DEFAULT_COLOR_MODE_CONFIG,
  docs: DEFAULT_DOCS_CONFIG,
  metadata: [],
  prism: {
    additionalLanguages: []
  },
  navbar: {
    hideOnScroll: false,
    items: []
  },
  hideableSidebar: false,
  tableOfContents: {
    minHeadingLevel: 2,
    maxHeadingLevel: 3
  }
};
exports.DEFAULT_CONFIG = DEFAULT_CONFIG;

const NavbarItemPosition = _utilsValidation.Joi.string().equal('left', 'right').default('left');

const NavbarItemBaseSchema = _utilsValidation.Joi.object({
  label: _utilsValidation.Joi.string(),
  className: _utilsValidation.Joi.string()
}) // We allow any unknown attributes on the links
// (users may need additional attributes like target, aria-role, data-customAttribute...)
.unknown();

const DefaultNavbarItemSchema = NavbarItemBaseSchema.append({
  to: _utilsValidation.Joi.string(),
  href: _utilsValidation.URISchema,
  activeBasePath: _utilsValidation.Joi.string(),
  activeBaseRegex: _utilsValidation.Joi.string(),
  prependBaseUrlToHref: _utilsValidation.Joi.bool(),
  // This is only triggered in case of a nested dropdown
  items: _utilsValidation.Joi.forbidden().messages({
    'any.unknown': 'Nested dropdowns are not allowed'
  })
}).xor('href', 'to').messages({
  'object.xor': 'One and only one between "to" and "href" should be provided'
});
const DocsVersionNavbarItemSchema = NavbarItemBaseSchema.append({
  type: _utilsValidation.Joi.string().equal('docsVersion').required(),
  to: _utilsValidation.Joi.string(),
  docsPluginId: _utilsValidation.Joi.string()
});
const DocItemSchema = NavbarItemBaseSchema.append({
  type: _utilsValidation.Joi.string().equal('doc').required(),
  docId: _utilsValidation.Joi.string().required(),
  docsPluginId: _utilsValidation.Joi.string()
});

const itemWithType = type => {
  // because equal(undefined) is not supported :/
  const typeSchema = type ? _utilsValidation.Joi.string().required().equal(type) : _utilsValidation.Joi.string().forbidden();
  return _utilsValidation.Joi.object({
    type: typeSchema
  }).unknown().required();
};

const DropdownSubitemSchema = _utilsValidation.Joi.object({
  position: _utilsValidation.Joi.forbidden()
}).when('.', {
  switch: [{
    is: itemWithType('docsVersion'),
    then: DocsVersionNavbarItemSchema
  }, {
    is: itemWithType('doc'),
    then: DocItemSchema
  }, {
    is: itemWithType(undefined),
    then: DefaultNavbarItemSchema
  }, {
    is: _utilsValidation.Joi.alternatives().try(itemWithType('dropdown'), itemWithType('docsVersionDropdown'), itemWithType('localeDropdown'), itemWithType('search')),
    then: _utilsValidation.Joi.forbidden().messages({
      'any.unknown': 'Nested dropdowns are not allowed'
    })
  }],
  otherwise: _utilsValidation.Joi.forbidden().messages({
    'any.unknown': 'Bad navbar item type {.type}'
  })
});

const DropdownNavbarItemSchema = NavbarItemBaseSchema.append({
  items: _utilsValidation.Joi.array().items(DropdownSubitemSchema).required()
});
const DocsVersionDropdownNavbarItemSchema = NavbarItemBaseSchema.append({
  type: _utilsValidation.Joi.string().equal('docsVersionDropdown').required(),
  docsPluginId: _utilsValidation.Joi.string(),
  dropdownActiveClassDisabled: _utilsValidation.Joi.boolean(),
  dropdownItemsBefore: _utilsValidation.Joi.array().items(DropdownSubitemSchema).default([]),
  dropdownItemsAfter: _utilsValidation.Joi.array().items(DropdownSubitemSchema).default([])
});
const LocaleDropdownNavbarItemSchema = NavbarItemBaseSchema.append({
  type: _utilsValidation.Joi.string().equal('localeDropdown').required(),
  dropdownItemsBefore: _utilsValidation.Joi.array().items(DropdownSubitemSchema).default([]),
  dropdownItemsAfter: _utilsValidation.Joi.array().items(DropdownSubitemSchema).default([])
});

const SearchItemSchema = _utilsValidation.Joi.object({
  type: _utilsValidation.Joi.string().equal('search').required()
});

const NavbarItemSchema = _utilsValidation.Joi.object({
  position: NavbarItemPosition
}).when('.', {
  switch: [{
    is: itemWithType('docsVersion'),
    then: DocsVersionNavbarItemSchema
  }, {
    is: itemWithType('dropdown'),
    then: DropdownNavbarItemSchema
  }, {
    is: itemWithType('docsVersionDropdown'),
    then: DocsVersionDropdownNavbarItemSchema
  }, {
    is: itemWithType('doc'),
    then: DocItemSchema
  }, {
    is: itemWithType('localeDropdown'),
    then: LocaleDropdownNavbarItemSchema
  }, {
    is: itemWithType('search'),
    then: SearchItemSchema
  }, {
    is: itemWithType(undefined),
    then: _utilsValidation.Joi.object().when('.', {
      // Dropdown item can be specified without type field
      is: _utilsValidation.Joi.object({
        items: _utilsValidation.Joi.array().required()
      }).unknown(),
      then: DropdownNavbarItemSchema,
      otherwise: DefaultNavbarItemSchema
    })
  }],
  otherwise: _utilsValidation.Joi.forbidden().messages({
    'any.unknown': 'Bad navbar item type {.type}'
  })
});

const ColorModeSchema = _utilsValidation.Joi.object({
  defaultMode: _utilsValidation.Joi.string().equal('dark', 'light').default(DEFAULT_COLOR_MODE_CONFIG.defaultMode),
  disableSwitch: _utilsValidation.Joi.bool().default(DEFAULT_COLOR_MODE_CONFIG.disableSwitch),
  respectPrefersColorScheme: _utilsValidation.Joi.bool().default(DEFAULT_COLOR_MODE_CONFIG.respectPrefersColorScheme),
  switchConfig: _utilsValidation.Joi.object({
    darkIcon: _utilsValidation.Joi.string().default(DEFAULT_COLOR_MODE_CONFIG.switchConfig.darkIcon),
    darkIconStyle: _utilsValidation.Joi.object().default(DEFAULT_COLOR_MODE_CONFIG.switchConfig.darkIconStyle),
    lightIcon: _utilsValidation.Joi.string().default(DEFAULT_COLOR_MODE_CONFIG.switchConfig.lightIcon),
    lightIconStyle: _utilsValidation.Joi.object().default(DEFAULT_COLOR_MODE_CONFIG.switchConfig.lightIconStyle)
  }).default(DEFAULT_COLOR_MODE_CONFIG.switchConfig)
}).default(DEFAULT_COLOR_MODE_CONFIG); // schema can probably be improved


const HtmlMetadataSchema = _utilsValidation.Joi.object({
  id: _utilsValidation.Joi.string(),
  name: _utilsValidation.Joi.string(),
  property: _utilsValidation.Joi.string(),
  content: _utilsValidation.Joi.string(),
  itemprop: _utilsValidation.Joi.string()
}).unknown();

const FooterLinkItemSchema = _utilsValidation.Joi.object({
  to: _utilsValidation.Joi.string(),
  href: _utilsValidation.URISchema,
  html: _utilsValidation.Joi.string(),
  label: _utilsValidation.Joi.string()
}).xor('to', 'href', 'html').with('to', 'label').with('href', 'label').nand('html', 'label') // We allow any unknown attributes on the links
// (users may need additional attributes like target, aria-role, data-customAttribute...)
.unknown();

const CustomCssSchema = _utilsValidation.Joi.alternatives().try(_utilsValidation.Joi.array().items(_utilsValidation.Joi.string().required()), _utilsValidation.Joi.string().required()).optional();

const ThemeConfigSchema = _utilsValidation.Joi.object({
  // TODO temporary (@alpha-58)
  disableDarkMode: _utilsValidation.Joi.any().forbidden().messages({
    'any.unknown': 'disableDarkMode theme config is deprecated. Please use the new colorMode attribute. You likely want: config.themeConfig.colorMode.disableSwitch = true'
  }),
  // TODO temporary (@alpha-58)
  defaultDarkMode: _utilsValidation.Joi.any().forbidden().messages({
    'any.unknown': 'defaultDarkMode theme config is deprecated. Please use the new colorMode attribute. You likely want: config.themeConfig.colorMode.defaultMode = "dark"'
  }),
  customCss: CustomCssSchema,
  colorMode: ColorModeSchema,
  image: _utilsValidation.Joi.string(),
  docs: DocsSchema,
  metadata: _utilsValidation.Joi.array().items(HtmlMetadataSchema).default(DEFAULT_CONFIG.metadata),
  metadatas: _utilsValidation.Joi.any().forbidden().messages({
    'any.unknown': 'themeConfig.metadatas has been renamed as themeConfig.metadata. See https://github.com/facebook/docusaurus/pull/5871'
  }),
  announcementBar: _utilsValidation.Joi.object({
    id: _utilsValidation.Joi.string().default('announcement-bar'),
    content: _utilsValidation.Joi.string().required(),
    backgroundColor: _utilsValidation.Joi.string(),
    textColor: _utilsValidation.Joi.string(),
    isCloseable: _utilsValidation.Joi.bool().default(true)
  }).optional(),
  navbar: _utilsValidation.Joi.object({
    style: _utilsValidation.Joi.string().equal('dark', 'primary'),
    hideOnScroll: _utilsValidation.Joi.bool().default(DEFAULT_CONFIG.navbar.hideOnScroll),
    // TODO temporary (@alpha-58)
    links: _utilsValidation.Joi.any().forbidden().messages({
      'any.unknown': 'themeConfig.navbar.links has been renamed as themeConfig.navbar.items'
    }),
    items: _utilsValidation.Joi.array().items(NavbarItemSchema).default(DEFAULT_CONFIG.navbar.items),
    title: _utilsValidation.Joi.string().allow('', null),
    logo: _utilsValidation.Joi.object({
      alt: _utilsValidation.Joi.string().allow(''),
      src: _utilsValidation.Joi.string().required(),
      srcDark: _utilsValidation.Joi.string(),
      width: _utilsValidation.Joi.alternatives().try(_utilsValidation.Joi.string(), _utilsValidation.Joi.number()),
      height: _utilsValidation.Joi.alternatives().try(_utilsValidation.Joi.string(), _utilsValidation.Joi.number()),
      href: _utilsValidation.Joi.string(),
      target: _utilsValidation.Joi.string()
    })
  }).default(DEFAULT_CONFIG.navbar),
  footer: _utilsValidation.Joi.object({
    style: _utilsValidation.Joi.string().equal('dark', 'light').default('light'),
    logo: _utilsValidation.Joi.object({
      alt: _utilsValidation.Joi.string().allow(''),
      src: _utilsValidation.Joi.string(),
      srcDark: _utilsValidation.Joi.string(),
      // TODO infer this from reading the image
      width: _utilsValidation.Joi.alternatives().try(_utilsValidation.Joi.string(), _utilsValidation.Joi.number()),
      height: _utilsValidation.Joi.alternatives().try(_utilsValidation.Joi.string(), _utilsValidation.Joi.number()),
      href: _utilsValidation.Joi.string()
    }),
    copyright: _utilsValidation.Joi.string(),
    links: _utilsValidation.Joi.alternatives(_utilsValidation.Joi.array().items(_utilsValidation.Joi.object({
      title: _utilsValidation.Joi.string().allow(null).default(null),
      items: _utilsValidation.Joi.array().items(FooterLinkItemSchema).default([])
    })), _utilsValidation.Joi.array().items(FooterLinkItemSchema)).messages({
      'alternatives.match': `The footer must be either simple or multi-column, and not a mix of the two. See: https://docusaurus.io/docs/api/themes/configuration#footer-links`
    }).default([])
  }).optional(),
  prism: _utilsValidation.Joi.object({
    theme: _utilsValidation.Joi.object({
      plain: _utilsValidation.Joi.alternatives().try(_utilsValidation.Joi.array(), _utilsValidation.Joi.object()).required(),
      styles: _utilsValidation.Joi.alternatives().try(_utilsValidation.Joi.array(), _utilsValidation.Joi.object()).required()
    }),
    darkTheme: _utilsValidation.Joi.object({
      plain: _utilsValidation.Joi.alternatives().try(_utilsValidation.Joi.array(), _utilsValidation.Joi.object()).required(),
      styles: _utilsValidation.Joi.alternatives().try(_utilsValidation.Joi.array(), _utilsValidation.Joi.object()).required()
    }),
    defaultLanguage: _utilsValidation.Joi.string(),
    additionalLanguages: _utilsValidation.Joi.array().items(_utilsValidation.Joi.string()).default(DEFAULT_CONFIG.prism.additionalLanguages)
  }).default(DEFAULT_CONFIG.prism).unknown(),
  hideableSidebar: _utilsValidation.Joi.bool().default(DEFAULT_CONFIG.hideableSidebar),
  sidebarCollapsible: _utilsValidation.Joi.forbidden().messages({
    'any.unknown': 'The themeConfig.sidebarCollapsible has been moved to docs plugin options. See: https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs'
  }),
  tableOfContents: _utilsValidation.Joi.object({
    minHeadingLevel: _utilsValidation.Joi.number().default(DEFAULT_CONFIG.tableOfContents.minHeadingLevel).when('maxHeadingLevel', {
      is: _utilsValidation.Joi.exist(),
      then: _utilsValidation.Joi.number().integer().min(2).max(6).max(_utilsValidation.Joi.ref('maxHeadingLevel')),
      otherwise: _utilsValidation.Joi.number().integer().min(2).max(6)
    }),
    maxHeadingLevel: _utilsValidation.Joi.number().integer().min(2).max(6).default(DEFAULT_CONFIG.tableOfContents.maxHeadingLevel)
  }).default(DEFAULT_CONFIG.tableOfContents)
});

exports.ThemeConfigSchema = ThemeConfigSchema;

function validateThemeConfig({
  validate,
  themeConfig
}) {
  return validate(ThemeConfigSchema, themeConfig);
}