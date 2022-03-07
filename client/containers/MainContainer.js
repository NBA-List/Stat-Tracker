/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

function MainContainer({ allPlayerInfo }) {
  return (
    <>
      <Header />
      <Sidebar allPlayerInfo={allPlayerInfo} />
      <Dashboard allPlayerInfo={allPlayerInfo} />
    </>
  );
}

export default MainContainer;
