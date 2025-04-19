import { security } from '@/constants';
import { Card, Tabs } from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import { ApiProvider, DataGrid, useApi } from 'fastapi-rtk';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ApiContent({ pathname }) {
  const { setQueryParams } = useApi();

  React.useEffect(() => {
    setQueryParams({});
  }, [pathname, setQueryParams]);
  return (
    <Card h="97%">
      <DataGrid />
    </Card>
  );
}

export default function SecurityProvider() {
  const navigate = useNavigate();
  const location = useLocation();
  const basePathPrefix = '/security';
  let pathname = location.pathname;

  if (pathname.startsWith(basePathPrefix)) {
    pathname = pathname.substring(basePathPrefix.length);
  }

  return (
    <Tabs h="inherit" value={location.pathname} onChange={navigate}>
      <Tabs.List h="3%">
        {Object.entries(security).map(([key, value]) => (
          <Tabs.Tab key={key} value={value.path}>
            {upperFirst(key)}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      <ApiProvider resource_name={pathname} initialQueryParams={{}}>
        <ApiContent pathname={pathname} />
      </ApiProvider>
    </Tabs>
  );
}
