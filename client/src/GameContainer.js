import React, { Component } from 'react';
import Controllers from './Controllers';
import Game from './Game';

// State container for the entire game, delegate presentation to Game component
class GameContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: null, // contains game progress metadata
            message: "" // alert message
        };

        // Event handlers
        this.submitGuess = this.submitGuess.bind(this);
        this.pollData = this.pollData.bind(this);
    }

    pollData() {
        Controllers.viewGame(this.props.params.key)
            .then((game) => {
                this.setState({game});
            })
            .catch((error) => {
                this.setState({ message: "This game is not available." })
            });
    }

    submitGuess(key, letter) {
        if (!GameContainer.validateGuess(letter)) {
            this.setState({ message: 'Please type in exactly one English letter..' });
            return false;
        }
        if (this.state.game.trials.indexOf(letter) > -1) {
            this.setState({ message: `Already tried letter ${letter}` });
            return false;
        }
        Controllers.guess(key, letter)
            .then((responseJson) => {
                this.setState({game: responseJson, message: "" });
            });
        return true;
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
                message={this.state.message}
                submitGuess={this.submitGuess}
                pollData={this.pollData}
            />
        );
    }
}

export default GameContainer;
