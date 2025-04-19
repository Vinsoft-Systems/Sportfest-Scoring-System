import { Center, Title } from '@mantine/core';
import {useParams} from "react-router-dom";

export default function Competition() {
  const { competitionId } = useParams();
  return (
      <Center>
        <Title order={1}>Competition {competitionId}</Title>
      </Center>
  );
}
