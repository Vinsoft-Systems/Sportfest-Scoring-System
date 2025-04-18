import { APP_NAME } from '@/constants';
import useSize from '@/hooks/useSize';
import { Group, rem, Text } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';

const imgSrc = `./static/logo.png`;

export default function Logo({ ...props }) {
  const { logoHeight, isNavbarOpened, navbarWidth } = useSize();
  const { width, ref } = useElementSize();

  return (
    <Group align="center" gap="xs" wrap="nowrap" {...props}>
      <img src={imgSrc} height={logoHeight} ref={ref} />
      {isNavbarOpened && (
        <Text
          c="main"
          fw="bold"
          maw={`calc(${rem(navbarWidth)} - ${rem(width)} - var(--mantine-spacing-xs))`}
          truncate="end"
        >
          {APP_NAME}
        </Text>
      )}
    </Group>
  );
}
