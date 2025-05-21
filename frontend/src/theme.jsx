import { createTheme } from '@mantine/core';

const theme = createTheme({
  fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
  primaryColor: 'main',
  colors: {
    main: [
      ' #e6edf5', // 0
      ' #ccd9e8',
      ' #9ab3d1', // 2
      ' #658dbb',
      ' #3f71a8', // 4
      ' #25599a',
      ' #003366', // 6 Navy blue (secondary color)
      ' #002c57',
      ' #002447', // 8
      ' #001b38',
    ],
    gray: [
      '#f8f9fa', // 0 - Lightest gray
      '#f1f3f5',
      '#e9ecef', // 2
      '#dee2e6',
      '#ced4da', // 4
      '#adb5bd',
      '#6c757d', // 6 - Medium gray (primary shade)
      '#495057',
      '#343a40', // 8
      '#212529', // 9 - Darkest gray
    ],
  },
});

export default theme;
