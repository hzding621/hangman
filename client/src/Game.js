import React from 'react';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { guess: '' };
        this.handleGuessChange = this.handleGuessChange.bind(this);
    }

    handleGuessChange(event) {
        this.setState({guess: event.target.value});
    }

    render() {
        if (!this.props.game) {
            // Game is not loaded
            return (<div></div>);
        }
        const {id, phrase, state, lives} = this.props.game;
        return (
            <div style={{textAlign: "center"}}>
                <h2 style={{fontFamily: "Ubuntu Mono"}}>{phrase}</h2>
                {
                    state === 'alive'
                    ? <div>
                        <div>Status: {state} Number of lives left: {lives} </div>
                        <br />
                        <input type="text" value={this.state.guess} onChange={this.handleGuessChange}/>
                        <input type="submit" value="guess"
                               onClick={() => this.props.guessRequest(id, this.state.guess)}/>
                    </div>
                    : <div>
                        {
                            state === 'won'
                            ? <div>Congratulations! You found the answer</div>
                            : <div>You can try again...</div>
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