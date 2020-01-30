import React from 'react';
import Main from './components/Main'
import SignUp from './pages/SignUp'
import VideoForm from './pages/VideoForm'
import Result from './pages/Result'
import HomePage from './pages/HomePage'
import Video from './pages/Video'
import {Switch, Route} from 'react-router-dom'
import './App.css';

function App() {
  const ws = new WebSocket('ws://localhost:8000');
  ws.onmessage = (message) => {
    console.log(message);
  }
  return (
      <>
      <head>
      <link href="https://vjs.zencdn.net/7.5.5/video-js.css" rel="stylesheet" />
      <script src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
      </head>
      <Main/>
      <Switch>
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/create-video' component={VideoForm}/>
        <Route exact path='/results/:query' component={Result}/>
        <Route exact path='/video/:id' component={Video}/>
        <Route exact path='/' component={HomePage}/>
      </Switch>
      </>
  );
}

export default App;
