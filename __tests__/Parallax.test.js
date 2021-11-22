import React from 'react';
import { render } from '@testing-library/react';
import { Parallax } from '../src/components/Parallax';
import { ParallaxProvider } from '../src/components/ParallaxProvider';
import { ParallaxController } from '../src/classes/ParallaxController';
import { VERTICAL } from '../src/constants';

import { MockProvider } from './testUtils/MockProvider';
import expectRenderError from './testUtils/expectRenderError';
import createNodeMock from './testUtils/createNodeMock';

const consoleLog = global.console.log;

describe('Expect the <Parallax> component', () => {
  const preventError = (e) => e.preventDefault();

  beforeEach(() => {
    window.addEventListener('error', preventError);
  });

  afterEach(() => {
    global.console.log = consoleLog;
    global.ParallaxController = undefined;

    window.removeEventListener('error', preventError);
  });

  it('to render correctly', () => {
    const { asFragment } = render(
      <ParallaxProvider>
        <Parallax
          className="class-foo"
          disabled={false}
          x={[-100, 100]}
          y={['-100%', '100%']}
          styleOuter={{
            border: 'solid red 2px',
          }}
          styleInner={{
            border: 'solid blue 2px',
          }}
          tagOuter="figure"
          tagInner="div"
        >
          <div className="foo" />
        </Parallax>
      </ParallaxProvider>,
      {
        createNodeMock,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('to throw if the ParallaxController is not available', () => {
    expectRenderError(
      <Parallax>
        <div />
      </Parallax>,
      'Could not find `react-scroll-parallax` context value. Please ensure the component is wrapped in a <ParallaxProvider>',
      1
    );
  });

  // fix this
  it.skip('to create an element in the controller on mount', () => {
    const controller = ParallaxController.init({ scrollAxis: VERTICAL });
    controller.createElement = jest.fn();

    render(
      <MockProvider controllerMock={controller}>
        <Parallax y={[-100, 100]}>
          <div />
        </Parallax>
      </MockProvider>
    );

    expect(controller.createElement).toBeCalledWith({
      elInner: (
        <div class="parallax-inner">
          <div />
        </div>
      ),
      elOuter: (
        <div class="parallax-outer">
          <div class="parallax-inner">
            <div />
          </div>
        </div>
      ),
      props: { disabled: false, x0: 0, x1: 0, y0: -100, y1: 100 },
    });
  });

  it('to remove an element in the controller when unmounting', () => {
    const controller = ParallaxController.init({ scrollAxis: VERTICAL });
    controller.removeElementById = jest.fn();

    const { unmount } = render(
      <MockProvider controllerMock={controller}>
        <Parallax>
          <div />
        </Parallax>
      </MockProvider>
    );
    const element = controller.getElements()[0];
    unmount();
    expect(controller.removeElementById).toBeCalledWith(element.id);
  });

  // fix this
  it.skip('to update an element in the controller when receiving relevant new props', () => {
    const controller = ParallaxController.init({ scrollAxis: VERTICAL });
    controller.updateElementPropsById = jest.fn();

    class StateChanger extends React.Component {
      state = { disabled: false };
      render() {
        return <Parallax {...this.state} />;
      }
    }

    let stateInstance;
    render(
      <MockProvider controllerMock={controller}>
        <StateChanger ref={(ref) => (stateInstance = ref)} />
      </MockProvider>
    );

    const testProps = {
      disabled: true,
      x: [100, -100],
      y: [-100, 100],
    };

    // trigger an update
    stateInstance.setState(testProps);
    const element = controller.getElements()[0];

    expect(controller.updateElementPropsById).toBeCalledWith(element.id, {
      disabled: true,
      x0: 100,
      x1: -100,
      y0: -100,
      y1: 100,
    });

    // should not be called again
    stateInstance.setState({
      ...testProps,
      foo: false,
      bar: true,
    });

    expect(controller.updateElementPropsById).toHaveBeenCalledTimes(1);
  });
  // fix this
  it.skip('to reset styles on an element if the disabled prop is true', () => {
    const controller = ParallaxController.init({ scrollAxis: VERTICAL });
    controller.resetElementStyles = jest.fn();

    class StateChanger extends React.Component {
      state = { disabled: false };
      render() {
        return <Parallax {...this.state} />;
      }
    }

    let stateInstance;
    render(
      <MockProvider controllerMock={controller}>
        <StateChanger ref={(ref) => (stateInstance = ref)} />
      </MockProvider>
    );

    stateInstance.setState({ disabled: true });

    expect(controller.resetElementStyles).toBeCalled();
  });
});
