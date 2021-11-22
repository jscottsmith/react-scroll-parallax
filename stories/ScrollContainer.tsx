import React, { PropsWithChildren } from 'react';
import { ParallaxProvider } from '../src';

export const ScrollContainer = (
  props: PropsWithChildren<{
    scrollAxis: 'vertical' | 'horizontal';
  }>
) => {
  const [scrollEl, setScrollElement] = React.useState(null);
  const ref = React.useRef();

  React.useEffect(() => {
    setScrollElement(ref.current);
  });

  return (
    <div className="scroll-container" ref={ref}>
      <ParallaxProvider
        scrollContainer={scrollEl}
        scrollAxis={props.scrollAxis}
      >
        {props.children}
      </ParallaxProvider>
    </div>
  );
};
