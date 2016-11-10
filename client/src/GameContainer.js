import React, { Component } from 'react';
import Controllers from './Controllers';
import Game from './Game';

// State container for the entire game, delegate presentation to Game component
class GameContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: null, // contains game progress metadata
            trials: [], // stores the previously guessed letters in this game
            message: "" // alert message
        };

        // Event handlers
        this.onNewGame = this.onNewGame.bind(this);
        this.submitGuess = this.submitGuess.bind(this);
    }

    onNewGame() {
        Controllers.newGame()
            .then((responseJson) => {
                this.setState({ game: responseJson, trials: [] });
            });
    }

    submitGuess(key, letter) {
        if (!GameContainer.validateGuess(letter)) {
            this.setState({ message: 'Please type in exactly one English letter..' });
            return;
        }
        if (this.state.trials.includes(letter)) {
            this.setState({ message: `Already tried letter ${letter}` });
            return;
        }
        Controllers.guess(key, letter)
            .then((responseJson) => {
                const trials = this.state.trials;
                trials.push(letter);
                this.setState({ trials, game: responseJson, message: "" });
            });
    }

    // Validate the input contains exactly one english letter
    static validateGuess(letter) {
        letter = letter.toLowerCase();
        return letter.length === 1 && letter[0] >= 'a' && letter[0] <= 'z';
    }

    render() {
        return (
            <Game
                game={this.state.game}
                trials={this.state.trials}
                message={this.state.message}
                submitGuess={this.submitGuess}
                onNewGame={this.onNewGame}
            />
        );
    }
}

export default GameContainer;
