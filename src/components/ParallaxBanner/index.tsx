import React, {
  PropsWithChildren,
  CSSProperties,
  useEffect,
  useRef,
  useState,
  ReactElement,
} from 'react';
import { ParallaxBannerLayer } from './components/ParallaxBannerLayer';
import { ParallaxBannerProps } from './types';

const containerStyle: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
};

export const ParallaxBanner = (
  props: PropsWithChildren<ParallaxBannerProps>
) => {
  const [targetElement, setTargetElement] =
    useState<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTargetElement(containerRef.current);
  }, []);
  const {
    disabled: disableAllLayers,
    style: rootStyle,
    layers = [],
    ...rootRest
  } = props;

  function renderLayers() {
    if (targetElement) {
      const shouldUseLayers = layers && layers.length > 0;
      if (shouldUseLayers) {
        return layers.map((layer, i) => (
          <ParallaxBannerLayer
            {...layer}
            targetElement={targetElement}
            key={`layer-${i}`}
            testId={`layer-${i}`}
          />
        ));
      }
    }
    return null;
  }

  function renderChildren() {
    if (targetElement) {
      return React.Children.map(props.children, (child) => {
        const item = child as ReactElement<
          PropsWithChildren<{ targetElement: any }>
        >;
        // adds the targetElement prop to any ParallaxBannerLayer components
        if (item?.type === ParallaxBannerLayer) {
          const clone = React.cloneElement(item, {
            targetElement,
          });
          return clone;
        }
        return child;
      });
    }
    return null;
  }
  return (
    <div
      ref={containerRef}
      style={{ ...containerStyle, ...rootStyle }}
      {...rootRest}
    >
      {/* Using the `layers` prop to define children */}
      {renderLayers()}
      {/* Using children to compose layers */}
      {renderChildren()}
    </div>
  );
};
