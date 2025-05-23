import useSize from '@/hooks/useSize';
import { AppShell, AppShellHeader, rem } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import {HeaderLogo} from "@/common/components/HeaderLogo/HeaderLogo.jsx";

export default function MainFrame({ showNavbar }) {
  const { getPageHeight, navbarWidth, padding, isNavbarOpened, toggleNavbar } = useSize();

  return (
    <AppShell
      padding={rem(padding)}
      navbar={showNavbar ? { width: `calc(${rem(navbarWidth)} + 1px)` } : undefined}
      header={{ height: 70 }}
    >
      <AppShellHeader>
        <HeaderLogo />
      </AppShellHeader>

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
