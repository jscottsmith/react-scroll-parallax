
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug','3d6'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config','914'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content','c28'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData','3cf'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata','31b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry','0da'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes','244'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive','f4c'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs','dce'),
    routes: [
      {
        path: '/docs/examples/advanced-banners',
        component: ComponentCreator('/docs/examples/advanced-banners','abe'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/examples/banners',
        component: ComponentCreator('/docs/examples/banners','f85'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/examples/easing',
        component: ComponentCreator('/docs/examples/easing','59f'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/examples/how-it-works',
        component: ComponentCreator('/docs/examples/how-it-works','6e3'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/examples/scroll-effects',
        component: ComponentCreator('/docs/examples/scroll-effects','244'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro','99a'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/migration-guides/v1-migration-guide',
        component: ComponentCreator('/docs/migration-guides/v1-migration-guide','5f0'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/migration-guides/v2-migration-guide',
        component: ComponentCreator('/docs/migration-guides/v2-migration-guide','242'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/usage/',
        component: ComponentCreator('/docs/usage/','214'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/usage/components/',
        component: ComponentCreator('/docs/usage/components/','c2a'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/usage/components/parallax-banner-component',
        component: ComponentCreator('/docs/usage/components/parallax-banner-component','216'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/usage/components/parallax-component',
        component: ComponentCreator('/docs/usage/components/parallax-component','eca'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/usage/components/parallax-provider',
        component: ComponentCreator('/docs/usage/components/parallax-provider','de6'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/usage/hooks/',
        component: ComponentCreator('/docs/usage/hooks/','f38'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/usage/hooks/use-parallax',
        component: ComponentCreator('/docs/usage/hooks/use-parallax','013'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/usage/hooks/use-parallax-controller',
        component: ComponentCreator('/docs/usage/hooks/use-parallax-controller','6e9'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/usage/parallax-props',
        component: ComponentCreator('/docs/usage/parallax-props','fa9'),
        exact: true,
        'sidebar': "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/','f49'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
