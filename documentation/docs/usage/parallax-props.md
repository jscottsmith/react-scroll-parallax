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

| Name                                 |          Type          | Default | Description                                                                                                                                                                                                                                                                                                  |
| ------------------------------------ | :--------------------: | :------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **speed**                            |        `number`        |         | A value representing the elements scroll speed. If less than zero scroll will appear slower. If greater than zero scroll will appear faster.                                                                                                                                                                 |
| **easing**                           | `string` or `number[]` |         | String representing an [easing preset](#easing-presets) or array of params to supply to a [cubic bezier easing function](#cubic-bezier-easing-function).                                                                                                                                                     |
| **rootMargin**                       |        `object`        |         | Margin to be applied as the bounds around an element. This will affect when an element is determined to be in the viewport. Example: `{ top: 100, right: 100, bottom: 100, left: 100 }`                                                                                                                      |
| **disabled**                         |       `boolean`        | `false` | Disables parallax effects on individual elements when `true`.                                                                                                                                                                                                                                                |
| **shouldAlwaysCompleteAnimation**    |       `boolean`        | `false` | Always start and end animations at the given effect values - if the element is positioned inside the view when scroll is at zero or ends in view at final scroll position, the initial and final positions are used to determine progress instead of the scroll view size.                                   |
| **shouldDisableScalingTranslations** |       `boolean`        | `false` | Enable scaling translations - translate effects that cause the element to appear in the view longer must be scaled up so that animation doesn't end early.                                                                                                                                                   |
| **startScroll**                      |        `number`        |         | Scroll top value to begin the animation. When provided along with `endScroll` relative scroll values will be ignored.                                                                                                                                                                                        |
| **endScroll**                        |        `number`        |         | Scroll top value to end the animation. When provided along with `startScroll` relative scroll values will be ignored.                                                                                                                                                                                        |
| **targetElement**                    |     `HTMLElement`      |         | Provides an element to track and determine the scroll progress. Use when scroll progress should be independent of parallax element's original position. See [storybook for example]https://react-scroll-parallax-v3.surge.sh/?path=/story/components-parallax-vertical-scroll--with-defined-target-element). |

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

| Name           |           Type           | Description                                                                                                                           |
| -------------- | :----------------------: | ------------------------------------------------------------------------------------------------------------------------------------- |
| **translateX** | `string[]` or `number[]` | Start and end translation on x-axis in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements width.  |
| **translateY** | `string[]` or `number[]` | Start and end translation on y-axis in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements height. |
| **rotate**     | `string[]` or `number[]` | Start and end rotation on z-axis in `deg`, `rad`, or `turn`. If no unit is passed `deg` is assumed.                                   |
| **rotateX**    | `string[]` or `number[]` | Start and end rotation on x-axis in `deg`, `rad`, or `turn`. If no unit is passed `deg` is assumed.                                   |
| **rotateY**    | `string[]` or `number[]` | Start and end rotation on y-axis in `deg`, `rad`, or `turn`. If no unit is passed `deg` is assumed.                                   |
| **rotateZ**    | `string[]` or `number[]` | Start and end rotation on z-axis in `deg`, `rad`, or `turn`. If no unit is passed `deg` is assumed.                                   |
| **scale**      |        `number[]`        | Start and end scale on x-axis and y-axis.                                                                                             |
| **scaleX**     |        `number[]`        | Start and end scale on x-axis.                                                                                                        |
| **scaleY**     |        `number[]`        | Start and end scale on y-axis.                                                                                                        |
| **scaleZ**     |        `number[]`        | Start and end scale on z-axis.                                                                                                        |
| **opacity**    |        `number[]`        | Start and end opacity value.                                                                                                          |

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

## Easing Presets

Example of setting easing:

```ts
useParallax({
  easing: 'easeInCubic',
});
```

The following easing values are preset and can be used as easing

```
ease
easeIn
easeOut
easeInOut
easeInQuad
easeInCubic
easeInQuart
easeInQuint
easeInSine
easeInExpo
easeInCirc
easeOutQuad
easeOutCubic
easeOutQuart
easeOutQuint
easeOutSine
easeOutExpo
easeOutCirc
easeInOutQuad
easeInOutCubic
easeInOutQuart
easeInOutQuint
easeInOutSine
easeInOutExpo
easeInOutCirc
easeInBack
easeOutBack
easeInOutBack
```

### Easing Individual Effects

You can provide various easing values to each effect by defining it as the third element in the array

```ts
useParallax({
  translateY: [-100, 100, 'easeInOut'],
  scale: [0, 1, 'easeOutBack'],
});
```

### Cubic Bezier Easing Function

Just like with CSS `cubic-bezier(0.2,-0.67,1,-0.62);`, you can supply the 4 params to a custom bezier function.

```ts
useParallax({
  translateY: [-100, 100],
  easing: [0.2, -0.6, 1, -0.6],
});
```
