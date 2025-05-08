import { ACTION_ICON_SIZE_M, routes, USER_MENU_HEIGHT } from '@/constants';
import UserMenu from '@/features/auth/user/UserMenu';
import useSize from '@/hooks/useSize';
import { ActionIcon, Box, Group, rem, Stack } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo';
import NavItem from './NavItem';
import classes from './navbar.module.css';
import { isAction } from '@reduxjs/toolkit';

export default function Navbar({ open, toggle }) {
  const location = useLocation();
  const { navbarWidth } = useSize();
  const [activeLink, setActiveLink] = React.useState(location.pathname);
  const { height, ref } = useElementSize();
  const isAdminRoute = location.pathname.startsWith('/admin'); 


  const goldenRatio = useMemo(() => `calc(calc(100% - ${rem(height)}) * 0.382)`, [height]);

  React.useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const routeFilter = useMemo(() => {
    return Object.values(routes).filter(route => {
      if (isAdminRoute) {
        return route.path.startsWith('/admin');
      } else {
        return route.isPublic === true;
      }
    });
  }, [isAdminRoute]);

  return (
    <>
      <ActionIcon
        style={{ zIndex: 1 }}
        radius="lg"
        onClick={toggle}
        pos="absolute"
        left={`calc(${rem(navbarWidth)} - calc(${ACTION_ICON_SIZE_M} / 2))`}
        top="10%"
      >
        {open ? <IconChevronLeft size={24} /> : <IconChevronRight size={24} />}
      </ActionIcon>
      <Stack className={classes.navbar} w={navbarWidth} h="inherit" justify="space-between" gap={0}>
        <Group pt="sm" px="sm">
          <Logo />
        </Group>

        <Group
          h={`calc(100% - ${USER_MENU_HEIGHT})`}
          gap={0}
          grow
          preventGrowOverflow={false}
          wrap="nowrap"
          style={{ overflowY: 'auto', flexDirection: 'column', visibility: height ? undefined : 'hidden' }}
        >
          <Box mah={goldenRatio} />
          <Box className="navigation-outer-wrapper">
            <Box className="navigation-inner-wrapper" ref={ref}>
              {routeFilter.map((item) => (
                <NavItem
                  item={item}
                  activeLink={activeLink}
                  setActiveLink={setActiveLink}
                  key={item.path}
                  w={navbarWidth}
                />
              ))}
            </Box>
          </Box>
        </Group>


        {isAdminRoute ? (
          <Box h={USER_MENU_HEIGHT} bottom={0} w="100%" p="xs" bg="main">
            <UserMenu open={open} />
          </Box>
        ) : (
          <Box h={USER_MENU_HEIGHT} bottom={0} w="100%" p="xs">
          </Box>
        )}        
      </Stack>
    </>
  );
}
