import { Card } from '@mantine/core';
import { ApiProvider, DataGrid } from 'fastapi-rtk';

export default function WrappedDataGrid({ resource_name }) {
  return (
    <Card h="inherit" withBorder>
      <ApiProvider resource_name={resource_name}>
        <DataGrid />
      </ApiProvider>
    </Card>
  );
}
