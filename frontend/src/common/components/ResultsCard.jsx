import React, { useState, useEffect } from 'react';
import { useApi } from 'fastapi-rtk';

const GROUP_RULES = {
  Futsal: [
    { group: 'Group A', count: 3 },
    { group: 'Group B', count: 4 },
    { group: 'Group C', count: 3 },
  ],
  basketball: [
    { group: 'Group A', count: 3 },
    { group: 'Group B', count: 3 },
  ],
  volleyball: [
    { group: 'Group A', count: 3 },
    { group: 'Group B', count: 3 },
  ],
  // For badminton, we will handle grouping logic separately below
};

const COLUMNS = {
  Futsal: ["Rank", "Team", "Played", "Wins", "Draws", "Losses", "GF", "GA", "GD", "Points"],
  basketball: ["Rank", "Team", "Played", "Wins", "Losses", "Points For", "Points Against", "Points"],
  volleyball: ["Rank", "Team", "Played", "Wins", "Losses", "Points"],
  badminton_ganda_putra: ["Rank", "Name(s)", "Played", "Wins", "Losses", "Points"],
  badminton_ganda_campuran: ["Rank", "Name(s)", "Played", "Wins", "Losses", "Points"],
};

const TITLES = {
  Futsal: "Futsal Standings",
  basketball: "Basketball Standings",
  volleyball: "Volleyball Standings",
  badminton_ganda_putra: "Badminton Ganda Putra",
  badminton_ganda_campuran: "Badminton Ganda Campuran",
};

const ResultsCard = () => {
  const [activeSport, setActiveSport] = useState('Futsal');
  const [teamsData, setTeamsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null);
  const { getEntry } = useApi();

  // Fetch all teams for all sports on mount
  useEffect(() => {
    setLoading(true);
    getEntry('/teams/').then((data) => {
    console.log('All teams:', data);
    setLoading(false);
  });
    Promise.all([
      getEntry('/team?where=[["sport_branch","Futsal"]]'),
      getEntry('/team?where=[["sport_branch","basketball"]]'),
      getEntry('/team?where=[["sport_branch","volleyball"]]'),
      getEntry('/team?where=[["sport_branch","badminton"]]'),
    ]).then(([Futsal, basketball, volleyball, badminton]) => {
      const sortByCreated = arr =>
      (arr || []).slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      console.log('Futsal result:', Futsal?.result);  
      setTeamsData({
        Futsal: sortByCreated(Futsal?.result),
        basketball: sortByCreated(basketball?.result),
        volleyball: sortByCreated(volleyball?.result),
        badminton: sortByCreated(badminton?.result),
      });
      setLoading(false);
    });
  }, [getEntry]);

  // Helper to group teams according to rules
  function groupTeams(teams, sport) {
    if (sport === 'badminton_ganda_putra' || sport === 'badminton_ganda_campuran') {
      // This is handled below in the badminton section
      return {};
    }
    const rules = GROUP_RULES[sport];
    let idx = 0;
    const groups = {};
    for (const rule of rules) {
      groups[rule.group] = teams.slice(idx, idx + rule.count);
      idx += rule.count;
    }
    return groups;
  }

  // Helper to sort teams (by points, then other rules)
  function sortTeams(teams, sport) {
    return [...teams].sort((a, b) => {
      if ((b.points ?? 0) !== (a.points ?? 0)) return (b.points ?? 0) - (a.points ?? 0);
      if (sport === 'Futsal') {
        const aGD = (a.gf ?? 0) - (a.ga ?? 0);
        const bGD = (b.gf ?? 0) - (b.ga ?? 0);
        if (bGD !== aGD) return bGD - aGD;
        return (b.gf ?? 0) - (a.gf ?? 0);
      } else if (sport === 'basketball') {
        const aPD = (a.pf ?? 0) - (a.pa ?? 0);
        const bPD = (b.pf ?? 0) - (b.pa ?? 0);
        if (bPD !== aPD) return bPD - aPD;
        return (b.pf ?? 0) - (a.pf ?? 0);
      } else if (
        sport === 'badminton_ganda_putra' ||
        sport === 'badminton_ganda_campuran'
      ) {
        return (b.wins ?? 0) - (a.wins ?? 0);
      }
      return 0;
    }).map((team, idx) => ({
      ...team,
      rank: idx + 1,
      ...(sport === 'Futsal' && { gd: (team.gf ?? 0) - (team.ga ?? 0) })
    }));
  }

  // Special grouping for badminton
  function groupBadmintonTeams(teams) {
    // 1st 4: Ganda Putra, Group A
    // 2nd 4: Ganda Putra, Group B
    // 3rd 4: Ganda Putra, Group C
    // 4th 4: Ganda Campuran, Group A
    // 5th 4: Ganda Campuran, Group B
    const groups = {
      badminton_ganda_putra: {
        'Group A': sortTeams(teams.slice(0, 4), 'badminton_ganda_putra'),
        'Group B': sortTeams(teams.slice(4, 8), 'badminton_ganda_putra'),
        'Group C': sortTeams(teams.slice(8, 12), 'badminton_ganda_putra'),
      },
      badminton_ganda_campuran: {
        'Group A': sortTeams(teams.slice(12, 16), 'badminton_ganda_campuran'),
        'Group B': sortTeams(teams.slice(16, 20), 'badminton_ganda_campuran'),
      },
    };
    return groups;
  }

  if (loading) return <div style={{ textAlign: 'center', padding: 40 }}>Loading...</div>;

  // Prepare grouped and sorted data for the active sport
  let grouped = {};
  if (activeSport === 'badminton_ganda_putra' || activeSport === 'badminton_ganda_campuran') {
    const badmintonGroups = groupBadmintonTeams(teamsData['badminton'] || []);
    grouped = badmintonGroups[activeSport];
  } else {
    grouped = groupTeams(teamsData[activeSport] || [], activeSport);
    Object.keys(grouped).forEach(group => {
      grouped[group] = sortTeams(grouped[group], activeSport);
    });
  }

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
    groupContainer: {
      marginBottom: '40px'
    },
    groupHeader: {
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '10px 15px',
      borderRadius: '5px 5px 0 0',
      marginBottom: '0'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '30px'
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

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Sports Competition Results</h1>
      <div style={styles.sportSelector}>
        {Object.keys(COLUMNS).map((sport) => (
          <button
            key={sport}
            style={activeSport === sport ? styles.activeButton : styles.button}
            onClick={() => setActiveSport(sport)}
          >
            {TITLES[sport]}
          </button>
        ))}
      </div>
      <div style={styles.standingsContainer}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>
          {TITLES[activeSport]}
        </h2>
        {Object.entries(grouped).map(([groupName, teams]) => (
          <div key={groupName} style={styles.groupContainer}>
            <h3 style={styles.groupHeader}>{groupName}</h3>
            <table style={styles.table}>
              <thead>
                <tr>
                  {COLUMNS[activeSport].map((column, index) => (
                    <th key={index} style={styles.th}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => {
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
                      {/* Render cells dynamically based on columns */}
                      {COLUMNS[activeSport].map((column, colIdx) => {
                        let value = '';
                        switch (column) {
                          case 'Rank': value = team.rank; break;
                          case 'Team':
                          case 'Name(s)': value = team.name || team.team; break;
                          case 'Played': value = team.played ?? '-'; break;
                          case 'Wins': value = team.wins ?? '-'; break;
                          case 'Draws': value = team.draws ?? '-'; break;
                          case 'Losses': value = team.losses ?? '-'; break;
                          case 'GF': value = team.gf ?? '-'; break;
                          case 'GA': value = team.ga ?? '-'; break;
                          case 'GD': value = team.gd ?? '-'; break;
                          case 'Points For': value = team.pf ?? '-'; break;
                          case 'Points Against': value = team.pa ?? '-'; break;
                          case 'Points': value = team.points ?? '-'; break;
                          default: value = '';
                        }
                        return (
                          <td key={colIdx} style={styles.td}>{value}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsCard;