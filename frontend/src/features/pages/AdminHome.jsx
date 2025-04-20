import { Title } from '@mantine/core';
import { ApiProvider } from 'fastapi-rtk';

export default function AdminHome() {
  return (
    <ApiProvider resource_name='adminhome'>
      <Title order={1}>AdminHome</Title>
    </ApiProvider>
  );
}
