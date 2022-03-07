/* eslint-disable react/jsx-filename-extension */
import React, { Component, useEffect } from 'react';

let teamPlayerVitals;
let teamPlayerNames = [];
const allFavoritePlayerInfo = [];

function SearchBox({
  addFavs,
  removeFavs,
  favs,
}) {
  const makeTeamDropdown = (nbaTeams) => {
    nbaTeams.forEach((team) => {
      const option = document.createElement('option');
      [option.value, option.innerText] = team;
      document.getElementById('team-names').appendChild(option);
    });
  };

  useEffect(() => {
    fetch('https://api-nba-v1.p.rapidapi.com/teams', {
      headers: {
        'x-rapidapi-host': process.env.host,
        'x-rapidapi-key': process.env.key,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        const nbaTeams = [];
        data.response.forEach((team) => {
          if (
            team.nbaFranchise === true &&
            team.name !== 'Home Team Stephen A'
          ) {
            nbaTeams.push([team.id, team.name]);
          }
        });
        makeTeamDropdown(nbaTeams);
      });
  });

  const getPlayers = () => {
    const teamId = document.getElementById('team-names').value;
    if (teamId === 'Choose') {
      document.getElementById('player-names').disabled = true;
      document.getElementById('favorite-team').style.visibility = 'hidden';
      document.getElementById('favorite-player').style.visibility = 'hidden';
      return;
    }
    document.getElementById('player-names').disabled = false;
    document.getElementById('favorite-team').style.visibility = 'visible';

    fetch(
      `https://api-nba-v1.p.rapidapi.com/players?team=${teamId}&season=2021`,
      {
        headers: {
          'x-rapidapi-host': process.env.host,
          'x-rapidapi-key': process.env.key,
        },
      }
    )
      .then((data) => data.json())
      .then((data) => {
        teamPlayerVitals = data.response;
        teamPlayerNames = [];
        teamPlayerVitals.forEach((player) => {
          teamPlayerNames.push([
            player.id,
            player.firstname.concat(' ', player.lastname),
          ]);
        });
        document.getElementById('player-names').innerHTML =
          '<option value="Choose">Choose a player:</option>';
        playerInfo.forEach((player) => {
          const option = document.createElement('option');
          [option.value, option.innerText] = player;
          document.getElementById('player-names').appendChild(option);
        });
      });
  };

  setPlayerButton = () => {
    if (document.getElementById('player-names').value === 'Choose') {
      document.getElementById('favorite-player').style.visibility = 'hidden';
    } else {
      document.getElementById('favorite-player').style.visibility = 'visible';
    }
  };

  const refreshTeams = (teams) => {
    console.log(teams);
  };

  // add favorited team to database
  const addFavoriteTeam = () => {
    const teamId = document.getElementById('team-names').value;
    fetch('/user/addTeam/' + teamId, {
      method: 'POST',
    })
      .then((data) => data.json())
      .then((data) => refreshTeams(data));
  };

  const refreshPlayers = (players) => {
    console.log(players);
  };

  // add favorited player to database
  const addFavoritePlayer = () => {
    const playerId = document.getElementById('player-names').value;
    addFavs(playerId);
    fetch('/user/addPlayer', {
      method: 'POST',
      body: JSON.stringify(playerId),
    })
      .then((data) => data.json())
      .then((data) => refreshPlayers(data));
  };

  return (
    <div id="search-bar">
      <label htmlFor="team-names">Choose a team: </label>
      <select
        onChange={getPlayers}
        name="team-names"
        id="team-names"
        selected="selected"
      >
        <option value="Choose">Choose a team:</option>
        <option value="test1">Test1</option>
      </select>
      <br />
      <label htmlFor="player-names">Choose a player: </label>
      <select
        onChange={setPlayerButton}
        name="player-names"
        disabled
        id="player-names"
      >
        <option value="Choose">Choose a player:</option>
        <option value="test2">Test2</option>
      </select>
      <input
        type="button"
        onClick={addFavoriteTeam}
        value="Favorite team"
        style={{ visibility: 'hidden' }}
        id="favorite-team"
      />
      <input
        type="button"
        onClick={addFavoritePlayer}
        value="Favorite player"
        style={{ visibility: 'hidden' }}
        id="favorite-player"
      />
    </div>
  );
}

export default SearchBox;
