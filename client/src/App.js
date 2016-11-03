import React, { Component } from 'react';
import Client from './Client';
import Game from './Game';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: null
        };

        this.onNewGame = this.onNewGame.bind(this);
        this.guessRequest = this.guessRequest.bind(this);
    }

    onNewGame() {
        Client.newGame().then((game) => {
            this.setState({ game });
        });
    }

    guessRequest(key, letter) {
        Client.guess(key, letter)
            .then((game) => {
                this.setState({ game });
            });
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <h1>HangMan</h1>
                {this.state.game
                    ? <div></div>
                    : <button onClick={this.onNewGame}>New Game</button>
                }
                <Game game={this.state.game} guessRequest={this.guessRequest} onNewGame={this.onNewGame} />
            </div>
        );
    }
}

export default App;
