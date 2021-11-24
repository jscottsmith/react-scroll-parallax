# \<Parallax>

The main component for manipulating a DOM element's position based on it's position within the viewport.

## Example

```jsx
import { Parallax } from 'react-scroll-parallax';

const VerticalParallax = () => (
  <Parallax y={[-20, 20]}>
    <div className="my-thing" />
  </Parallax>
);
```

## Parallax Props

The following are all props that can be passed to the `<Parallax>` component:

| Name           |           Type           | Default  | Description                                                                                                                           |
| -------------- | :----------------------: | :------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **x**          | `string[]` or `number[]` | `[0, 0]` | Start and end translation on x-axis in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements width.  |
| **y**          | `string[]` or `number[]` | `[0, 0]` | Start and end translation on y-axis in `%` or `px`. If no unit is passed percent is assumed. Percent is based on the elements height. |
| **className**  |         `string`         |          | Optionally pass additional class names to be added to the outermost parallax element.                                                 |
| **disabled**   |        `boolean`         | `false`  | Disables parallax effects on individual elements when `true`.                                                                         |
| **styleInner** |         `object`         |          | Optionally pass a style object to be added to the innermost parallax element.                                                         |
| **styleOuter** |         `object`         |          | Optionally pass a style object to be added to the outermost parallax element.                                                         |
| **tagInner**   |         `string`         | `div`    | Optionally pass an element tag name to be applied to the innermost parallax element.                                                  |
| **tagOuter**   |         `string`         | `div`    | Optionally pass an element tag name to be applied to the outermost parallax element.                                                  |
