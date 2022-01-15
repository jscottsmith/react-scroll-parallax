---
sidebar_label: Intro
sidebar_position: 1
---

# React Scroll Parallax

[![npm version](https://badge.fury.io/js/react-scroll-parallax.svg)](https://badge.fury.io/js/react-scroll-parallax) [![Build Status](https://travis-ci.org/jscottsmith/react-scroll-parallax.svg?branch=master)](https://travis-ci.org/jscottsmith/react-scroll-parallax) [![codecov](https://codecov.io/gh/jscottsmith/react-scroll-parallax/branch/master/graph/badge.svg)](https://codecov.io/gh/jscottsmith/react-scroll-parallax)

React hooks and components to create parallax scroll effects for banners, images or any other DOM elements. Utilizes [Parallax Controller](https://parallax-controller.v1.damnthat.tv) to add vertical or horizontal scrolling based effects to elements. [Optimized](https://parallax-controller.v1.damnthat.tv/docs/performance) to _reduce_ jank on scroll and works with SSR and SSG rendered React apps.

If you're coming from [V2](https://github.com/jscottsmith/react-scroll-parallax/tree/v2.4.2), here's a [migration guide](/docs/migration-guides/v2-migration-guide).

## Install (v3 beta)

With npm

```
npm i react-scroll-parallax@beta --save
```

or yarn

```
yarn add react-scroll-parallax@beta
```

## Getting Started

- [Usage](/docs/usage/)

### Docs: Components

- [`<Parallax>`](/docs/usage/components/parallax-component)
- [`<ParallaxBanner>`](/docs/usage/components/parallax-banner-component)
- [`<ParallaxProvider>`](/docs/usage/components/parallax-provider)

### Docs: Hooks

- [`useParallax()`](/docs/usage/components/use-parallax-hook.md)
- [`useController()`](/#todo)
- [`useParallaxImage`](/#todo)
