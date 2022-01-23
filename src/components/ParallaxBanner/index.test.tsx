import React from 'react';
import { render } from '@testing-library/react';
import { ParallaxBanner } from '.';
import { ParallaxProvider } from '../ParallaxProvider';

describe('given a <ParallaxBanner> component', () => {
  describe('with all props', () => {
    it('then it will render banners correctly', () => {
      const { asFragment } = render(
        <ParallaxProvider>
          <ParallaxBanner
            className="test-class"
            disabled={false}
            layers={[{ image: 'https://foo.com/bar.jpg', speed: 2 }]}
            style={{ backgroundColor: 'blue', border: '1px solid red' }}
          >
            <div>
              <h1>Foo Bar</h1>
            </div>
          </ParallaxBanner>
        </ParallaxProvider>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('when children are defined', () => {
    it('then it will render the children', () => {
      const { getByTestId } = render(
        <ParallaxProvider>
          <ParallaxBanner>
            <div data-testid="children" />
          </ParallaxBanner>
        </ParallaxProvider>
      );
      expect(getByTestId('children')).toBeInTheDocument();
    });
  });
  describe('when custom defined layer children are defined', () => {
    it('then it will render each layer child', () => {
      const { getByTestId } = render(
        <ParallaxProvider>
          <ParallaxBanner
            layers={[
              { children: <div data-testid="foo">foo</div> },
              { children: <div data-testid="bar">bar</div> },
            ]}
          />
        </ParallaxProvider>
      );
      expect(getByTestId('foo')).toBeInTheDocument();
      expect(getByTestId('bar')).toBeInTheDocument();
    });
  });

  describe('when the layer expanded option is false', () => {
    it('then it will render without expanded styles', () => {
      const { getByTestId } = render(
        <ParallaxProvider>
          <ParallaxBanner layers={[{ speed: 2, expanded: false }]} />
        </ParallaxProvider>
      );
      expect(getByTestId('layer-0').style.top).toBe('0px');
      expect(getByTestId('layer-0').style.right).toBe('0px');
      expect(getByTestId('layer-0').style.left).toBe('0px');
      expect(getByTestId('layer-0').style.bottom).toBe('0px');
      expect(getByTestId('layer-0').style.position).toBe('absolute');
    });
  });

  describe('with layer expanded', () => {
    it('then it will render with expanded styles based on speed', () => {
      const { getByTestId } = render(
        <ParallaxProvider>
          <ParallaxBanner layers={[{ speed: 2 }]} />
        </ParallaxProvider>
      );
      expect(getByTestId('layer-0').style.top).toBe('-20px');
      expect(getByTestId('layer-0').style.right).toBe('0px');
      expect(getByTestId('layer-0').style.left).toBe('0px');
      expect(getByTestId('layer-0').style.bottom).toBe('-20px');
      expect(getByTestId('layer-0').style.position).toBe('absolute');
    });
  });
  describe('with custom props', () => {
    it('then it will render children', () => {
      const { container, getByTestId } = render(
        <ParallaxProvider>
          <ParallaxBanner
            layers={[
              {
                speed: 2,
                style: {
                  backgroundColor: 'red',
                },
                className: 'my-custom-class',
              },
            ]}
          />
        </ParallaxProvider>
      );
      expect(container.querySelector('.my-custom-class')).toBeInTheDocument();
      expect(getByTestId('layer-0').style.background).toBe('red');
    });
  });
  describe('when custom html props are given', () => {
    it('then it adds them to the returned div', () => {
      const { container, getByTestId } = render(
        <ParallaxProvider>
          <ParallaxBanner
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
  describe('with custom props are defined in the layer', () => {
    it('then it adds them to the layer div', () => {
      const { container, getByTestId } = render(
        <ParallaxProvider>
          <ParallaxBanner
            layers={[
              {
                style: { background: 'red' },
                className: 'my-class',
                id: 'test-id',
                // @ts-expect-error
                'data-testid': 'data-test-id',
                'data-foo': 'bar',
                'aria-label': 'Cool',
              },
            ]}
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
});
