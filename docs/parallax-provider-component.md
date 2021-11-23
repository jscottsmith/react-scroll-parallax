# \<ParallaxProvider>

The `<ParallaxProvider />` component is meant to wrap a top level component in your application and is necessary to provide access though React context API to the parallax controller. This component should only be used once in you app, for instance in an `<AppContainer />` component that won't be mounted/unmounted during route changes. Like so:

```jsx
const AppContainer = () => (
  <ParallaxProvider>
    <Router>
      <App />
    </Router>
  </ParallaxProvider>
);
```

## ParallaxProvider Props

The following props configure the `<ParallaxProvider>` component:

| Name                |     Type      | Default    | Description                                                                                                  |
| ------------------- | :-----------: | :--------- | ------------------------------------------------------------------------------------------------------------ |
| **scrollAxis**      |   `string`    | `vertical` | Optionally pass the scroll axis for setting horizontal/vertical scrolling. One of `vertical` or `horizontal` |
| **scrollContainer** | `HTMLElement` | `<body>`   | Optionally set the container that has overflow and will contain parallax elements. Defaults to the HTML body |
