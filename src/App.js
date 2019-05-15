import React from 'react';
import logo from './logo.svg';
import './App.css';
import "../node_modules/video-react/dist/video-react.css"; // import css
import { Player, ControlBar, BigPlayButton } from 'video-react';
import { Button, ProgressBar, Container, Row, Col, Card } from 'react-bootstrap';
import { MdVolumeDown, MdPauseCircleOutline, MdPlayCircleOutline, MdVolumeUp, MdFastRewind, MdFastForward  } from "react-icons/md";

import PlayerControl from './PlayerControl'

function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <Container fluid={true}>
        <PlayerControl/>
    </Container>
  </div>
  );
}

export default App;
