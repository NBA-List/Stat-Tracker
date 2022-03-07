import React, { useEffect } from 'react';

const allFavsInPromise = [];
function Player({
  addFavs,
  removeFavs,
  favs,
}) {
  const playerStatCalc = () => {
  };

  useEffect(() => {
    favs.forEach((playerID) => {
      allFavsInPromise.push(fetch(
        `https://api-nba-v1.p.rapidapi.com/players/statistics?id=${playerID}&season=2021`,
        {
          headers: {
            'x-rapidapi-host': process.env.host,
            'x-rapidapi-key': process.env.key,
          },
        },
      ).then((res) => res.json()));
    });

    const allData = Promise.all(allFavsInPromise);
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

    playerStatCalc();
  });

  return (<p> </p>);

  // const playerStats = this.state.allPlayerInfo.map((data, i) => (
  //   <FeedItem url={data} key={(i += "hello")} />
  // ));
}

export default Player;
