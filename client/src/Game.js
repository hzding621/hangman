import React from 'react';
import css from './Game.css'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { input: ''};
        this.handleGuessChange = this.handleGuessChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // Clear text input upon view update
    componentWillReceiveProps(nextProps) {
        this.setState({ input: '' })
    }

    // Bind text input value to React state
    handleGuessChange(event) {
        this.setState({input: event.target.value});
    }

    onSubmit() {
        const {id} = this.props.game;
        this.props.guessRequest(id, this.state.input);
    }
    render() {
        if (!this.props.game) {
            // When the game is not initialize, only show the New Game button
            return (
                <div className="body">
                    <h1>HangMan</h1>
                    <button onClick={this.props.onNewGame}>New Game</button>
                </div>
            );
        }
        const {phrase, answer, state, lives} = this.props.game;
        return (
            <div className="body">
                <h1>HangMan</h1>
                <h2 className="phrase">{phrase}</h2>
                {
                    state === 'alive'
                    ? <div>
                        <div>Status: {state}</div>
                        <div>Number of lives left: {lives} </div>
                        <div>Trials: {this.props.trials}</div>
                        <br />
                        <input type="text" value={this.state.input} onChange={this.handleGuessChange}/>
                        <input type="submit" value="guess" onClick={this.onSubmit}/>
                        <div className="red">{this.props.message}</div>
                    </div>
                    : <div>
                        {
                            state === 'won'
                            ? <div>Congratulations! You found the answer</div>
                            : <div>The answer is <span className="red">{answer}</span>. Try again...</div>
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
    trials: React.PropTypes.arrayOf(React.PropTypes.string),
    guessRequest: React.PropTypes.func,
    onNewGame: React.PropTypes.func,
    message: React.PropTypes.string
};

export default Game;