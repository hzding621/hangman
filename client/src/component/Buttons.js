import React from 'react';
import Controllers from '../Controllers';
import css from '../Game.css' // eslint-disable-line

export class NewGameButton extends React.Component {

    constructor(props) {
        super(props);
        this.onNewGame = this.onNewGame.bind(this);
    }

    onNewGame() {
        Controllers.newGame()
            .then((responseJson) => {
                const key = responseJson.key;
                this.context.router.push(`/play/${key}`);
            });
    }

    render() {
        return <button onClick={this.onNewGame}>New Game</button>;
    }
}

// Inject react-router into context for redirecting
NewGameButton.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export class CustomGameButton extends React.Component {

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
