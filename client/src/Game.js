import React from 'react';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { guess: '', trials: [] };
        this.handleGuessChange = this.handleGuessChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.game && this.props.game && this.props.game.id !== nextProps.game.id) {
            this.setState({ trials: [] });
        }
    }

    handleGuessChange(event) {
        this.setState({guess: event.target.value});
    }

    static validateGuess(letter) {
        letter = letter.toLowerCase();
        return (letter.length === 1 && letter[0] >= 'a' && letter[0] <= 'z');
    }

    onSubmit() {
        if (Game.validateGuess(this.state.guess)) {
            const {id} = this.props.game;
            const trials = this.state.trials;
            trials.push(this.state.guess);
            this.setState({ trials });
            this.props.guessRequest(id, this.state.guess);
        }
    }
    render() {
        if (!this.props.game) {
            // Game is not loaded
            return (<div></div>);
        }
        const {phrase, answer, state, lives} = this.props.game;
        return (
            <div style={{textAlign: "center"}}>
                <h2 style={{fontFamily: "Ubuntu Mono"}}>{phrase}</h2>
                {
                    state === 'alive'
                    ? <div>
                        <div>Status: {state}</div>
                        <div>Number of lives left: {lives} </div>
                        <div>Trials: {this.state.trials}</div>
                        <br />
                        <input type="text" value={this.state.guess} onChange={this.handleGuessChange}/>
                        <input type="submit" value="guess" onClick={this.onSubmit}/>
                    </div>
                    : <div>
                        {
                            state === 'won'
                            ? <div>Congratulations! You found the answer</div>
                            : <div>The answer is <span style={{color: 'red'}}>{answer}</span>. Try again...</div>
                        }
                        <br />
                        <button onClick={this.props.onNewGame}>New Game</button>
                    </div>
                }
            </div>
        )
    }
}

Game.PropTypes = {
    game: React.PropTypes.object,
    guessRequest: React.PropTypes.func,
    onNewGame: React.PropTypes.func
};

export default Game;