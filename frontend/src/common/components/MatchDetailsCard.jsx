import React from 'react';
import { Card, Text, Group, Grid, Divider, Title, Paper, Badge, Avatar, Box, Flex, Stack, Center, Table } from '@mantine/core';
import { formatDate } from '../Base/utils/utils';
import { IconBallFootball, IconMapPin, IconInfoCircle } from '@tabler/icons-react';

export default function MatchDetailsCard({ match, teamADetails, teamBDetails, withBO3}) {
  const { name, description, date, sport_branch, status, score_list, competition, location, match_notes } = match;

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

  const getIndividualScores = () => {
    if (!score_list || score_list.length <= 1) return [];
    
    return score_list.slice(1).map(score => {
      if (score.includes(':')) {
        return score.replace(':', ' - ');
      }
      return score;
    });
  };

  const getPlayersList = (players) => {
    if (!players) return [];
    if (Array.isArray(players)) {
      return players;
    }
    return Object.values(players);
  };

  return (
    <Card shadow="sm" padding={{ base: 'sm', sm: 'lg' }} radius="md" withBorder w={{base: "100%", sm: "80%"}} mx="auto" my="xl">
      <Stack spacing='xs'>
        <Box>
          <Flex align="center" spacing="xs" gap="md" position="center" wrap="wrap" justify="space-between">
            <Text size="10px">{formatDate(date)}</Text>
            <Badge color={getStatusColor(status)} variant="light" size={{ base: "xs", sm: "md" }}>{status}</Badge>
          </Flex>
        </Box>

        <Box>
          <Flex align="center" spacing="xs" gap="md" position="center" wrap="wrap" justify="center">
            <Text size="10px">{name}</Text>
            <Divider orientation="vertical" size="sm"/>
            <Text size="10px">{sport_branch}</Text>
          </Flex>
        </Box>

        <Divider />

        <Flex gutter={{ base: 'xs', sm: 'lg' }} align="center" justify={'space-around'}>
          <Stack align="center" spacing={{ base: 'xs', sm: 'sm' }} justify="center" h="100%">
            {teamADetails?.profile_picture ? (
              <Avatar 
                src={teamADetails.profile_picture} 
                size={{ base: 40, sm: 60 }} 
                radius="md"
                alt={teamADetails?.name || match.team_a?.name}
                styles={{
                  root: { border: '1px solid #eaeaea' }
                }}
              />
            ) : (
              <Center
                style={{
                  width: '40px',
                  height: '40px',
                  maxWidth: '60px',
                  maxHeight: '60px',
                  borderRadius: '8px',
                  backgroundColor: '#f1f3f5',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#4263eb'
                }}
              >
                {teamADetails?.name?.charAt(0) || match.team_a?.name?.charAt(0) || 'A'}
              </Center>
            )}
            <Text fw={600} size={{ base: "12px", sm: "14px" }}>{teamADetails?.name || match.team_a?.name}</Text>
          </Stack>

          <Flex 
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
                fontSize: '24px', 
                fontWeight: 700,
                marginBottom: withBO3 && score_list && score_list.length > 1 ? '4px' : '0'
              }}
            >
              {formatScore()}
            </Title>

            {withBO3 && getIndividualScores().length > 0 && (
              <Flex direction="column" gap={4} mt={0} wrap="wrap" justify="center">
              {getIndividualScores().map((score, index) => (
                <Text
                  key={index} 
                  size="10px"  
                  c="dimmed" 
                  fw={400}    
                  style={{
                    display: 'inline-block', 
                    padding: '0px 2px',  
                    border: '1px solid #e9ecef',
                    borderRadius: '3px', 
                    backgroundColor: '#f8f9fa',
                    lineHeight: 1.3,      // Tighter line height
                    margin: '0 1px'
                  }}
                >
                  {score}
                </Text>
              ))}
            </Flex>
            )}
          </Flex>

          <Stack align="center" spacing={{ base: 'xs', sm: 'sm' }} justify="center" h="100%">
            {teamBDetails?.profile_picture ? (
              <Avatar 
                src={teamBDetails.profile_picture} 
                size={{ base: 40, sm: 60 }} 
                radius="md"
                alt={teamBDetails?.name || match.team_b?.name}
                styles={{
                  root: { border: '1px solid #eaeaea' }
                }}
              />
            ) : (
              <Center
                style={{
                  width: '40px',
                  height: '40px',
                  maxWidth: '60px',
                  maxHeight: '60px',
                  borderRadius: '8px',
                  backgroundColor: '#f1f3f5',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#fa5252'
                }}
              >
                {teamBDetails?.name?.charAt(0) || match.team_b?.name?.charAt(0) || 'B'}
              </Center>
            )}
            <Text fw={600} size={{ base: "12px", sm: "14px" }}>{teamBDetails?.name || match.team_b?.name}</Text>
          </Stack>
        </Flex>
        
        <Divider my="xs" />
        
        <Box>
          <Stack spacing="xs">
              {description && (
                <Group spacing="xs" align="flex-start" noWrap>
                  <IconInfoCircle size={14} style={{ opacity: 0.7, marginTop: 3 }} />
                  <Text size="xs">{description}</Text>
                </Group>
              )}
           </Stack>
        </Box>
        
        {(getPlayersList(teamADetails?.players).length > 0 || getPlayersList(teamBDetails?.players).length > 0) && (
          <>
            <Divider my="xs" />
            
            <Box>
              <Text size="sm" weight={600} c="dimmed" ta="center" mb={5}>Players</Text>
              <Table striped withColumnBorders withTableBorder size="xs">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th style={{ fontSize:"12px", textAlign: 'center' }}>{teamADetails?.name || match.team_a?.name}</Table.Th>
                    <Table.Th style={{ fontSize:"12px", textAlign: 'center' }}>{teamBDetails?.name || match.team_b?.name}</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {Array.from({ 
                    length: Math.max(
                      getPlayersList(teamADetails?.players).length, 
                      getPlayersList(teamBDetails?.players).length
                    ) 
                  }).map((_, index) => (
                    <Table.Tr key={index}>
                      <Table.Td style={{ textAlign: 'center', padding: '4px 8px' }}>
                        <Text size='xs'>
                          {getPlayersList(teamADetails?.players)[index] || '-'}
                        </Text>
                      </Table.Td>
                      <Table.Td style={{ textAlign: 'center', padding: '4px 8px' }}>
                        <Text size='xs'>
                          {getPlayersList(teamBDetails?.players)[index] || '-'}
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Box>
          </>
        )}
      </Stack>
    </Card>
  );
}