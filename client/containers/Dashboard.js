/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { useEffect } from 'react';
import Team from '../components/Team';
import Player from '../components/Player';
import Login from '../components/Login';
import GoogleLogin from 'react-google-login';
import GoogleLoginHook from '../components/GoogleLoginHook';

function Dashboard({ favsPlayer, favsTeam, setFavsPlayer, setFavsTeam }) {
  const playerComponents = favsPlayer.map((playerId) => (
    <Player
      favsPlayer={favsPlayer}
      setFavsPlayer={setFavsPlayer}
      playerId={playerId}
    />
  ));
  const teamComponents = favsTeam.map((teamId) => (
    <Team favsTeam={favsTeam} setFavsTeam={setFavsTeam} teamId={teamId} />
  ));

  return (
    <div id="dashboard">
      <div id="teams">
        <h2>Teams</h2>
        {teamComponents}
      </div>
      <div id="players">
        <h2>Players</h2>
        {playerComponents}
      </div>
    </div>
  );
}

export default Dashboard;
