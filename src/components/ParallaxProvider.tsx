import React, { Component } from 'react';

import { ParallaxContext } from '../context/ParallaxContext';
import {
  ParallaxController,
  ParallaxControllerOptions,
  ValidScrollAxis,
  ScrollAxis,
} from 'parallax-controller';

const createController = (options: ParallaxControllerOptions) => {
  // Don't initialize on the server
  const isServer = typeof window === 'undefined';

  if (!isServer) {
    // Must not be the server so kick it off...
    return ParallaxController.init(options);
  }
  return null;
};

export interface ParallaxProviderProps {
  /**
   * Optionally pass the scroll axis for setting horizontal/vertical scrolling. One of vertical or
   * horizontal
   */
  scrollAxis?: ValidScrollAxis;
  /**
   * Optionally set the container that has overflow and will contain parallax elements. Defaults
   * to the HTML body
   */
  scrollContainer?: HTMLElement;
}

export class ParallaxProvider extends Component<ParallaxProviderProps, {}> {
  static defaultProps = {
    scrollAxis: ScrollAxis.vertical,
  };

  controller: ParallaxController | null;

  constructor(props: ParallaxProviderProps) {
    super(props);
    this.controller = createController({
      scrollAxis: props.scrollAxis,
      scrollContainer: props.scrollContainer,
    });
  }

  componentDidUpdate(prevProps: ParallaxProviderProps) {
    if (prevProps.scrollContainer !== this.props.scrollContainer) {
      // @ts-ignore
      this.controller.updateScrollContainer(this.props.scrollContainer);
    }
  }

  componentWillUnmount() {
    // @ts-ignore
    this.controller = this.controller.destroy();
  }

  render() {
    const { children } = this.props;
    return (
      // @ts-ignore
      <ParallaxContext.Provider value={this.controller}>
        {children}
      </ParallaxContext.Provider>
    );
  }
}
