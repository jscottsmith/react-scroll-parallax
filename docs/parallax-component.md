# \<Parallax>

The main component for applying scroll effects based on an elements position within the viewport.

```jsx
import { Parallax } from 'react-scroll-parallax';
```

## Speed Control

The `speed` prop that will make an element's scroll speed appear to speed up or slow down. This is the simplest way to achieve a parallax effect.

```jsx
const SlowAndFast = () => (
  <>
    <Parallax speed={-5}>
      <div className="slow" />
    </Parallax>
    <Parallax speed={5}>
      <div className="fast" />
    </Parallax>
  </>
);
```

**NOTE:** The `speed` prop simplifies the application of a `translateX` or `translateY` effect based on the `ParallaxController` scroll axis [TODO](#link)

## Translate Controls

If you need more fine tune control of the scroll position you can apply start and end transforms more directly. In this example the element begins with a `translateY(-20%)` and ends with `translateY(10%)`

```jsx
const TranslateY = () => (
  <Parallax translateY={[-20, 10]}>
    <div className="my-thing" />
  </Parallax>
);
```

**NOTE:** Translate values without units default to `%` so `-20` becomes `-20%`.

## Props

The following are all props that can be passed to the `<Parallax>` component:

- [Props: Configuration](#props-configuration)
- [Props: CSS Effects](#props-css-effects)
  - [Easing Presets](#easing-presets)
  - [Cubic Bezier Easing Function](#cubic-bezier-easing-function)
- [Props: Callbacks](#props-callbacks)

### Props: Configuration

| Name           |          Type          | Default | Description                                                                                                                                                                                        |
| -------------- | :--------------------: | :------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **speed**      |        `number`        |         | A value representing the elements scroll speed. If less than zero scroll will appear slower. If greater than zero scroll will appear faster.                                                       |
| **easing**     | `string` or `number[]` |         | String representing an [easing preset](#easing-presets) or array of params to supply to a [cubic bezier easing function](#cubic-bezier-easing-function).                                           |
| **rootMargin** |        `object`        |         | Margin to be applied as the bounds around an element. This will affect when an element is determined to be considered in the viewport. Example: `{ top: 100, right: 100, bottom: 100, left: 100 }` |
| **className**  |        `string`        |         | Optionally pass additional class names to be added to the outermost parallax element.                                                                                                              |
| **disabled**   |       `boolean`        | `false` | Disables parallax effects on individual elements when `true`.                                                                                                                                      |
| **styleInner** |        `object`        |         | Optionally pass a style object to be added to the innermost parallax element.                                                                                                                      |
| **styleOuter** |        `object`        |         | Optionally pass a style object to be added to the outermost parallax element.                                                                                                                      |
| **tagInner**   |        `string`        | `div`   | Optionally pass an element tag name to be applied to the innermost parallax element.                                                                                                               |
| **tagOuter**   |        `string`        | `div`   | Optionally pass an element tag name to be applied to the outermost parallax element.                                                                                                               |

### Props: CSS Effects

All props for creating CSS effects are defined by a **_start_** and **_end_** value represented by an `array`

```jsx
<Parallax scale={[start, end]}`/>
```

The **_start_** of an effect begins when the element's original position enters the viewport.

- The top of the element enters the bottom of the view.

The **_end_** of an effect begins when the element's original position exits the viewport.

- the bottom of the element exits the top of the view.

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

#### Easing Presets

The following easing values are preset and can be used as easing

```jsx
<Parallax easing="easeInCubic" />
```

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

#### Cubic Bezier Easing Function

Just like with CSS `cubic-bezier(0.2,-0.67,1,-0.62);`, you can supply the 4 params to a custom bezier function.

```jsx
<Parallax easing={[0.2, -0.6, 1, -0.6]} />
```

### Props: Callbacks

| Name                 |    Type    | Description                                                           |
| -------------------- | :--------: | --------------------------------------------------------------------- |
| **onProgressChange** | `function` | Callback for when the progress of an element in the viewport changes. |
| **onEnter**          | `function` | Callback for when an element enters the viewport.                     |
| **onExit**           | `function` | Callback for when an element exits the viewport.                      |
