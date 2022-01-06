# React Scroll Parallax

[![npm version](https://badge.fury.io/js/react-scroll-parallax.svg)](https://badge.fury.io/js/react-scroll-parallax) [![Build Status](https://travis-ci.org/jscottsmith/react-scroll-parallax.svg?branch=master)](https://travis-ci.org/jscottsmith/react-scroll-parallax) [![codecov](https://codecov.io/gh/jscottsmith/react-scroll-parallax/branch/master/graph/badge.svg)](https://codecov.io/gh/jscottsmith/react-scroll-parallax)

React components to create parallax scroll effects for banners, images or any other DOM elements. Uses a single scroll listener to add vertical or horizontal scrolling based offsets to elements based on their position in the viewport. [Optimized](#optimizations-to-reduce-jank) to _reduce_ jank on scroll and works with universal (server-side rendered) React apps.

If you're coming from [v1](https://github.com/jscottsmith/react-scroll-parallax/tree/v1), here's a [migration guide](https://github.com/jscottsmith/react-scroll-parallax/blob/master/docs/migration-guide.md).

## Examples

-   [Storybook](https://react-scroll-parallax-next.surge.sh)
-   [Demo 1](https://jscottsmith.github.io/react-scroll-parallax-examples/examples/parallax-example/) - [Source](https://github.com/jscottsmith/react-scroll-parallax-examples)
-   [Demo 2](https://react-scroll-parallax.netlify.com/) - [Source](https://github.com/jscottsmith/react-parallax-site)

## Install

With npm

```
npm i react-scroll-parallax --save
```

or yarn

```
yarn add react-scroll-parallax
```

## Test the Latest Version

A new `beta` version is in the works that offers a simpler setup but more flexibility for advanced scroll effects. You can find more information here or leave feedback: [V3 Issue](https://github.com/jscottsmith/react-scroll-parallax/issues/123).

```
yarn add react-scroll-parallax@beta
```

## Overview

-   [Usage](#usage)
-   [`<Parallax>`](#parallax)
    -   [Parallax Props](#parallax-props)
-   [`<ParallaxBanner>`](#parallaxbanner)
    -   [Banner Usage](#banner-usage)
    -   [Banner Props](#banner-props)
    -   [Banner Layers Prop](#banner-layers-prop)
-   [`<ParallaxProvider>`](#parallaxprovider)
    -   [ParallaxProvider Props](#parallaxprovider-props)
    -   [Parallax Controller Context](#parallax-controller-context)
    -   [Available Methods](#available-methods)
-   [Browser Support](#browser-support)
-   [Optimizations to Reduce Jank](#optimizations-to-reduce-jank)
    -   [PSA](#psa)

## Usage

The [`<ParallaxProvider>`](#parallaxprovider) should wrap the component tree that contains all `<Parallax>` components. This should be a top level component like `<AppContainer>`. For example:

```jsx
import { ParallaxProvider } from 'react-scroll-parallax';

class AppContainer extends Component {
    render() {
        return (
            <ParallaxProvider>
                <App />
            </ParallaxProvider>
        );
    }
}
```

Import the `Parallax` component and use it anywhere within the provider like so:

```jsx
import { Parallax } from 'react-scroll-parallax';

const ParallaxImage = () => (
    <Parallax className="custom-class" y={[-20, 20]} tagOuter="figure">
        <Image src="/image.jpg" />
    </Parallax>
);
```

**Warnings:**

1. This lib was designed to be used on `relative` or `absolute` positioned elements that scroll naturally with the page. If you use `fixed` positioning on either the element itself or the parent you will encounter issues. More on that in [troubleshooting](#troubleshooting).
2. Scroll state and positions of elements on the page are cached for performance reasons. This means that if the page height changes (most likely from [images loading](#example-usage-of-context)) after `<Parallax />` components are mounted the controller won't properly determine when the elements are in view. To correct this you can call the `parallaxController.update()` method from any child component of the `<ParallaxProvider />` via context and the `withController()` HOC. More details on how here: [Parallax Controller Context](#parallax-controller-context).

## \<Parallax>

The main component for manipulating a DOM element's position based on it's position within the viewport.

### Parallax Props

The following are all props that can be passed to the `<Parallax>` component:

| Name           |              Type               | Default  | Description                                                                                                                          |
| -------------- | :-----------------------------: | :------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **x**          | `Array` of `String` or `Number` | `[0, 0]` | Initial and final offsets on x-axis in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements width. |
| **y**          | `Array` of `String` or `Number` | `[0, 0]` | Initial and final offsets on y-axis in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements width. |
| **className**  |            `String`             |          | Optionally pass additional class names to be added to the outermost parallax element.                                                |
| **disabled**   |            `Boolean`            | `false`  | Disables parallax effects on individual elements when `true`.                                                                        |
| **styleInner** |            `Object`             |          | Optionally pass a style object to be added to the innermost parallax element.                                                        |
| **styleOuter** |            `Object`             |          | Optionally pass a style object to be added to the outermost parallax element.                                                        |
| **tagInner**   |            `String`             | `div`    | Optionally pass an element tag name to be applied to the innermost parallax element.                                                 |
| **tagOuter**   |            `String`             | `div`    | Optionally pass an element tag name to be applied to the outermost parallax element.                                                 |

## \<ParallaxBanner>

Component that utilizes `<Parallax>` components to achieve a parallaxing banner effect. Allows a single or multiple images to be parallaxed at different rates within the banner area.

### Banner Usage

Use the `layers` prop to indicate all images, offset amounts, and scroll rates. Optionally pass additional children to be rendered. Styles of the outermost banner element can also be changed. Here's an example:

```jsx
<ParallaxBanner
    className="your-class"
    layers={[
        {
            image: 'https://foo.com/foo.jpg',
            amount: 0.1,
        },
        {
            image: 'https://foo.com/bar.png',
            amount: 0.2,
        },
    ]}
    style={{
        height: '500px',
    }}
>
    <h1>Banner Children</h1>
</ParallaxBanner>
```

### Banner Props

The following are all props that can be passed to the `<ParallaxBanner>` component:

| Name          |   Type    | Default | Description                                                                                                                                |
| ------------- | :-------: | :------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **className** | `String`  |         | Optionally pass additional class names to be added to the outermost parallax banner element.                                               |
| **disabled**  | `Boolean` | `false` | Determines if the internal parallax layers will have offsets applied.                                                                      |
| **layers**    |  `Array`  |         | A required `Array` of `Objects` with layer properties: `[{ amount: 0.1, image: 'foo.jpg' }]`. [See layers prop below](#banner-layers-prop) |
| **style**     | `Object`  |         | Optionally pass a style object to be added to the outermost parallax banner element.                                                       |

### Banner Layers Prop

The `layers` prop takes an array of objects that will represent each image (or custom children) of the parallax banner. The following properties describe a layer object:

| Name         |   Type    | Default | Description                                                                                                                                              |
| ------------ | :-------: | :------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **amount**   | `Number`  |         | A value from `-1` to `1` that represents the vertical offset to be applied to the current layer, `0.1` would equal a `10%` offset on the top and bottom. |
| **children** | `Element` |         | Custom layer children provided as a React element, for example `<Video />`                                                                               |
| **expanded** | `Boolean` | `true`  | Indicate if the layer should be expanded with negative top/bottom margins so the edges will never be visible.                                            |
| **image**    | `String`  |         | Image source that will be applied as a CSS background image on the layer.                                                                                |
| **props**    | `Object`  |         | Props to apply to the layer element. Example: `{ props: style: { background: 'red' }}`                                                                   |

## \<ParallaxProvider>

The `<ParallaxProvider />` component is meant to wrap a top level component in your application and is necessary to provide access though React context API to the parallax controller. This component should only be used once in you app, for instance in an `<AppContainer />` component that won't be mounted/unmounted during route changes. Like so:

```jsx
const AppContainer = () => (
    <ParallaxProvider>
        <Router>
            <App />
        </Router>
    </ParallaxProvider>
);
```

### ParallaxProvider Props

The following props configure the `<ParallaxProvider>` component:

| Name                |   Type    | Default    | Description                                                                                                  |
| ------------------- | :-------: | :--------- | ------------------------------------------------------------------------------------------------------------ |
| **scrollAxis**      | `String`  | `vertical` | Optionally pass the scroll axis for setting horizontal/vertical scrolling. One of `vertical` or `horizontal` |
| **scrollContainer** | `Element` | `<body>`   | Optionally set the container that has overflow and will contain parallax elements. Defaults to the HTML body |

### Parallax Controller Context

Access the controller via [React context](https://facebook.github.io/react/docs/context.html) in any components rendered within a `<ParallaxProvider>` by using the `withController()` HOC:

```jsx

import { withController } from 'react-scroll-parallax';

class MyComponent extends Component {
    static propTypes = {
        parallaxController: PropTypes.object,
    };

    doSomething() {
        const { parallaxController } = this.props;
        // do stuff with `parallaxController`
    }
}

// Compose your component with the Higher Order Component
export withController(MyComponent);

```

Also `parallaxController` is accessible using `useController()` [React hook](https://reactjs.org/docs/hooks-intro.html) in components without writing a class or wrapping them in HOC.

```jsx
import { useController } from 'react-scroll-parallax';

const MyComponent = () => {
    const { parallaxController } = useController();
    // do stuff with `parallaxController`

    return <div />;
};
```

### Available Methods

Access the following methods on `parallaxController` via context:

**`update()`**

Updates all cached attributes for parallax elements then updates their positions.

**`destroy()`**

Removes window scroll and resize listeners then resets all styles applied to parallax elements.

### Example usage of context

The most common use case that would require access to the controller is dealing with images. Since the controller caches attributes for performance they will need to be updated with the correct values once the image loads. Here's an example of how you could do that with an `<Image />` component:

```jsx
import { withController } from 'react-scroll-parallax';

class Image extends Component {
    handleLoad = () => {
        // updates cached values after image dimensions have loaded
        this.props.parallaxController.update();
    };

    render() {
        return <img src={this.props.src} onLoad={this.handleLoad} />;
    }
}

export withController(Image);
```

If your parallax components are stuck and acting weird, this is most likely due to the fact that your page initial scroll was not at the top on load. Here's a possible solution to this problem using `useController()` hook. It can be used in your application top level component or specifically in the part of your application where you are experiencing problems.

```jsx
const ParallaxCache = () => {
    const { parallaxController } = useController();

    useLayoutEffect(() => {
        const handler = () => parallaxController.update();
        window.addEventListener('load', handler);
        return () => window.removeEventListener('load', handler);
    }, [parallaxController]);

    return null;
};

// <ParallaxCache /> now can be used anywhere you have problems with cached attributes
```

## Troubleshooting

If you're encountering issues like the parallax element jumping around or becoming stuck, there's a few likely culprits. Since this lib caches important positioning states it's possible for these to be outdated and incorrect. The most likely cause for this type of problem is the result of images loading and increasing the height of an element and/or the page. This can be fixed easily by [updating the cache](#example-usage-of-context). Another likely issue is the CSS positioning applied to the parent or parallax element itself is `fixed`. Fixed positioning parallax elements is currently not supported and may appear to work in some cases but break in others. Avoid using `position: fixed` and instead use `static`, `relative` or `absolute`, which this lib was designed to support. If none of these are relevant and you still have trouble please post an issue with your code or a demo that reproduces the problem.

## Browser Support

React scroll parallax should support the last two versions of all major browsers and has been tested on desktop Chrome, Firefox, Safari, Edge and IE11, as well as the following for mobile: iOS 9, iOS 10, Android 4. While this lib may work on mobile browsers I do not recommend it in most cases for UX reasons. If you encounter any errors for browsers that should be supported please post an issue.

## Optimizations to Reduce Jank

React Scroll Parallax uses a single [passive scroll listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners) (dependent on browser support) with the minimal amount of work done on the scroll event to prevent [jank](http://jankfree.org/) (calculations that cause layout, reflow and paint are cached initially and only updated when layout changes). Request animation frame is then used to decouple the scroll handler and further reduce jank. All offsets are applied with 3D transforms to utilize the GPU and prevent paints. If you have ideas to further optimize scrolling please PR or post an issue.

### **PSA**

Even with these optimizations scroll effects can cause jank. If you use this lib make sure to keep images small and optimized, reduce the number of moving elements in view and on the page in total, and disable scroll effects on mobile devices. That should keep scrolling smooth and users happy.
