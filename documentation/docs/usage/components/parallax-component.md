# Parallax

The main component for applying scroll effects based on an elements position within the viewport.

```jsx
import { Parallax } from 'react-scroll-parallax';
```

# Examples

Some basic example of how to use the `<Parallax>` component.

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

**NOTE:** The `speed` prop simplifies the application of a `translateX` or `translateY` effect based on the `ParallaxController` scroll axis – [See <ParallaxProvider\> Props](/docs/usage/components/parallax-provider#parallaxprovider-props)

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

# Props

## Props: Effects

Most props to configure a parallax element like CSS effects are documented and managed by the `parallax-controller`.

[See all the parallax props](https://parallax-controller.vercel.app/docs/usage/props) that this component will accept.

## Props: Component Configuration

The following props allow some configuration of the react component:

| Name          |   Type   | Default | Description                                                            |
| ------------- | :------: | :------ | ---------------------------------------------------------------------- |
| **className** | `string` |         | Class names to be added to the outermost parallax element.             |
| **style**     | `object` |         | Style object to be added to the outermost parallax element.            |
| **tag**       | `string` | `div`   | HTML element tag name to be applied to the outermost parallax element. |
