import React from 'react';
import { useState, useEffect, useNavigate } from 'react';
import { Center, Flex } from '@mantine/core';
import { ApiProvider, useApi } from 'fastapi-rtk';
import  MatchCard  from '@/common/components/MatchCard'

function MatchData() {
  const { getEntry, loading: isLoading } = useApi();
  const [matches, setMatches] = useState(null);
  const [error, setError] = useState(null);

  const onClickMatch = (matchId) => {
    Navigate(`/match/${matchId}`)
  } 

  useEffect(() => {
    getEntry('/')
      .then(data => {
        console.log('Match data:', data);
        setMatches(data);
      })
      .catch(err => {
        console.error('Error fetching matches:', err);
        setError(err);
      });
  }, [getEntry]);

  if (isLoading) return <p>Loading matches...</p>;
  if (error) return <p>Error fetching matches: {error.message}</p>;
  if (!matches) return <p>No match data available</p>;

  return (
    <Flex direction="column" align="center" gap="md">
      <h1>Ongoing Matches</h1>
      {matches.result && matches.result.length > 0 ? (
        <div className="match-cards">
          {matches.result.map((match) => (
            <MatchCard 
              key={match.id} 
              match={match} 
              onClick={() => onClickMatch(match.id)}
            />
          ))}
        </div>
      ) : (
        <p>No matches available</p>
      )}
    </Flex>
  );
}

export default function Home() {
  return (
    <ApiProvider resource_name="match">
      <Center>
        <MatchData />
      </Center>
    </ApiProvider>
  );
}