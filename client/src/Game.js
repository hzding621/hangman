import React from 'react';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guess: ''
        };
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
                <h2>{phrase}</h2>
                <div>Status: {state} Number of lives left: {lives} </div>
                <p/>
                <input type="text" value={this.state.guess} onChange={this.handleGuessChange}/>
                <input type="submit" value="guess" onClick={() => this.props.guessRequest(id, this.state.guess)}/>
            </div>
        )
    }
}

Game.PropTypes = {
    game: React.PropTypes.object,
    guessRequest: React.PropTypes.func
};

export default Game;