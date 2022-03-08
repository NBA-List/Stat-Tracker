import React, { useEffect } from 'react';

const QuickChart = require('quickchart-js');

function Player({ favsPlayer, setFavsPlayer, playerId }) {
  const populatePlayer = (data) => {
    const games = data.response;
    const points = [];
    for (let i = 0; i < games.length; i++) {
      points.push(games[i].points);
    }
    const ppg = new QuickChart();
    ppg.setWidth(500);
    ppg.setHeight(300);
    ppg.setConfig({
      type: 'line',
      data: {
        labels: [...Array(games.length).keys()].map((el) => el + 1),
        datasets: [
          {
            label: 'Points',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: points,
            fill: false,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: 'Points per game ',
        },
      },
    });
    document.getElementById('ppg').src = ppg.getUrl();
  };

  const populatePlayerVitals = (data) => {
    const {
      firstname,
      lastname,
      birth,
      nba,
      height,
      weight,
      college,
      leagues,
    } = data[0];
    const name = firstname.concat(' ', lastname);
    const fullHeight = String(height.feets).concat('.', String(height.inches));
    const vitalArr = [
      name,
      fullHeight,
      birth.date,
      birth.country,
      nba.start,
      weight.pounds,
      college,
      leagues.standard.jersey,
      leagues.standard.pos,
    ];
    document.getElementById('playerVitals').innerHTML = '';
    for (let i = 0; i < vitalArr.length; i += 1) {
      const newPar = document.createElement('p');
      newPar.innerText = vitalArr[i];
      document.getElementById('playerVitals').appendChild(newPar);
    }
  };

  // generates random key
  const getRandomKey = () => {
    const keys = process.env.keys.split(' ');
    return keys[Math.floor(Math.random() * keys.length)];
  };

  useEffect(() => {
    fetch(
      `https://api-nba-v1.p.rapidapi.com/players/statistics?id=${playerId}&season=2021`,
      {
        headers: {
          'x-rapidapi-host': process.env.host,
          'x-rapidapi-key': getRandomKey(),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => populatePlayer(data));

    fetch(`https://api-nba-v1.p.rapidapi.com/players?id=${playerId}`, {
      headers: {
        'x-rapidapi-host': process.env.host,
        'x-rapidapi-key': getRandomKey(),
      },
    })
      .then((res) => res.json())
      .then((data) => populatePlayerVitals(data.response));
  }, [favsPlayer]);

  return (
    <div>
      <p id="playerVitals"></p>
      <img id="ppg"></img>
    </div>
  );

  {
    /* // const playerStats = this.state.allPlayerInfo.map((data, i) => (
  //   <FeedItem url={data} key={(i += "hello")} />
  // )); */
  }
}

export default Player;
