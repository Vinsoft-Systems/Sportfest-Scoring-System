import { Card, Text, Flex, Divider, Pill, Grid, Group } from '@mantine/core'
import { formatDate } from '../Base/utils/utils';
import { IconPointFilled } from '@tabler/icons-react'

export default function MatchCard({ match, onClick }) {

    const setPillColor = (status) => {
        switch(status) {
            case "Scheduled":
                return "#0072C6"; 
            case "In Progress":
                return "#34C759"; 
            case "Completed":
                return "#5A6270";
            case "Cancelled":
                return "#E03131"; 
            default:
                return "#5A6270"; 
        }
    }
    
    const setPillBgColor = (status) => {
        switch(status) {
            case "Scheduled":
                return "rgba(0, 114, 198, 0.15)"; 
            case "In Progress":
                return "rgba(52, 199, 89, 0.15)";
            case "Completed":
                return "rgba(90, 98, 112, 0.15)";
            case "Cancelled":
                return "rgba(224, 49, 49, 0.15)";
            default:
                return "rgba(90, 98, 112, 0.15)";
        }
    }

    const { name, description, date, sport_branch, status, score_list, team_a, team_b, competition } = match;

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

                <Pill 
                    size='xs'
                    style={{display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        paddingTop: '2px'

                }} 
                    bg={setPillBgColor(status)}
                    >
                    <Flex align="center"  gap="3px">
                        <IconPointFilled size={12} color={setPillColor(status)} />
                        <Text size="10px" fw={600} c={setPillColor(status)}>{status}</Text>
                    </Flex>
                </Pill>
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

            <Grid pb="md" justify='center' align='center'>
                <Grid.Col span="auto" ><Text fw={600} size="sm"ta="center">{team_a.name}</Text></Grid.Col>
                <Grid.Col span={2}><Text fw={800} size="md" ta="center">{match.score_list[0]}</Text></Grid.Col>
                <Grid.Col span="auto"><Text fw={600} size="sm" ta="center">{team_b.name}</Text></Grid.Col>
            </Grid>
        </Card>
        </>
    )        
}