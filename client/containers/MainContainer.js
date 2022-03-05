import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";

class MainContainer extends Component {
  render() {
    return(
      <>
        <Sidebar />
        <Dashboard />
      </>
    )
  }
}

export default MainContainer;
