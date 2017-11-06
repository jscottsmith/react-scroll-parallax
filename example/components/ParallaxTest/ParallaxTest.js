import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Element from '../Element/Element.js';
import { Parallax } from 'react-scroll-parallax';
import style from './ParallaxTest.scss';

const START_NUM_ELEMENTS = 1;

export default class ParallaxTest extends Component {
    static contextTypes = {
        scrollController: PropTypes.object,
    };

    state = {
        elements: new Array(START_NUM_ELEMENTS).fill(null).map((x, i) => i),
        disabled: false,
    };

    triggerDestroy = () => {
        this.context.scrollController.destroy();
    };

    handleAdd = () => {
        const elements = [...this.state.elements, this.state.elements.length];
        this.setState({
            elements,
        });
    };

    handleRemove = () => {
        const elements = this.state.elements.slice(
            0,
            this.state.elements.length - 1
        );
        this.setState({
            elements,
        });
    };

    toggleDisabled = () => {
        const disabled = !this.state.disabled;
        this.setState({
            disabled,
        });
    };

    mapToParallax() {
        return this.state.elements.map((number, i) => {
            const odd = i % 2 ? -1 : 1;
            const offset = 40;

            const props = {
                x: [-offset * odd + 'px', offset * odd + 'px'],
                y: [-offset * odd + 'px', offset * odd + 'px'],
                scale: [2, 1],
                opacity: [1, 1],
            };

            return (
                <Parallax key={i} className={style.item} {...props}>
                    <Element index={i} />
                </Parallax>
            );
        });
    }

    render() {
        return (
            <div className={style.parallaxTest}>
                <main className={style.items}>{this.mapToParallax()}</main>
                <nav className={style.buttons}>
                    <div className={style.currentState}>
                        <h4>
                            Parallax Elements:
                            <span className="value">
                                {this.state.elements.length}
                            </span>
                        </h4>
                        <button onClick={this.handleAdd}>Add</button>
                        <button onClick={this.handleRemove}>Remove</button>
                    </div>
                    {/*<div className={style.currentState}>
                        <h4>Destroys the scrollController. :-(</h4>
                        <button onClick={this.triggerDestroy}>Destroy</button>
                    </div>*/}
                </nav>
            </div>
        );
    }
}
