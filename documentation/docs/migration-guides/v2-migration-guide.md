---
sidebar_position: 1
---

# V2 Migration Guide

With mostly just new features, V3 also makes a few breaking changes. See the following and migrate any code that is affected.

### Prop changes for <Parallax\>

If you've used any of the following props rename to new ones, or refactor if they are no longer supported.

1. `x` becomes `translateX`.
2. `y` becomes `translateY`.
3. `styleOuter` becomes `style`.
4. `styleInner` is no longer supported - There's only a single element returned by the component.
5. `tagOuter` is no longer supported - If you need a custom element use the `useParallax` hook instead.
6. `tagInner` is no longer supported - There's only a single element returned by the component.

### Using the useController hook.

1. The hook `useController` has been renamed to `useParallaxController`.
2. The hook returns the instance of the controller directly.

If you used the following:

```js
const { parallaxController } = useController();
```

change it to:

```js
const parallaxController = useParallaxController();
```

### Prop changes for <ParallaxBanner\>

Layers now accept all [parallax props](/docs/usage/parallax-props) but you will need to update if you used the `layer.amount` prop.

1. `layer.amount` is no longer supported. Try `speed` or any new parallax props.
2. `layer.props` is no longer supported. If you need to add props to the layer DOM element just define them in the `layer`.
3. All `HTMLElement` props are now spread to the root element.

### Removed default class names

If you relied on either the `parallax-outer`, `parallax-inner`, `parallax-banner` or `parallax-banner-layer-[x]` class names for styling you will need to refactor or set them manually.
