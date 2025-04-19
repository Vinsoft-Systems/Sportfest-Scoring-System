import useSize from '@/hooks/useSize';
import { AppShell, rem } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

export default function MainFrame({ showNavbar }) {
  const { getPageHeight, navbarWidth, padding, isNavbarOpened, toggleNavbar } = useSize();

  return (
      <AppShell
          padding={rem(padding)}
          navbar={showNavbar ? { width: `calc(${rem(navbarWidth)} + 1px)` } : undefined}
      >
        {showNavbar && (
            <AppShell.Navbar>
              <Navbar open={isNavbarOpened} toggle={toggleNavbar} />
            </AppShell.Navbar>
        )}

        <AppShell.Main h={getPageHeight()} style={{ overflow: 'auto' }}>
          <Outlet />
        </AppShell.Main>
      </AppShell>
  );
}