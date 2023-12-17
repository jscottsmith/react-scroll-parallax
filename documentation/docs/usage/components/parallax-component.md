---
sidebar_position: 1
---

# Parallax

The main component for applying scroll effects based on an elements position within the viewport.

```jsx
import { Parallax } from 'react-scroll-parallax';
```

## Props

All props to configure the parallax element, like CSS effects, are documented and managed by the `parallax-controller`.

[See all the parallax props](/docs/usage/parallax-props) that this component will accept.

### Non Parallax Props

All other non-parallax props will be passed through to the `<div>`. Example with `style` and `className`:

```tsx
<Parallax style={{ background: 'blue' }} className="test" />
```

```html title="Output HTML"
<div style="background: blue" className="test"></div>
```

### Children

Children are also accepted and rendered

```tsx
<Parallax>
  <h1>Hello</h1>
</Parallax>
```

## Examples

Some basic example of how to use the `<Parallax>` component.

### Speed Control

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

:::info

The `speed` prop simplifies the application of a `translateX` or `translateY` effect based on the `ParallaxController` scroll axis – [See <ParallaxProvider /> Props](/docs/usage/components/parallax-provider#parallaxprovider-props)

:::

### Translate Controls

If you need more fine tune control of the scroll position you can apply start and end transforms more directly. In this example the element begins with a `translateY(-20%)` and ends with `translateY(10%)`

```jsx
const TranslateY = () => (
  <Parallax translateY={[-20, 10]}>
    <div className="my-thing" />
  </Parallax>
);
```

:::info

Translate values without units default to `%` so `-20` becomes `-20%`.

:::
