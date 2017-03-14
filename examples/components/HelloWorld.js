import React from 'react';
import { Parallax } from 'react-scroll-parallax';

export default class HelloWorld extends React.Component {

    state = {
        amount: [1],
        offset: 50,
        slowerScrollRate: true,
    };

    mapToParallax() {
        const offset = this.state.offset;
        const slowerScrollRate = this.state.slowerScrollRate;

        return this.state.amount.map((number, i) => {
            const offsetYMin = offset * -1 * i;
            const offsetYMax = offset * i;
            // console.log('min', offsetYMin, 'max', offsetYMax, 'slowerScrollRate', slowerScrollRate);
            return (
                <Parallax
                    key={i}
                    tag="span"
                    disabled={false}
                    offsetYMax={offset * i + 'px'}
                    offsetYMin={offset * -1 * i + 'px'}
                    offsetXMax={0}
                    offsetXMin={0}
                    className="image"
                    slowerScrollRate={slowerScrollRate}
                >
                    {number}
                </Parallax>
            )
        });
    }

    handleAdd = () => {
        const amount = [...this.state.amount, this.state.amount.length + 1];
        this.setState({
            amount,
        });
    };

    handleRemove = () => {
        const amount = this.state.amount.slice(0, this.state.amount.length - 1);
        this.setState({
            amount,
        });
    };

    increaseOffset = () => {
        const offset = this.state.offset + 50;
        // console.log('increase', offset);
        this.setState({
            offset,
        });
    };

    decreaseOffset = () => {
        const offset = this.state.offset - 50 < 0 ? 0 : this.state.offset - 50;
        // console.log('decrease', offset);
        this.setState({
            offset,
        });
    };

    toggleSpeed = () => {
        const slowerScrollRate = !this.state.slowerScrollRate;
        // console.log('slower scroll rate', slowerScrollRate);
        this.setState({
            slowerScrollRate,
        });
    };

    render() {
        return (
            <div className="hello-world">
                <h1>
                    {this.mapToParallax()}
                </h1>
                <div className="buttons">
                    <button onClick={this.handleAdd}>Add</button>
                    <button onClick={this.handleRemove}>Remove</button>
                    <button onClick={this.increaseOffset}>Increase</button>
                    <button onClick={this.decreaseOffset}>Decrease</button>
                    <button onClick={this.toggleSpeed}>{this.state.slowerScrollRate ? 'Faster' : 'Slower'}</button>
                </div>
            </div>
        );
    }
}