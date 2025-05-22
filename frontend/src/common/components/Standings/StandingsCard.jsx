import { useEffect, useState, useMemo } from 'react';
import { useApi, ApiProvider } from 'fastapi-rtk';
import './StandingsTable.css';
import calculateStats from './CalculateStats.jsx';

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
    <div className="container">
      <h1 className="header">Sports Competition Standings</h1>
      <div className="sportSelector">
        {sportBranches.map((sport) => (
          <button
            key={sport}
            className={activeSport === sport ? "activeButton" : "button"}
            onClick={() => setActiveSport(sport)}
          >
            {sport}
          </button>
        ))}
      </div>
      <div className="standingsContainer">
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>
          {activeSport} Standings
        </h2>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>Loading...</div>
        ) : (
          Object.entries(groupedTeams).map(([groupName, teams]) => (
            <div key={groupName} className="groupContainer">
              <h3 className="groupHeader">{groupName}</h3>
              <table className="table">
                <thead>
                  <tr>
                    {COLUMNS[activeSport].map((column, index) => (
                      <th key={index} className="th">
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
                      const rowClass = [
                        "td",
                        isEven ? "evenRow" : "",
                        hoveredRow === (team.id || team.value || team.label) ? "hoverRow" : ""
                      ].join(" ").trim();
                      return (
                        <tr
                          key={team.id || team.value || team.label}
                          className={rowClass}
                          onMouseEnter={() => setHoveredRow(team.id || team.value || team.label)}
                          onMouseLeave={() => setHoveredRow(null)}
                        >
                          <td className="td">{index + 1}</td>
                          <td className="td">{team.label}</td>
                          {activeSport === 'Futsal' && (
                            <>
                              <td className="td">{teamStats.played || 0}</td>
                              <td className="td">{teamStats.win || 0}</td>
                              <td className="td">{teamStats.draw || 0}</td>
                              <td className="td">{teamStats.loss || 0}</td>
                              <td className="td">{teamStats.ga || 0}</td>
                              <td className="td">{teamStats.gf || 0}</td>
                              <td className="td">{teamStats.gd || 0}</td>
                              <td className="td">{teamStats.points || 0}</td>
                            </>
                          )}
                          {activeSport === 'Volleyball' && (
                            <>
                              <td className="td">{teamStats.played || 0}</td>
                              <td className="td">{teamStats.win || 0}</td>
                              <td className="td">{teamStats.draw || 0}</td>
                              <td className="td">{teamStats.loss || 0}</td>
                              <td className="td">{teamStats.sw || 0}</td>
                              <td className="td">{teamStats.sl || 0}</td>
                              <td className="td">{teamStats.sd || 0}</td>
                              <td className="td">{teamStats.pf || 0}</td>
                              <td className="td">{teamStats.pa || 0}</td>
                              <td className="td">{teamStats.pd || 0}</td>
                              <td className="td">{teamStats.points || 0}</td>
                            </>
                          )}
                          {activeSport === 'Basketball' && (
                            <>
                              <td className="td">{teamStats.played || 0}</td>
                              <td className="td">{teamStats.win || 0}</td>
                              <td className="td">{teamStats.loss || 0}</td>
                              <td className="td">{teamStats.pf || 0}</td>
                              <td className="td">{teamStats.pa || 0}</td>
                              <td className="td">{teamStats.pd || 0}</td>
                              <td className="td">{teamStats.points || 0}</td>
                            </>
                          )}
                          {(activeSport === 'Badminton Ganda Putra' || activeSport === 'Badminton Ganda Campuran') && (
                            <>
                              <td className="td">{teamStats.played || 0}</td>
                              <td className="td">{teamStats.win || 0}</td>
                              <td className="td">{teamStats.draw || 0}</td>
                              <td className="td">{teamStats.loss || 0}</td>
                              <td className="td">{teamStats.sw || 0}</td>
                              <td className="td">{teamStats.sl || 0}</td>
                              <td className="td">{teamStats.sd || 0}</td>
                              <td className="td">{teamStats.pf || 0}</td>
                              <td className="td">{teamStats.pa || 0}</td>
                              <td className="td">{teamStats.pd || 0}</td>
                              <td className="td">{teamStats.points || 0}</td>
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