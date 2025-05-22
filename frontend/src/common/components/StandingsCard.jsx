import { useEffect, useState, useMemo } from 'react';
import { useApi, ApiProvider } from 'fastapi-rtk';

const GROUP_LABELS = {
  Futsal: ['A', 'B', 'C'],
  Volleyball: ['A', 'B'],
  Basketball: ['A', 'B'],
  'Badminton Ganda Putra': ['A', 'B', 'C'],
  'Badminton Ganda Campuran': ['A', 'B'],
};

const COLUMNS = {
  Futsal: ['Rank', 'Team', 'Match Played', 'Win', 'Draw', 'Loss', 'GA', 'GF', 'GD', 'Points'],
  Volleyball: ['Rank', 'Team', 'Players'],
  Basketball: ['Rank', 'Team', 'Match Played', 'Win', 'Loss', 'Points'],
  'Badminton Ganda Putra': ['Rank', 'Team', 'Players'],
  'Badminton Ganda Campuran': ['Rank', 'Team', 'Players'],
};

function StandingsCard({ sportBranch = 'Futsal' }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSport, setActiveSport] = useState(sportBranch);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/team/teams_by_competition/1/${activeSport}`)
      .then(res => res.json())
      .then(data => {
        // If your API returns { result: [...] }
        setTeams(data.result || data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeSport]);

  // Group teams by group name (A, B, C, etc.)
  const groupedTeams = useMemo(() => {
    const groups = {};
    teams.forEach((team) => {
      const groupName = team.group || 'No Group';
      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(team);
    });

    // Sort groups by GROUP_LABELS order if available
    const orderedGroups = {};
    (GROUP_LABELS[activeSport] || Object.keys(groups)).forEach((label) => {
      if (groups[label]) orderedGroups[`Group ${label}`] = groups[label];
    });
    // Add any other groups not in GROUP_LABELS
    Object.keys(groups).forEach((label) => {
      if (!orderedGroups[`Group ${label}`]) orderedGroups[`Group ${label}`] = groups[label];
    });
    return orderedGroups;
  }, [teams, activeSport]);

  const styles = {
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '30px',
    },
    sportSelector: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px',
      gap: '15px',
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#f0f0f0',
      color: '#333',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    activeButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#2c3e50',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    standingsContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '20px',
    },
    groupContainer: {
      marginBottom: '40px',
    },
    groupHeader: {
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '10px 15px',
      borderRadius: '5px 5px 0 0',
      marginBottom: '0',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '30px',
    },
    th: {
      padding: '12px 15px',
      textAlign: 'center',
      border: '1px solid #ddd',
      backgroundColor: '#f8f9fa',
      fontWeight: 'bold',
    },
    td: {
      padding: '12px 15px',
      textAlign: 'center',
      border: '1px solid #ddd',
    },
    evenRow: {
      backgroundColor: '#f2f2f2',
    },
    hoverRow: {
      backgroundColor: '#e9ecef',
    },
  };

  const sportBranches = Object.keys(GROUP_LABELS);
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Sports Competition Standings</h1>
      <div style={styles.sportSelector}>
        {Object.keys(GROUP_LABELS).map((sport) => (
          <button
            key={sport}
            style={activeSport === sport ? styles.activeButton : styles.button}
            onClick={() => setActiveSport(sport)}
          >
            {sport}
          </button>
        ))}
      </div>
      <div style={styles.standingsContainer}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>
          {activeSport} Standings
        </h2>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>Loading...</div>
        ) : (
          Object.entries(groupedTeams).map(([groupName, teams]) => (
            <div key={groupName} style={styles.groupContainer}>
              <h3 style={styles.groupHeader}>{groupName}</h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {COLUMNS[activeSport].map((column, index) => (
                      <th key={index} style={styles.th}>
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => {
                    const isEven = index % 2 === 0;
                    const isHovered = false; // You can keep your hover logic if you want
                    return (
                      <tr
                        key={team.id || team.label}
                        style={{
                          ...styles.td,
                          ...(isEven ? styles.evenRow : {}),
                          ...(isHovered ? styles.hoverRow : {}),
                          transition: 'background-color 0.2s ease',
                        }}
                      >
                        <td style={styles.td}>{index + 1}</td>
                        <td style={styles.td}>{team.label}</td>
                        {activeSport === 'Futsal' ? (
                          <>
                            <td style={styles.td}>0</td>
                            <td style={styles.td}>0</td>
                            <td style={styles.td}>0</td>
                            <td style={styles.td}>0</td>
                            <td style={styles.td}>0</td>
                            <td style={styles.td}>0</td>
                            <td style={styles.td}>0</td>
                            <td style={styles.td}>0</td>
                          </>
                        ) : (
                          <td style={styles.td}>
                            {Array.isArray(team.players) ? team.players.join(', ') : ''}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Standings() {
  return (
    <ApiProvider resource_name="team">
      <StandingsCard />
    </ApiProvider>
  );
}

export default Standings;