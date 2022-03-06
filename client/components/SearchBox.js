/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';

let teamPlayerVitals;
let teamPlayerNames = [];

class SearchBox extends Component {
  componentDidMount() {
    fetch('https://api-nba-v1.p.rapidapi.com/teams', {
      headers: {
        'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
        'x-rapidapi-key': '76befa362emshbec67c1a0062f13p17e6b0jsn113a7fce6386',
      },
    })
      .then((data) => data.json())
      .then((data) => {
        const nbaTeams = [];
        data.response.forEach((team) => {
          if ((team.nbaFranchise === true) && ((team.name !== 'Home Team Stephen A'))) {
            nbaTeams.push([team.id, team.name]);
          }
        });
        this.makeTeamDropdown(nbaTeams);
      });
  }

  getPlayers(e) {
    const teamId = document.getElementById('team-names').value;
    if (teamId === 'Choose') {
      document.getElementById('player-names').disabled = true;
      return;
    }
    document.getElementById('player-names').disabled = false;
    fetch(`https://api-nba-v1.p.rapidapi.com/players?team=${teamId}&season=2021`, {
      headers: {
        'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
        'x-rapidapi-key': '76befa362emshbec67c1a0062f13p17e6b0jsn113a7fce6386',
      },
    })
      .then((data) => data.json())
      .then((data) => teamPlayerVitals = data.response)
      .then(() => {
        teamPlayerNames = [];
        teamPlayerVitals.forEach((player) => {
          teamPlayerNames.push([player.id, player.firstname.concat(' ', player.lastname)]);
        });

        document.getElementById('player-names').innerHTML = '';
        teamPlayerNames.forEach((player) => {
          const option = document.createElement('option');
          [option.value, option.innerText] = player;
          document.getElementById('player-names').appendChild(option);
        });
      });
  }

  makeTeamDropdown(data) {
    data.forEach((team) => {
      // if (!team.nbaFranchise || team.id === 37) return;
      const option = document.createElement('option');
      [option.value, option.innerText] = team;
      document.getElementById('team-names').appendChild(option);
    });
  }

  render() {
    return (
      <>
        <label htmlFor="team-names">Choose a team: </label>
        <select onChange={(e) => this.getPlayers(e)} name="team-names" id="team-names" selected="selected">
          <option value="Choose">Choose a team:</option>
        </select>
        <br />
        <label htmlFor="player-names">Choose a player: </label>
        <select name="player-names" disabled="true" id="player-names">
          <option value="Choose" selected="selected">Choose a player:</option>
        </select>
      </>
    );
  }
}

export default SearchBox;
