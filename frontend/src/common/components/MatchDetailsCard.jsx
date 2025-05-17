import React from 'react';
import { Card, Text, Group, Grid, Divider, Title, Paper, Badge, Avatar, Box, Flex, Stack, Center } from '@mantine/core';
import { formatDate } from '../Base/utils/utils';
import { IconBallFootball, IconClock } from '@tabler/icons-react';

export default function MatchDetailsCard({ match, teamADetails, teamBDetails }) {
  const { name, description, date, sport_branch, status, score_list, competition } = match;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'blue';
      case 'In Progress':
        return 'green';
      case 'Completed':
        return 'gray';
      case 'Cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  const formatScore = () => {
    if (score_list && score_list.length > 0) {
      if (score_list[0].includes(':')) {
        return score_list[0].replace(':', ' - ');
      }
      return `${score_list[0] || '0'} - ${score_list[1] || '0'}`;
    }
    return 'VS';
  };

  // Format player names
  const formatPlayers = (players) => {
    if (!players) return null;
    if (Array.isArray(players)) {
      return players.join(', ');
    }
    return Object.values(players).join(', ');
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack spacing="lg">
        {/* Header */}
        <Group position="apart">
          <Group spacing="xs">
            <IconClock size={16} stroke={1.5} color="gray" />
            <Text size="sm" c="dimmed">{formatDate(date)}</Text>
          </Group>
          <Badge color={getStatusColor(status)} variant="light" size="md">{status}</Badge>
        </Group>

        {/* Match Title */}
        <Box>
          <Title order={3} align="center" mb="xs">{name}</Title>
          <Group spacing="xs" position="center">
            <Text align="center" size="sm" c="dimmed" fw={500}>{sport_branch}</Text>
            <Text size="sm" c="dimmed">•</Text>
            <Text align="center" size="sm" c="dimmed" fw={500}>{competition?.name}</Text>
          </Group>
          
          {description && (
            <Text align="center" size="sm" mt="xs" c="dimmed">{description}</Text>
          )}
        </Box>

        <Divider />

        {/* Teams and Score */}
        <Grid grow align="stretch" gutter="lg">
          {/* Team A */}
          <Grid.Col span={5}>
            <Paper withBorder p="md" radius="md" h="100%">
              <Stack align="center" spacing="md" justify="center" h="100%">
                {teamADetails?.profile_picture ? (
                  <Avatar 
                    src={teamADetails.profile_picture} 
                    size={120} 
                    radius="md"
                    alt={teamADetails?.name || match.team_a?.name}
                    styles={{
                      root: { border: '1px solid #eaeaea' }
                    }}
                  />
                ) : (
                  <Center
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: '8px',
                      backgroundColor: '#f1f3f5',
                      fontSize: '36px',
                      fontWeight: 'bold',
                      color: '#4263eb'
                    }}
                  >
                    {teamADetails?.name?.charAt(0) || match.team_a?.name?.charAt(0) || 'A'}
                  </Center>
                )}
                <Title order={4}>{teamADetails?.name || match.team_a?.name}</Title>
                {formatPlayers(teamADetails?.players) && (
                  <Box>
                    <Text size="sm" weight={600} c="dimmed">Players</Text>
                    <Text size="sm" align="center">
                      {formatPlayers(teamADetails?.players)}
                    </Text>
                  </Box>
                )}
              </Stack>
            </Paper>
          </Grid.Col>

          {/* Score */}
          <Grid.Col span={2}>
            <Paper 
              withBorder={false} 
              p="md" 
              radius="md" 
              style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                backgroundColor: status === 'In Progress' ? '#f8f9fa' : 'transparent'
              }}
            >
              <Box mb={8}>
                <IconBallFootball 
                  size={28} 
                  style={{ 
                    opacity: 0.6, 
                    marginBottom: 8
                  }} 
                />
              </Box>
              <Title 
                order={1} 
                style={{ 
                  fontSize: '36px', 
                  fontWeight: 700,
                }}
              >
                {formatScore()}
              </Title>
              {status === 'Scheduled' && (
                <Text size="xs" c="dimmed" mt={10}>Upcoming Match</Text>
              )}
              {status === 'In Progress' && (
                <Badge color="green" variant="light" mt={10}>Live</Badge>
              )}
            </Paper>
          </Grid.Col>

          {/* Team B */}
          <Grid.Col span={5}>
            <Paper withBorder p="md" radius="md" h="100%">
              <Stack align="center" spacing="md" justify="center" h="100%">
                {teamBDetails?.profile_picture ? (
                  <Avatar 
                    src={teamBDetails.profile_picture} 
                    size={120} 
                    radius="md"
                    alt={teamBDetails?.name || match.team_b?.name}
                    styles={{
                      root: { border: '1px solid #eaeaea' }
                    }}
                  />
                ) : (
                  <Center
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: '8px',
                      backgroundColor: '#f1f3f5',
                      fontSize: '36px',
                      fontWeight: 'bold',
                      color: '#fa5252'
                    }}
                  >
                    {teamBDetails?.name?.charAt(0) || match.team_b?.name?.charAt(0) || 'B'}
                  </Center>
                )}
                <Title order={4}>{teamBDetails?.name || match.team_b?.name}</Title>
                {formatPlayers(teamBDetails?.players) && (
                  <Box>
                    <Text size="sm" weight={600} c="dimmed">Players</Text>
                    <Text size="sm" align="center">
                      {formatPlayers(teamBDetails?.players)}
                    </Text>
                  </Box>
                )}
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </Card>
  );
}