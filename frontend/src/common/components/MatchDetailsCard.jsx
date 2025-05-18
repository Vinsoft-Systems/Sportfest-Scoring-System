import React from 'react';
import { Card, Text, Group, Grid, Divider, Title, Paper, Badge, Avatar, Box, Flex, Stack, Center } from '@mantine/core';
import { formatDate } from '../Base/utils/utils';
import { IconBallFootball, IconSeparator } from '@tabler/icons-react';

export default function MatchDetailsCard({ match, teamADetails, teamBDetails, withBO3}) {
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
      <Stack spacing='xs'>
        <Flex align={'flex-start'} justify={'space-between'}>
          <Text size={10} c="dimmed" lineClamp={1}>{formatDate(date)}</Text>
          <Badge color={getStatusColor(status)} variant="light" size={{ base: "xs", sm: "md" }}>{status}</Badge>
        </Flex>

        <Box>
          <Flex spacing="xs" gap="md" position="center" wrap="wrap" justify="center">
            <Text align="center" mb='xs' size="10px" fw={600}>{name}</Text>
            <Divider orientation="vertical" size="sm"/>
            <Text align="center" size="10px" c="dimmed" fw={600}>{sport_branch}</Text>
            <Text size={{ base: "10px", sm: "sm" }} c="dimmed" display={{ base: 'none', xs: 'block' }}>•</Text>
          </Flex>
          
{/* `          {description && (
            <Text align="center" size={{ base: "10px", sm: "sm" }} mt="xs" c="dimmed">{description}</Text>
          )}` */}
        </Box>

        <Divider />

        <Flex gutter={{ base: 'xs', sm: 'lg' }} align="center" justify={'space-around'} >
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

          {/* Score */}
            <Flex 
              withBorder
              p={{ sm: 'md' }}
              radius="md" 
              style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
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
            </Flex>

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
        </Flex>
      </Stack>
    </Card>
  );
}