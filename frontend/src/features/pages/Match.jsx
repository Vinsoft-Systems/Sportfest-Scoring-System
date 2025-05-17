import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiProvider, useApi } from 'fastapi-rtk';
import { Center, Loader, Text, Container } from '@mantine/core';
import MatchDetailsCard from '@/common/components/MatchDetailsCard';

function MatchContent() {
  const { matchId } = useParams();
  const { getEntry, loading } = useApi();
  const [match, setMatch] = useState(null);
  const [error, setError] = useState(null);
  const [teamADetails, setTeamADetails] = useState(null);
  const [teamBDetails, setTeamBDetails] = useState(null);

  useEffect(() => {
    if (matchId) {
      getEntry(matchId)
        .then((data) => {
          console.log('Match data:', data);
          if (data && data.result) {
            setMatch(data.result);
            
            if (data.result.team_a_id) {
              fetchTeamDetails(data.result.team_a_id, 'A');
            }
            if (data.result.team_b_id) {
              fetchTeamDetails(data.result.team_b_id, 'B');
            }
          }
        })
        .catch((err) => {
          console.error('Error fetching match:', err);
          setError(err);
        });
    }
  }, [matchId, getEntry]);

  const fetchTeamDetails = (teamId, teamType) => {
    const api = new ApiProvider({ resource_name: 'team' });
    api.getEntry(teamId)
      .then((data) => {
        if (teamType === 'A') {
          setTeamADetails(data.result);
        } else {
          setTeamBDetails(data.result);
        }
      })
      .catch((err) => {
        console.error(`Error fetching team ${teamType}:`, err);
      });
  };

  if (loading) {
    return (
      <Center h="50vh">
        <Loader />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="50vh">
        <Text c="red">Error loading match details: {error.message}</Text>
      </Center>
    );
  }

  if (!match) {
    return (
      <Center h="50vh">
        <Text>No match found with ID: {matchId}</Text>
      </Center>
    );
  }

  return (
    <Container size="md" py="xl">
      <MatchDetailsCard 
        match={match} 
        teamADetails={teamADetails}
        teamBDetails={teamBDetails}
      />
    </Container>
  );
}

export default function Match() {
  return (
    <ApiProvider resource_name="match">
      <MatchContent />
    </ApiProvider>
  );
}