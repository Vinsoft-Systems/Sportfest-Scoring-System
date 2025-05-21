import { Switch, useMantineColorScheme } from '@mantine/core';

export function DarkModeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return <Switch defaultChecked={colorScheme === 'dark'} onChange={toggleColorScheme} />;
}
