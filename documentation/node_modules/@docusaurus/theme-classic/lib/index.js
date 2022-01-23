"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnouncementBarDismissStorageKey = void 0;
exports.default = docusaurusThemeClassic;
exports.getSwizzleComponentList = getSwizzleComponentList;
Object.defineProperty(exports, "validateThemeConfig", {
  enumerable: true,
  get: function () {
    return _validateThemeConfig.validateThemeConfig;
  }
});

var _translations = require("./translations");

var _path = _interopRequireDefault(require("path"));

var _module = require("module");

var _rtlcss = _interopRequireDefault(require("rtlcss"));

var _themeTranslations = require("@docusaurus/theme-translations");

var _validateThemeConfig = require("./validateThemeConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const requireFromDocusaurusCore = (0, _module.createRequire)(require.resolve('@docusaurus/core/package.json'));
const ContextReplacementPlugin = requireFromDocusaurusCore('webpack/lib/ContextReplacementPlugin'); // Need to be inlined to prevent dark mode FOUC
// Make sure that the 'storageKey' is the same as the one in `/theme/hooks/useTheme.js`

const ThemeStorageKey = 'theme';

const noFlashColorMode = ({
  defaultMode,
  respectPrefersColorScheme
}) => `(function() {
  var defaultMode = '${defaultMode}';
  var respectPrefersColorScheme = ${respectPrefersColorScheme};

  function setDataThemeAttribute(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function getStoredTheme() {
    var theme = null;
    try {
      theme = localStorage.getItem('${ThemeStorageKey}');
    } catch (err) {}
    return theme;
  }

  var storedTheme = getStoredTheme();
  if (storedTheme !== null) {
    setDataThemeAttribute(storedTheme);
  } else {
    if (
      respectPrefersColorScheme &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setDataThemeAttribute('dark');
    } else if (
      respectPrefersColorScheme &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      setDataThemeAttribute('light');
    } else {
      setDataThemeAttribute(defaultMode === 'dark' ? 'dark' : 'light');
    }
  }
})();`; // Duplicated constant. Unfortunately we can't import it from theme-common, as we need to support older nodejs versions without ESM support
// TODO: import from theme-common once we only support Node.js with ESM support
// + move all those announcementBar stuff there too


const AnnouncementBarDismissStorageKey = 'docusaurus.announcement.dismiss';
exports.AnnouncementBarDismissStorageKey = AnnouncementBarDismissStorageKey;
const AnnouncementBarDismissDataAttribute = 'data-announcement-bar-initially-dismissed'; // We always render the announcement bar html on the server, to prevent layout shifts on React hydration
// The theme can use CSS + the data attribute to hide the announcement bar asap (before React hydration)

const AnnouncementBarInlineJavaScript = `
(function() {
  function isDismissed() {
    try {
      return localStorage.getItem('${AnnouncementBarDismissStorageKey}') === 'true';
    } catch (err) {}
    return false;
  }
  document.documentElement.setAttribute('${AnnouncementBarDismissDataAttribute}', isDismissed());
})();`;

function getInfimaCSSFile(direction) {
  return `infima/dist/css/default/default${direction === 'rtl' ? '-rtl' : ''}.css`;
}

function docusaurusThemeClassic(context, // TODO: LoadContext is missing some of properties
options) {
  const {
    siteConfig: {
      themeConfig: roughlyTypedThemeConfig
    },
    i18n: {
      currentLocale,
      localeConfigs
    }
  } = context;
  const themeConfig = roughlyTypedThemeConfig || {};
  const {
    announcementBar,
    colorMode,
    prism: {
      additionalLanguages = []
    } = {}
  } = themeConfig;
  const {
    customCss
  } = options || {};
  const {
    direction
  } = localeConfigs[currentLocale];
  return {
    name: 'docusaurus-theme-classic',

    /*
    Does not seem needed: webpack can already hot reload theme files
    getPathsToWatch() {
      return [
        path.join(__dirname, '..', 'lib'),
        path.join(__dirname, '..', 'lib-next'),
      ];
    },
     */
    getThemePath() {
      return _path.default.join(__dirname, '..', 'lib-next', 'theme');
    },

    getTypeScriptThemePath() {
      return _path.default.resolve(__dirname, '..', 'src', 'theme');
    },

    getTranslationFiles: async () => (0, _translations.getTranslationFiles)({
      themeConfig
    }),
    translateThemeConfig: params => (0, _translations.translateThemeConfig)({
      themeConfig: params.themeConfig,
      translationFiles: params.translationFiles
    }),

    getDefaultCodeTranslationMessages() {
      return (0, _themeTranslations.readDefaultCodeTranslationMessages)({
        locale: currentLocale,
        name: 'theme-common'
      });
    },

    getClientModules() {
      const modules = [require.resolve(getInfimaCSSFile(direction)), _path.default.resolve(__dirname, './prism-include-languages'), _path.default.resolve(__dirname, './admonitions.css')];

      if (customCss) {
        if (Array.isArray(customCss)) {
          modules.push(...customCss);
        } else {
          modules.push(customCss);
        }
      }

      return modules;
    },

    configureWebpack() {
      const prismLanguages = additionalLanguages.map(lang => `prism-${lang}`).join('|');
      return {
        ignoreWarnings: [// See https://github.com/facebook/docusaurus/pull/3382
        e => e.message.includes("Can't resolve '@theme-init/hooks/useDocs")],
        plugins: [new ContextReplacementPlugin(/prismjs[\\/]components$/, new RegExp(`^./(${prismLanguages})$`))]
      };
    },

    configurePostCss(postCssOptions) {
      if (direction === 'rtl') {
        const resolvedInfimaFile = require.resolve(getInfimaCSSFile(direction));

        const plugin = {
          postcssPlugin: 'RtlCssPlugin',
          prepare: result => {
            var _result$root, _result$root$source, _result$root$source$i;

            const file = (_result$root = result.root) === null || _result$root === void 0 ? void 0 : (_result$root$source = _result$root.source) === null || _result$root$source === void 0 ? void 0 : (_result$root$source$i = _result$root$source.input) === null || _result$root$source$i === void 0 ? void 0 : _result$root$source$i.file; // Skip Infima as we are using the its RTL version.

            if (file === resolvedInfimaFile) {
              return {};
            }

            return (0, _rtlcss.default)(result.root);
          }
        };
        postCssOptions.plugins.push(plugin);
      }

      return postCssOptions;
    },

    injectHtmlTags() {
      return {
        preBodyTags: [{
          tagName: 'script',
          innerHTML: `
${noFlashColorMode(colorMode)}
${announcementBar ? AnnouncementBarInlineJavaScript : ''}
            `
        }]
      };
    }

  };
}

const swizzleAllowedComponents = ['CodeBlock', 'DocSidebar', 'Footer', 'NotFound', 'SearchBar', 'IconArrow', 'IconEdit', 'IconMenu', 'hooks/useTheme', 'prism-include-languages'];

function getSwizzleComponentList() {
  return swizzleAllowedComponents;
}