import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import './index.css';
import './semantic-ui/semantic.min.css';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

ReactDOM.render(
    <Game gameKey="asdjhfab" phrase="e_ ee__e" state="alive" lives="6" guessRequest={(guess) => console.log(guess)}/>,
    document.getElementById('root')
);
