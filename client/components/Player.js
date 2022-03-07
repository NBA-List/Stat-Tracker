import React, { Component } from 'react';

const allFavInfoPromise = [];
let that;

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { allPlayerInfo } = this.props;
    that = this;
  }

  componentDidMount() {
    console.log(this.state);
    that.props.allPlayerInfo.forEach((favPlayer) => {
      allFavInfoPromise.push(fetch(
        `https://api-nba-v1.p.rapidapi.com/players/statistics?id=${favPlayer[0]}&season=2021`,
      ).then((res) => res.json()));
    });
    const allData = Promise.all(allFavInfoPromise);
    allData.then((res) => console.log(res));

    // fetch('https://api-nba-v1.p.rapidapi.com/teams', {
    //   headers: {
    //     'x-rapidapi-host': process.env.host,
    //     'x-rapidapi-key': process.env.key,
    //   },
    // })
    //   .then((data) => data.json())
    //   .then((data) => {
    //     const nbaTeams = [];
    //     data.response.forEach((team) => {
    //       if (
    //         team.nbaFranchise === true
    //         && team.name !== 'Home Team Stephen A'
    //       ) {
    //         nbaTeams.push([team.id, team.name]);
    //       }
    //     });
    //     this.makeTeamDropdown(nbaTeams);
    //   });
    this.playerStatCalc();
  }

  playerStatCalc() {
    console.log('hi');
    console.log(this.state);
    console.log('hello');
    console.log(this.props.allPlayerInfo);
  }

  render() {
    return (<p> </p>);
  }

  // const playerStats = this.state.allPlayerInfo.map((data, i) => {
  //   return <Card data={data} key={`player-stat-${i}`} />;
}

export default Player;
