/* eslint-disable react/jsx-filename-extension */
import React, { Component, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../components/Login';
import MainContainer from './MainContainer';

document.getElementById('client_id').content = process.env.CLIENT_ID;

// class App extends Component {
function App() {
  const [favsPlayer, setFavsPlayer] = useState([]);
  const [favsTeam, setFavsTeam] = useState([]);

  return (
    <>
      {/* if not logged in, render this */}
      {/* <Login /> */}
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
