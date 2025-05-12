import { useState } from 'react';
import { formatDateNoTime } from '../Base/utils/utils';
import {
  Container,
  SimpleGrid,
  Tabs,
} from '@mantine/core';
import classes from './MatchesHeader.module.css';
import  MatchCard  from '@/common/components/MatchCard'
import { useNavigate } from 'react-router-dom';


export function MatchesHeader({tabs, matches}) {
const navigate = useNavigate();
  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab.value} key={tab.value}>
      {formatDateNoTime (tab.label)}
    </Tabs.Tab>
  ));

  const handleMatchClick = (id) => {
    navigate(`/match/${id}`);
  }

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
      </Container>
      <Container size="md">
        <Tabs
          defaultValue= {tabs[0].value}
          variant="outline"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>

          {tabs.map((tab) => (
            <Tabs.Panel value={tab.value} key={tab.value} >
                <SimpleGrid 
                    cols={{ base: 1, sm: 2, md: 3 }}
                    spacing={{ base: 'md', sm: 'lg' }}
                    verticalSpacing={{ base: 'md', sm: 'lg' }}
                    mt="xl"
                    >
                    {matches[tab.value]?.map((match) => (
                        <MatchCard 
                        key={match.id} 
                        match={match} 
                        onClick={() => handleMatchClick(match.id)} 
                        />
                    ))}
                    </SimpleGrid>
            </Tabs.Panel>
          ))}
        </Tabs>
      </Container>
    </div>
  );
}