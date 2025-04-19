import { IconBell, IconHome } from '@tabler/icons-react';
import SecurityProvider from './features/auth/security/SecurityProvider';
import { Home, WrappedDataGrid } from './features/pages';
import Competitions from "@/features/pages/Competitions.jsx";
import Competition from "@/features/pages/Competition.jsx";
import AdminHome from "@/features/pages/AdminHome.jsx";

export const BASE_PATH = new URL(document.baseURI).pathname;

// MANTINE SIZES
export const ACTION_ICON_SIZE_M = 'calc(1.75rem * var(--mantine-scale))';
export const THEME_ICON_SIZE_XL = 'calc(2.75rem * var(--mantine-scale))';
export const BUTTON_PADDING_X_XL = 'calc(2rem * var(--mantine-scale))';

// Setting for NAVBAR
export const APP_NAME = document.title;
export const NAVIGATION_ITEM_SIZE = '4rem';
export const USER_MENU_HEIGHT = '5rem';

export const routes = {
  adminHome: {
    path: '/admin/home',
    name: 'Home',
    Icon: IconHome,
    Element: AdminHome,
  },
  home: {
    path: '/',
    name: 'Home',
    Icon: IconHome,
    Element: Home,
  },
  examples: {
    path: '/examples',
    Icon: IconBell,
    resource_name: 'examples',
    name: 'Example Page',
    Element: WrappedDataGrid,
  },
  examples2: {
    path: '/examples2',
    Icon: IconBell,
    resource_name: 'examples',
    name: 'Example Page but text is longer',
    Element: WrappedDataGrid,
  },
  examples3: {
    path: '/examples3',
    // Icon: IconBell,
    resource_name: 'examples',
    name: 'Example without icon',
    Element: WrappedDataGrid,
  },
  competitions: {
    path: '/competitions',
    Icon: IconBell,
    resource_name: 'competitions',
    name: 'Competitions',
    Element: Competitions
  },
  competition: {
    path: '/competition/:competitionId',
    Icon: IconBell,
    resource_name: 'competition',
    name: 'Competition',
    Element: Competition
  },
};

export const security = {
  permission: {
    path: '/security/permissions',
    Element: SecurityProvider,
  },
  permissionView: {
    path: '/security/permissionview',
    Element: SecurityProvider,
  },
  roles: {
    path: '/security/roles',
    Element: SecurityProvider,
  },
  users: {
    path: '/security/users',
    Element: SecurityProvider,
  },
  viewMenus: {
    path: '/security/viewsmenus',
    Element: SecurityProvider,
  },
};

export const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

const navbarWidth = 275;
const navbarWidthCollapsed = `calc(${THEME_ICON_SIZE_XL} + ${BUTTON_PADDING_X_XL})`;
const padding = 16;
const logoHeight = 50;

export const sizes = {
  navbarWidth,
  padding,
  logoHeight,
  navbarWidthCollapsed,
};
