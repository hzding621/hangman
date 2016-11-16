import React from 'react';
import NewGameButton from './component/NewGameButton';
import css from './Game.css' // eslint-disable-line

const HomePage = (props) => {
    return (
        <div className="body">
            <h1>HangMan</h1>
            <div><img src="/fig/4.png" role="presentation"/></div>
            <NewGameButton/>
        </div>
    );
};

export default HomePage;

