/**
 * Created by haozhending on 11/8/16.
 */
import React from 'react';
import Controllers from './Controllers';
import GameView from './GameView';

class GameViewContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.pollData = this.pollData.bind(this);
    }

    pollData() {
        Controllers.viewGame(this.props.params.id)
            .then((game) => {
                this.setState({game});
            })
            .catch((error) => {
                this.setState({ message: "This game does not exists!" })
            });
    }

    render() {
        return <GameView game={this.state.game} message={this.state.message} pollData={this.pollData}/>;
    }
}

export default GameViewContainer;