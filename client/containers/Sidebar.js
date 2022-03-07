/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import SearchBox from '../components/SearchBox';
import Favorites from '../components/Favorites';

function Sidebar({ allPlayerInfo }) {
  return (
    <div id="sidebar">
      <SearchBox allPlayerInfo={allPlayerInfo} />
      <Favorites />
    </div>
  );
}

export default Sidebar;
