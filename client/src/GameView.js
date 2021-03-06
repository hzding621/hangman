import React from 'react';
import Statistics from './component/Statistics';
import Header from './component/Header';
import Social from './component/Social';
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
        return (
            <div className="body">
                <Header/>
                <Statistics game={game}/>
                <div className="red">{message}</div>
                <br />
                {game ? <Social viewId={game.view_key}/> : <div />}
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