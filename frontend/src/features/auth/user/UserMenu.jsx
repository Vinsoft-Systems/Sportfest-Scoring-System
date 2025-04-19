import { DarkModeToggle } from '@/common/Base/DarkModeToggle';
import { routes, security, sizes } from '@/constants.js';
import useSize from '@/hooks/useSize';
import {
  ActionIcon,
  Avatar,
  Group,
  Menu,
  rem,
  Stack,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight, IconLogout, IconMathSec, IconMoon, IconSettings, IconUserCircle } from '@tabler/icons-react';
import { useAuth } from 'fastapi-rtk';
import { useNavigate } from 'react-router-dom';
import classes from './user.module.css';

export default function UserMenu({ open }) {
  const navigate = useNavigate();
  const { user, signout } = useAuth();
  const { isMobile } = useSize();
  const { colorScheme } = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure(false);
  const name = `${user.first_name} ${user.last_name}`;

  const DesktopMenu = (
    <Stack gap={0} p="xs">
      <Text c={colorScheme === 'dark' ? 'gray' : 'black'}>
        {user.first_name} {user.last_name}
      </Text>
      <Text c={colorScheme === 'dark' ? 'gray' : 'gray'}>{user.roles}</Text>
      <Menu.Divider />
      <Menu.Item disabled leftSection={<IconUserCircle p="0" style={{ width: rem(14), height: rem(14) }} />}>
        Profile
      </Menu.Item>
      <Menu.Item leftSection={<IconMoon p="0" style={{ width: rem(14), height: rem(14) }} />}>
        <Group justify="space-between">
          Dark Mode
          <DarkModeToggle />
        </Group>
      </Menu.Item>
      <Menu.Item
        leftSection={<IconMathSec p="0" style={{ width: rem(14), height: rem(14) }} />}
        onClick={() => navigate(security.permission.path)}
      >
        <Group justify="space-between">Security</Group>
      </Menu.Item>
      <Menu.Item disabled leftSection={<IconSettings p="0" style={{ width: rem(14), height: rem(14) }} />}>
        Settings
      </Menu.Item>
      <Menu.Item
        c={'red.9'}
        leftSection={<IconLogout p="0" style={{ width: rem(14), height: rem(14) }} />}
        onClick={signout}
      >
        Logout
      </Menu.Item>
    </Stack>
  );

  const MobileMenu = (
    <>
      <Menu.Item
        onClick={() => {
          navigate(routes.user.path);
          toggle();
        }}
        leftSection={<IconUserCircle width={sizes.iconSmall} height={sizes.iconSmall} className={classes.iconSmall} />}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        p={12}
        leftSection={<IconLogout width={sizes.iconSmall} height={sizes.iconSmall} className={classes.iconSmall} />}
        onClick={signout}
      >
        Logout
      </Menu.Item>
    </>
  );
  return (
    <Menu
      width={sizes.navbarWidth}
      position="bottom-end"
      transition="pop-top-right"
      closeOnItemClick={false}
      opened={opened}
      onChange={toggle}
    >
      <Menu.Target>
        {isMobile ? (
          <ActionIcon c={'gray'} bg={'transparent'} className={classes.iconLarge}>
            <IconSettings />
          </ActionIcon>
        ) : (
          <UnstyledButton p={'xs'} className={classes.btnUser} w={'100%'}>
            <Group>
              <Avatar variant="outline" name={name} color="white" />
              {open && (
                <>
                  <div style={{ flex: 1 }}>
                    <Text fw={500} c={'white'}>
                      {name}
                    </Text>
                  </div>
                  <IconChevronRight size="1rem" color="white" />
                </>
              )}
            </Group>
          </UnstyledButton>
        )}
      </Menu.Target>
      <Menu.Dropdown>{isMobile ? MobileMenu : DesktopMenu}</Menu.Dropdown>
    </Menu>
  );
}
