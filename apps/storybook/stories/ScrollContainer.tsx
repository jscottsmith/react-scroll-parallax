import React, { PropsWithChildren } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ValidScrollAxis } from 'scroll-parallax';

export const ScrollContainer = (
  props: PropsWithChildren<{
    scrollAxis?: ValidScrollAxis;
  }>
) => {
  const [scrollEl, setScrollElement] = React.useState<
    HTMLElement | undefined
  >(undefined);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setScrollElement(ref.current ?? undefined);
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
