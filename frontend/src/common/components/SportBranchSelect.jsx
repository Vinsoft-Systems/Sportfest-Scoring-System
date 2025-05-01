import { Select } from '@mantine/core';
import { ApiProvider, useApi, useForms } from 'fastapi-rtk';
import { useState } from 'react';
import { useEffect } from 'react';

function MatchAutocomplete({ componentProps, compId }) {
  const [data, setData] = useState([]);
  const { getEntry } = useApi();

  useEffect(() => {
    if (compId) {
      getEntry(compId).then((response) => {
        setData(
          response?.result?.sport_branches?.map((data) => ({
            label: data,
            value: data,
          })) || [],
        );
      });
    }
  }, [compId, getEntry]);

  return (
    <Select
      searchable
      comboboxProps={{ withinPortal: false }}
      data={data}
      {...componentProps}
      onChange={(value) => {
        componentProps.onChange({ target: { value } });
      }}
    />
  );
}

export function SportBranchSelect({ componentProps, type }) {
  const { state } = useForms(type);
  return (
    <ApiProvider resource_name="competition" fetchInfo={false}>
      <MatchAutocomplete compId={state.data?.competition} componentProps={componentProps} />
    </ApiProvider>
  );
}
