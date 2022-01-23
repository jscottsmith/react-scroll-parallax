import React, { Component } from 'react';

import { ParallaxContext } from '../../context/ParallaxContext';
import { ParallaxController, ScrollAxis } from 'parallax-controller';
import { ParallaxProviderProps } from './types';
import { createController } from './helpers';

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
