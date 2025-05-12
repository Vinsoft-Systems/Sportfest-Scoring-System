import React, { useState } from 'react';

const ResultsCard = () => {
  const [activeSport, setActiveSport] = useState('futsal');

  // Style definitions
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px'
  };

  const sportSelectorStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
    gap: '15px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
    color: '#333',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#2c3e50',
    color: 'white'
  };

  const standingsContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0'
  };

  const thStyle = {
    padding: '12px 15px',
    textAlign: 'center',
    border: '1px solid #ddd',
    backgroundColor: '#f8f9fa',
    fontWeight: 'bold'
  };

  const tdStyle = {
    padding: '12px 15px',
    textAlign: 'center',
    border: '1px solid #ddd'
  };

  const trStyle = {
    '&:nth-child(even)': {
      backgroundColor: '#f2f2f2'
    },
    '&:hover': {
      backgroundColor: '#e9ecef'
    }
  };

  // Sports data
  const sportsData = {
    futsal: {
      title: 'Futsal Standings',
      columns: ["Rank", "Team", "Played", "Wins", "Draws", "Losses", "GF", "GA", "GD", "Points"],
      rows: [
        { rank: 1, team: 'Team A', played: 10, wins: 8, draws: 1, losses: 1, gf: 20, ga: 5, gd: 15, points: 25 },
        { rank: 2, team: 'Team B', played: 10, wins: 7, draws: 2, losses: 1, gf: 18, ga: 7, gd: 11, points: 23 },
        { rank: 3, team: 'Team C', played: 10, wins: 6, draws: 3, losses: 1, gf: 15, ga: 8, gd: 7, points: 21 },
      ]
    },
    basketball: {
      title: 'Basketball Standings',
      columns: ["Rank", "Team", "Played", "Wins", "Losses", "Points For", "Points Against", "Points"],
      rows: [
        { rank: 1, team: 'Team D', played: 10, wins: 9, losses: 1, pf: 850, pa: 700, points: 18 },
        { rank: 2, team: 'Team E', played: 10, wins: 8, losses: 2, pf: 820, pa: 750, points: 16 },
        { rank: 3, team: 'Team F', played: 10, wins: 7, losses: 3, pf: 800, pa: 780, points: 14 },
      ]
    },
    volleyball: {
      title: 'Volleyball Standings',
      columns: ["Rank", "Team", "Played", "Wins", "Losses", "Sets Won", "Sets Lost", "Points"],
      rows: [
        { rank: 1, team: 'Team G', played: 10, wins: 9, losses: 1, setsWon: 27, setsLost: 5, points: 27 },
        { rank: 2, team: 'Team H', played: 10, wins: 8, losses: 2, setsWon: 25, setsLost: 8, points: 24 },
        { rank: 3, team: 'Team I', played: 10, wins: 7, losses: 3, setsWon: 23, setsLost: 10, points: 21 },
      ]
    }
  };

  const handleSportChange = (sport) => {
    setActiveSport(sport);
  };

  // Helper function to apply hover styles
  const getRowStyle = (index) => ({
    ...tdStyle,
    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f2f2f2',
    ':hover': {
      backgroundColor: '#e9ecef'
    }
  });

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Sports Competition Results</h1>
      
      <div style={sportSelectorStyle}>
        <button 
          style={activeSport === 'futsal' ? activeButtonStyle : buttonStyle}
          onClick={() => handleSportChange('futsal')}
        >
          Futsal
        </button>
        <button 
          style={activeSport === 'basketball' ? activeButtonStyle : buttonStyle}
          onClick={() => handleSportChange('basketball')}
        >
          Basketball
        </button>
        <button 
          style={activeSport === 'volleyball' ? activeButtonStyle : buttonStyle}
          onClick={() => handleSportChange('volleyball')}
        >
          Volleyball
        </button>
      </div>
      
      <div style={standingsContainerStyle}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>
          {sportsData[activeSport].title}
        </h2>
        
        <table style={tableStyle}>
          <thead>
            <tr>
              {sportsData[activeSport].columns.map((column, index) => (
                <th key={index} style={thStyle}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sportsData[activeSport].rows.map((row, index) => (
              <tr key={row.rank} style={getRowStyle(index)}>
                <td style={tdStyle}>{row.rank}</td>
                <td style={tdStyle}>{row.team}</td>
                <td style={tdStyle}>{row.played}</td>
                <td style={tdStyle}>{row.wins}</td>
                {activeSport === 'futsal' && (
                  <>
                    <td style={tdStyle}>{row.draws}</td>
                    <td style={tdStyle}>{row.losses}</td>
                    <td style={tdStyle}>{row.gf}</td>
                    <td style={tdStyle}>{row.ga}</td>
                    <td style={tdStyle}>{row.gd}</td>
                  </>
                )}
                {activeSport === 'basketball' && (
                  <>
                    <td style={tdStyle}>{row.losses}</td>
                    <td style={tdStyle}>{row.pf}</td>
                    <td style={tdStyle}>{row.pa}</td>
                  </>
                )}
                {activeSport === 'volleyball' && (
                  <>
                    <td style={tdStyle}>{row.losses}</td>
                    <td style={tdStyle}>{row.setsWon}</td>
                    <td style={tdStyle}>{row.setsLost}</td>
                  </>
                )}
                <td style={tdStyle}>{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsCard;