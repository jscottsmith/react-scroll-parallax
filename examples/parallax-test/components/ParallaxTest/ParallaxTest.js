import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import style from './ParallaxTest.scss';

const INC_AMOUNT = 10;

export default class ParallaxTest extends React.Component {

    state = {
        amount: new Array(10).fill(null).map((x, i) => i),
        offsetY: INC_AMOUNT,
        slowerScrollRate: false,
        unitPercent: false,
    };

    mapToParallax() {
        const offsetY = this.state.offsetY;
        const slowerScrollRate = this.state.slowerScrollRate;

        return this.state.amount.map((number, i) => {
            const unit = this.state.unitPercent ? '%' : 'px';
            const offsetYMin = offsetY * -1 * i + unit;
            const offsetYMax = offsetY * i + unit;

            return (
                <Parallax
                    key={i}
                    tag="span"
                    disabled={false}
                    offsetYMax={offsetYMax}
                    offsetYMin={offsetYMin}
                    offsetXMax={0}
                    offsetXMin={0}
                    className={style.item}
                    slowerScrollRate={slowerScrollRate}
                >
                    {number}
                </Parallax>
            );
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

    increaseOffsetY = () => {
        const offsetY = this.state.offsetY + INC_AMOUNT;
        this.setState({
            offsetY,
        });
    };

    decreaseOffsetY = () => {
        const offsetY = this.state.offsetY - INC_AMOUNT < 0 ? 0 : this.state.offsetY - INC_AMOUNT;
        this.setState({
            offsetY,
        });
    };

    toggleSpeed = () => {
        const slowerScrollRate = !this.state.slowerScrollRate;
        this.setState({
            slowerScrollRate,
        });
    };

    toggleValue = () => {
        const unitPercent = !this.state.unitPercent;
        this.setState({
            unitPercent,
        });
    };

    render() {
        return (
            <div className={style.parallaxTest}>
                <h1 className={style.h1}>
                    {this.mapToParallax()}
                </h1>
                <div className={style.buttons}>
                    <div className={style.currentState}>
                        <h4>
                            Parallax Elements:
                            <span className="value">{this.state.amount.length}</span>
                        </h4>
                        <button onClick={this.handleAdd}>Add</button>
                        <button onClick={this.handleRemove}>Remove</button>
                    </div>
                    <div className={style.currentState}>
                        <h4>
                            Y Offsets:
                            <span className="value">{this.state.offsetY}</span>
                        </h4>
                        <button onClick={this.increaseOffsetY}>Increase</button>
                        <button onClick={this.decreaseOffsetY}>Decrease</button>
                    </div>
                    <div className={style.currentState}>
                        <h4>
                            Speed:
                            <span className="value">{this.state.slowerScrollRate ? 'Slower' : 'Faster'}</span>
                        </h4>
                        <button onClick={this.toggleSpeed}>{this.state.slowerScrollRate ? 'Faster' : 'Slower'}</button>
                    </div>
                    <div className={style.currentState}>
                        <h4>
                            Unit:
                            <span className="value">{this.state.unitPercent ? 'Percent' : 'Pixels'}</span>
                        </h4>
                        <button onClick={this.toggleValue}>{this.state.unitPercent ? 'Pixels' : 'Percent'}</button>
                    </div>
                </div>
            </div>
        );
    }
}