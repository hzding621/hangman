import React from 'react';
import Statistics from './component/Statistics';
import Social from './component/Social';
import Header from './component/Header';
import css from './Game.css' // eslint-disable-line

const REFRESH_INTERVAL = 1000;

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { input: '' };

        // Event handlers
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onGetHint = this.onGetHint.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(this.props.pollData, REFRESH_INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // Clear text input upon view update
    componentWillReceiveProps(nextProps) {
        if (nextProps.game && this.props.game && nextProps.game.key !== this.props.game.key ) {
            this.setState({ input: '' })
        }
    }

    // Bind text input value to React state
    onInputChange(event) {
        this.setState({ input: event.target.value });
    }

    // Event handler for 'Guess' button
    onSubmit() {
        const {key} = this.props.game;
        if (this.props.submitGuess(key, this.state.input)) {
            this.setState({ input: '' });
        }
    }

    // Event handler for 'Get Hint' button
    onGetHint() {
        const {phrase, trials} = this.props.game;
        this.props.getHint(phrase, trials);
    }

    render() {
        if (!this.props.game) {
            // When the game is not initialized, only show the New Game button
            return (
                <div className="body">
                    <Header/>
                    <div><img src="/fig/4.png" role="presentation"/></div>
                    <div className="red">{this.props.message}</div>
                </div>
            );
        }
        const {game, message} = this.props;
        const {state, lives, key, view_key} = game;

        // Interaction section contains button users can click
        const interactionSection = state === 'alive'
            ? (
                <div>
                    <div>Enter one letter:</div>
                    <input type="text" value={this.state.input} onChange={this.onInputChange}/>
                    <input type="submit" value="guess" onClick={this.onSubmit}/>
                    <br />
                    <input type="submit" value="hint" onClick={this.onGetHint}/>
                    <div className="red">{message}</div>
                </div>)
            : <div />;

        return (
            <div className="body">
                <Header/>
                <div><img src={`/fig/${10 - lives}.png`} role="presentation" /></div>
                <Statistics game={game}/>
                {interactionSection}
                <br /><br />
                <Social id={key} viewId={view_key}/>
            </div>
        );
    }
}

// Provide type checks for props
Game.PropTypes = {
    game: React.PropTypes.object,
    pollData: React.PropTypes.func.isRequired,
    submitGuess: React.PropTypes.func.isRequired,
    getHint:React.PropTypes.func.isRequired,
    message: React.PropTypes.string
};

export default Game;