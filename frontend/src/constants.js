import { IconHome, IconShirtFilled, IconCampfireFilled, IconPuzzleFilled } from '@tabler/icons-react';
import SecurityProvider from './features/auth/security/SecurityProvider';
import { Home } from './features/pages';
import AdminHome from '@/features/pages/admin/AdminHome.jsx';
import AdminMatches from './features/pages/admin/AdminMatches';
import AdminTeams from '@/features/pages/admin/AdminTeams.jsx';
import AdminCompetitions from '@/features/pages/admin/AdminCompetitions.jsx';
import { IconAwardFilled } from '@tabler/icons-react';
import Matches from '@/features/pages/Matches.jsx';
import Match from '@/features/pages/Match.jsx';
import Results from './common/components/StandingsCard.jsx';
import { IconScoreboard } from '@tabler/icons-react';
import AdminGroups from '@/features/pages/admin/AdminGroups.jsx';

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
  home: {
    path: '/',
    name: 'Home',
    Icon: IconHome,
    Element: Home,
    isPublic: true,
  },
  matches: {
    path: '/matches',
    name: 'Matches',
    Icon: IconAwardFilled,
    Element: Matches,
    isPublic: true,
  },
  match: {
    path: '/match/:matchId',
    Element: Match,
  },
  result: {
    path: '/standings',
    name: 'Standings',
    Icon: IconScoreboard,
    Element: Results,
    isPublic: true,
  },
  adminHome: {
    path: '/admin/home',
    name: 'Home',
    Icon: IconHome,
    Element: AdminHome,
  },
  adminCompetitions: {
    path: '/admin/competitions',
    Icon: IconCampfireFilled,
    resource_name: 'competition',
    name: 'Competitions',
    Element: AdminCompetitions,
  },
  adminTeams: {
    path: '/admin/teams',
    Icon: IconShirtFilled,
    resource_name: 'team',
    name: 'Teams',
    Element: AdminTeams,
  },
  adminMatches: {
    path: '/admin/matches',
    Icon: IconPuzzleFilled,
    resource_name: 'match',
    name: 'Matches',
    Element: AdminMatches,
  },
  adminGroups: {
    path: '/admin/groups',
    Icon: IconPuzzleFilled,
    resource_name: 'group',
    name: 'Groups',
    Element: AdminGroups,
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
