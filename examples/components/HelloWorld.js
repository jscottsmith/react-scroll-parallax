import React from 'react';
import Parallax from '../../src/react-scroll-parallax';

export default class HelloWorld extends React.Component {

    static defaultProps = {
        children: 'ASDFGHJKLQWERTYUIOPZXCVBNMASDFGHJKLQWERTYUIOPZXCVBNMASDFGHJKLQWERTYUIOPZXCVBNMASDFGHJKLQWERTYUIOPZXCVBNMASDFGHJKLQWERTYUIOPZXCVBNMASDFGHJKLQWERTYUIOPZXCVBNM',
    };

    mapToParallax(slow) {
        const { children } = this.props;
        return children.split('').map((c, i) => {
            const offset = 10 * (i + 1);
            return (
                <Parallax
                    key={i}
                    tag="span"
                    isDesktop={true}
                    offsetYMin={offset * -1}
                    offsetYMax={offset}
                    className="image"
                    slowerScrollRate={slow}
                >
                    {c}
                </Parallax>
            );
        });
    }

    render() {
        return (
            <div className="hello-world">
                <h1>
                    {this.mapToParallax(true)}
                </h1>
                <h1>
                    {this.mapToParallax(false)}
                </h1>
            </div>
        );
    }
}