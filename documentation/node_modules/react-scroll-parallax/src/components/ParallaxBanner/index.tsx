import React, {
  PropsWithChildren,
  CSSProperties,
  useEffect,
  useRef,
  useState,
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
  const [targetElement, setTargetElement] = useState<HTMLDivElement | null>(
    null
  );
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
  return (
    <div
      ref={containerRef}
      style={{ ...containerStyle, ...rootStyle }}
      {...rootRest}
    >
      {layers.map(
        (layer, i) =>
          targetElement && (
            <ParallaxBannerLayer
              {...layer}
              targetElement={targetElement}
              key={`layer-${i}`}
              testId={`layer-${i}`}
            />
          )
      )}
      {props.children}
    </div>
  );
};
