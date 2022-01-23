---
sidebar_label: Intro
sidebar_position: 1
---

# React Scroll Parallax

[![NPM Version Latest](https://img.shields.io/npm/v/react-scroll-parallax/latest)](https://www.npmjs.com/package/react-scroll-parallax)
[![NPM Version Beta](https://img.shields.io/npm/v/react-scroll-parallax/beta)](https://www.npmjs.com/package/react-scroll-parallax)
[![NPM Downloads](https://img.shields.io/npm/dm/react-scroll-parallax)](https://www.npmjs.com/package/react-scroll-parallax)
[![Codecov](https://codecov.io/gh/jscottsmith/react-scroll-parallax/branch/v3/graph/badge.svg)](https://codecov.io/gh/jscottsmith/react-scroll-parallax)

[![Test and Lint](https://github.com/jscottsmith/react-scroll-parallax/actions/workflows/main.yml/badge.svg)](https://github.com/jscottsmith/react-scroll-parallax/actions/workflows/main.yml)
[![Storybook](https://github.com/jscottsmith/react-scroll-parallax/actions/workflows/surge.yml/badge.svg)](https://github.com/jscottsmith/react-scroll-parallax/actions/workflows/surge.yml)
[![Storybook](https://github.com/jscottsmith/react-scroll-parallax/actions/workflows/coverage.yml/badge.svg)](https://github.com/jscottsmith/react-scroll-parallax/actions/workflows/coverage.yml)

React hooks and components to create parallax scroll effects for banners, images or any other DOM elements. Utilizes [Parallax Controller](https://parallax-controller.v1.damnthat.tv) to add vertical or horizontal scrolling based effects to elements. [Optimized](https://parallax-controller.v1.damnthat.tv/docs/performance) to _reduce_ jank on scroll and works with SSR and SSG rendered React apps.

If you're coming from [V2](https://github.com/jscottsmith/react-scroll-parallax/tree/v2.4.2), here's a [migration guide](/docs/migration-guides/v2-migration-guide).

## Install (v3 beta)

With npm

```
npm install react-scroll-parallax@beta
```

or yarn

```
yarn add react-scroll-parallax@beta
```

## Getting Started

- [Usage](/docs/usage/)
- [How it works](/docs/examples/how-it-works)

### Demos

- [Storybook v3](https://react-scroll-parallax-v3.surge.sh/) - [Source Code](https://github.com/jscottsmith/react-scroll-parallax/tree/v3/stories)
- [Demo 1](https://jscottsmith.github.io/react-scroll-parallax-examples/examples/parallax-example/) - [Source Code (old 1.x version)](https://github.com/jscottsmith/react-scroll-parallax-examples)
- [Demo 2](https://react-scroll-parallax.netlify.app/) - [Source Code (old 2.x version)](https://github.com/jscottsmith/react-parallax-site)

### Docs: Hooks

- [`useParallax()`](/docs/usage/hooks/use-parallax)
- [`useController()`](/docs/usage/hooks/use-controller)

### Docs: Components

- [`<Parallax>`](/docs/usage/components/parallax-component)
- [`<ParallaxBanner>`](/docs/usage/components/parallax-banner-component)
- [`<ParallaxProvider>`](/docs/usage/components/parallax-provider)
