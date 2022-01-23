export default {
  "title": "React Scroll Parallax",
  "tagline": "React components to create parallax scroll effects for banners, images or any other DOM elements.",
  "url": "https://react-scroll-parallax.v3.damnthat.tv",
  "baseUrl": "/",
  "onBrokenLinks": "throw",
  "onBrokenMarkdownLinks": "warn",
  "favicon": "img/favicon.ico",
  "organizationName": "jscottsmith",
  "projectName": "react-scroll-parallax",
  "presets": [
    [
      "classic",
      {
        "docs": {
          "sidebarPath": "/Users/jsmith/Sites/react-scroll-parallax/documentation/sidebars.js",
          "editUrl": "https://github.com/jscottsmith/react-scroll-parallax/tree/v3/documentation"
        },
        "theme": {
          "customCss": "/Users/jsmith/Sites/react-scroll-parallax/documentation/src/css/custom.css"
        }
      }
    ]
  ],
  "themeConfig": {
    "navbar": {
      "hideOnScroll": true,
      "title": "React Scroll Parallax",
      "logo": {
        "alt": "Squares Overlapping",
        "src": "img/icon-logo.png"
      },
      "items": [
        {
          "type": "doc",
          "docId": "usage/usage",
          "position": "left",
          "label": "Usage"
        },
        {
          "type": "doc",
          "docId": "usage/parallax-props",
          "position": "left",
          "label": "Props"
        },
        {
          "type": "doc",
          "docId": "usage/hooks/hooks",
          "position": "left",
          "label": "Hooks"
        },
        {
          "type": "doc",
          "docId": "usage/components/components",
          "position": "left",
          "label": "Components"
        },
        {
          "type": "doc",
          "docId": "examples/how-it-works",
          "position": "left",
          "label": "Examples"
        },
        {
          "href": "https://github.com/jscottsmith/react-scroll-parallax",
          "className": "header-github-link",
          "aria-label": "GitHub repository",
          "position": "right"
        }
      ]
    },
    "footer": {
      "style": "dark",
      "links": [
        {
          "title": "Introduction",
          "items": [
            {
              "to": "/docs/usage",
              "label": "Usage"
            },
            {
              "to": "/docs/examples/how-it-works",
              "label": "Examples"
            }
          ]
        },
        {
          "title": "Reference",
          "items": [
            {
              "to": "/docs/usage/parallax-props",
              "label": "Props"
            },
            {
              "to": "/docs/usage/hooks",
              "label": "Hooks"
            },
            {
              "to": "/docs/usage/components",
              "label": "Components"
            }
          ]
        },
        {
          "title": "Elsewhere",
          "items": [
            {
              "label": "NPM",
              "href": "https://www.npmjs.com/package/react-scroll-parallax"
            },
            {
              "label": "Github",
              "href": "https://github.com/jscottsmith/react-scroll-parallax"
            },
            {
              "label": "Support",
              "href": "https://github.com/jscottsmith/react-scroll-parallax/issues"
            }
          ]
        },
        {
          "title": "Who",
          "items": [
            {
              "label": "J",
              "href": "https://github.com/jscottsmith"
            },
            {
              "label": "Damnthat.tv",
              "href": "https://damnthat.tv/"
            },
            {
              "label": "@damntelevision",
              "href": "https://twitter.com/damntelevision"
            }
          ]
        }
      ],
      "copyright": "It's ok 👌🏻"
    },
    "prism": {
      "theme": {
        "plain": {
          "color": "#393A34",
          "backgroundColor": "#f6f8fa"
        },
        "styles": [
          {
            "types": [
              "comment",
              "prolog",
              "doctype",
              "cdata"
            ],
            "style": {
              "color": "#999988",
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "namespace"
            ],
            "style": {
              "opacity": 0.7
            }
          },
          {
            "types": [
              "string",
              "attr-value"
            ],
            "style": {
              "color": "#e3116c"
            }
          },
          {
            "types": [
              "punctuation",
              "operator"
            ],
            "style": {
              "color": "#393A34"
            }
          },
          {
            "types": [
              "entity",
              "url",
              "symbol",
              "number",
              "boolean",
              "variable",
              "constant",
              "property",
              "regex",
              "inserted"
            ],
            "style": {
              "color": "#36acaa"
            }
          },
          {
            "types": [
              "atrule",
              "keyword",
              "attr-name",
              "selector"
            ],
            "style": {
              "color": "#00a4db"
            }
          },
          {
            "types": [
              "function",
              "deleted",
              "tag"
            ],
            "style": {
              "color": "#d73a49"
            }
          },
          {
            "types": [
              "function-variable"
            ],
            "style": {
              "color": "#6f42c1"
            }
          },
          {
            "types": [
              "tag",
              "selector",
              "keyword"
            ],
            "style": {
              "color": "#00009f"
            }
          }
        ]
      },
      "darkTheme": {
        "plain": {
          "color": "#F8F8F2",
          "backgroundColor": "#282A36"
        },
        "styles": [
          {
            "types": [
              "prolog",
              "constant",
              "builtin"
            ],
            "style": {
              "color": "rgb(189, 147, 249)"
            }
          },
          {
            "types": [
              "inserted",
              "function"
            ],
            "style": {
              "color": "rgb(80, 250, 123)"
            }
          },
          {
            "types": [
              "deleted"
            ],
            "style": {
              "color": "rgb(255, 85, 85)"
            }
          },
          {
            "types": [
              "changed"
            ],
            "style": {
              "color": "rgb(255, 184, 108)"
            }
          },
          {
            "types": [
              "punctuation",
              "symbol"
            ],
            "style": {
              "color": "rgb(248, 248, 242)"
            }
          },
          {
            "types": [
              "string",
              "char",
              "tag",
              "selector"
            ],
            "style": {
              "color": "rgb(255, 121, 198)"
            }
          },
          {
            "types": [
              "keyword",
              "variable"
            ],
            "style": {
              "color": "rgb(189, 147, 249)",
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "comment"
            ],
            "style": {
              "color": "rgb(98, 114, 164)"
            }
          },
          {
            "types": [
              "attr-name"
            ],
            "style": {
              "color": "rgb(241, 250, 140)"
            }
          }
        ]
      },
      "additionalLanguages": []
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": false,
      "respectPrefersColorScheme": false,
      "switchConfig": {
        "darkIcon": "🌜",
        "darkIconStyle": {},
        "lightIcon": "🌞",
        "lightIconStyle": {}
      }
    },
    "docs": {
      "versionPersistence": "localStorage"
    },
    "metadata": [],
    "hideableSidebar": false,
    "tableOfContents": {
      "minHeadingLevel": 2,
      "maxHeadingLevel": 3
    }
  },
  "baseUrlIssueBanner": true,
  "i18n": {
    "defaultLocale": "en",
    "locales": [
      "en"
    ],
    "localeConfigs": {}
  },
  "onDuplicateRoutes": "warn",
  "staticDirectories": [
    "static"
  ],
  "customFields": {},
  "plugins": [],
  "themes": [],
  "titleDelimiter": "|",
  "noIndex": false
};