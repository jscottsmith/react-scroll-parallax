# React Scroll Parallax

Provides a React component and single global passive scroll listener to add **vertical** scroll based offsets to elements based on their position in the viewport. Works with server side rendering and universal react apps.

## Examples

[Example](https://jscottsmith.github.io/react-scroll-parallax/examples/parallax-example/)

[Parallax Testing](https://jscottsmith.github.io/react-scroll-parallax/examples/parallax-test/)

## Install

```
npm i react-scroll-parallax
```

## Usage

Import `ParallaxScroller` on the client side and call `ParallaxScroller.init()` to create the global singleton `ParallaxScrollListener` which will handle updating all parallax elements on scroll.

```
import { ParallaxScroller } from 'react-scroll-parallax';

ParallaxScroller.init();
```

Import the `Parallax` component...

```
import { Parallax } from 'react-scroll-parallax';
```

... then use it like so:

```
<Parallax
    className="custom-class"
    offsetYMax={20}
    offsetYMin={-20}
    slowerScrollRate
    tag="figure"
>
    <img src="/image" />
</Parallax>
```

## Parallax Component API

**`className`**

- string

Optionally pass additional class names to be added to the parallax element.

**`disabled`**

- boolean
- default `false`

Determines if the component will have parallax offsets applied. If `true` parallax styles are completely removed from the element and it is no longer updated.

**`offsetXMax`**

- number or string
- default `0`

Maximum **x** offset in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements width.

**`offsetXMin`**

- number or string
- default `0`

Minimum **x** offset in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements width.

**`offsetYMax`**

- number or string
- default `0`

Maximum **y** offset in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements height.

**`offsetYMin`**

- number or string
- default `0`

Minimum **y** offset in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements height.

**`slowerScrollRate`**

- boolean
- default `false`

Determines whether the scroll rate of the component will move faster or slower than the default rate of scroll.

**`tag`**

- string
- default `div`

Optionally pass a tag name to be applied to the outer most parallax element.


## Development

Install node modules and start webpack:

`npm i`

`npm run dev`

Run dev server:

`npm run dev-server`

Run Jest tests:

`npm run test`


## Optimizations to reduce Jank and keep scrolling smooth

React Scroll Parallax uses a single [passive scroll listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners) (dependent on browser support) with the minimal amount of work done on the scroll event to prevent [jank](http://jankfree.org/) (calculations that cause layout, reflow and paint are cached initially and only updated when layout changes). Request animation frame is then used to decouple the scroll handler and further reduce jank. All offsets are applied with 3D transforms to utilize the GPU and prevent paints. If you have ideas to further optimize scrolling please PR or post an issue.

**PSA**

It's 2017 and you probably shouldn't be building parallax sites—but if you do (like I did) and you use this package try and use it responsibly. Keep images small and optimized. Reduce the number of moving elements in view and on the page. Disable scroll effects on mobile devices. Just keep things performant and animation silky smooth.



