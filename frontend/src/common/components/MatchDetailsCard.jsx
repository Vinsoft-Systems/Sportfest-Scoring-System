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

  const formatPlayers = (players) => {
    if (!players) return null;
    if (Array.isArray(players)) {
      return players.join(', ');
    }
    return Object.values(players).join(', ');
  };

  return (
    <Card shadow="sm" padding={{ base: 'sm', sm: 'lg' }} radius="md" withBorder w="100%">
      <Stack spacing={{ base: 'xs', sm: 'lg' }}>
        <Group position="apart" wrap="nowrap">
          <Group spacing="xs" wrap="nowrap">
            <IconClock size={{ base: 10, sm: 12 }} stroke={1.5} color="gray" />
            <Text size={{ base: "10px", sm: "sm" }} c="dimmed" lineClamp={1}>{formatDate(date)}</Text>
          </Group>
          <Badge color={getStatusColor(status)} variant="light" size={{ base: "xs", sm: "md" }}>{status}</Badge>
        </Group>

        <Box>
          <Title order={3} align="center" mb={{ base: "xs", sm: "xs" }} size={{ base: '14px', sm: 'h3' }} fw={600}>{name}</Title>
          <Group spacing="xs" position="center" wrap="wrap" justify="center">
            <Text align="center" size={{ base: "10px", sm: "sm" }} c="dimmed" fw={600}>{sport_branch}</Text>
            <Text size={{ base: "10px", sm: "sm" }} c="dimmed" display={{ base: 'none', xs: 'block' }}>•</Text>
            <Text align="center" size={{ base: "10px", sm: "sm" }} c="dimmed" fw={600}>{competition?.name}</Text>
          </Group>
          
          {description && (
            <Text align="center" size={{ base: "10px", sm: "sm" }} mt="xs" c="dimmed">{description}</Text>
          )}
        </Box>

        <Divider />

        {/* For mobile: Team A then B then score */}
        <Grid gutter={{ base: 'xs', sm: 'lg' }} display={{ base: 'grid', xs: 'none' }}>
          {/* Team A */}
          <Grid.Col span={12}>
            <Paper withBorder p="xs" radius="md">
              <Stack align="center" spacing="xs" justify="center">
                {teamADetails?.profile_picture ? (
                  <Avatar 
                    src={teamADetails.profile_picture} 
                    size={60}
                    radius="md"
                    alt={teamADetails?.name || match.team_a?.name}
                  />
                ) : (
                  <Center
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: '8px',
                      backgroundColor: '#f1f3f5',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#4263eb'
                    }}
                  >
                    {teamADetails?.name?.charAt(0) || match.team_a?.name?.charAt(0) || 'A'}
                  </Center>
                )}
                <Text fw={600} size="sm">{teamADetails?.name || match.team_a?.name}</Text>
              </Stack>
            </Paper>
          </Grid.Col>

          {/* Team B */}
          <Grid.Col span={12}>
            <Paper withBorder p="xs" radius="md" mt="xs">
              <Stack align="center" spacing="xs" justify="center">
                {teamBDetails?.profile_picture ? (
                  <Avatar 
                    src={teamBDetails.profile_picture} 
                    size={60}
                    radius="md"
                    alt={teamBDetails?.name || match.team_b?.name}
                  />
                ) : (
                  <Center
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: '8px',
                      backgroundColor: '#f1f3f5',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#fa5252'
                    }}
                  >
                    {teamBDetails?.name?.charAt(0) || match.team_b?.name?.charAt(0) || 'B'}
                  </Center>
                )}
                <Text fw={600} size="sm">{teamBDetails?.name || match.team_b?.name}</Text>
              </Stack>
            </Paper>
          </Grid.Col>

          {/* Score - at bottom for mobile */}
          <Grid.Col span={12}>
            <Paper 
              withBorder
              p="xs"
              radius="md" 
              mt="xs"
              style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: status === 'In Progress' ? '#f8f9fa' : 'transparent'
              }}
            >
              <IconBallFootball size={12} style={{ opacity: 0.6, marginBottom: 4 }} />
              <Title order={1} style={{ fontSize: '24px', fontWeight: 700 }}>
                {formatScore()}
              </Title>
              {status === 'In Progress' && (
                <Badge color="green" variant="light" size="xs" mt={4}>Live</Badge>
              )}
            </Paper>
          </Grid.Col>
        </Grid>

        {/* For desktop: Team A, Score, Team B in a row */}
        <Grid gutter={{ base: 'xs', sm: 'lg' }} display={{ base: 'none', xs: 'grid' }}>
          <Grid.Col span={{ xs: 5 }}>
            <Paper withBorder p={{ sm: 'md' }} radius="md" h="100%">
              <Stack align="center" spacing={{ sm: 'md' }} justify="center" h="100%">
                {teamADetails?.profile_picture ? (
                  <Avatar 
                    src={teamADetails.profile_picture} 
                    size={{ sm: 120 }} 
                    radius="md"
                    alt={teamADetails?.name || match.team_a?.name}
                    styles={{
                      root: { border: '1px solid #eaeaea' }
                    }}
                  />
                ) : (
                  <Center
                    style={{
                      width: '100%',
                      maxWidth: '120px',
                      aspectRatio: '1/1',
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
                <Title order={4} size={{ sm: 'h4' }}>{teamADetails?.name || match.team_a?.name}</Title>
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
          <Grid.Col span={{ xs: 2 }}>
            <Paper 
              withBorder
              p={{ sm: 'md' }}
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
              <IconBallFootball size={16} style={{ opacity: 0.6, marginBottom: 6 }} />
              <Title 
                order={1} 
                style={{ 
                  fontSize: '32px', 
                  fontWeight: 700,
                }}
              >
                {formatScore()}
              </Title>
              {status === 'Scheduled' && (
                <Text size="xs" c="dimmed" mt={8}>Upcoming</Text>
              )}
              {status === 'In Progress' && (
                <Badge color="green" variant="light" mt={8}>Live</Badge>
              )}
            </Paper>
          </Grid.Col>

          {/* Team B */}
          <Grid.Col span={{ xs: 5 }}>
            <Paper withBorder p={{ sm: 'md' }} radius="md" h="100%">
              <Stack align="center" spacing={{ sm: 'md' }} justify="center" h="100%">
                {teamBDetails?.profile_picture ? (
                  <Avatar 
                    src={teamBDetails.profile_picture} 
                    size={{ sm: 120 }} 
                    radius="md"
                    alt={teamBDetails?.name || match.team_b?.name}
                    styles={{
                      root: { border: '1px solid #eaeaea' }
                    }}
                  />
                ) : (
                  <Center
                    style={{
                      width: '100%',
                      maxWidth: '120px',
                      aspectRatio: '1/1',
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
                <Title order={4} size={{ sm: 'h4' }}>{teamBDetails?.name || match.team_b?.name}</Title>
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