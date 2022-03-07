/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';

let teamPlayerVitals;
let teamPlayerNames = [];
let allFavoritePlayerInfo = [];
let that;

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { player: 'Jordan' };
    const { allPlayerInfo } = this.props;
    allFavoritePlayerInfo = allPlayerInfo;
    that = this;
  }

  componentDidMount() {
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
            team.nbaFranchise === true
            && team.name !== 'Home Team Stephen A'
          ) {
            nbaTeams.push([team.id, team.name]);
          }
        });
        this.makeTeamDropdown(nbaTeams);
      });
  }

  getPlayers() {
    const teamId = document.getElementById('team-names').value;
    if (teamId === 'Choose') {
      document.getElementById('player-names').disabled = true;
      document.getElementById('favorite-team').style.visibility = 'hidden';
      document.getElementById('favorite-player').style.visibility = 'hidden';
      return;
    }
    document.getElementById('player-names').disabled = false;
    document.getElementById('favorite-team').style.visibility = 'visible';

    console.log(this);
    this.setPlayerButton();
    // if (document.getElementById('player-names').value === 'Choose') {
    //   document.getElementById('favorite-player').style.visibility = 'hidden';
    // } else { document.getElementById('favorite-player').style.visibility = 'visible'; }
    // end of setPlayerButton function

    fetch(
      `https://api-nba-v1.p.rapidapi.com/players?team=${teamId}&season=2021`,
      {
        headers: {
          'x-rapidapi-host': process.env.host,
          'x-rapidapi-key': process.env.key,
        },
      },
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        teamPlayerVitals = data.response;
        teamPlayerNames = [];
        teamPlayerVitals.forEach((player) => {
          teamPlayerNames.push([
            player.id,
            player.firstname.concat(' ', player.lastname),
          ]);
        });

        document.getElementById('player-names').innerHTML = '';
        teamPlayerNames.forEach((player) => {
          const option = document.createElement('option');
          [option.value, option.innerText] = player;
          document.getElementById('player-names').appendChild(option);
        });
      });
  }

  setPlayerButton() {
    console.log('hi');
    if (document.getElementById('player-names').value === 'Choose') {
      document.getElementById('favorite-player').style.visibility = 'hidden';
    } else { document.getElementById('favorite-player').style.visibility = 'visible'; }
    const playerID = document.getElementById('player-names').value;

    // fetch(
    //   `https://api-nba-v1.p.rapidapi.com/players/statistics?id=${playerID}&season=2021`,
    //   {
    //     headers: {
    //       'x-rapidapi-host': process.env.host,
    //       'x-rapidapi-key': process.env.key,
    //     },
    //   },
    // )
    //   .then((data) => data.json())
    //   .then((data) => {
    //     allFavoritePlayerInfo.push([playerID, data.response]);
    //     // teamPlayerVitals.forEach((player) => {
    //     //   teamPlayerNames.push([
    //     //     player.id,
    //     //     player.firstname.concat(' ', player.lastname),
    //     //   ]);
    //     // });

    //     document.getElementById('player-names').innerHTML = '';
    //     teamPlayerNames.forEach((player) => {
    //       const option = document.createElement('option');
    //       [option.value, option.innerText] = player;
    //       document.getElementById('player-names').appendChild(option);
    //     });
    //   });
  }

  makeTeamDropdown(nbaTeams) {
    nbaTeams.forEach((team) => {
      const option = document.createElement('option');
      [option.value, option.innerText] = team;
      document.getElementById('team-names').appendChild(option);
    });
  }

  // add favorited team to database
  addFavoriteTeam() {
    const teamId = document.getElementById('team-names').value;
    fetch('/user/addTeam', {
      method: 'POST',
      body: JSON.stringify(teamId),
    })
      .then((data) => data.json())
      .then((data) => this.refreshTeams(data));
  }

  refreshTeams(teams) {
    console.log(teams);
  }

  // add favorited player to database
  addFavoritePlayer() {
    const playerId = document.getElementById('player-names').value;
    console.log(playerId);
    fetch('/user/addPlayer', {
      method: 'POST',
      body: JSON.stringify(playerId),
    })
      .then((data) => data.json())
      .then((data) => this.refreshPlayers(data));
  }

  refreshPlayers(players) {
    console.log(players);
  }

  render() {
    return (
      <div id="search-bar">
        <label htmlFor="team-names">Choose a team: </label>
        <select
          onChange={this.getPlayers}
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
          onChange={this.setPlayerButton}
          name="player-names"
          disabled
          id="player-names"
        >
          <option value="Choose">Choose a player:</option>
          <option value="test2">Test2</option>
        </select>
        <input
          type="button"
          onClick={this.addFavoriteTeam}
          value="Favorite team"
          style={{ visibility: 'hidden' }}
          id="favorite-team"
        />
        <input
          type="button"
          onClick={this.addFavoritePlayer}
          value="Favorite player"
          style={{ visibility: 'hidden' }}
          id="favorite-player"
        />
      </div>
    );
  }
}

export default SearchBox;
