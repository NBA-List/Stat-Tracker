/* eslint-disable react/jsx-filename-extension */
import React, { Component, useState } from 'react';
import Login from '../components/Login.js';
import MainContainer from './MainContainer.js';

// use useContext instead grab context from Login
// const [ loggedIn ] = useState('');

document.getElementById('client_id').content = process.env.CLIENT_ID;

// class App extends Component {
function App() {
  const [favs, setFavs] = useState([]);
  const addFavs = (playerID) => {
    setFavs((oldFavs) => [...oldFavs, Number(playerID)]);
  };
  const removeFavs = (playerID) => {
    setFavs(((oldFavs) => {
      console.log(oldFavs);
      return oldFavs.filter((player) => Number(player) !== Number(playerID));
    }));
  };
  return (
    <>
      {/* if not logged in, render this */}
      {/* <Login /> */}
      {/* if logged in, render dashboard */}
      <MainContainer
        favs={favs}
        addFavs={addFavs}
        removeFavs={removeFavs}
      />
    </>
  );
}

export default App;
