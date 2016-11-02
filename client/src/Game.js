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
        return (
            <div style={{textAlign: "center"}}>
                <h1>HangMan</h1>
                <h2>{this.props.phrase}</h2>
                <div>Status: {this.props.state} Number of lives left: {this.props.lives} </div>
                <p/>
                <input type="text" value={this.state.guess} onChange={this.handleGuessChange}/>
                <input type="submit" value="guess" onClick={() => this.props.guessRequest(this.state.guess)}/>
            </div>
        )
    }
}

Game.PropTypes = {
    gameKey: React.PropTypes.string,
    phrase: React.PropTypes.string,
    state: React.PropTypes.string,
    lives: React.PropTypes.number,
    guessRequest: React.PropTypes.func
};

export default Game;