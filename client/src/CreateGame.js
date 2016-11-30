import React from 'react';
import Controllers from './Controllers';
import Header from './component/Header';
import css from './Game.css' // eslint-disable-line

class CreateGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wordInput: '',
            livesInput: '',
            message: ''
        };

        // Event handlers
        this.onWordInputChange = this.onWordInputChange.bind(this);
        this.onLivesInputChange = this.onLivesInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // Bind text input value to React state
    onWordInputChange(event) {
        this.setState({ wordInput: event.target.value, message: '' });
    }
    onLivesInputChange(event) {
        this.setState({ livesInput: event.target.value, message: '' });
    }

    onSubmit() {
        if (!CreateGame.validate(this.state.wordInput, this.state.livesInput)) {
            this.setState({
                message: 'Rule: (1) the word must contain only lowercase letters (2) life must be a positive number.'
            });
            return;
        }
        Controllers.custom(this.state.wordInput, parseInt(this.state.livesInput, 10))
            .then((jsonResponse) => {
                const {key} = jsonResponse;
                this.context.router.push(`/play/${key}`);
            });
    }

    static validate(word, lives) {
        // check word contains only english lowercase characters, and lives is a positive integer
        return word.length > 0 && lives.length > 0 && !/[^a-z]/.test(word) && !/[^0-9]/.test(lives);
    }

    render() {
        return (
            <div className="body">
                <Header/>
                <div><img src="/fig/4.png" role="presentation"/></div>
                <div>
                    <div>Answer</div>
                    <input onChange={this.onWordInputChange}/>
                    <div>Life</div>
                    <input onChange={this.onLivesInputChange}/>
                    <br/>
                    <button onClick={this.onSubmit}>Create</button>
                    <br />
                    <div className="red">{this.state.message}</div>
                </div>
            </div>
        )
    }
}

// Inject react-router into context for redirecting
CreateGame.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default CreateGame;