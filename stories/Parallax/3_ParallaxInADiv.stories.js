import React from 'react';
import { text, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import Element from '../Element/Element';

import styles from './Parallax.scss';
import '../styles.scss';

class ScrollContainer extends React.Component {
    constructor() {
        super();
        this.scrollContainer = React.createRef();
        this.state = {
            mounted: false,
        };
    }

    componentDidMount = () => {
        this.setState({ mounted: true });
    };

    render() {
        const ref = this.scrollContainer.current;
        return (
            <div className="scroll-container" ref={this.scrollContainer}>
                {this.state.mounted ? this.props.children(ref) : null}
            </div>
        );
    }
}

storiesOf('<Parallax> in a <div>', module)
    .add('vertical with x offsets', () => {
        const amount = number('Number of Elements', 3);
        const offA = number('x[0] * i', -50);
        const offB = number('x[1] * i', 50);
        const unit = text('Offset Unit', '%');
        const elements = new Array(amount * 2 + 1).fill(null).map((x, i) => i);
        return (
            <ScrollContainer>
                {scrollContainer => (
                    <ParallaxProvider scrollContainer={scrollContainer}>
                        <div className="vertical">
                            <div className="elements linear">
                                {elements.map((_, i) => {
                                    const n = i - amount;
                                    return (
                                        <Parallax
                                            key={n}
                                            className={styles.smallLinear}
                                            x={[
                                                `${offA * n}${unit}`,
                                                `${offB * n}${unit}`,
                                            ]}
                                        >
                                            <Element name={n * -1} />
                                        </Parallax>
                                    );
                                })}
                            </div>
                        </div>
                    </ParallaxProvider>
                )}
            </ScrollContainer>
        );
    })
    .add('vertical with y offsets', () => {
        const amount = number('Number of Elements', 3);
        const offA = number('y[0] * i', -50);
        const offB = number('y[1] * i', 50);
        const unit = text('Offset Unit', '%');
        const elements = new Array(amount * 2 + 1).fill(null).map((x, i) => i);
        return (
            <ScrollContainer>
                {scrollContainer => (
                    <ParallaxProvider scrollContainer={scrollContainer}>
                        <div className="vertical">
                            <div className="elements linear">
                                {elements.map((_, i) => {
                                    const n = i - amount;
                                    return (
                                        <Parallax
                                            key={n}
                                            className={styles.smallLinear}
                                            y={[
                                                `${offA * n}${unit}`,
                                                `${offB * n}${unit}`,
                                            ]}
                                        >
                                            <Element name={n * -1} />
                                        </Parallax>
                                    );
                                })}
                            </div>
                        </div>
                    </ParallaxProvider>
                )}
            </ScrollContainer>
        );
    })
    .add('horizontal with x offsets', () => {
        const amount = number('Number of Elements', 3);
        const offA = number('x[0] * i', -50);
        const offB = number('x[1] * i', 50);
        const unit = text('Offset Unit', '%');
        const elements = new Array(amount * 2 + 1).fill(null).map((x, i) => i);
        return (
            <ScrollContainer>
                {scrollContainer => (
                    <ParallaxProvider
                        scrollContainer={scrollContainer}
                        scrollAxis="horizontal"
                    >
                        <div className="horizontal">
                            <div className="elements linear">
                                {elements.map((_, i) => {
                                    const n = i - amount;
                                    return (
                                        <Parallax
                                            key={n}
                                            className={styles.smallLinear}
                                            x={[
                                                `${offA * n}${unit}`,
                                                `${offB * n}${unit}`,
                                            ]}
                                        >
                                            <Element name={n * -1} />
                                        </Parallax>
                                    );
                                })}
                            </div>
                        </div>
                    </ParallaxProvider>
                )}
            </ScrollContainer>
        );
    })
    .add('horizontal with y offsets', () => {
        const amount = number('Number of Elements', 3);
        const offA = number('y[0] * i', -50);
        const offB = number('y[1] * i', 50);
        const unit = text('Offset Unit', '%');
        const elements = new Array(amount * 2 + 1).fill(null).map((x, i) => i);
        return (
            <ScrollContainer>
                {scrollContainer => (
                    <ParallaxProvider
                        scrollContainer={scrollContainer}
                        scrollAxis="horizontal"
                    >
                        <div className="horizontal">
                            <div className="elements linear">
                                {elements.map((_, i) => {
                                    const n = i - amount;
                                    return (
                                        <Parallax
                                            key={n}
                                            className={styles.smallLinear}
                                            y={[
                                                `${offA * n}${unit}`,
                                                `${offB * n}${unit}`,
                                            ]}
                                        >
                                            <Element name={n * -1} />
                                        </Parallax>
                                    );
                                })}
                            </div>
                        </div>
                    </ParallaxProvider>
                )}
            </ScrollContainer>
        );
    });
