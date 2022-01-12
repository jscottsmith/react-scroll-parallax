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
            layers={[
              {
                image: 'https://foo.com/bar.jpg',
                speed: 2,
              },
            ]}
            style={{
              backgroundColor: 'blue',
              border: '1px solid red',
            }}
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

  describe('with custom defined layer children', () => {
    it('then it will render each layer child', () => {
      const { getByTestId } = render(
        <ParallaxProvider>
          <ParallaxBanner
            layers={[
              {
                children: <div data-testid="foo">foo</div>,
                speed: 2,
              },
              {
                children: <div data-testid="bar">bar</div>,
                speed: 4,
              },
            ]}
          />
        </ParallaxProvider>
      );
      expect(getByTestId('foo')).toBeInTheDocument();
      expect(getByTestId('bar')).toBeInTheDocument();
    });
  });

  describe('with layer expanded false', () => {
    it('then it will render without expanded styles', () => {
      const { getByTestId } = render(
        <ParallaxProvider>
          <ParallaxBanner
            layers={[
              {
                speed: 2,
                expanded: false,
              },
            ]}
          />
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
          <ParallaxBanner
            layers={[
              {
                speed: 2,
              },
            ]}
          />
        </ParallaxProvider>
      );
      expect(getByTestId('layer-0').style.top).toBe('-20px');
      expect(getByTestId('layer-0').style.right).toBe('0px');
      expect(getByTestId('layer-0').style.left).toBe('0px');
      expect(getByTestId('layer-0').style.bottom).toBe('-20px');
      expect(getByTestId('layer-0').style.position).toBe('absolute');
    });
  });

  describe('with children', () => {
    it('then it will render children', () => {
      const { getByTestId } = render(
        <ParallaxProvider>
          <ParallaxBanner layers={[]}>
            <div data-testid="child" />
          </ParallaxBanner>
        </ParallaxProvider>
      );
      expect(getByTestId('child')).toBeInTheDocument();
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
                props: {
                  style: {
                    backgroundColor: 'red',
                  },
                  className: 'my-custom-class',
                  id: 'my-id',
                },
              },
            ]}
          />
        </ParallaxProvider>
      );
      expect(container.querySelector('.my-custom-class')).toBeInTheDocument();
      expect(container.querySelector('#my-id')).toBeInTheDocument();

      expect(getByTestId('layer-0').style.background).toBe('red');
    });
  });
});
