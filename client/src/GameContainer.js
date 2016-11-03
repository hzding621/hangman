import React, { Component } from 'react';
import Controllers from './Controllers';
import Game from './Game';

class GameContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: null,
            trials: [],
            message: ""
        };

        this.onNewGame = this.onNewGame.bind(this);
        this.guessRequest = this.guessRequest.bind(this);
    }

    onNewGame() {
        Controllers.newGame().then((game) => {
            this.setState({ game, trials: [] });
        });
    }

    guessRequest(key, letter) {
        if (!GameContainer.validateGuess(letter)) {
            return;
        }
        if (this.state.trials.includes(letter)) {
            this.setState({ message: `Already tried ${letter}`});
            return;
        }
        Controllers.guess(key, letter)
            .then((game) => {
                const trials = this.state.trials;
                trials.push(letter);
                this.setState({ trials, game, message: "" });
            });
    }

    // Validate the input contains exactly one english letter
    static validateGuess(letter) {
        letter = letter.toLowerCase();
        return (letter.length === 1 && letter[0] >= 'a' && letter[0] <= 'z');
    }

    render() {
        return (<Game game={this.state.game}
                      trials={this.state.trials}
                      guessRequest={this.guessRequest}
                      onNewGame={this.onNewGame}
                      message={this.state.message}/>
        );
    }
}

export default GameContainer;
