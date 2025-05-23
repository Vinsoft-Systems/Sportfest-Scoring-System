import { useEffect, useState, useMemo } from 'react';
import { ApiProvider, useApi } from 'fastapi-rtk';
import './StandingsTable.css';
import calculateStats from './CalculateStats.jsx';
import StandingsTableRow from './StandingsTableRow.jsx';
import useSize from "@/hooks/useSize.jsx";
import { Select } from '@mantine/core';

const COLUMNS = {
  Futsal: ['Rank', 'Team', 'Matches Played', 'Win', 'Draw', 'Lose', 'GA', 'GF', 'GD', 'Points'],
  Voli: ['Rank', 'Team', 'Matches Played', 'Win', 'Draw', 'Lose', 'SW', 'SL', 'SD', 'PF', 'PA', 'PD', 'Points'],
  Basket: ['Rank', 'Team', 'Matches Played', 'Win', 'Lose', 'PF', 'PA', 'PD', 'Points'],
  'Badminton Ganda Putra': ['Rank', 'Team', 'Matches Played', 'Win', 'Draw', 'Lose', 'SW', 'SL', 'SD', 'PF', 'PA', 'PD', 'Points'],
  'Badminton Ganda Campuran': ['Rank', 'Team', 'Matches Played', 'Win', 'Draw', 'Lose', 'SW', 'SL', 'SD', 'PF', 'PA', 'PD', 'Points'],
};

function StandingsCard({ sportBranch = 'Futsal' }) {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSport, setActiveSport] = useState(sportBranch);
  const {isMobile} = useSize()

  useEffect(() => {
    setLoading(true);
    
    fetch(`/api/v1/team/teams_by_competition/1/${activeSport}?page_size=1000`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setTeams(data.result || data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
        setTeams([]);
        setLoading(false);
      });
  }, [activeSport]);

  useEffect(() => {
    const fetchMatches = () => {
      fetch(`/api/v1/match/?competition_id=1&sport_branch=${encodeURIComponent(activeSport)}&page_size=1000`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          setMatches(data.result || data || []);
        })
        .catch(error => {
          console.error('Error fetching matches:', error);
          setMatches([]);
        });
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
    return groups;
  }, [teams]);

  const stats = useMemo(() => calculateStats(teams, matches, activeSport), [teams, matches, activeSport]);
  const sportBranches = Object.keys(COLUMNS);
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div className="container">
      <h1 className="header">Sports Competition Standings</h1>
      <div className="sportSelector">
        { isMobile ? <Select
          label="Your favorite library"
          placeholder="Pick value"
          data={sportBranches}
          value={activeSport}
          onChange={setActiveSport}
            />
              : sportBranches.map((sport) => (
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
              <h3 className="groupHeader">Group {groupName}</h3>
              <div className="responsive-table-wrapper">
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
                          <StandingsTableRow
                            key={team.id || team.value || team.label}
                            team={team}
                            teamStats={teamStats}
                            index={index}
                            rowClass={rowClass}
                            hoveredRow={hoveredRow}
                            setHoveredRow={setHoveredRow}
                            activeSport={activeSport}
                          />
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Remove ApiProvider since we're using direct fetch
function Standings() {
  return <StandingsCard />;
}

export default Standings;