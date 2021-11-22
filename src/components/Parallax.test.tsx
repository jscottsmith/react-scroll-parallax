import React from 'react';
import { render } from '@testing-library/react';
import { Parallax } from './Parallax';
import { ParallaxProvider } from './ParallaxProvider';
import { ParallaxController } from '../classes/ParallaxController';
import { VERTICAL } from '../constants';
import { MockProvider } from '../testUtils/MockProvider';
import expectRenderError from '../testUtils/expectRenderError';

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
      </ParallaxProvider>
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

  it('to create an element in the controller on mount', () => {
    const controller = ParallaxController.init({ scrollAxis: VERTICAL });
    controller.createElement = jest.fn(controller.createElement);

    render(
      <MockProvider controllerMock={controller}>
        <Parallax y={[-100, 100]}>
          <div />
        </Parallax>
      </MockProvider>
    );

    expect(controller.createElement).toBeCalledWith({
      elInner: expect.any(HTMLElement),
      elOuter: expect.any(HTMLElement),
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

  it('to update an element in the controller when receiving relevant new props', () => {
    const controller = ParallaxController.init({ scrollAxis: VERTICAL });
    controller.updateElementPropsById = jest.fn();

    function Wrapper(props) {
      return (
        <MockProvider controllerMock={controller}>
          {props.children}
        </MockProvider>
      );
    }

    const { rerender } = render(<Parallax disabled={true} />, {
      wrapper: Wrapper,
    });

    rerender(<Parallax disabled={false} x={[100, -100]} y={[-100, 100]} />);

    const element = controller.getElements()[0];

    expect(controller.updateElementPropsById).toBeCalledWith(element.id, {
      disabled: false,
      x0: 100,
      x1: -100,
      y0: -100,
      y1: 100,
    });

    const newProps = { disabled: false, x: [-40, -60], y: [10, 80] };

    rerender(
      <Parallax disabled={newProps.disabled} x={newProps.x} y={newProps.y} />
    );

    expect(controller.updateElementPropsById).toBeCalledWith(element.id, {
      disabled: false,
      x0: -40,
      x1: -60,
      y0: 10,
      y1: 80,
    });

    // only update with valid props
    rerender(
      <Parallax
        disabled={newProps.disabled}
        x={newProps.x}
        y={newProps.y}
        // @ts-expect-error
        nope="bad"
      />
    );

    expect(controller.updateElementPropsById).toHaveBeenCalledTimes(2);
  });

  it('to reset styles on an element if the disabled prop is true', () => {
    const controller = ParallaxController.init({ scrollAxis: VERTICAL });
    controller.resetElementStyles = jest.fn();

    function Wrapper(props) {
      return (
        <MockProvider controllerMock={controller}>
          {props.children}
        </MockProvider>
      );
    }

    const offX = [100, -100];
    const offY = [100, -100];

    const { rerender } = render(
      <Parallax disabled={false} x={offX} y={offY} />,
      {
        wrapper: Wrapper,
      }
    );

    rerender(<Parallax disabled={true} x={offX} y={offY} />);

    expect(controller.resetElementStyles).toBeCalled();
  });
});
