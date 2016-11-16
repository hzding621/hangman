import React from 'react';

class CustomGameButton extends React.Component {

    constructor(props) {
        super(props);

        this.onClick = () => this.context.router.push(`/custom`);
    }

    render() {
        return <button onClick={this.onClick}>Custom Game</button>;
    }
}

// Inject react-router into context for redirecting
CustomGameButton.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default CustomGameButton;