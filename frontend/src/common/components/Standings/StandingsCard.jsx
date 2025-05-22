import { useEffect, useState, useMemo } from 'react';
import { useApi, ApiProvider } from 'fastapi-rtk';
import styles from './StandingsTable.css';

const GROUP_LABELS = {
  Futsal: ['A', 'B', 'C'],
  Volleyball: ['A', 'B'],
  Basketball: ['A', 'B'],
  'Badminton Ganda Putra': ['A', 'B', 'C'],
  'Badminton Ganda Campuran': ['A', 'B'],
};

const COLUMNS = {
  Futsal: ['Rank', 'Team', 'Matches Played', 'Win', 'Draw', 'Loss', 'GA', 'GF', 'GD', 'Points'],
  Volleyball: ['Rank', 'Team', 'Matches Played', 'Win', 'Draw', 'Loss', 'SW', 'SL', 'SD', 'PF', 'PA', 'PD', 'Points'],
  Basketball: ['Rank', 'Team', 'Matches Played', 'Win', 'Loss', 'PF', 'PA', 'PD', 'Points'],
  'Badminton Ganda Putra': ['Rank', 'Team', 'Matches Played', 'Win', 'Draw', 'Loss', 'SW', 'SL', 'SD', 'PF', 'PA', 'PD', 'Points'],
  'Badminton Ganda Campuran': ['Rank', 'Team', 'Matches Played', 'Win', 'Draw', 'Loss', 'SW', 'SL', 'SD', 'PF', 'PA', 'PD', 'Points'],
};

function calculateStats(teams, matches, activeSport) {
  const stats = {};
  teams.forEach(team => {
    stats[Number(team.value)] = {
      ...team,
      played: 0,
      win: 0,
      draw: 0,
      loss: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      points: 0,
      sw: 0,
      sl: 0,
      sd: 0,
      pf: 0,
      pa: 0,
      pd: 0,
    };
  });

  matches
    .filter(match => match.status === 'In Progress' || match.status === 'Completed')
    .forEach(match => {
      const { team_a, team_b, score_list } = match;
      if (!team_a || !team_b || !score_list || score_list.length === 0) return;

      const teamAId = Number(team_a.id);
      const teamBId = Number(team_b.id);

      if (
        activeSport === 'Volleyball' ||
        activeSport === 'Badminton Ganda Putra' ||
        activeSport === 'Badminton Ganda Campuran'
      ) {
        let setWinA = 0;
        let setWinB = 0;
        let pfA = 0, pfB = 0;

        score_list.forEach(scoreStr => {
          const [a, b] = scoreStr.split(/[-:]/).map(Number);
          if (isNaN(a) || isNaN(b)) return;
          pfA += a;
          pfB += b;
          if (a > b) {
            setWinA += 1;
            if (stats[teamAId]) stats[teamAId].sw += 1;
            if (stats[teamBId]) stats[teamBId].sl += 1;
          } else if (a < b) {
            setWinB += 1;
            if (stats[teamBId]) stats[teamBId].sw += 1;
            if (stats[teamAId]) stats[teamAId].sl += 1;
          }
        });

        if (stats[teamAId]) {
          stats[teamAId].played += 1;
          stats[teamAId].sd = stats[teamAId].sw - stats[teamAId].sl;
          stats[teamAId].pf += pfA;
          stats[teamAId].pa += pfB;
          stats[teamAId].pd = stats[teamAId].pf - stats[teamAId].pa;
        }
        if (stats[teamBId]) {
          stats[teamBId].played += 1;
          stats[teamBId].sd = stats[teamBId].sw - stats[teamBId].sl;
          stats[teamBId].pf += pfB;
          stats[teamBId].pa += pfA;
          stats[teamBId].pd = stats[teamBId].pf - stats[teamBId].pa;
        }

        // Volleyball: win = 3 pts, draw = 1 pt, loss = 0 pts
        // Badminton: win = 1 pt, draw = 1 pt, loss = 0 pts
        let winPoints = 3;
        if (
          activeSport === 'Badminton Ganda Putra' ||
          activeSport === 'Badminton Ganda Campuran'
        ) {
          winPoints = 1;
        }

        if (setWinA > setWinB) {
          if (stats[teamAId]) {
            stats[teamAId].win += 1;
            stats[teamAId].points += winPoints;
          }
          if (stats[teamBId]) stats[teamBId].loss += 1;
        } else if (setWinA < setWinB) {
          if (stats[teamBId]) {
            stats[teamBId].win += 1;
            stats[teamBId].points += winPoints;
          }
          if (stats[teamAId]) stats[teamAId].loss += 1;
        } else {
          // Draw: both teams get +1 draw and +1 point
          if (stats[teamAId]) {
            stats[teamAId].draw += 1;
            stats[teamAId].points += 1;
          }
          if (stats[teamBId]) {
            stats[teamBId].draw += 1;
            stats[teamBId].points += 1;
          }
        }
      } else if (activeSport === 'Basketball') {
        const [scoreA, scoreB] = score_list[score_list.length - 1]
          .split(/[-:]/)
          .map(Number);

        if (stats[teamAId]) stats[teamAId].played += 1;
        if (stats[teamBId]) stats[teamBId].played += 1;

        if (stats[teamAId]) {
          stats[teamAId].gf += scoreA;
          stats[teamAId].ga += scoreB;
          stats[teamAId].gd = stats[teamAId].gf - stats[teamAId].ga;
          stats[teamAId].pf += scoreA;
          stats[teamAId].pa += scoreB;
          stats[teamAId].pd = stats[teamAId].pf - stats[teamAId].pa;
        }
        if (stats[teamBId]) {
          stats[teamBId].gf += scoreB;
          stats[teamBId].ga += scoreA;
          stats[teamBId].gd = stats[teamBId].gf - stats[teamBId].ga;
          stats[teamBId].pf += scoreB;
          stats[teamBId].pa += scoreA;
          stats[teamBId].pd = stats[teamBId].pf - stats[teamBId].pa;
        }

        if (scoreA > scoreB) {
          if (stats[teamAId]) {
            stats[teamAId].win += 1;
            stats[teamAId].points += 1;
          }
          if (stats[teamBId]) stats[teamBId].loss += 1;
        } else if (scoreA < scoreB) {
          if (stats[teamBId]) {
            stats[teamBId].win += 1;
            stats[teamBId].points += 1;
          }
          if (stats[teamAId]) stats[teamAId].loss += 1;
        }
      } else if (activeSport === 'Futsal') {
        const [scoreA, scoreB] = score_list[score_list.length - 1]
          .split(/[-:]/)
          .map(Number);

        if (stats[teamAId]) stats[teamAId].played += 1;
        if (stats[teamBId]) stats[teamBId].played += 1;

        if (stats[teamAId]) {
          stats[teamAId].gf += scoreA;
          stats[teamAId].ga += scoreB;
          stats[teamAId].gd = stats[teamAId].gf - stats[teamAId].ga;
        }
        if (stats[teamBId]) {
          stats[teamBId].gf += scoreB;
          stats[teamBId].ga += scoreA;
          stats[teamBId].gd = stats[teamBId].gf - stats[teamBId].ga;
        }

        if (scoreA > scoreB) {
          if (stats[teamAId]) {
            stats[teamAId].win += 1;
            stats[teamAId].points += 3;
          }
          if (stats[teamBId]) stats[teamBId].loss += 1;
        } else if (scoreA < scoreB) {
          if (stats[teamBId]) {
            stats[teamBId].win += 1;
            stats[teamBId].points += 3;
          }
          if (stats[teamAId]) stats[teamAId].loss += 1;
        } else {
          if (stats[teamAId]) {
            stats[teamAId].draw += 1;
            stats[teamAId].points += 1;
          }
          if (stats[teamBId]) {
            stats[teamBId].draw += 1;
            stats[teamBId].points += 1;
          }
        }
      }
    });

  return stats;
}

function StandingsCard({ sportBranch = 'Futsal' }) {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSport, setActiveSport] = useState(sportBranch);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/team/teams_by_competition/1/${activeSport}`)
      .then(res => res.json())
      .then(data => {
        setTeams(data.result || data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeSport]);

  useEffect(() => {
    const fetchMatches = () => {
      fetch(`/api/v1/match/?competition_id=1&sport_branch=${encodeURIComponent(activeSport)}`)
        .then(res => res.json())
        .then(data => setMatches(data.result || data || []));
    };
    fetchMatches();
    const interval = setInterval(fetchMatches, 5000);
    return () => clearInterval(interval);
  }, [activeSport]);

  const groupedTeams = useMemo(() => {
    const groups = {};
    teams.forEach((team) => {
      const groupName = team.group || 'No Group';
      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(team);
    });

    const orderedGroups = {};
    (GROUP_LABELS[activeSport] || Object.keys(groups)).forEach((label) => {
      if (groups[label]) orderedGroups[`Group ${label}`] = groups[label];
    });
    Object.keys(groups).forEach((label) => {
      if (!orderedGroups[`Group ${label}`]) orderedGroups[`Group ${label}`] = groups[label];
    });
    return orderedGroups;
  }, [teams, activeSport]);

  const stats = useMemo(() => calculateStats(teams, matches, activeSport), [teams, matches, activeSport]);
  const sportBranches = Object.keys(GROUP_LABELS);
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Sports Competition Standings</h1>
      <div className={styles.sportSelector}>
        {sportBranches.map((sport) => (
          <button
            key={sport}
            className={activeSport === sport ? styles.activeButton : styles.button}
            onClick={() => setActiveSport(sport)}
          >
            {sport}
          </button>
        ))}
      </div>
      <div className={styles.standingsContainer}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>
          {activeSport} Standings
        </h2>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>Loading...</div>
        ) : (
          Object.entries(groupedTeams).map(([groupName, teams]) => (
            <div key={groupName} className={styles.groupContainer}>
              <h3 className={styles.groupHeader}>{groupName}</h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {COLUMNS[activeSport].map((column, index) => (
                      <th key={index} className={styles.th}>
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...teams]
                    .sort((a, b) => {
                      const statsA = stats[Number(a.value)] || {};
                      const statsB = stats[Number(b.value)] || {};
                      // Sort by points DESC, then goals for DESC, then goal difference DESC
                      if ((statsB.points || 0) !== (statsA.points || 0)) {
                        return (statsB.points || 0) - (statsA.points || 0);
                      }
                      if ((statsB.gf || 0) !== (statsA.gf || 0)) {
                        return (statsB.gf || 0) - (statsA.gf || 0);
                      }
                      return (statsB.gd || 0) - (statsA.gd || 0);
                    })
                    .map((team, index) => {
                      const isEven = index % 2 === 0;
                      const teamStats = stats[Number(team.value)] || {};
                      return (
                        <tr
                          key={team.id || team.value || team.label}
                          className={`${styles.td} ${isEven ? styles.evenRow : ''} ${hoveredRow === (team.id || team.value || team.label) ? styles.hoverRow : ''}`}
                          onMouseEnter={() => setHoveredRow(team.id || team.value || team.label)}
                          onMouseLeave={() => setHoveredRow(null)}
                        >
                          <td className={styles.td}>{index + 1}</td>
                          <td className={styles.td}>{team.label}</td>
                          {activeSport === 'Futsal' && (
                            <>
                              <td className={styles.td}>{teamStats.played || 0}</td>
                              <td className={styles.td}>{teamStats.win || 0}</td>
                              <td className={styles.td}>{teamStats.draw || 0}</td>
                              <td className={styles.td}>{teamStats.loss || 0}</td>
                              <td className={styles.td}>{teamStats.ga || 0}</td>
                              <td className={styles.td}>{teamStats.gf || 0}</td>
                              <td className={styles.td}>{teamStats.gd || 0}</td>
                              <td className={styles.td}>{teamStats.points || 0}</td>
                            </>
                          )}
                          {activeSport === 'Volleyball' && (
                            <>
                              <td className={styles.td}>{teamStats.played || 0}</td>
                              <td className={styles.td}>{teamStats.win || 0}</td>
                              <td className={styles.td}>{teamStats.draw || 0}</td>
                              <td className={styles.td}>{teamStats.loss || 0}</td>
                              <td className={styles.td}>{teamStats.sw || 0}</td>
                              <td className={styles.td}>{teamStats.sl || 0}</td>
                              <td className={styles.td}>{teamStats.sd || 0}</td>
                              <td className={styles.td}>{teamStats.pf || 0}</td>
                              <td className={styles.td}>{teamStats.pa || 0}</td>
                              <td className={styles.td}>{teamStats.pd || 0}</td>
                              <td className={styles.td}>{teamStats.points || 0}</td>
                            </>
                          )}
                          {activeSport === 'Basketball' && (
                            <>
                              <td className={styles.td}>{teamStats.played || 0}</td>
                              <td className={styles.td}>{teamStats.win || 0}</td>
                              <td className={styles.td}>{teamStats.loss || 0}</td>
                              <td className={styles.td}>{teamStats.pf || 0}</td>
                              <td className={styles.td}>{teamStats.pa || 0}</td>
                              <td className={styles.td}>{teamStats.pd || 0}</td>
                              <td className={styles.td}>{teamStats.points || 0}</td>
                            </>
                          )}
                          {(activeSport === 'Badminton Ganda Putra' || activeSport === 'Badminton Ganda Campuran') && (
                            <>
                              <td className={styles.td}>{teamStats.played || 0}</td>
                              <td className={styles.td}>{teamStats.win || 0}</td>
                              <td className={styles.td}>{teamStats.draw || 0}</td>
                              <td className={styles.td}>{teamStats.loss || 0}</td>
                              <td className={styles.td}>{teamStats.sw || 0}</td>
                              <td className={styles.td}>{teamStats.sl || 0}</td>
                              <td className={styles.td}>{teamStats.sd || 0}</td>
                              <td className={styles.td}>{teamStats.pf || 0}</td>
                              <td className={styles.td}>{teamStats.pa || 0}</td>
                              <td className={styles.td}>{teamStats.pd || 0}</td>
                              <td className={styles.td}>{teamStats.points || 0}</td>
                            </>
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