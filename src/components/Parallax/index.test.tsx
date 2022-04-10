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
import { ALL_PARALLAX_PROPS } from '../../testUtils/tests.constants';

describe('given the <Parallax> component', () => {
  const preventError = (e: ErrorEvent) => e.preventDefault();

  beforeEach(() => {
    window.addEventListener('error', preventError);
  });

  afterEach(() => {
    window.removeEventListener('error', preventError);
  });

  describe('when normal configurations are given', () => {
    it('then it renders correctly', () => {
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
          >
            <div className="foo" />
          </Parallax>
        </ParallaxProvider>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when given children', () => {
    it('then it renders them', () => {
      const { getByTestId } = render(
        <ParallaxProvider>
          <Parallax>
            <div data-testid="children" />
          </Parallax>
        </ParallaxProvider>
      );
      expect(getByTestId('children')).toBeInTheDocument();
    });
  });

  describe('when given html attributes', () => {
    it('then it adds them to the returned div', () => {
      const { container, getByTestId } = render(
        <ParallaxProvider>
          <Parallax
            style={{ background: 'red' }}
            className="my-class"
            id="test-id"
            data-testid="data-test-id"
            data-foo="bar"
            aria-label="Cool"
          />
        </ParallaxProvider>
      );
      expect(getByTestId('data-test-id')).toBeInTheDocument();
      expect(container.querySelector('.my-class')).toBeInTheDocument();
      expect(container.querySelector('#test-id')).toBeInTheDocument();
      expect(getByTestId('data-test-id')).toHaveAttribute('aria-label', 'Cool');
      expect(getByTestId('data-test-id')).toHaveAttribute('data-foo', 'bar');
      expect(getByTestId('data-test-id').style.background).toBe('red');
    });
  });

  describe('when not wrapped in the ParallaxProvider', () => {
    it('to throw because the ParallaxController is not available', () => {
      expectRenderError(
        <Parallax>
          <div />
        </Parallax>,
        'Could not find `react-scroll-parallax` context value. Please ensure the component is wrapped in a <ParallaxProvider>',
        1
      );
    });
  });

  describe.each(ALL_PARALLAX_PROPS)('when the prop %s is given', (props) => {
    it('then it renders without issue and calls create element with props', () => {
      const controller = ParallaxController.init({
        scrollAxis: ScrollAxis.vertical,
      });
      controller.createElement = jest.fn(controller.createElement);
      function Wrapper(props: PropsWithChildren<{}>) {
        return (
          <MockProvider controllerMock={controller}>
            {props.children}
          </MockProvider>
        );
      }
      const { asFragment } = render(<Parallax {...props} />, {
        wrapper: Wrapper,
      });
      expect(asFragment()).toMatchSnapshot();
      expect(controller.createElement).toBeCalledWith({
        el: expect.any(HTMLElement),
        props,
      });
    });
  });

  describe('when wrapped in the ParallaxProvider', () => {
    it('then is creates an element in the controller on mount', () => {
      const controller = ParallaxController.init({
        scrollAxis: ScrollAxis.vertical,
      });
      controller.createElement = jest.fn(controller.createElement);
      render(
        <MockProvider controllerMock={controller}>
          <Parallax translateY={[-100, 100]} />
        </MockProvider>
      );
      expect(controller.createElement).toBeCalledWith({
        el: expect.any(HTMLElement),
        props: { translateY: [-100, 100] },
      });
    });

    it('then it removes an element in the controller when unmounting', () => {
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

    it('then it updates an element in the controller when receiving relevant new props', () => {
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

    it('then it handles disabled prop updates', () => {
      const controller = ParallaxController.init({
        scrollAxis: ScrollAxis.vertical,
      });
      controller.updateElementPropsById = jest.fn();
      controller.resetElementStyles = jest.fn();

      function Wrapper(props: PropsWithChildren<{}>) {
        return (
          <MockProvider controllerMock={controller}>
            {props.children}
          </MockProvider>
        );
      }

      const { rerender } = render(
        <Parallax
          disabled={false}
          translateX={[100, -100]}
          translateY={[-100, 100]}
        />,
        {
          wrapper: Wrapper,
        }
      );

      rerender(
        <Parallax
          disabled={true}
          translateX={[100, -100]}
          translateY={[-100, 100]}
        />
      );

      const element = controller.getElements()[0];

      expect(controller.resetElementStyles).toBeCalledWith(element);
      expect(controller.updateElementPropsById).toBeCalledWith(element.id, {
        disabled: true,
        translateX: [100, -100],
        translateY: [-100, 100],
      });
    });

    it('then it resets styles on an element if the disabled prop is true', () => {
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

      rerender(
        <Parallax disabled={true} translateX={offX} translateY={offY} />
      );

      expect(controller.resetElementStyles).toBeCalled();
    });
  });
});
