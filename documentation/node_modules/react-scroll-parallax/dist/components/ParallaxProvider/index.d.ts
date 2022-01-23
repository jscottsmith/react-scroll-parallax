import { Component } from 'react';
import { ParallaxController, ScrollAxis } from 'parallax-controller';
import { ParallaxProviderProps } from './types';
export declare class ParallaxProvider extends Component<ParallaxProviderProps, {}> {
    static defaultProps: {
        scrollAxis: ScrollAxis;
    };
    controller: ParallaxController | null;
    constructor(props: ParallaxProviderProps);
    componentDidUpdate(prevProps: ParallaxProviderProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
