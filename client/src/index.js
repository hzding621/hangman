import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import HomePage from './HomePage';
import GameContainer from './GameContainer';
import GameViewContainer from './GameViewContainer';
import './semantic-ui/semantic.min.css';

ReactDOM.render(
    <GameContainer />,
    document.getElementById('root')
);

ReactDOM.render((
    <div>
        <Router history={browserHistory}>
            <Route path="/" component={HomePage}/>
            <Route path="/play/:key" component={GameContainer} />
            <Route path="/view/:key" component={GameViewContainer}/>
        </Router>
    </div>
), document.getElementById('root'));
