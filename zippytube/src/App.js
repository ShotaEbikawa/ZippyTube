import React from 'react';
import './App.css';
import Main from './components/Main';
import SignUp from './pages/SignUp';
import VideoForm from './pages/VideoForm';
import Result from './pages/Result';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import io from 'socket.io-client';
import Video from './pages/Video';
import {Switch, Route} from 'react-router-dom';

function App() {
  const socketIo = io('/');
  socketIo.on('me', data => {
    console.log(data);
  })
  
  return (
      <>
        <head>
        <link href="https://vjs.zencdn.net/7.5.5/video-js.css" rel="stylesheet" />
        <script src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
        <style>
          @import url('https://fonts.googleapis.com/css?family=Hind+Guntur&display=swap');
        </style>
        </head>
        <Main socketIo={socketIo}/>
        <Switch>
          <Route exact path='/signup' component={SignUp}/>
          <Route exact path='/create-video'><VideoForm socketIo={socketIo}/></Route>
          <Route exact path='/results/:query' component={Result}/>
          <Route exact path='/video/:id' component={Video}/>
          <Route exact path='/user-profile/:username'><ProfilePage socketIo={socketIo}/></Route>
          <Route exact path='/' component={HomePage}/>
        </Switch>
      </>
  );
}

export default App;
