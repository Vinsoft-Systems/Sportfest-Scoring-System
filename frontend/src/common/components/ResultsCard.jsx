import React, { useState, useMemo } from 'react';

const ResultsCard = () => {
  const [activeSport, setActiveSport] = useState('futsal');

  // Style definitions
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '30px'
    },
    sportSelector: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px',
      gap: '15px'
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#f0f0f0',
      color: '#333',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    activeButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#2c3e50',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    standingsContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '20px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      margin: '20px 0'
    },
    th: {
      padding: '12px 15px',
      textAlign: 'center',
      border: '1px solid #ddd',
      backgroundColor: '#f8f9fa',
      fontWeight: 'bold'
    },
    td: {
      padding: '12px 15px',
      textAlign: 'center',
      border: '1px solid #ddd'
    },
    evenRow: {
      backgroundColor: '#f2f2f2'
    },
    hoverRow: {
      backgroundColor: '#e9ecef'
    }
  };

  // Raw sports data (not yet sorted)
  const sportsDataRaw = {
    futsal: {
      title: 'Futsal Standings',
      columns: ["Rank", "Team", "Played", "Wins", "Draws", "Losses", "GF", "GA", "GD", "Points"],
      teams: [
        { id: 1, team: 'Team B', played: 10, wins: 7, draws: 2, losses: 1, gf: 18, ga: 7, points: 23 },
        { id: 2, team: 'Team A', played: 10, wins: 8, draws: 1, losses: 1, gf: 20, ga: 5, points: 25 },
        { id: 3, team: 'Team C', played: 10, wins: 6, draws: 3, losses: 1, gf: 15, ga: 8, points: 21 },
        { id: 4, team: 'Team D', played: 10, wins: 6, draws: 2, losses: 2, gf: 22, ga: 10, points: 20 },
        { id: 5, team: 'Team E', played: 10, wins: 5, draws: 3, losses: 2, gf: 17, ga: 9, points: 18 }
      ]
    },
    basketball: {
      title: 'Basketball Standings',
      columns: ["Rank", "Team", "Played", "Wins", "Losses", "GF", "GA", "Points"],
      teams: [
        { id: 1, team: 'Team A', played: 10, wins: 9, losses: 1, pf: 850, pa: 700, points: 18 },
        { id: 2, team: 'Team B', played: 10, wins: 9, losses: 1, pf: 820, pa: 710, points: 18 },
        { id: 3, team: 'Team C', played: 10, wins: 8, losses: 2, pf: 880, pa: 800, points: 16 }
      ]
    },
    volleyball: {
      title: 'Volleyball Standings',
      columns: ["Rank", "Team", "Played", "Wins", "Losses", "Sets Won", "Sets Lost", "Points"],
      teams: [
        { id: 1, team: 'Team A', played: 10, wins: 9, losses: 1, setsWon: 27, setsLost: 5, points: 27 },
        { id: 2, team: 'Team B', played: 10, wins: 9, losses: 1, setsWon: 28, setsLost: 6, points: 27 },
        { id: 3, team: 'Team C', played: 10, wins: 8, losses: 2, setsWon: 25, setsLost: 8, points: 24 }
      ]
    }
  };

  // Sort teams according to ranking rules
  const sportsData = useMemo(() => {
    return {
      futsal: {
        ...sportsDataRaw.futsal,
        teams: [...sportsDataRaw.futsal.teams].sort((a, b) => {
          // sort by total points
          if (b.points !== a.points) return b.points - a.points;
          // sort by gd
          const aGD = a.gf - a.ga;
          const bGD = b.gf - b.ga;
          if (bGD !== aGD) return bGD - aGD;
          // gf
          return b.gf - a.gf;
        }).map((team, index) => ({
          ...team,
          rank: index + 1,
          gd: team.gf - team.ga
        }))
      },
      basketball: {
        ...sportsDataRaw.basketball,
        teams: [...sportsDataRaw.basketball.teams].sort((a, b) => {
          if (b.points !== a.points) return b.points - a.points;
          const aPD = a.pf - a.pa;
          const bPD = b.pf - b.pa;
          if (bPD !== aPD) return bPD - aPD;
          return b.pf - a.pf;
        }).map((team, index) => ({
          ...team,
          rank: index + 1
        }))
      },
      volleyball: {
        ...sportsDataRaw.volleyball,
        teams: [...sportsDataRaw.volleyball.teams].sort((a, b) => {
          if (b.points !== a.points) return b.points - a.points;
          const aSetDiff = a.setsWon - a.setsLost;
          const bSetDiff = b.setsWon - b.setsLost;
          if (bSetDiff !== aSetDiff) return bSetDiff - aSetDiff;
          return b.setsWon - a.setsWon;
        }).map((team, index) => ({
          ...team,
          rank: index + 1
        }))
      }
    };
  }, []);

  const handleSportChange = (sport) => {
    setActiveSport(sport);
  };

  // Handle row hover state
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Sports Competition Results</h1>
      
      <div style={styles.sportSelector}>
        {Object.keys(sportsData).map((sport) => (
          <button
            key={sport}
            style={activeSport === sport ? styles.activeButton : styles.button}
            onClick={() => handleSportChange(sport)}
          >
            {sport.charAt(0).toUpperCase() + sport.slice(1)}
          </button>
        ))}
      </div>
      
      <div style={styles.standingsContainer}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>
          {sportsData[activeSport].title}
        </h2>
        
        <table style={styles.table}>
          <thead>
            <tr>
              {sportsData[activeSport].columns.map((column, index) => (
                <th key={index} style={styles.th}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sportsData[activeSport].teams.map((team, index) => {
              const isEven = index % 2 === 0;
              const isHovered = hoveredRow === team.id;
              
              return (
                <tr 
                  key={team.id}
                  style={{
                    ...styles.td,
                    ...(isEven ? styles.evenRow : {}),
                    ...(isHovered ? styles.hoverRow : {}),
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={() => setHoveredRow(team.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={styles.td}>{team.rank}</td>
                  <td style={styles.td}>{team.team}</td>
                  <td style={styles.td}>{team.played}</td>
                  <td style={styles.td}>{team.wins}</td>
                  
                  {activeSport === 'futsal' && (
                    <>
                      <td style={styles.td}>{team.draws}</td>
                      <td style={styles.td}>{team.losses}</td>
                      <td style={styles.td}>{team.gf}</td>
                      <td style={styles.td}>{team.ga}</td>
                      <td style={styles.td}>{team.gd}</td>
                    </>
                  )}
                  
                  {activeSport === 'basketball' && (
                    <>
                      <td style={styles.td}>{team.losses}</td>
                      <td style={styles.td}>{team.pf}</td>
                      <td style={styles.td}>{team.pa}</td>
                    </>
                  )}
                  
                  {activeSport === 'volleyball' && (
                    <>
                      <td style={styles.td}>{team.losses}</td>
                      <td style={styles.td}>{team.setsWon}</td>
                      <td style={styles.td}>{team.setsLost}</td>
                    </>
                  )}
                  
                  <td style={styles.td}>{team.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsCard;