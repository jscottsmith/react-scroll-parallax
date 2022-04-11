---
sidebar_position: 3
---

# ParallaxBanner

Component that sets up layers of `useParallax` elements to achieve a parallaxing banner. Enables the layering of images, or custom markup, with scroll effects in a container that hides overflow.

```tsx
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
```

### Working Demos

See some example [code with demos](/docs/examples/banners).

## Examples

There are two ways to setup a banner:

1. You can use the `<ParallaxBanner>` [`layers`](#with-the-layers-prop) prop.
2. You can define [`ParallaxBannerLayer`](#example-with-the-parallaxbannerlayer) as the `<ParallaxBanner>` children.

### Example with the ParallaxBannerLayer

Use the `ParallaxBannerLayer` component to define the `speed` and `image` for your banner. In this case, it will create a banner using a single image, that moves slower than the rate of scroll, and the edges of the image will never be visible.

```jsx
<ParallaxBanner style={{ aspectRatio: '2 / 1' }}>
  <ParallaxBannerLayer image="https://foo.com/foo.jpg" speed={-20} />
</ParallaxBanner>
```

### Example with the layers prop

Use the `layers` to supply a `speed` and `image` to your banner. In this case, it will create a banner using a single image, that moves slower than the rate of scroll, and the edges of the image will never be visible.

```jsx
<ParallaxBanner
  layers={[
    {
      image: 'https://foo.com/foo.jpg',
      speed: -20,
    },
  ]}
  style={{ aspectRatio: '2 / 1' }}
/>
```

:::caution

You **must** define a style that gives the root `<div>` a `height` value otherwise the banner will have no height and be hidden. This can be through a `style`, through a `className`, or other method of styling.

:::

### Creating Multiple Layers

Define multiple Banner layer children with independent prop configurations.

```jsx
<ParallaxBanner style={{ aspectRatio: '2 / 1' }}>
  <ParallaxBannerLayer image="https://foo.com/foo.jpg" speed={-20} />
  <ParallaxBannerLayer image="https://foo.com/bar.jpg" speed={-10} />
</ParallaxBanner>
```

Supply the `layers` prop with additional configuration for more images. Each layer can contain unique configurations.

```jsx
<ParallaxBanner
  layers={[
    {
      image: 'https://foo.com/foo.jpg',
      speed: -20,
    },
    {
      image: 'https://foo.com/bar.png',
      speed: -10,
    },
  ]}
  style={{ aspectRatio: '2 / 1' }}
/>
```

:::caution

**Layer order matters.** First element in the the array or children will appear on the bottom of the stacking context; last layer of the array or children will appear on top.

:::

### Custom Layer Markup

This example defines a headline in the second layer.

```jsx
<ParallaxBanner style={{ aspectRatio: '2 / 1' }}>
  <ParallaxBannerLayer image="https://foo.com/foo.jpg" speed={-20} />
  <ParallaxBannerLayer>
    <h1>My Headline</h1>
  </ParallaxBannerLayer>
</ParallaxBanner>
```

You can also pass your own markup or components to the `children` property when using `layers`.

```jsx
<ParallaxBanner
  layers={[
    {
      image: 'https://foo.com/foo.jpg',
      speed: -20,
    },
    {
      children: <h1>My Headline</h1>,
      speed: -10,
    },
  ]}
  style={{ aspectRatio: '2 / 1' }}
/>
```

### Using a Custom Image Element

You don't need to use the `image` prop and can instead pass your own `img`, `picture`, `video` or custom image component. Use this if you need to use accessible images, custom image components, or other `img` attributes like `srcSet` or `loading`.

```jsx
<ParallaxBanner style={{ aspectRatio: '2 / 1' }}>
  <ParallaxBannerLayer speed={-20}>
    <img
      src="https://foo.com/sahara.jpg"
      alt="Sahara Desert landscape"
      loading="lazy"
    />
  </ParallaxBannerLayer>
</ParallaxBanner>
```

## Props

The following are all props that can be passed to the `<ParallaxBanner>` component:

| Name         |       Type       | Description                                                                                                                |
| ------------ | :--------------: | -------------------------------------------------------------------------------------------------------------------------- |
| **disabled** |    `boolean`     | Disables _all_ parallax layers when enabled.                                                                               |
| **layers**   |     `array`      | Optional `array` of layers -- [see layer props below](/docs/usage/components/parallax-banner-component#banner-layers-prop) |
| `...rest`    | `HTMLDivElement` | All other properties are spread to the `<div>`.                                                                            |

:::info

All other props are defined on the root `div` element.

```jsx
<ParallaxBanner className="custom-class" id="hero-banner" />
```

:::

## Banner Layer Props

The `ParallaxBannerLayer` the following configuration as props.

The `layers` prop takes an array of objects that represent each image (or custom children) of the parallax banner. The following properties describe a layer object:

| Name         |          Type           | Default | Description                                                                                                                                                                                                           |
| ------------ | :---------------------: | :------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **children** |     `ReactElement`      |         | Custom layer children provided as a React element, for example `<Video />`                                                                                                                                            |
| **expanded** |        `boolean`        | `true`  | Indicate if the layer should be expanded with negative top/bottom margins so the edges will never be visible.                                                                                                         |
| **image**    |        `string`         |         | Image source that will be applied as a CSS `background-image` on the layer set to `cover`.                                                                                                                            |
| `...rest`    | `ParallaxElementConfig` |         | All known parallax props will be passed to `useParallax`. [See all the parallax props](/docs/usage/parallax-props) that this hook will accept. All other properties are spread to the `<div>` representing the layer. |

### Example Using ParallaxBannerLayer

```jsx
<ParallaxBanner>
  <ParallaxBannerLayer
    expanded={false}
    speed={-10}
    scale={[1, 1.2]}
    opacity={[0.9, 1]}
  >
    <img src="foo" />
  </ParallaxBannerLayer>
</ParallaxBanner>
```

### Example Using the Layers Prop

```jsx
<ParallaxBanner
  layers={[
    {
      children: <img src="foo" />,
      expanded: false,
      speed: -10,
      scale: [1, 1.2],
      opacity: [0.9, 1],
    },
  ]}
/>
```
