import React, { Component } from "react";
import Team from "../components/Team";
import Player from "../components/Player";

class Dashboard extends Component {
  render() {
    return (
      <>
          <Player />
          <Team />
      </>
    )
  }
}

export default Dashboard;
