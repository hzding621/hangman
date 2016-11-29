import React from 'react';
import css from '../Game.css' // eslint-disable-line

export default ({id, viewId}) => {
    return (
        <div>
            {id
                ? <div>
                    <div>Ask your friend to play</div>
                    <input className="shareLink" value={`localhost:3000/play/${id}`} readOnly/>
                  </div>
                : <div />
            }
            <br /><br />
            <div>Ask your friend to watch</div>
            <input className="shareLink" value={`localhost:3000/view/${viewId}`} readOnly/>
        </div>
    );
}