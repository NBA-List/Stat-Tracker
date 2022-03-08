/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Header from '../components/Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

function MainContainer({ favsPlayer, favsTeam, setFavsPlayer, setFavsTeam }) {
  return (
    <>
      <Header />
      <Sidebar
        favsPlayer={favsPlayer}
        favsTeam={favsTeam}
        setFavsPlayer={setFavsPlayer}
        setFavsTeam={setFavsTeam}
      />
      <Dashboard
        favsPlayer={favsPlayer}
        favsTeam={favsTeam}
        setFavsPlayer={setFavsPlayer}
        setFavsTeam={setFavsTeam}
      />
    </>
  );
}

export default MainContainer;
