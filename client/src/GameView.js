import React from 'react';
import Statistics from './component/Statistics';
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
                    <div className="red">{this.props.message}</div>
                </div>
            );
        }
        const {phrase, answer, state, lives} = this.props.game;
        const {message} = this.props;
        return (
            <div className="body">
                <h1>HangMan</h1>
                <div><img src={`/fig/${10 - lives}.png`} role="presentation" /></div>
                <h2 className="phrase">{phrase}</h2>
                <Statistics answer={answer} state={state} lives={lives}/>
                <div className="red">{message}</div>
            </div>
        );
    }
}

// Provide type checks for props
GameView.PropTypes = {
    game: React.PropTypes.object,
    trials: React.PropTypes.arrayOf(React.PropTypes.string),
    message: React.PropTypes.string,
    pollData: React.PropTypes.func.isRequired
};

export default GameView;