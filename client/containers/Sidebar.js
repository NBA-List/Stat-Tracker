/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import SearchBox from '../components/SearchBox';
import Favorites from '../components/Favorites';

function Sidebar({
  addFavs,
  removeFavs,
  favs,
}) {
  return (
    <div id="sidebar">
      <SearchBox
        favs={favs}
        addFavs={addFavs}
        removeFavs={removeFavs}
      />
      <Favorites />
    </div>
  );
}

export default Sidebar;
