import { Center, Title } from '@mantine/core';
import { ApiProvider, NextGenDataGrid } from 'fastapi-rtk';

export default function Competitions() {
  return (
    <ApiProvider resource_name='competition'>
      <NextGenDataGrid/>
      <Center>
        <Title order={1}>Competitions</Title>
      </Center>
    </ApiProvider>
  );
}
