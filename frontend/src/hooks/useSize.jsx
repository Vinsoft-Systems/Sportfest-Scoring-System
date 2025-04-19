import { toggleNavbar } from '@/state/sizeSlice';
import { rem } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mobileRegex, sizes } from '../constants';

/**
 * Custom hook that provides size-related values and functions.
 * @returns An object containing size-related values and functions.
 */
export default function useSize() {
  const dispatch = useDispatch();
  const isMobile = useMemo(() => !!navigator.userAgent.match(mobileRegex), []);
  const isNavbarOpened = useSelector((state) => state.size.navbarOpened);

  const { height } = useViewportSize();
  const navbarWidth = isNavbarOpened ? sizes.navbarWidth : sizes.navbarWidthCollapsed;
  const padding = sizes.padding;
  const logoHeight = sizes.logoHeight;

  const internalToggleNavbar = useCallback(() => dispatch(toggleNavbar()), [dispatch]);

  /**
   * Calculates the page height based on the window inner height, header height, main padding and footer height.
   * @returns {string} The calculated page height.
   */
  const getPageHeight = () => `calc(${rem(height)} - ${rem(padding * 2)})`;

  return {
    isMobile,
    navbarWidth,
    padding,
    getPageHeight,
    logoHeight,
    isNavbarOpened,
    toggleNavbar: internalToggleNavbar,
  };
}
