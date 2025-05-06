import { Card, Text, Flex, Divider, Pill, Grid } from '@mantine/core'
import { formatDate } from '../Base/utils/utils';
import { IconPointFilled } from '@tabler/icons-react'

export default function MatchCard({ match, onClick }) {

    const setPillColor = (status) => {
        switch(status) {
            case "Scheduled":
                return " #64D9FF";
            case "In Progress":
                return " #00E200";
            case "Completed":
                return " #7B8089"; 
            case "Cancelled":
                return " #FF2A04";
            default:
                return " #7B8089";
        }
    }

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
                </Flex>

                <Pill>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <IconPointFilled size={16} color={setPillColor(status)} />
                        {status}
                    </span>
                </Pill>
            </Flex>

            <Flex direction="row" align="center" pb="sm" gap="xs" justify={'center'}>
                <Text  size="12px" fw={600}>{sport_branch}</Text>
                <Divider orientation="vertical" size="sm"/>
                <Text  size="12px" fw={600}>{match.name}</Text>
            </Flex>

            <Grid pb="md">
                <Grid.Col span="auto" ><Text fw={600} ta="center">{team_a.name}</Text></Grid.Col>
                <Grid.Col span={2}><Text fw={800} size="20px" ta="center"> vs </Text></Grid.Col>
                <Grid.Col span="auto"><Text fw={600} ta="center">{team_b.name}</Text></Grid.Col>
            </Grid>
        </Card>
        </>
    )        
}