/* eslint-disable react/jsx-filename-extension */
import React, { Component, useState } from 'react';
import MainContainer from './MainContainer.js';
import { Switch, Route } from 'react-router-dom';
import GoogleLoginHook from '../components/GoogleLoginHook.js';
import GoogleLogoutHook from '../components/GoogleLogoutHook.js';

// use useContext instead grab context from Login
// const [ loggedIn ] = useState('');

document.getElementById('client_id').content = process.env.CLIENT_ID;

// class App extends Component {
function App() {
  const [favsPlayer, setFavsPlayer] = useState([]);
  const [favsTeam, setFavsTeam] = useState([]);

  return (
    <>
      {/* if not logged in, render this */}
      <GoogleLoginHook />
      <GoogleLogoutHook />
      {/* if logged in, render dashboard */}
      <MainContainer
        favsPlayer={favsPlayer}
        favsTeam={favsTeam}
        setFavsPlayer={setFavsPlayer}
        setFavsTeam={setFavsTeam}
      />
    </>
  );
}

export default App;
