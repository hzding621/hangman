import React from 'react';
import css from './Game.css' // eslint-disable-line

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { input: '' };

        // Event handlers
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // Clear text input upon view update
    componentWillReceiveProps(nextProps) {
        this.setState({ input: '' })
    }

    // Bind text input value to React state
    onInputChange(event) {
        this.setState({ input: event.target.value });
    }

    // Event handler for 'Guess' button
    onSubmit() {
        const {id} = this.props.game;
        this.props.submitGuess(id, this.state.input);
    }

    render() {
        if (!this.props.game) {
            // When the game is not initialized, only show the New Game button
            return (
                <div className="body">
                    <h1>HangMan</h1>
                    <div><img src="/fig/4.png" role="presentation"/></div>
                    <button onClick={this.props.onNewGame}>New Game</button>
                </div>
            );
        }
        const {phrase, answer, state, lives, id} = this.props.game;
        const {trials, message, onNewGame} = this.props;
        const aliveView = (
            <div>
                <div>Status: {state}</div>
                <div>Number of lives left: {lives}</div>
                <div>Trials: {trials}</div>
                <br />
                <div>Enter one letter:</div>
                <input type="text" value={this.state.input} onChange={this.onInputChange}/>
                <input type="submit" value="guess" onClick={this.onSubmit}/>
                <div className="red">{message}</div>
            </div>
        );
        const finishedView = (
            <div>
                { state === 'won'
                    ? <div>Congratulations! You found the answer</div>
                    : <div>The answer is <span className="red">{answer}</span>. Try again...</div>
                }
                <br />
                <button onClick={onNewGame}>New Game</button>
            </div>
        );
        const pictureUrl = `/fig/${10 - lives}.png`;
        return (
            <div className="body">
                <h1>HangMan</h1>
                <div><img src={pictureUrl} role="presentation" /></div>
                <h2 className="phrase">{phrase}</h2>
                {state === 'alive' ? aliveView : finishedView}
                <br />
                <div>Share this game</div>
                <input className="shareLink" value={`localhost:3000/view/${id}`} readOnly/>
            </div>
        );
    }
}

// Provide type checks for props
Game.PropTypes = {
    game: React.PropTypes.object,
    trials: React.PropTypes.arrayOf(React.PropTypes.string),
    submitGuess: React.PropTypes.func.isRequired,
    onNewGame: React.PropTypes.func.isRequired,
    message: React.PropTypes.string
};

export default Game;