import React, { Component } from 'react';
import { Player, ControlBar, BigPlayButton } from 'video-react';

import "../node_modules/video-react/dist/video-react.css";
import { Button, ProgressBar, Container, Row, Col } from 'react-bootstrap';
import { MdVolumeDown, MdPauseCircleOutline, MdPlayCircleOutline, MdVolumeUp, MdFastRewind, MdFastForward  } from "react-icons/md";
import './PlayerControl.css';

export default class PlayerControl extends Component {
   
  constructor(props, context) {
    super(props, context);
    this.state = { 
      paused: true ,
      isHovering: false,
    }

    //Garantir le this
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }

  componentDidMount() {
    // subscribe state change
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
  
  }

  handleStateChange(state, prevState) {
    // copy player state to this component's state
    this.setState({
      currentTime: state.currentTime,
      duration: state.duration,
      paused: state.paused
    });
  }

  play() {
    this.refs.player.play();
  }

  pause() {
    this.refs.player.pause();
  }

  load() {
    this.refs.player.load();
  }

  changeCurrentTime(seconds) {
    return () => {
      const { player } = this.refs.player.getState();
      const currentTime = player.currentTime;
      this.refs.player.seek(currentTime + seconds);
    };
  }

  changeVolume(steps) {
    return () => {
      const { player } = this.refs.player.getState();
      const volume = player.volume;
      this.refs.player.volume = volume + steps;
    };
  }

  updateProgressBar(){
    return (this.state.currentTime * 100)/ this.state.duration
  }

  displayPausePlayButon(){
    if (this.state.paused){
      return (<Button onClick={this.play} variant="dark"><MdPlayCircleOutline size={32} /></Button>)
    }else{
      return (<Button onClick={this.pause} variant="dark"><MdPauseCircleOutline size={32} /></Button>)
    }
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }


  render() {
    return (
      <Container  >
        <Player
          className="video"
          ref="player"
          playsInline
          poster="/assets/poster.png"
          src="https://s3-eu-west-1.amazonaws.com/onrewind-test-bucket/big_buck_bunny.mp4"
        >
          <ControlBar disableCompletely={true} /> 
          <BigPlayButton position="center" disabled/>
        </Player>
        <Container 
          onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}
          className="content">
          {
            this.state.isHovering && 
            <Row>
              <Col xs={{ span: 4, offset: 4 }}>
                <Row>
                  <Col xs={12}>
                    <Button onClick={this.changeVolume(0.1)} variant="outline-dark"><MdVolumeUp size={32} /></Button>
                  </Col>
                </Row>
                <Row className="padding">
                  <Col>
                    <Button onClick={this.changeCurrentTime(-10)} variant="outline-dark"><MdFastRewind size={32} /></Button>
                  </Col>
                  <Col xs={6}>
                    {this.displayPausePlayButon()}
                  </Col>
                  <Col>
                    <Button onClick={this.changeCurrentTime(10)} variant="outline-dark"><MdFastForward size={32} /></Button>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Button onClick={this.changeVolume(-0.1)} variant="outline-dark"><MdVolumeDown size={32}/></Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          }
          <Row className="padding">
            <Col xs={12}>
              <ProgressBar animated now={this.updateProgressBar()}/>
            </Col>
          </Row>
        </Container>
      </Container> 
    );
  }
}
