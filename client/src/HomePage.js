import React from 'react';
import NewGameButton from './component/NewGameButton';
import CustomGameButtom from './component/CustomGameButton';
import Header from './component/Header';
import css from './Game.css' // eslint-disable-line

const HomePage = (props) => {
    return (
        <div className="body">
            <Header/>
            <div><img src="/fig/4.png" role="presentation"/></div>
            <NewGameButton/>
            <br /><br />
            <CustomGameButtom/>
        </div>
    );
};

export default HomePage;

