import { Card, Text, Flex, Divider, Pill, Grid } from '@mantine/core'
import { formatDate } from '../Base/utils/utils';

export default function MatchCard({ match, onClick }) {

    const { date, sport_branch, status, score_list, team_a, team_b, competition } = match;
    return (
        <>
        <Card 
            shadow="sm" 
            padding="lg" 
            radius="md" 
            withBorder 
            w="100%" 
            maw={{ base: '100%', xs: '320px', sm: '360px', md: '400px' }}
            onClick={onClick}
            style={{cursor: 'pointer'}}
        >  
            <Flex direction="row" align="center" pb="lg" justify={'space-between'}>
                <Flex gap="sm">
                    <Text size="12px">{formatDate(date)}</Text>
                    <Divider orientation="vertical" size="sm"/>
                    <Text  size="12px">{sport_branch}</Text>
                </Flex>

                <Pill>{status}</Pill>
            </Flex>

            <Grid pb="md">
                <Grid.Col span="auto" ><Text fw={700} ta="center">{team_a.name}</Text></Grid.Col>
                <Grid.Col span={2}><Text fw={800} size="20px"> vs </Text></Grid.Col>
                <Grid.Col span="auto"><Text fw={700} ta="center">{team_b.name}</Text></Grid.Col>
            </Grid>
        </Card>
        </>
    )        
}