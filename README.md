# React Scroll Parallax

Provides a React component and single global passive scroll listener to add **vertical** scrolling based offsets to elements based on their position in the viewport. Works with server-side rendering and universal React apps.

[View on NPM](https://www.npmjs.com/package/react-scroll-parallax)

## Examples

🔗 [Example](https://jscottsmith.github.io/react-scroll-parallax/examples/parallax-example/)

🔗 [Parallax Testing](https://jscottsmith.github.io/react-scroll-parallax/examples/parallax-test/)

## Install

⚠️ **Warning: This is a beta pre-release**

[1.0.0 Release goals](https://github.com/jscottsmith/react-scroll-parallax/issues/3)

```
npm i --save react-scroll-parallax@beta
```

## Usage

Import `ParallaxController` on the client side and call `ParallaxController.init()` to create the global `ParallaxController` which will handle updating all parallax elements on scroll.

```javascript
import { ParallaxController } from 'react-scroll-parallax';

ParallaxController.init();
```

Import the `Parallax` component...

```javascript
import { Parallax } from 'react-scroll-parallax';
```

... then use it like so:

```jsx
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

## Parallax Component Props

The following are all props that can be passed to the React `<Parallax />` component:

**`className`**

- type: `String`

Optionally pass additional class names to be added to the outer parallax element.

**`disabled`**

- type: `Boolean`
- default: `false`

Determines if the component will have parallax offsets applied. If `true` parallax styles are completely removed from the element and it is no longer updated.

**`offsetXMax`**

- type: `Number` or `String`
- default: `0`

Maximum **x** offset in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements width.

**`offsetXMin`**

- type: `Number` or `String`
- default: `0`

Minimum **x** offset in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements width.

**`offsetYMax`**

- type: `Number` or `String`
- default: `0`

Maximum **y** offset in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements height.

**`offsetYMin`**

- type: `Number` or `String`
- default: `0`

Minimum **y** offset in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements height.

**`slowerScrollRate`**

- type: `Boolean`
- default `false`

Determines whether the scroll rate of the parallax component will move faster or slower than the default rate of scroll.

**`tag`**

- type: `String`
- default `div`

Optionally pass a tag name to be applied to the outer most parallax element. For example: `<Parallax tag="figure" />`.

## Parallax Controller

The following are public methods available on the `ParallaxController` global:

**`init()`**

Initilize the `ParallaxController` on the client with the `init` static method.

**`update()`**

Updates all cached attributes for parallax elements then updates their positions.

**`destroy()`**

Removes window scroll and resize listeners, resets all styles applied to parallax elements, and sets the global `ParallaxController` to `null`.

## Development

Install node modules and start webpack:

`npm i`

Run webpack watch:

`npm run dev`

Run dev server:

`npm run dev-server`

Run Jest tests:

`npm run test`

## Optimizations to Reduce Jank

React Scroll Parallax uses a single [passive scroll listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners) (dependent on browser support) with the minimal amount of work done on the scroll event to prevent [jank](http://jankfree.org/) (calculations that cause layout, reflow and paint are cached initially and only updated when layout changes). Request animation frame is then used to decouple the scroll handler and further reduce jank. All offsets are applied with 3D transforms to utilize the GPU and prevent paints. If you have ideas to further optimize scrolling please PR or post an issue.

**PSA**

It's 2017 and you probably shouldn't be building parallax sites—but if you do (like I did) and you use this package try and use it responsibly. Keeping images small and optimized, reducing the number of moving elements in view and on the page, and disabling scroll effects on mobile devices should help achieve silky smooth animations and minimize annoying visitors.
