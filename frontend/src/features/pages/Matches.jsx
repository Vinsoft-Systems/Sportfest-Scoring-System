import React from 'react'
import { useEffect, useState } from 'react'
import { ApiProvider, useApi } from 'fastapi-rtk';
import { MatchesHeader } from '@/common/components/Matches/MatchesHeader.jsx'

function MatchesContent() {
  const { getEntry, loading: isLoading } = useApi();
  const [matches, setMatches] = useState(null);
  const [error, setError] = useState(null);
  const [organizedMatches, setOrganizedMatches] = useState({});

  useEffect(() => {
    getEntry('/')
    .then(data => {
      setMatches(data);
      
      if (data && data.result) {
        const matchesByDate = {};
        
        data.result.forEach((match, index) => {
          if (!match.id && data.ids) {
            match.id = data.ids[index];
          }
          
          const matchDate = new Date(match.date).toLocaleDateString();
          
          if (!matchesByDate[matchDate]) {
            matchesByDate[matchDate] = [];
          }
          
          matchesByDate[matchDate].push(match);
        });
        
        setOrganizedMatches(matchesByDate);
        console.log('Organized matches with IDs:', matchesByDate);
      }
    })
    .catch(err => {
      console.error('Error fetching matches: ', err);
      setError(err);
    })
  }, [getEntry])

  if (isLoading) return <p>Loading matches...</p>;
  if (error) return <p>Error fetching matches: {error.message}</p>;
  if (!matches) return <p>No match data available</p>;

  const tabs = Object.keys(organizedMatches).map(date => ({
    value: date,
    label: date
  }));

  return (
    <>
      <MatchesHeader tabs={tabs} matches={organizedMatches} />
    </>
  )
}

function Matches() {
  return (
    <ApiProvider resource_name="match">
      <MatchesContent />
    </ApiProvider>
  )
}

export default Matches