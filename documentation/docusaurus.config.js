// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.palenight;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'React Scroll Parallax',
  tagline:
    'React components to create parallax scroll effects for banners, images or any other DOM elements.',
  url: 'https://react-scroll-parallax.damnthat.tv',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'jscottsmith', // Usually your GitHub org/user name.
  projectName: 'react-scroll-parallax', // Usually your repo name.

  plugins: [
    require.resolve('./src/plugins/tailwind-config.js'),
    [
      'docusaurus-plugin-llms',
      {
        title: 'React Scroll Parallax',
        description:
          'React hooks and components for scroll-driven parallax effects via WAAPI (v4 beta).',
        version: '4.0.0-beta.1',
        generateLLMsTxt: true,
        generateLLMsFullTxt: true,
        generateMarkdownFiles: true,
        excludeImports: true,
        removeDuplicateHeadings: true,
        docsDir: 'docs',
        ignoreFiles: [
          'migration-guides/v1-migration-guide.md',
          'migration-guides/v2-migration-guide.md',
        ],
        includeOrder: [
          'intro',
          'usage/usage',
          'usage/parallax-props',
          'usage/hooks/*',
          'usage/components/*',
          'usage/next-13',
          'migration-guides/v3-migration-guide',
          'examples/how-it-works',
          'examples/*',
        ],
        includeUnmatchedLast: true,
        rootContent:
          'Current docs target v4 beta (WAAPI / ScrollTimeline). Wrap your app in ParallaxProvider before using hooks or components. For v3 docs, use the version dropdown on the site.',
        pathTransformation: {
          addPaths: ['v4'],
        },
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/v4/examples/how-it-works',
            from: '/docs/examples/how-it-works',
          },
          {
            to: '/docs/v4/examples/banners',
            from: '/docs/examples/banners',
          },
          {
            to: '/docs/v4/examples/advanced-banners',
            from: '/docs/examples/advanced-banners',
          },
          {
            to: '/docs/v4/examples/custom-effects',
            from: '/docs/examples/custom-effects',
          },
          {
            to: '/docs/v4/examples/easing',
            from: '/docs/examples/easing',
          },
          {
            to: '/docs/v4/examples/horizontal-scroll',
            from: '/docs/examples/horizontal-scroll',
          },
          {
            to: '/docs/v4/examples/scroll-effects',
            from: '/docs/examples/scroll-effects',
          },
        ],
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/jscottsmith/react-scroll-parallax/tree/master/documentation',
          lastVersion: '3',
          versions: {
            current: {
              label: '4.0 Beta',
              path: 'v4',
              banner: 'none',
            },
            3: {
              label: '3.x',
            },
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-SQ923F35HC',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      algolia: {
        appId: 'GKA17TPGZY',
        // Public API key: it is safe to commit it
        apiKey: '5251323a8662d33e1f8a15a3f5d603c2',
        indexName: 'react-scroll-parallax',
        contextualSearch: true,
        externalUrlRegex: 'external\\.com|domain\\.com',
        searchParameters: {},
      },
      announcementBar: {
        id: 'v4_waapi_scroll',
        content:
          '🕹️ <a href="/docs/v4/intro">React Scroll Parallax <strong>4.0 Beta</strong></a> uses the Web Animations API (WAAPI) for scroll-driven animations.',
        backgroundColor: 'var(--ifm-color-primary)',
        textColor: 'white',
        isCloseable: true,
      },
      navbar: {
        hideOnScroll: true,
        title: 'React Scroll Parallax',
        logo: {
          alt: 'Squares Overlapping',
          src: 'img/icon-logo.png',
        },
        items: [
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
          {
            type: 'doc',
            docId: 'usage/usage',
            position: 'left',
            label: 'Usage',
          },
          {
            type: 'doc',
            docId: 'usage/parallax-props',
            position: 'left',
            label: 'Props',
          },
          {
            type: 'doc',
            docId: 'usage/hooks/hooks',
            position: 'left',
            label: 'Hooks',
          },
          {
            type: 'doc',
            docId: 'usage/components/components',
            position: 'left',
            label: 'Components',
          },
          {
            to: '/docs/v4/examples/how-it-works',
            position: 'left',
            label: 'Examples',
          },
          {
            href: 'https://github.com/jscottsmith/react-scroll-parallax',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Introduction',
            items: [
              {
                to: '/docs/v4/usage',
                label: 'Usage',
              },
              {
                to: '/docs/v4/examples/how-it-works',
                label: 'Examples',
              },
            ],
          },
          {
            title: 'Reference',
            items: [
              {
                to: '/docs/v4/usage/parallax-props',
                label: 'Props',
              },
              {
                to: '/docs/v4/usage/hooks',
                label: 'Hooks',
              },
              {
                to: '/docs/v4/usage/components',
                label: 'Components',
              },
            ],
          },
          {
            title: 'Elsewhere',
            items: [
              {
                label: 'NPM',
                href: 'https://www.npmjs.com/package/react-scroll-parallax',
              },
              {
                label: 'Github',
                href: 'https://github.com/jscottsmith/react-scroll-parallax',
              },
              {
                label: 'Support',
                href: 'https://github.com/jscottsmith/react-scroll-parallax/issues',
              },
            ],
          },
          {
            title: 'Who',
            items: [
              {
                label: 'Author',
                href: 'https://github.com/jscottsmith',
              },
              {
                label: 'Damnthat.tv',
                href: 'https://damnthat.tv/',
              },
            ],
          },
        ],
        copyright: `It's ok 👌🏻`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
