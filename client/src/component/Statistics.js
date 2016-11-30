import React from 'react';
import css from '../Game.css' // eslint-disable-line

// Middle portion of the page that shows game information
// Shared by both Game and GameView
const Text = ({answer, state, lives, trials}) => {

    switch(state) {
        case 'alive':
            return (
                <div>
                    <div>Status: {state}</div>
                    <div>Number of lives left: {lives}</div>
                    {trials ? <div>Trials: {trials}</div> : <div />}
                </div>
            );
        case 'won':
            return <div>Congratulations!</div>;
        case 'lost':
            return <div>The answer is <span className="red">{answer}</span>. Try again...</div>;
        default:
            return <div />
    }
};

export default ({game}) => {
    if (!game) {
        return <div />;
    }
    const {phrase, answer, state, lives, trials} = game;
    const picture = lives <= 10 ? <div><img src={`/fig/${10 - lives}.png`} role="presentation" /></div> : <div />;
    return (
        <div>
            {picture}
            <h2 className="phrase">{phrase}</h2>
            <Text answer={answer}
                  state={state}
                  lives={lives}
                  trials={trials}
            />
        </div>
    )
}