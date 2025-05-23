import { useEffect, useState } from 'react';
import { ApiProvider, useApi } from 'fastapi-rtk';
import './KnockoutTable.css';
import MatchCard from "@/common/components/Match/MatchCard.jsx";
import { useNavigate } from "react-router-dom";
import { SingleEliminationBracket, Match } from '@g-loot/react-tournament-brackets';

/*
Librarynya di link ini:
https://github.com/g-loot/react-tournament-brackets 

!!ACHTUNG!! - Librarynya ada enum sendiri utk match status.
(Penting utk UI doang, functional keknya spielt keine Rolle)
- "Scheduled" -> use 'SCHEDULED'
- "In Progress" -> use 'SCHEDULED' (or 'DONE' if you want to show it as completed)
- "Completed" -> use 'DONE'
- "Cancelled" -> use 'NO_PARTY'
*/

const COLUMNS = {
  Futsal: [],
  Voli: [],
  Basket: [],
  'Badminton Ganda Putra': [],
  'Badminton Ganda Campuran': [],
};

// Different round orders for different sports
const getRoundsOrder = (sportBranch) => {
  const sport = sportBranch.toLowerCase();
  
  // ini karena ab semifinal
  if (sport.includes('basket') || 
      sport.includes('badminton') || 
      sport.includes('voli') || 
      sport.includes('volleyball')) {
    return ["semifinal", "final"];
  }
  
  // futsal
  return ["quarterfinal", "semifinal", "final"];
};

function MatchCardWrapper({ matchId, onClick }) {
  const [matchData, setMatchData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!matchId) return;

    fetch(`/api/v1/match/${matchId}`)
      .then(response => {
        if (!response.ok) throw new Error('Match not found');
        return response.json();
      })
      .then(json => {
        if (json?.result) {
          setMatchData(json.result);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, [matchId]);

  if (error) {
    return <div className="matchCard">No match created</div>;
  }

  if (!matchData) {
    return <div className="matchCard">Loading...</div>;
  }

  return <MatchCard match={matchData} onClick={onClick} />;
}

function KnockoutCard({ sportBranch = 'Futsal' }) {
  const navigate = useNavigate();
  const [activeSport, setActiveSport] = useState(sportBranch);
  const { data, setQueryParams, loading } = useApi();

  useEffect(() => {
    setQueryParams({
      filters: [
        { col: "competition", opr: "rel_o_m", value: "1" },
        { col: "sport_branch", opr: "eq", value: activeSport },
      ],
    });
  }, [activeSport, setQueryParams]);

  const onClickMatch = (matchId) => {
    if (matchId) {
      console.log('Navigating to match ID:', matchId);
      navigate(`/match/${matchId}`);
    } else {
      console.error('Cannot navigate: Match ID not found', matchId);
    }
  };

  const sportBranches = Object.keys(COLUMNS);
  const knockoutData = data?.result?.[0]?.knockout_stage_config || {};

  // Transform knockout data to tournament brackets format
  const transformToTournamentMatches = (knockoutData) => {
    const matches = [];
    let matchId = 1;
    const roundsOrder = getRoundsOrder(activeSport);

    roundsOrder.forEach((round, roundIndex) => {
      const roundMatches = knockoutData[round] || [];
      
      roundMatches.forEach((matchData, matchIndex) => {
        const nextRoundIndex = roundIndex + 1;
        const nextMatchId = nextRoundIndex < roundsOrder.length ? 
          Math.floor(matchIndex / 2) + matches.filter(m => m.tournamentRoundText === roundsOrder[nextRoundIndex]).length + 1 : 
          null;

        matches.push({
          id: matchId++,
          name: `${round.charAt(0).toUpperCase() + round.slice(1)} ${matchIndex + 1}`,
          nextMatchId: nextMatchId,
          tournamentRoundText: round.charAt(0).toUpperCase() + round.slice(1),
          startTime: new Date().toISOString(),
          state: 'SCHEDULED', 
          participants: [
            {
              id: `team_${matchId}_a`,
              resultText: null,
              isWinner: false,
              name: 'TBD'
            },
            {
              id: `team_${matchId}_b`,
              resultText: null,
              isWinner: false,
              name: 'TBD'
            }
          ]
        });
      });
    });

    return matches;
  };

  // sample data
  const getSampleMatches = (sportBranch) => {
    const sport = sportBranch.toLowerCase();
    
    //mulai dari semi (basket, voli, badminton)
    if (sport.includes('basket') || 
        sport.includes('badminton') || 
        sport.includes('voli') || 
        sport.includes('volleyball')) {
      return [
        {
          id: 1,
          name: 'Semifinal 1',
          nextMatchId: 3,
          tournamentRoundText: 'Semifinals',
          startTime: '2025-05-24',
          state: 'DONE',
          participants: [
            { id: 'teamA', resultText: 'WON', isWinner: true, name: 'Team A' },
            { id: 'teamB', resultText: 'LOST', isWinner: false, name: 'Team B' },
          ],
        },
        {
          id: 2,
          name: 'Semifinal 2',
          nextMatchId: 3,
          tournamentRoundText: 'Semifinals',
          startTime: '2025-05-24',
          state: 'DONE',
          participants: [
            { id: 'teamC', resultText: 'WON', isWinner: true, name: 'Team C' },
            { id: 'teamD', resultText: 'LOST', isWinner: false, name: 'Team D' },
          ],
        },
        {
          id: 3,
          name: 'Final',
          nextMatchId: null,
          tournamentRoundText: 'Final',
          startTime: '2025-05-25',
          state: 'SCHEDULED', 
          participants: [
            { id: 'teamA', resultText: null, isWinner: false, name: 'Team A' },
            { id: 'teamC', resultText: null, isWinner: false, name: 'Team C' },
          ],
        },
      ];
    }
    
    // utk futsal yg mulai dri quarter
    return [
      {
        id: 1,
        name: 'Quarterfinal 1',
        nextMatchId: 5,
        tournamentRoundText: 'Quarterfinals',
        startTime: '2025-05-23',
        state: 'DONE', // Completed match - shows winner styling
        participants: [
          { id: 'teamA', resultText: 'WON', isWinner: true, name: 'Team A' },
          { id: 'teamB', resultText: 'LOST', isWinner: false, name: 'Team B' },
        ],
      },
      {
        id: 2,
        name: 'Quarterfinal 2',
        nextMatchId: 5,
        tournamentRoundText: 'Quarterfinals',
        startTime: '2025-05-23',
        state: 'DONE', 
        participants: [
          { id: 'teamC', resultText: 'WON', isWinner: true, name: 'Team C' },
          { id: 'teamD', resultText: 'LOST', isWinner: false, name: 'Team D' },
        ],
      },
      {
        id: 3,
        name: 'Quarterfinal 3',
        nextMatchId: 6,
        tournamentRoundText: 'Quarterfinals',
        startTime: '2025-05-23',
        state: 'DONE', 
        participants: [
          { id: 'teamE', resultText: 'WON', isWinner: true, name: 'Team E' },
          { id: 'teamF', resultText: 'LOST', isWinner: false, name: 'Team F' },
        ],
      },
      {
        id: 4,
        name: 'Quarterfinal 4',
        nextMatchId: 6,
        tournamentRoundText: 'Quarterfinals',
        startTime: '2025-05-23',
        state: 'DONE', 
        participants: [
          { id: 'teamG', resultText: 'WON', isWinner: true, name: 'Team G' },
          { id: 'teamH', resultText: 'LOST', isWinner: false, name: 'Team H' },
        ],
      },
      {
        id: 5,
        name: 'Semifinal 1',
        nextMatchId: 7,
        tournamentRoundText: 'Semifinals',
        startTime: '2025-05-24',
        state: 'SCHEDULED', 
        participants: [
          { id: 'teamA', resultText: null, isWinner: false, name: 'Team A' },
          { id: 'teamC', resultText: null, isWinner: false, name: 'Team C' },
        ],
      },
      {
        id: 6,
        name: 'Semifinal 2',
        nextMatchId: 7,
        tournamentRoundText: 'Semifinals',
        startTime: '2025-05-24',
        state: 'SCHEDULED',
        participants: [
          { id: 'teamE', resultText: null, isWinner: false, name: 'Team E' },
          { id: 'teamG', resultText: null, isWinner: false, name: 'Team G' },
        ],
      },
      {
        id: 7,
        name: 'Final',
        nextMatchId: null,
        tournamentRoundText: 'Final',
        startTime: '2025-05-25',
        state: 'SCHEDULED', 
        participants: [
          { id: 'tbd1', resultText: null, isWinner: false, name: 'TBD' },
          { id: 'tbd2', resultText: null, isWinner: false, name: 'TBD' },
        ],
      },
    ];
  };

  const sampleMatches = getSampleMatches(activeSport);

  const matches = Object.keys(knockoutData).length > 0 ? 
    transformToTournamentMatches(knockoutData) : 
    sampleMatches;

  return (
    <div className="container">
      <h1 className="header">Sports Competition Knockout</h1>
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
          {activeSport} Knockout
        </h2>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>Loading...</div>
        ) : (
          <div style={{ 
            overflowX: 'auto', 
            background: '#f8f9fa', 
            borderRadius: 8, 
            padding: 16,
            minHeight: '400px'
          }}>
            <SingleEliminationBracket
              matches={matches}
              matchComponent={Match}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Knockout() {
  return (
    <ApiProvider resource_name="bracket">
      <KnockoutCard />
    </ApiProvider>
  );
}

export default Knockout;