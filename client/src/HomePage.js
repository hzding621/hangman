import React from 'react';
import { NewGameButton, CustomGameButton } from './component/Buttons';
import Header from './component/Header';
import css from './Game.css' // eslint-disable-line

const HomePage = (props) => {
    return (
        <div className="body">
            <Header/>
            <div><img src="/fig/4.png" role="presentation"/></div>
            <NewGameButton/>
            <br /><br />
            <CustomGameButton/>
        </div>
    );
};

export default HomePage;

