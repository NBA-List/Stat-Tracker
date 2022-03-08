/* eslint-disable react/jsx-filename-extension */
import React, { Component, useEffect } from 'react';

let teamPlayerVitals;
let teamPlayerNames = [];

function SearchBox({ setFavsPlayer, setFavsTeam }) {
  const makeTeamDropdown = (nbaTeams) => {
    nbaTeams.forEach((team) => {
      const option = document.createElement('option');
      [option.value, option.innerText] = team;
      document.getElementById('team-names').appendChild(option);
    });
  };

  // generates random key
  const getRandomKey = () => {
    const keys = process.env.keys.split(' ');
    return keys[Math.floor(Math.random() * keys.length)];
  };

  // grabs team list to populate dropdown menu
  useEffect(() => {
    fetch('https://api-nba-v1.p.rapidapi.com/teams', {
      headers: {
        'x-rapidapi-host': process.env.host,
        'x-rapidapi-key': getRandomKey(),
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
  }, []);

  // get players from API when team selected
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
          'x-rapidapi-key': getRandomKey(),
        },
      }
    )
      .then((data) => data.json())
      .then((data) => {
        // grab player info from selected team to populate menu
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
        teamPlayerNames.forEach((player) => {
          const option = document.createElement('option');
          [option.value, option.innerText] = player;
          document.getElementById('player-names').appendChild(option);
        });
      });
  };

  // set visibility of "favorite player" button
  const setPlayerButton = () => {
    if (document.getElementById('player-names').value === 'Choose') {
      document.getElementById('favorite-player').style.visibility = 'hidden';
    } else {
      document.getElementById('favorite-player').style.visibility = 'visible';
    }
  };

  // add favorited team to database and set state
  const addFavoriteTeam = () => {
    const teamId = document.getElementById('team-names').value;
    fetch('/user/addTeam/' + teamId, {
      method: 'POST',
    })
      .then((data) => data.json())
      .then((data) => setFavsTeam(data.teams));
  };

  // add favorited player to database and set state
  const addFavoritePlayer = () => {
    const playerId = document.getElementById('player-names').value;
    fetch('/user/addPlayer/' + playerId, {
      method: 'POST',
      body: JSON.stringify(playerId),
    })
      .then((data) => data.json())
      .then((data) => setFavsPlayer(data.players));
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
