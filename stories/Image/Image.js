import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withController } from 'react-scroll-parallax';
import style from './Image.scss';

class Image extends Component {
    static propTypes = {
        parallaxController: PropTypes.object.isRequired,
        src: PropTypes.string.isRequired,
    };

    handleLoad = () => {
        // updates cached values after image dimensions have loaded
        this.props.parallaxController.update();
    };

    render() {
        return (
            <div className={style.image}>
                <img src={this.props.src} onLoad={this.handleLoad} />
            </div>
        );
    }
}

export default withController(Image);
