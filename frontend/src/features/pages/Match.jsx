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
  const [isLoadingTeams, setIsLoadingTeams] = useState(false);

  useEffect(() => {
    if (matchId) {
      getEntry(matchId)
        .then((data) => {
          console.log('Match data:', data);
          if (data && data.result) {
            setMatch(data.result);
            
            if (data.result.team_a && Object.keys(data.result.team_a).length > 1) {
              console.log("Using existing team A data:", data.result.team_a);
              setTeamADetails(data.result.team_a);
            } else if (data.result.team_a_id) {
              fetchTeamDetails(data.result.team_a_id, 'A');
            }
            
            if (data.result.team_b && Object.keys(data.result.team_b).length > 1) {
              console.log("Using existing team B data:", data.result.team_b);
              setTeamBDetails(data.result.team_b);
            } else if (data.result.team_b_id) {
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

  const fetchTeamDetails = async (teamId, teamType) => {
    setIsLoadingTeams(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/team/${teamId}`);
      if (!response.ok) throw new Error(`Failed to fetch team ${teamType} details`);
      
      const data = await response.json();
      console.log(`Team ${teamType} fetched data:`, data);
      
      if (teamType === 'A') {
        setTeamADetails(data.result);
        console.log("Set TeamA details:", data.result);
      } else {
        setTeamBDetails(data.result);
        console.log("Set TeamB details:", data.result);
      }
    } catch (err) {
      console.error(`Error fetching team ${teamType}:`, err);
    } finally {
      setIsLoadingTeams(false);
    }
  };

  // Function to determine if the sport uses best-of-3 format
  const isBestOfThreeFormat = () => {
    if (!match || !match.sport_branch) return false;
    
    const sportBranch = match.sport_branch.toLowerCase();
    
    // Check if sport branch is Badminton or Volleyball
    return sportBranch.includes('badminton') || 
           sportBranch.includes('volleyball');
  };

  if (loading || isLoadingTeams) {
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
        withBO3={isBestOfThreeFormat()}
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