/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';

class SearchBox extends Component {
  componentDidMount() {
    fetch('https://api-nba-v1.p.rapidapi.com/teams', {
      headers: {
        // 'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
        // 'x-rapidapi-key': '135fde008amsh21b6fc09093bbd5p172cf7jsn085e38b2c831',
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log('hi');
        console.log(data);
        this.makeTeamDropdown(data);
      });
  }

  getPlayers() {
    const teamId = document.getElementById('team-names').value;
    if (teamId === 'Choose') {
      document.getElementById('player-names').disabled = true;
      return;
    }
    document.getElementById('player-names').disabled = false;
    fetch('https://api-nba-v1.p.rapidapi.com/players', {
      params: { team: teamId, season: '2021' },
      headers: {
        'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
        'x-rapidapi-key': '135fde008amsh21b6fc09093bbd5p172cf7jsn085e38b2c831',
      },
    })
      .then((data) => data.json())
      .then((data) => this.makePlayerDropdown(data));
  }

  makePlayerDropdown(data) {
    console.log('hi');
    console.log(data);
    data.forEach((player) => {
      const option = document.createElement('option');
      option.value = player.id;
      option.innerText = `${player.firstname} ${player.lastname}`;
      document.getElementById('player-names').appendChild(option);
    });
  }

  makeTeamDropdown(data) {
    data.forEach((team) => {
      if (!team.nbaFranchise || team.id === 37) return;
      const option = document.createElement('option');
      option.value = team.id;
      option.innerText = team.name;
      document.getElementById('team-names').appendChild(option);
    });
  }

  render() {
    return (
      <>
        <label htmlFor="team-names">Choose a team: </label>
        <select onChange={this.getPlayers} name="team-names" id="team-names">
          <option value="Choose" selected="selected">Choose a team:</option>
        </select>
        <br />
        <label htmlFor="player-names">Choose a player: </label>
        <select onChange={this.getPlayers} name="player-names" disabled="true" id="player-names">
          <option value="Choose" selected="selected">Choose a player:</option>
        </select>
      </>
    );
  }
}

export default SearchBox;
