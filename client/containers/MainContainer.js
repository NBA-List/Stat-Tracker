import React, { Component } from 'react';
import Header from '../components/Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

class MainContainer extends Component {
  render() {
    return (
      <>
        <Header />
        <Sidebar />
        <Dashboard />
      </>
    );
  }
}

export default MainContainer;
