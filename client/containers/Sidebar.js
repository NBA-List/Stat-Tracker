/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import SearchBox from '../components/SearchBox';
import Favorites from '../components/Favorites';

function Sidebar({ favsPlayer, favsTeam, setFavsPlayer, setFavsTeam }) {
  return (
    <div id="sidebar">
      <SearchBox setFavsPlayer={setFavsPlayer} setFavsTeam={setFavsTeam} />
      <Favorites favsPlayer={favsPlayer} favsTeam={favsTeam} />
    </div>
  );
}

export default Sidebar;
