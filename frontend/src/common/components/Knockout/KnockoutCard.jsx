import { useEffect, useState } from 'react';
import { ApiProvider, useApi } from 'fastapi-rtk';
import './KnockoutTable.css';
import MatchCard from "@/common/components/Match/MatchCard.jsx";
import {useNavigate} from "react-router-dom";
import useSize from "@/hooks/useSize.jsx";
import { Select } from '@mantine/core';

const COLUMNS = {
  Futsal: [],
  Voli: [],
  Basket: [],
  'Badminton Ganda Putra': [],
  'Badminton Ganda Campuran': [],
};

const roundsOrder = ["quarterfinal", "semifinal", "final"];

function MatchCardWrapper({ matchId, onClick }) {
  const [matchData, setMatchData] = useState(null);
  const [error, setError] = useState(false);
  const {isMobile} = useSize()


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
  }, [activeSport]);

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
  
    return (
    <div className="container">
      <h1 className="header">Sports Competition Knockout</h1>
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
          {activeSport} Knockout
        </h2>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>Loading...</div>
        ) : Object.keys(knockoutData).length > 0 ? (
          <div className="bracketContainer">
            {roundsOrder.map((round) => {
              const matches = knockoutData[round];
              if (!matches || matches.length === 0) return null;
              return (
                <div key={round} className="bracketRound">
                  <h3 className="roundTitle">{round.charAt(0).toUpperCase() + round.slice(1)}</h3>
                  {matches.map((matchId) => (
                    <div key={matchId} className="matchCard">
<MatchCardWrapper matchId={matchId} onClick={() => onClickMatch(matchId)} />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 40 }}>No Brackets Found</div>
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
