import React from 'react';
import css from '../Game.css' // eslint-disable-line

export default ({key}) => {
    return (
        <div>
            <div>Play together</div>
            <input className="shareLink" value={`localhost:3000/play/${key}`} readOnly/>
            <br /><br />
            <div>Watch me play</div>
            <input className="shareLink" value={`localhost:3000/view/${key}`} readOnly/>
        </div>
    );
}