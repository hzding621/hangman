/**
 * Created by haozhending on 11/8/16.
 */
import React from 'react';
import Controllers from './Controllers';
import GameView from './GameView';

class GameViewContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { game: null };
        this.pollData = this.pollData.bind(this);
    }

    pollData() {
        Controllers.viewGame(this.props.params.id)
            .then((game) => {
                this.setState({game});
            });
    }

    render() {
        return <GameView game={this.state.game} pollData={this.pollData}/>;
    }
}

export default GameViewContainer;