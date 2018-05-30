# React Scroll Parallax

[![npm version](https://badge.fury.io/js/react-scroll-parallax.svg)](https://badge.fury.io/js/react-scroll-parallax) [![Build Status](https://travis-ci.org/jscottsmith/react-scroll-parallax.svg?branch=master)](https://travis-ci.org/jscottsmith/react-scroll-parallax) [![codecov](https://codecov.io/gh/jscottsmith/react-scroll-parallax/branch/master/graph/badge.svg)](https://codecov.io/gh/jscottsmith/react-scroll-parallax)

React components to create parallax scroll effects for banners, images or any other DOM elements. Uses a single scroll listener to add **vertical** scrolling based offsets to elements based on their position in the viewport. [Optimized](#optimizations-to-reduce-jank) to _reduce_ jank on scroll and works with universal (server-side rendered) React apps.

## Examples

Some links demonstrating possible effects created with this lib:

* [Example Site](https://jscottsmith.github.io/react-scroll-parallax-examples/examples/parallax-example/)
* [Storybook](http://react-scroll-parallax-v1.surge.sh/)
* [Parallax Testing](https://jscottsmith.github.io/react-scroll-parallax-examples/examples/parallax-test/)
* [CodePen Parallax](https://codepen.io/jscottsmith/pen/eREbwz)
* [CodePen Parallax Banner](https://codepen.io/jscottsmith/pen/aVBvGj)

You can also view [the source code for these examples](https://github.com/jscottsmith/react-scroll-parallax-examples) on Github.

## Install

With npm

```
npm i react-scroll-parallax --save
```

or yarn

```
yarn add react-scroll-parallax
```

## Overview

* [Usage](#usage)
* [`<Parallax>`](#parallax)
  * [Parallax Props](#parallax-props)
* [`<ParallaxBanner>`](#parallaxbanner)
  * [Banner Usage](#banner-usage)
  * [Banner Props](#banner-props)
  * [Banner Layers Prop](#banner-layers-prop)
* [`<ParallaxProvider>`](#parallaxprovider)
  * [Parallax Controller Context](#parallax-controller-context)
  * [Available Methods](#available-methods)
* [Browser Support](#browser-support)
* [Optimizations to Reduce Jank](#optimizations-to-reduce-jank)
  * [PSA](#psa)

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
    <Parallax
        className="custom-class"
        offsetYMax={20}
        offsetYMin={-20}
        slowerScrollRate
        tag="figure"
    >
        <Image src="/image.jpg" />
    </Parallax>
);
```
**Warnings:**
1. This lib was designed to be used on `relative` or `absolute` positioned elements that scroll naturally with the page. If you use `fixed` positioning on either the element itself or the parent you will encounter issues. More on that in [troubleshooting](#troubleshooting).
2. Scroll state and positions of elements on the page are cached for performance reasons. This means that if the page height changes (most likely from [images loading](#example-usage-of-context)) after `<Parallax />` components are mounted the controller won't properly determine when the elements are in view. To correct this you can call the `parallaxController.update()` method from any child component of the `<ParallaxProvider />` via `context`. More details on how here: [Parallax Controller Context](#parallax-controller-context).

## \<Parallax>

The main component for manipulating a DOM element's position based on it's position within the viewport.

### Parallax Props

The following are all props that can be passed to the `<Parallax>` component:

| Name                 |         Type         | Default | Description                                                                                                                                                    |
| -------------------- | :------------------: | :------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **className**        |       `String`       |         | Optionally pass additional class names to be added to the outermost parallax element.                                                                          |
| **disabled**         |      `Boolean`       | `false` | Determines if the component will have parallax offsets applied. If `true` parallax styles are completely removed from the element and it is no longer updated. |
| **offsetXMax**       | `Number` or `String` | `0`     | Maximum **x** offset in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements width.                                          |
| **offsetXMin**       | `Number` or `String` | `0`     | Minimum **x** offset in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements width.                                          |
| **offsetYMax**       | `Number` or `String` | `0`     | Maximum **y** offset in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements height.                                         |
| **offsetYMin**       | `Number` or `String` | `0`     | Minimum **y** offset in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements height.                                         |
| **slowerScrollRate** |      `Boolean`       | `false` | Internally swaps the min/max offset y values of the parallax component to give the appearance of moving faster or slower than the default rate of scroll.      |
| **styleInner**       |       `Object`       |         | Optionally pass a style object to be added to the innermost parallax element.                                                                                  |
| **styleOuter**       |       `Object`       |         | Optionally pass a style object to be added to the outermost parallax element.                                                                                  |
| **tag**              |       `String`       | `div`   | Optionally pass an element tag name to be applied to the outermost parallax element.                                                                           |

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
            slowerScrollRate: false,
        },
        {
            image: 'https://foo.com/bar.png',
            amount: 0.2,
            slowerScrollRate: false,
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

| Name          |   Type    | Default | Description                                                                                                                                                         |
| ------------- | :-------: | :------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **className** | `String`  |         | Optionally pass additional class names to be added to the outermost parallax banner element.                                                                        |
| **disabled**  | `Boolean` | `false` | Determines if the internal parallax layers will have offsets applied.                                                                                               |
| **layers**    |  `Array`  |         | A required `Array` of `Objects` with layer properties: `[{ amount: 0.1, image: 'foo.jpg', slowerScrollRate: false }]`. [See layers prop below](#banner-layers-prop) |
| **style**     | `Object`  |         | Optionally pass a style object to be added to the outermost parallax banner element.                                                                                |

### Banner Layers Prop

The `layers` prop takes an array of objects that will represent each image (or custom children) of the parallax banner. The following properties describe a layer object:

| Name                 |   Type    | Default | Description                                                                                                                                          |
| -------------------- | :-------: | :------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **amount**           | `Number`  |         | A value from `0 – 1` that represents the vertical offset to be applied to the current layer, `0.1` would equal a `10%` offset on the top and bottom. |
| **children**         | `Element` |         | Custom layer children provided as a React element, for example `<Video />`                                                                           |
| **expanded**         | `Boolean` | `true`  | Indicate if the layer should be expanded with negative top/bottom margins so the edges will never be visible.                                        |
| **image**            | `String`  |         | Image source that will be applied as a CSS background image on the layer.                                                                            |
| **slowerScrollRate** | `Number`  |         | Indicates whether the layer should move faster or slower than the default rate of scroll.                                                            |

## \<ParallaxProvider>

The `<ParallaxProvider />` component is meant to wrap a top level component in your application and is necessary to provide access though React's context API to the parallax controller. This component should only be used once in you app, for instance in an `<AppContainer />` component that won't be mounted/unmounted during route changes. Like so:

```jsx
const AppContainer = () => (
    <ParallaxProvider>
        <Router>
            <App />
        </Router>
    </ParallaxProvider>
);
```

### Parallax Controller Context

Access the Parallax Controller via [React context](https://facebook.github.io/react/docs/context.html) in any components rendered within a `<ParallaxProvider>` by defining the `contextTypes` like so:

```jsx
class Foo extends Component {
    static contextTypes = {
        parallaxController: PropTypes.object.isRequired,
    };

    doSomething() {
        // do stuff with this.context.parallaxController
    }
}
```

or for stateless functional components like:

```jsx
const Bar = (props, context) => (
    // do stuff with context.parallaxController
);

Bar.contextTypes = {
    parallaxController: PropTypes.object.isRequired,
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
class Image extends Component {
    static contextTypes = {
        parallaxController: PropTypes.object.isRequired,
    };

    handleLoad = () => {
        // updates cached values after image dimensions have loaded
        this.context.parallaxController.update();
    };

    render() {
        return <img src={this.props.src} onLoad={this.handleLoad} />;
    }
}
```

## Troubleshooting

If you're encountering issues like the parallax element jumping around or becoming stuck, there's a few likely culprits. Since this lib caches important positioning states it's posible for these to be outdated and incorrect. The most likely cause for this type of problem is the result of images loading and increasing the height of an element and/or the page. This can be fixed easily by [updating the cache](#example-usage-of-context). Another likely issue is the CSS positioning applied to the parent or parallax element itself is `fixed`. Fixed positioning parallax elements is currently not supported and may appear to work in some cases but break in others. Avoid using `position: fixed` and instead use `static`, `relative` or `absolute`, which this lib was designed to support. If none of these are relevant and you still have trouble please post an issue with your code or a demo that reproduces the problem.

## Browser Support

React scroll parallax should support the last two versions of all major browsers and has been tested on desktop Chrome, Firefox, Safari, Edge and IE11, as well as the following for mobile: iOS 9, iOS 10, Android 4. While this lib may work on mobile browsers I do not recommend it in most cases for UX reasons. If you encounter any errors for browsers that should be supported please post an issue.

## Optimizations to Reduce Jank

React Scroll Parallax uses a single [passive scroll listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners) (dependent on browser support) with the minimal amount of work done on the scroll event to prevent [jank](http://jankfree.org/) (calculations that cause layout, reflow and paint are cached initially and only updated when layout changes). Request animation frame is then used to decouple the scroll handler and further reduce jank. All offsets are applied with 3D transforms to utilize the GPU and prevent paints. If you have ideas to further optimize scrolling please PR or post an issue.

### **PSA**

Even with these optimizations scroll effects can cause jank. If you use this lib make sure to keep images small and optimized, reduce the number of moving elements in view and on the page in total, and disable scroll effects on mobile devices. That should keep scrolling smooth and users happy.
