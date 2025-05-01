import { Title } from '@mantine/core';
import { ApiProvider } from 'fastapi-rtk';

export default function AdminHome({ resource_name }) {
  return (
    <ApiProvider resource_name={resource_name}>
      <Title order={1}>AdminHome</Title>
    </ApiProvider>
  );
}
