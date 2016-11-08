import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import GameContainer from './GameContainer';
import GameViewContainer from './GameViewContainer';
import './semantic-ui/semantic.min.css';

ReactDOM.render(
    <GameContainer />,
    document.getElementById('root')
);

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={GameContainer}/>
        <Route path="/view/:id" component={GameViewContainer}/>
    </Router>
), document.getElementById('root'));
