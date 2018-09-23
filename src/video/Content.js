import React from 'react';
// eslint-disable-next-line no-unused-vars
import './Content.css';
import Player from './Player';

const Content = ({ src }) =>
  src && (
    <div className="content">
      <div className="player-outer">
        <Player className="player" src={src} autoplay={true} fluid={true} controls={true}/>
      </div>
    </div>
  );

export default Content;
