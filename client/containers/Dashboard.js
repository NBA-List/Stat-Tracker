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
      <p style={{ fontSize: '30px' }}>
        Update: The following shows the "updated" example and answer.
        http://jsfiddle.net/Wcgvt/181/ The secret there is to use box-sizing:
        border-box, and some padding to make the second div height 100%, but
        move it's content down 50px. Then wrap the content in a div with
        overflow: auto to contain the scrollbar. Pay attention to z-indexes to
        keep all the text selectable - hope this helps, several years later.
      </p>
    </div>
  );
}

export default Dashboard;
