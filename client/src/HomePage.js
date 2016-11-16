import React from 'react';
import NewGameButton from './component/NewGameButton';
import Header from './component/Header';
import css from './Game.css' // eslint-disable-line

const HomePage = (props) => {
    return (
        <div className="body">
            <Header/>
            <div><img src="/fig/4.png" role="presentation"/></div>
            <NewGameButton/>
        </div>
    );
};

export default HomePage;

