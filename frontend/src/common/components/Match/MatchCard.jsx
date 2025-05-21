import { Card, Text, Flex, Divider, Grid, Badge } from '@mantine/core'
import { formatDate } from '../../Base/utils/utils';

export default function MatchCard({ match, onClick }) {

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

    const { name, date, sport_branch, status, score_list, team_a, team_b } = match;

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
            <Flex direction="row" align="center" pb={{ base: 'xs', sm: 'md' }} justify={'space-between'} withBorder>
                <Flex gap="sm">
                    <Text size="10px">{formatDate(date)}</Text>
                </Flex>
                
                <Badge color={getStatusColor(status)} variant="light">{status}</Badge>
            </Flex>

            <Flex direction="row" align="center" pb="sm" gap="xs" justify={'center'}>
                <Text  size="10px" fw={600}>{sport_branch}</Text>
                <Divider orientation="vertical" size="sm"/>
                <Text  size="10px" fw={600}>{name}</Text>
            </Flex>

            {/* Lapangan */}
            {/* <Flex direction="row" align="center" pb="sm" gap="xs" justify={'center'}>
                <Text  size="12px" fw={600}>{description}</Text>
            </Flex> */}

            <Grid pb="md" justify='center' align='center' >
                <Grid.Col span="auto" ><Text fw={600} size="sm" ta="center">{team_a.name}</Text></Grid.Col>
                <Grid.Col span="auto"><Text fw={800} size="md" ta="center"> vs </Text></Grid.Col>
                <Grid.Col span="auto"><Text fw={600} size="sm" ta="center">{team_b.name}</Text></Grid.Col>
            </Grid>

            <Grid pb="md" justify='center' align='center' >
                {
                    score_list?.map((score, index) => (
                        <Grid.Col span={12} key={index}>
                            <Text fw={800} size="md" ta="center">{score_list?. length > 1 ? "Set " + (index + 1) + ': ' : null} {score}</Text>
                        </Grid.Col>
                    ))
                }
            </Grid>
        </Card>
        </>
    )        
}