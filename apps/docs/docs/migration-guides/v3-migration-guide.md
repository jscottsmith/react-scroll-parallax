---
sidebar_position: 2
---

# V3 Migration Guide

V3 aligns the public API with scroll-driven WAAPI behavior. If you used legacy easing presets, per-effect tuple easing, or `rootMargin`, update your code as described below.

## Breaking change: `easing` must be a WAAPI/CSS timing value

### What changed

`easing` no longer accepts legacy preset strings such as:
- `easeInQuad`, `easeInCubic`, `easeOutBack`, etc.
- (those preset strings are **not** valid CSS `animation-timing-function` values, so WAAPI can’t interpret them)

### What to use instead

Pass a valid CSS/WAAPI timing value directly:

**Timing keywords**
- `linear`
- `ease`
- `ease-in`
- `ease-out`
- `ease-in-out`
- `step-start`
- `step-end`

**Cubic-bezier**
- `cubic-bezier(x1, y1, x2, y2)`

### Quick examples

```ts
// before (legacy preset string)
easing: 'easeInQuad'

// after (WAAPI timing function)
easing: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)'
```

```ts
// before
easing: 'easeInOutCubic'

// after
easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
```

## Breaking change: per-effect tuple easing (the 3rd entry) is removed

### What changed

Previously you could pass an easing as the 3rd element of translation/transform tuples:

```ts
translateY: [from, to, 'easeInOut']
```

That 3rd entry is **not applied** by the current scroll-driven WAAPI keyframe implementation.
In V3 the tuple form is removed—your effect arrays must now be 2 items only:

```ts
translateY: [from, to]
scale: [from, to]
rotate: [from, to]
```

### If you need different easing

Create multiple parallax instances and set the top-level `easing` prop on each one.

## Breaking change: `rootMargin` is removed

### What changed

The `rootMargin` prop is no longer supported. It previously adjusted measured element bounds to change when scroll progress was calculated.

### What to use instead

- Use [`startScroll` and `endScroll`](/docs/usage/parallax-props#configuration-props) for explicit scroll-range control.
- Use [`targetElement`](/docs/usage/parallax-props#configuration-props) to drive progress from another element’s visibility.
- Use [`shouldAlwaysCompleteAnimation`](/docs/usage/parallax-props#configuration-props) when the element should complete its effect range even when it starts or ends inside the viewport.

```ts
// before
{ rootMargin: { top: 100, right: 100, bottom: 100, left: 100 } }

// after — pick the approach that matches your layout
{ startScroll: 0, endScroll: 1200 }
// or
{ targetElement: document.getElementById('scroll-target') }
```

## Legacy preset → cubic-bezier reference (from the old mapping)

If you want a direct translation from the old preset strings you can replace them with the following cubic-bezier values:

| Legacy preset | Use this in V3 |
| --- | --- |
| `easeInQuad` | `cubic-bezier(0.55, 0.085, 0.68, 0.53)` |
| `easeInCubic` | `cubic-bezier(0.55, 0.055, 0.675, 0.19)` |
| `easeInQuart` | `cubic-bezier(0.895, 0.03, 0.685, 0.22)` |
| `easeInQuint` | `cubic-bezier(0.755, 0.05, 0.855, 0.06)` |
| `easeInSine` | `cubic-bezier(0.47, 0, 0.745, 0.715)` |
| `easeInExpo` | `cubic-bezier(0.95, 0.05, 0.795, 0.035)` |
| `easeInCirc` | `cubic-bezier(0.6, 0.04, 0.98, 0.335)` |
| `easeOutQuad` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| `easeOutCubic` | `cubic-bezier(0.215, 0.61, 0.355, 1)` |
| `easeOutQuart` | `cubic-bezier(0.165, 0.84, 0.44, 1)` |
| `easeOutQuint` | `cubic-bezier(0.23, 1, 0.32, 1)` |
| `easeOutSine` | `cubic-bezier(0.39, 0.575, 0.565, 1)` |
| `easeOutExpo` | `cubic-bezier(0.19, 1, 0.22, 1)` |
| `easeOutCirc` | `cubic-bezier(0.075, 0.82, 0.165, 1)` |
| `easeInOutQuad` | `cubic-bezier(0.455, 0.03, 0.515, 0.955)` |
| `easeInOutCubic` | `cubic-bezier(0.645, 0.045, 0.355, 1)` |
| `easeInOutQuart` | `cubic-bezier(0.77, 0, 0.175, 1)` |
| `easeInOutQuint` | `cubic-bezier(0.86, 0, 0.07, 1)` |
| `easeInOutSine` | `cubic-bezier(0.445, 0.05, 0.55, 0.95)` |
| `easeInOutExpo` | `cubic-bezier(0.87, 0, 0.13, 1)` |
| `easeInOutCirc` | `cubic-bezier(0.785, 0.135, 0.15, 0.86)` |
| `easeInBack` | `cubic-bezier(0.6, -0.28, 0.735, 0.045)` |
| `easeOutBack` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` |
| `easeInOutBack` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` |

