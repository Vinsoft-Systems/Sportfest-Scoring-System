import 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Center, Flex, SimpleGrid, Text } from '@mantine/core';
import { ApiProvider, useApi } from 'fastapi-rtk';
import MatchCard from '@/common/components/Match/MatchCard';

function MatchData() {
  const navigate = useNavigate();
  const { data, loading: isLoading } = useApi();
  const [matches, setMatches] = useState(null);

  const onClickMatch = (match) => {
    const matchId = match.id || (matches && matches.ids && matches.ids[matches.result.indexOf(match)]);

    if (matchId) {
      navigate(`/match/${matchId}`);
    } else {
      console.error('Cannot navigate: Match ID not found', match);
    }
  };

  useEffect(() => {
      setMatches(data);
  }, [data]);

  if (isLoading) return <p>Loading matches...</p>;
  if (!matches) return <p>No match data available</p>;

  return (
    <Flex direction="column" align="center" gap="md" w="100%" maw="1200px" px="md">
      <Text size="lg" fw={700}>
        Ongoing Matches
      </Text>
      {matches.result && matches.result.length > 0 ? (
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing={{ base: 'md', sm: 'lg' }}
          verticalSpacing={{ base: 'md', sm: 'lg' }}
          w="100%"
        >
          {matches.result.map((match) =>
            match.status === 'In Progress' ? (
              <MatchCard key={match.id} match={match} onClick={() => onClickMatch(match)} />
            ) : null,
          )}
        </SimpleGrid>
      ) : (
        <p>No matches available</p>
      )}
    </Flex>
  );
}

export default function Home() {
  return (
    <ApiProvider resource_name="match" initialQueryParams={{page_size:1000}}>
      <Center>
        <MatchData />
      </Center>
    </ApiProvider>
  );
}
