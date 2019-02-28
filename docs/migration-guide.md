# Migration Guide

Some breaking changes were introduced in v2. Here's the simple changes that need to be made if you're coming from v1.

1. Replaces all the `offset` props and removes the `slowerScrollRate` prop in favor of x/y props that take arrays for start/end values
2. Updated the way progress is calculated
3. Switch to new context API and React `^16.3.0`

### 1. Replaces all the `offset` props and removes the `slowerScrollRate` prop in favor of x/y props that take arrays for start/end values

In v1 offsets were set as min/max values like so

```jsx
<Parallax offsetYMin={-100}  offsetYMax={100} slowerScrollRate={false}>
```

In v2 the y offsets are set as a start/end value in an array. The values are also flipped to account for the `slowerScrollRate` prop being false.

```jsx
<Parallax y={[100, -100]}>
```

So if `slowerScrollRate` was `true` like so

```jsx
<Parallax offsetYMin={-100}  offsetYMax={100} slowerScrollRate={true}>
```

Then in v2 is becomes this

```jsx
<Parallax y={[-100, 100]}>
```

### 2. Updated the way progress is calculated

Progress is now calculated from the _original_ elements position in the viewport. So the top of the element at the bottom of the window is `0`, the bottom of the element at the top of the window is `1`. If you are upgrading from v1 some elements may appear to move further/faster than they did before so you might need to adjust the x/y offsets.

### 3. Switch to new context API and React ^16.3.0

V2 uses the latest context API and requires `react@16.3.0` or greater.

If you were using the old context api to call methods on the controller you will need to update how you access context.

The old way

```jsx
class Foo extends Component {
    static contextTypes = {
        parallaxController: PropTypes.object.isRequired,
    };

    bar() {
        this.context.parallaxController.update();
    }
}
```

The new way with the provided `withController` HOC

```jsx
import { withController } from 'react-scroll-parallax';

class Foo extends Component {
    bar() {
        this.props.parallaxController.update();
    }
}

export withController(Foo);
```
