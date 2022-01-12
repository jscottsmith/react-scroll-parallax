import React, { PropsWithChildren } from 'react';
import {
  EffectNumber,
  ParallaxController,
  ScrollAxis,
} from 'parallax-controller';
import { render } from '@testing-library/react';
import { Parallax } from '.';
import { ParallaxProvider } from '../ParallaxProvider';

import { MockProvider } from '../../testUtils/MockProvider';
import expectRenderError from '../../testUtils/expectRenderError';

describe('Expect the <Parallax> component', () => {
  const preventError = (e: ErrorEvent) => e.preventDefault();

  beforeEach(() => {
    window.addEventListener('error', preventError);
  });

  afterEach(() => {
    window.removeEventListener('error', preventError);
  });

  it('to render correctly', () => {
    const { asFragment } = render(
      <ParallaxProvider>
        <Parallax
          className="class-foo"
          disabled={false}
          translateX={[-100, 100]}
          translateY={['-100%', '100%']}
          style={{
            border: 'solid red 2px',
          }}
          tag="figure"
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
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
    controller.createElement = jest.fn(controller.createElement);

    render(
      <MockProvider controllerMock={controller}>
        <Parallax translateY={[-100, 100]}>
          <div />
        </Parallax>
      </MockProvider>
    );

    expect(controller.createElement).toBeCalledWith({
      el: expect.any(HTMLElement),
      props: { translateY: [-100, 100] },
    });
  });

  it('to handle rotate props', () => {
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
    controller.createElement = jest.fn(controller.createElement);
    controller.updateElementPropsById = jest.fn(
      controller.updateElementPropsById
    );

    function Wrapper(props: PropsWithChildren<{}>) {
      return (
        <MockProvider controllerMock={controller}>
          {props.children}
        </MockProvider>
      );
    }

    render(<Parallax rotate={['0deg', '100deg']} />, {
      wrapper: Wrapper,
    });

    expect(controller.createElement).toBeCalledWith({
      el: expect.any(HTMLElement),
      props: { rotate: ['0deg', '100deg'] },
    });
  });

  it('to remove an element in the controller when unmounting', () => {
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
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
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
    controller.updateElementPropsById = jest.fn();

    function Wrapper(props: PropsWithChildren<{}>) {
      return (
        <MockProvider controllerMock={controller}>
          {props.children}
        </MockProvider>
      );
    }

    const { rerender } = render(<Parallax disabled={true} />, {
      wrapper: Wrapper,
    });

    rerender(
      <Parallax
        disabled={false}
        translateX={[100, -100]}
        translateY={[-100, 100]}
      />
    );

    const element = controller.getElements()[0];

    expect(controller.updateElementPropsById).toBeCalledWith(element.id, {
      disabled: false,
      translateX: [100, -100],
      translateY: [-100, 100],
    });

    const newProps = {
      disabled: false,
      x: [-40, -60] as EffectNumber,
      y: [10, 80] as EffectNumber,
    };

    rerender(
      <Parallax
        disabled={newProps.disabled}
        translateX={newProps.x}
        translateY={newProps.y}
      />
    );

    expect(controller.updateElementPropsById).toBeCalledWith(element.id, {
      disabled: false,
      translateX: [-40, -60],
      translateY: [10, 80],
    });

    // only update with valid props
    rerender(
      <Parallax
        disabled={newProps.disabled}
        translateX={newProps.x}
        translateY={newProps.y}
        // @ts-expect-error
        nope="bad"
      />
    );

    expect(controller.updateElementPropsById).toHaveBeenCalledTimes(2);
  });

  it('to reset styles on an element if the disabled prop is true', () => {
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
    controller.resetElementStyles = jest.fn();

    function Wrapper(props: PropsWithChildren<{}>) {
      return (
        <MockProvider controllerMock={controller}>
          {props.children}
        </MockProvider>
      );
    }

    const offX: EffectNumber = [100, -100];
    const offY: EffectNumber = [100, -100];

    const { rerender } = render(
      <Parallax disabled={false} translateX={offX} translateY={offY} />,
      {
        wrapper: Wrapper,
      }
    );

    rerender(<Parallax disabled={true} translateX={offX} translateY={offY} />);

    expect(controller.resetElementStyles).toBeCalled();
  });
});
