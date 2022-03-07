/* eslint-disable react/jsx-filename-extension */
import React, { Component, useState } from 'react';
import Login from '../components/Login.js';
import MainContainer from './MainContainer.js';
import {Switch, Route} from 'react-router-dom';


// use useContext instead grab context from Login
// const [ loggedIn ] = useState('');

document.getElementById('client_id').content = process.env.CLIENT_ID;

// class App extends Component {
function App() {
  return (
    <>
      {/* if not logged in, render this */}
      {/* <Login /> */}
      {/* if logged in, render dashboard */}
      <MainContainer allPlayerInfo={[]} />
    </>
  );
}

export default App;
