import { Select } from '@mantine/core';
import { ApiProvider, useApi, useForms } from 'fastapi-rtk';
import { useState } from 'react';
import { useEffect } from 'react';

function TeamAutocomplete({ componentProps, compId, sport_branch }) {
  console.log('TeamAutocomplete', componentProps, compId, sport_branch);
  const [data, setData] = useState([]);
  const { getEntry } = useApi();

  useEffect(() => {
    if (compId && sport_branch) {
      getEntry(`teams_by_competition/${compId}/${sport_branch}`).then((response) => {
        setData(response || []);
      });
    }
  }, [compId, sport_branch, getEntry]);

  return <Select searchable comboboxProps={{ withinPortal: false }} {...componentProps} data={data} />;
}

export function TeamFinder({ componentProps, type }) {
  const { state } = useForms(type);
  return (
    <ApiProvider resource_name="team" fetchInfo={false}>
      <TeamAutocomplete
        compId={state.data?.competition}
        sport_branch={state.data?.sport_branch}
        componentProps={componentProps}
      />
    </ApiProvider>
  );
}
