import React from 'react';

export default class ScrollContainer extends React.Component {
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
