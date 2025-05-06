import { Card } from '@mantine/core'

export default function MatchCard({ match }) {

    const { date, sport_branch, status, score_list, team_a, team_b, competition } = match;
    
    return (
        <>
        <Card shadow="sm" padding="lg" radius="md" withBorder> 
            <h1>{}</h1>
        </Card>
        </>
    )        
}