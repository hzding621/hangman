import React from 'react';
import Controllers from './Controllers';
import Header from './component/Header';
import css from './Game.css' // eslint-disable-line

class CreateGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wordInput: '',
            livesInput: ''
        };

        // Event handlers
        this.onWordInputChange = this.onWordInputChange.bind(this);
        this.onLivesInputChange = this.onLivesInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // Bind text input value to React state
    onWordInputChange(event) {
        this.setState({ wordInput: event.target.value });
    }
    onLivesInputChange(event) {
        this.setState({ livesInput: event.target.value });
    }

    onSubmit() {
        if (!CreateGame.validate(this.state.wordInput, this.state.livesInput)) {
            return;
        }
        Controllers.custom(this.state.wordInput, parseInt(this.state.livesInput, 10))
            .then((jsonResponse) => {
                const {key} = jsonResponse;
                this.context.router.push(`/view/${key}`);
            });
    }

    static validate(word, lives) {
        // check word contains only english lowercase characters, and lives is a positive integer
        return !/[^a-z]/.test(word) && !/[^0-9]/.test(lives);
    }

    render() {
        return (
            <div className="body">
                <Header/>
                <div><img src="/fig/4.png" role="presentation"/></div>
                <div>
                    <div>Answer</div>
                    <input onChange={this.onWordInputChange}/>
                    <div>Lives</div>
                    <input onChange={this.onLivesInputChange}/>
                    <br/>
                    <button onClick={this.onSubmit}>Create</button>
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