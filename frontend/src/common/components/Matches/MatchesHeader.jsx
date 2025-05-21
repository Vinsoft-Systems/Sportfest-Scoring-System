import { useState } from 'react';
import { formatDateNoTime } from '../../Base/utils/utils';
import { Container, SimpleGrid, Tabs, Group, Select, Box, Flex, Title } from '@mantine/core';
import classes from './MatchesHeader.module.css';
import MatchCard from '@/common/components/Match/MatchCard';
import { useNavigate } from 'react-router-dom';
import { IconFilterSearch, IconSortAscending } from '@tabler/icons-react';

export function MatchesHeader({ tabs, matches }) {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('time');

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab.value} key={tab.value}>
      {formatDateNoTime(tab.label)}
    </Tabs.Tab>
  ));

  const onClickMatch = (match) => {
    const matchId = match.id || match.id_;

    if (matchId) {
      console.log('Navigating to match ID:', matchId);
      navigate(`/match/${matchId}`);
    } else {
      console.error('Cannot navigate: Match ID not found', match);
      console.log('Match object:', match);
    }
  };

  const getFilteredAndSortedMatches = (dateKey) => {
    if (!matches[dateKey]) return [];

    let filteredMatches = [...matches[dateKey]];

    if (filterStatus !== 'all') {
      filteredMatches = filteredMatches.filter((match) => match.status === filterStatus);
    }

    filteredMatches.sort((a, b) => {
      if (sortBy === 'time') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'sport') {
        return a.sport_branch.localeCompare(b.sport_branch);
      }
      return 0;
    });

    return filteredMatches;
  };

  const getStatusOptions = () => {
    const statuses = new Set(['all']);

    Object.values(matches).forEach((dateMatches) => {
      dateMatches.forEach((match) => {
        statuses.add(match.status);
      });
    });

    return Array.from(statuses).map((status) => ({
      value: status,
      label: status === 'all' ? 'All Statuses' : status,
    }));
  };

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          justify="space-between"
          align={{ base: 'stretch', sm: 'center' }}
          my="md"
          gap="sm"
        >
          <Title order={4}>Matches</Title>
          <Group gap="sm">
            <Select
              size="sm"
              leftSection={<IconFilterSearch size={16} />}
              placeholder="Filter by status"
              data={getStatusOptions()}
              value={filterStatus}
              onChange={setFilterStatus}
              className={classes.filterSelect}
            />

            <Select
              size="sm"
              leftSection={<IconSortAscending size={16} />}
              placeholder="Sort by"
              data={[
                { value: 'time', label: 'Sort by time' },
                { value: 'sport', label: 'Sort by sport branch' },
              ]}
              value={sortBy}
              onChange={setSortBy}
              className={classes.sortSelect}
            />
          </Group>
        </Flex>
      </Container>

      <Container size="md">
        <Tabs
          defaultValue={tabs && tabs.length > 0 ? tabs[0].value : null}
          variant="outline"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>

          {tabs.map((tab) => {
            const filteredMatches = getFilteredAndSortedMatches(tab.value);

            return (
              <Tabs.Panel value={tab.value} key={tab.value}>
                {filteredMatches.length === 0 ? (
                  <Box py="xl" ta="center">
                    No matches found with the selected filters.
                  </Box>
                ) : (
                  <SimpleGrid
                    cols={{ base: 1, sm: 2, md: 3 }}
                    spacing={{ base: 'md', sm: 'lg' }}
                    verticalSpacing={{ base: 'md', sm: 'lg' }}
                    mt="xl"
                  >
                    {filteredMatches.map((match) => (
                      <MatchCard key={match.id} match={match} onClick={() => onClickMatch(match)} />
                    ))}
                  </SimpleGrid>
                )}
              </Tabs.Panel>
            );
          })}
        </Tabs>
      </Container>
    </div>
  );
}
