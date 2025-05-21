import { APP_NAME } from '@/constants';
import useSize from '@/hooks/useSize';
import { Group, rem, Text, Tooltip } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';

const imgSrc = `./static/logo.jpeg`;

export default function Logo({ ...props }) {
  const { logoHeight, isNavbarOpened, navbarWidth } = useSize();
  const { width, ref } = useElementSize();

  return (
    <Group align="center" gap="xs" wrap="nowrap" {...props}>
      <Tooltip label={APP_NAME}>
        <img src={imgSrc} height={logoHeight} ref={ref} alt={APP_NAME} />
      </Tooltip>
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
