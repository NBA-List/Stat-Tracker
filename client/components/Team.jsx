import React, { useEffect } from 'react';

function Team({ favsTeam, setFavsTeam, teamId }) {
  // generates random key
  const getRandomKey = () => {
    const keys = process.env.keys.split(' ');
    return keys[Math.floor(Math.random() * keys.length)];
  };

  const populateTeamVitals = (team) => {
    document.getElementById(teamId).src = team.logo;
  };

  // grab team info when component renders
  useEffect(() => {
    // fetch(
    //   `https://api-nba-v1.p.rapidapi.com/teams/statistics?id=${teamId}&season=2021`,
    //   {
    //     headers: {
    //       'x-rapidapi-host': process.env.host,
    //       'x-rapidapi-key': getRandomKey(),
    //     },
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((data) => populateTeam(data));
    fetch(`https://api-nba-v1.p.rapidapi.com/teams?id=${teamId}`, {
      headers: {
        'x-rapidapi-host': process.env.host,
        'x-rapidapi-key': getRandomKey(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        populateTeamVitals(data.response[0]);
      });
  }, [favsTeam]);

  return (
    <div>
      <img className="logo" alt="team logo" id={teamId} />
    </div>
  );
}

export default Team;
