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
        const {message, game} = this.props;
        const picUrl = game ? `/fig/${10 - game.lives}.png` : "/fig/4.png";
        return (
            <div className="body">
                <h1>HangMan</h1>
                <div><img src={picUrl} role="presentation" /></div>
                <Statistics game={game}/>
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