---
sidebar_position: 3
---

# ParallaxBanner

Component that sets up layers of `useParallax` elements to achieve a parallaxing banner. Enables the layering of images, or custom markup, with scroll effects in a container that hides overflow.

### Working Demos

See some example [code with demos](/docs/examples/banners).

## Examples

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

### Multiple Layers

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

**Layer order matters.** First element in the the array will appear on the bottom of the stacking context; last layer of the array will appear on top.

:::

### Customized Layers

You can pass your own markup or components to the `children` property of a `layer`.

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

## Props

The following are all props that can be passed to the `<ParallaxBanner>` component:

| Name         |       Type       | Description                                                                                                                                 |
| ------------ | :--------------: | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **disabled** |    `boolean`     | Disables _all_ parallax layers when enabled.                                                                                                |
| **layers**   |     `array`      | An `array` of `objects` with layer properties: [see layer props below](/docs/usage/components/parallax-banner-component#banner-layers-prop) |
| `...rest`    | `HTMLDivElement` | All other properties are spread to the `<div>`.                                                                                             |

:::info

All other props are defined on the root `div` element.

```jsx
<ParallaxBanner className="custom-class" id="hero-banner" />
```

:::

## Banner Layers Prop

The `layers` prop takes an array of objects that represent each image (or custom children) of the parallax banner. The following properties describe a layer object:

| Name         |          Type           | Default | Description                                                                                                                                                                                                                                        |
| ------------ | :---------------------: | :------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **children** |     `ReactElement`      |         | Custom layer children provided as a React element, for example `<Video />`                                                                                                                                                                         |
| **expanded** |        `boolean`        | `true`  | Indicate if the layer should be expanded with negative top/bottom margins so the edges will never be visible.                                                                                                                                      |
| **image**    |        `string`         |         | Image source that will be applied as a CSS `background-image` on the layer set to `cover`.                                                                                                                                                         |
| `...rest`    | `ParallaxElementConfig` |         | All known parallax props will be passed to `useParallax`. [See all the parallax props](https://parallax-controller.vercel.app/docs/usage/props) that this hook will accept. All other properties are spread to the `<div>` representing the layer. |

```jsx
<ParallaxBanner
  layers={[
    {
      children: <div />,
      speed: -10,
      scale: [1, 1.2],
      opacity: [0.9, 1],
    },
  ]}
/>
```
