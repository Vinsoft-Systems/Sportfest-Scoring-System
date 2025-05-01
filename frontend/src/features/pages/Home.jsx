import { Center, Title } from '@mantine/core';
import { ApiProvider, useApi } from 'fastapi-rtk';

function Data(){
  const { data } = useApi("competition");
  return (
    <div>
      <h1>Data</h1>
      <p>This is the data page.</p>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  );
}

export default function Home() {

  return (
    <Center>
      <Title order={1}>Home</Title>
      <ApiProvider resource_name='competition'>
        <Data />
      </ApiProvider>
    </Center>
  );
}
