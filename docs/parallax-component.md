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

All props for creating effects are defined by a _start_ and _end_ value represented by an `array` -- for example: `[start, end]`.

- The _start_ of an effect begins when the element's original position enters the viewport -- the top of the element enters the bottom of the view.
- The _end_ of an effect begins when the element's original position exits the viewport -- the bottom of the element exits the top of the view.

The following are all props that can be passed to the `<Parallax>` component:

| Name           |           Type           | Default | Description                                                                                                                                  |
| -------------- | :----------------------: | :------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **speed**      |         `number`         |         | A value representing the elements scroll speed. If less than zero scroll will appear slower. If greater than zero scroll will appear faster. |
| **translateX** | `string[]` or `number[]` |         | Start and end translation on x-axis in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements width.         |
| **translateY** | `string[]` or `number[]` |         | Start and end translation on y-axis in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements height.        |
| **rotate**     | `string[]` or `number[]` |         | Start and end rotation on z-axis in `deg`, `rad`, or `turn`. If no unit is passed `deg` is assumed.                                          |
| **rotateX**    | `string[]` or `number[]` |         | Start and end rotation on x-axis in `deg`, `rad`, or `turn`. If no unit is passed `deg` is assumed.                                          |
| **rotateY**    | `string[]` or `number[]` |         | Start and end rotation on y-axis in `deg`, `rad`, or `turn`. If no unit is passed `deg` is assumed.                                          |
| **rotateZ**    | `string[]` or `number[]` |         | Start and end rotation on z-axis in `deg`, `rad`, or `turn`. If no unit is passed `deg` is assumed.                                          |
| **scale**      |        `number[]`        |         | Start and end scale on x-axis and y-axis.                                                                                                    |
| **scaleX**     |        `number[]`        |         | Start and end scale on x-axis.                                                                                                               |
| **scaleY**     |        `number[]`        |         | Start and end scale on y-axis.                                                                                                               |
| **scaleZ**     |        `number[]`        |         | Start and end scale on z-axis.                                                                                                               |
| **className**  |         `string`         |         | Optionally pass additional class names to be added to the outermost parallax element.                                                        |
| **disabled**   |        `boolean`         | `false` | Disables parallax effects on individual elements when `true`.                                                                                |
| **styleInner** |         `object`         |         | Optionally pass a style object to be added to the innermost parallax element.                                                                |
| **styleOuter** |         `object`         |         | Optionally pass a style object to be added to the outermost parallax element.                                                                |
| **tagInner**   |         `string`         | `div`   | Optionally pass an element tag name to be applied to the innermost parallax element.                                                         |
| **tagOuter**   |         `string`         | `div`   | Optionally pass an element tag name to be applied to the outermost parallax element.                                                         |
