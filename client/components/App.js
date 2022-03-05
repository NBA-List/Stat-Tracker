import React, { Component } from "react";
import Login from "./Login.js";
import Dashboard from "./Dashboard.js";
import { useState } from "react";

// use useContext instead grab context from Login
// const [ loggedIn ] = useState('');

document.getElementById("client_id").content = process.env.CLIENT_ID;

// class App extends Component {
const App = () => {
  // if not logged in, render this
  return (
    <>
      {/* <Dashboard /> */}
      <Login />
      <p>Hello from App.js</p>
    </>
  );
  // if logged in, render dashboard
};

export default App;
