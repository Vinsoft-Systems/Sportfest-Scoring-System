import React, { useState } from 'react';

const Results = () => {
    const [activeSport, setActiveSport] = useState('futsal');

    const sportsData = {
        futsal: {
            title: 'Futsal Standings',
            columns: ["Rank", "Team", "Played", "Wins", "Draws", "Losses", "GF", "GA", "GD", "Points"],
            rows:[//data still mocked
                { rank: 1, team: 'Team A', played: 10, wins: 8, draws: 1, losses: 1, gf: 20, ga: 5, gd: 15, points: 25 },
                { rank: 2, team: 'Team B', played: 10, wins: 7, draws: 2, losses: 1, gf: 18, ga: 7, gd: 11, points: 23 },
                { rank: 3, team: 'Team C', played: 10, wins: 6, draws: 3, losses: 1, gf: 15, ga: 8, gd: 7, points: 21 },
            ]
        },
        basketball: {
            title: 'Basketball Standings',
            columns: ["Rank", "Team", "Played", "Wins", "Draws", "Losses", "GF", "GA", "GD", "Points"],
            rows:[//data still mocked
                { rank: 1, team: 'Team D', played: 10, wins: 9, draws: 0, losses: 1, gf: 25, ga: 10, gd: 15, points: 27 },
                { rank: 2, team: 'Team E', played: 10, wins: 8, draws: 1, losses: 1, gf: 22, ga: 12, gd: 10, points: 25 },
                { rank: 3, team: 'Team F', played: 10, wins: 7, draws: 2, losses: 1, gf: 20, ga: 15, gd: 5, points: 23 },
            ]
        },
        volleyball:{
            title: 'Volleyball Standings',
            columns: ["Rank", "Team", "Played", "Wins", "Draws", "Losses", "GF", "GA", "GD", "Points"],
            rows:[//data still mocked
                { rank: 1, team: 'Team G', played: 10, wins: 8, draws: 1, losses: 1, gf: 30, ga: 15, gd: 15, points: 25 },
                { rank: 2, team: 'Team H', played: 10, wins: 7, draws: 2, losses: 1, gf: 28, ga: 18, gd: 10, points: 23 },
                { rank: 3, team: 'Team I', played: 10, wins: 6, draws: 3, losses: 1, gf: 25, ga: 20, gd: 5, points: 21 },
            ]
        }
    };

    const handleSportChange = (sport) => {
        setActiveSport(sport);
    };

    return (
<<<<<<< HEAD
  <div className="sports-results-container">
    {/* ... (keep your existing header and sport selector) */}
    
    <div className="standings-container">
      <h2>{sportsData[activeSport].title}</h2>
      <div className="standings-table">
        <table>
          <thead>
            <tr>
              {sportsData[activeSport].columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sportsData[activeSport].rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{row.rank}</td>
                <td>{row.team}</td>
                <td>{row.played}</td>
                <td>{row.wins}</td>
                <td>{row.draws}</td>
                <td>{row.losses}</td>
                <td>{row.gf}</td>
                <td>{row.ga}</td>
                <td>{row.gd}</td>
                <td>{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
=======
    <div className="sports-results-container">
      <h1>Sports Competition Results</h1>
      
      <div className="sport-selector">
        <button 
          className={activeSport === 'futsal' ? 'active' : ''}
          onClick={() => handleSportChange('futsal')}
        >
          Futsal
        </button>
        <button 
          className={activeSport === 'basketball' ? 'active' : ''}
          onClick={() => handleSportChange('basketball')}
        >
          Basketball
        </button>
        <button 
          className={activeSport === 'volleyball' ? 'active' : ''}
          onClick={() => handleSportChange('volleyball')}
        >
          Volleyball
        </button>
      </div>
      
      <div className="standings-container">
        <h2>{sportsData[activeSport].title}</h2>
        <div className="standings-table">
          <table>
            <thead>
              <tr>
                {sportsData[activeSport].columns.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sportsData[activeSport].rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
>>>>>>> ca55549f6a87cfb9e4add72e7f5d06ca17166438
    
}

export default Results;