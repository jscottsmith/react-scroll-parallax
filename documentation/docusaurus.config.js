// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'React Scroll Parallax',
  tagline:
    'React components to create parallax scroll effects for banners, images or any other DOM elements.',
  url: 'https://react-scroll-parallax.v3.damnthat.tv',
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
          // Please change this to your repo.
          editUrl: 'https://github.com/jscottsmith/react-scroll-parallax',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'React Scroll Parallax',
        logo: {
          alt: 'Squares Overlapping',
          src: 'img/logo.png',
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
            href: 'https://github.com/jscottsmith/react-scroll-parallax',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
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
