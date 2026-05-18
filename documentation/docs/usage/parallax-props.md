---
sidebar_position: 1
---

# Parallax Props

The following hooks and components accept the parallax prop configurations that setup scroll effects in the [Parallax Controller](https://parallax-controller.v1.damnthat.tv/docs/usage/props).

- [`useParallax()`](/docs/usage/hooks/use-parallax)
- [`<Parallax>`](/docs/usage/components/parallax-component)
- [`<ParallaxBanner>`](/docs/usage/components/parallax-banner-component)

Example with: **`useParallax()`**

```ts
useParallax({
  speed: -10,
  ...props,
});
```

Example with: **`<Parallax />`**

```tsx
<Parallax speed={-10} {...props} />
```

Example with **`<ParallaxBanner />`**

```tsx
<Parallax
  layers={[
    {
      speed: -10,
      ...props,
    },
  ]}
/>
```

## Configuration Props

The following properties can be provided to configure the scroll animation:

| Name                                 |          Type          | Default | Description                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------ | :--------------------: | :------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **speed**                            |        `number`        |         | A value representing the elements scroll speed. If less than zero scroll will appear slower. If greater than zero scroll will appear faster.                                                                                                                                                                                                                                             |
| **easing**                           | `string`               |         | CSS [timing function](#timing-functions) string (e.g. `ease-in-out` or `cubic-bezier(...)`) applied to all CSS effects.                                                                                                                                                                                                                                                                    |
| **rootMargin**                       |        `object`        |         | Margin to be applied as the bounds around an element. This will affect when an element is determined to be in the viewport. Example: `{ top: 100, right: 100, bottom: 100, left: 100 }`. N.B. You must provide all fields of the rootMargin object for this to work properly, even if those values are 0. Example:✅ `{ top: 0, right: 0, bottom: 100, left: 0 }`, ❌ `{ bottom: 100 }`. |
| **disabled**                         |       `boolean`        | `false` | Disables parallax effects on individual elements when `true`.                                                                                                                                                                                                                                                                                                                            |
| **shouldAlwaysCompleteAnimation**    |       `boolean`        | `false` | Always start and end animations at the given effect values - if the element is positioned inside the view when scroll is at zero or ends in view at final scroll position, the initial and final positions are used to determine progress instead of the scroll view size.                                                                                                               |
| **shouldDisableScalingTranslations** |       `boolean`        | `false` | Enable scaling translations - translate effects that cause the element to appear in the view longer must be scaled up so that animation doesn't end early.                                                                                                                                                                                                                               |
| **startScroll**                      |        `number`        |         | Scroll top value to begin the animation. When provided along with `endScroll` relative scroll values will be ignored.                                                                                                                                                                                                                                                                    |
| **endScroll**                        |        `number`        |         | Scroll top value to end the animation. When provided along with `startScroll` relative scroll values will be ignored.                                                                                                                                                                                                                                                                    |
| **targetElement**                    |     `HTMLElement`      |         | Provides an element to track and determine the scroll progress. Use when scroll progress should be independent of parallax element's original position. See [storybook for example](https://react-scroll-parallax-v3.surge.sh/?path=/story/components-parallax-vertical-scroll--with-defined-target-element).                                                                            |

## CSS Effect Props

All props for creating CSS effects are defined by a **start** and **end** value represented by an `array`.

```ts
useParallax({
  translateY: [-100, 100],
});
```

### How Effects Progress

The **start** of an effect begins when the top of the element enters the bottom of the view.

The **end** of an effect begins when the bottom of the element exits the top of the view.

:::info

See a demo of [how progress is determined](/docs/examples/how-it-works#progress-is-relative-to-the-view).

:::

### Available CSS Effects

These are all the supported CSS effects:

| Name           |           Type           | Description                                                                                                                                       |
| -------------- | :----------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **translateX** | `string[]` or `number[]` | Start and end translation on x-axis in `%`, `px`, `vw` or `vh`. If no unit is passed percent is assumed. Percent is based on the elements width.  |
| **translateY** | `string[]` or `number[]` | Start and end translation on y-axis in `%`, `px`, `vw` or `vh`. If no unit is passed percent is assumed. Percent is based on the elements height. |
| **rotate**     | `string[]` or `number[]` | Start and end rotation on z-axis in `deg`, `rad`, or `turn`. If no unit is passed `deg` is assumed.                                               |
| **rotateX**    | `string[]` or `number[]` | Start and end rotation on x-axis in `deg`, `rad`, or `turn`. If no unit is passed `deg` is assumed.                                               |
| **rotateY**    | `string[]` or `number[]` | Start and end rotation on y-axis in `deg`, `rad`, or `turn`. If no unit is passed `deg` is assumed.                                               |
| **rotateZ**    | `string[]` or `number[]` | Start and end rotation on z-axis in `deg`, `rad`, or `turn`. If no unit is passed `deg` is assumed.                                               |
| **scale**      |        `number[]`        | Start and end scale on x-axis and y-axis.                                                                                                         |
| **scaleX**     |        `number[]`        | Start and end scale on x-axis.                                                                                                                    |
| **scaleY**     |        `number[]`        | Start and end scale on y-axis.                                                                                                                    |
| **scaleZ**     |        `number[]`        | Start and end scale on z-axis.                                                                                                                    |
| **opacity**    |        `number[]`        | Start and end opacity value.                                                                                                                      |

## Callback Props

Example using `onChange` callback

```ts
useParallax({
  onChange: (element) => console.log(element),
});
```

All available callbacks:

| Name                 |    Type    | Description                                                                                                  |
| -------------------- | :--------: | ------------------------------------------------------------------------------------------------------------ |
| **onProgressChange** | `function` | Callback for when the progress of an element in the viewport changes.                                        |
| **onChange**         | `function` | Callback for when the progress of an element in the viewport changes and includes the Element as a parameter |
| **onEnter**          | `function` | Callback for when an element enters the viewport.                                                            |
| **onExit**           | `function` | Callback for when an element exits the viewport.                                                             |

## Timing Functions

Set a CSS timing function on the `easing` prop. Use standard keywords or a `cubic-bezier(...)` string (WAAPI accepts the same values as CSS).

```ts
useParallax({
  easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)', // formerly "easeInCubic"
});
```

Common timing functions:

| Keyword (legacy name) | Timing function |
| --------------------- | --------------- |
| `ease` | `ease` |
| `easeIn` | `ease-in` |
| `easeOut` | `ease-out` |
| `easeInOut` | `ease-in-out` |
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

Named exports are also available from `react-scroll-parallax` (e.g. `easeInCubic`).

### Easing Individual Effects

Pass a timing function as the third element in an effect tuple:

```ts
useParallax({
  translateY: [-100, 100, 'ease-in-out'],
  scale: [0, 1, 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'],
});
```

### Cubic Bezier Easing Function

Provide a full `cubic-bezier(...)` string on `easing` or on an effect tuple:

```ts
useParallax({
  translateY: [-100, 100],
  easing: 'cubic-bezier(0.2, -0.6, 1, -0.6)',
});
```
