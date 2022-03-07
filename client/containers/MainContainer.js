/* eslint-disable react/jsx-filename-extension */
import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

function MainContainer({
  addFavs,
  removeFavs,
  favs,

}) {
  useEffect(() => {
    console.log('in effect, ', favs);
  }, [favs]);
  return (
    <>
      <Header />
      {/* <button onClick={() => addFavs()}>
        Click me
        {' '}
      </button>
      <button onClick={() => removeFavs()}>
        Click me
        {' '}
      </button> */}

      <Sidebar
        favs={favs}
        addFavs={addFavs}
        removeFavs={removeFavs}
      />
      <Dashboard
        favs={favs}
        addFavs={addFavs}
        removeFavs={removeFavs}
      />
    </>
  );
}

export default MainContainer;
