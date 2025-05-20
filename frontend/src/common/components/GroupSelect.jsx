import { Select } from '@mantine/core';

const GROUP_OPTIONS = {
  Futsal: [
    { label: 'Group A', value: 'Group A' },
    { label: 'Group B', value: 'Group B' },
    { label: 'Group C', value: 'Group C' },
  ],
  basketball: [
    { label: 'Group A', value: 'Group A' },
    { label: 'Group B', value: 'Group B' },
  ],
  volleyball: [
    { label: 'Group A', value: 'Group A' },
    { label: 'Group B', value: 'Group B' },
  ],
  badminton_ganda_putra: [
    { label: 'Group A', value: 'Group A' },
    { label: 'Group B', value: 'Group B' },
    { label: 'Group C', value: 'Group C' },
  ],
  badminton_ganda_campuran: [
    { label: 'Group A', value: 'Group A' },
    { label: 'Group B', value: 'Group B' },
  ],
};

export function GroupSelect({ componentProps, sport_branch }) {
  const options = GROUP_OPTIONS[sport_branch] || [];
  return (
    <Select
      label="Group"
      placeholder="Select group"
      data={options}
      {...componentProps}
      disabled={options.length === 0}
    />
  );
}