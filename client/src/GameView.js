import React from 'react';
import css from './Game.css' // eslint-disable-line

const REFRESH_INTERVAL = 1000;

class GameView extends React.Component {

    componentDidMount() {
        this.interval = setInterval(this.props.pollData, REFRESH_INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if (!this.props.game) {
            // When the game is not initialized, only show the New Game button
            return (
                <div className="body">
                    <h1>HangMan</h1>
                </div>
            );
        }
        const {phrase, answer, state, lives} = this.props.game;
        const {trials} = this.props;
        const aliveView = (
            <div>
                <div>Status: {state}</div>
                <div>Number of lives left: {lives}</div>
                {trials ? <div>Trials: {trials}</div> : <div></div>}
            </div>
        );
        const finishedView = (
            <div>
                { state === 'won'
                    ? <div>Congratulations! You found the answer</div>
                    : <div>The answer is <span className="red">{answer}</span>. Try again...</div>
                }
            </div>
        );
        return (
            <div className="body">
                <h1>HangMan</h1>
                <h2 className="phrase">{phrase}</h2>
                {state === 'alive' ? aliveView : finishedView}
            </div>
        );
    }
}

// Provide type checks for props
GameView.PropTypes = {
    game: React.PropTypes.object,
    trials: React.PropTypes.arrayOf(React.PropTypes.string),
    pollData: React.PropTypes.func
};

export default GameView;