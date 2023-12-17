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

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/jscottsmith/react-scroll-parallax/tree/master/documentation',
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
      algolia: {
        appId: 'GKA17TPGZY',
        // Public API key: it is safe to commit it
        apiKey: '5251323a8662d33e1f8a15a3f5d603c2',
        indexName: 'react-scroll-parallax',
        contextualSearch: true,
        externalUrlRegex: 'external\\.com|domain\\.com',
        searchParameters: {},
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
            type: 'doc',
            docId: 'examples/how-it-works',
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
                to: '/docs/usage',
                label: 'Usage',
              },
              {
                to: '/docs/examples/how-it-works',
                label: 'Examples',
              },
            ],
          },
          {
            title: 'Reference',
            items: [
              {
                to: '/docs/usage/parallax-props',
                label: 'Props',
              },
              {
                to: '/docs/usage/hooks',
                label: 'Hooks',
              },
              {
                to: '/docs/usage/components',
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
                label: 'J',
                href: 'https://github.com/jscottsmith',
              },
              {
                label: 'Damnthat.tv',
                href: 'https://damnthat.tv/',
              },
              {
                label: '@damntelevision',
                href: 'https://twitter.com/damntelevision',
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
