import { NAVIGATION_ITEM_SIZE } from '@/constants';
import { Button, Group, Text, ThemeIcon } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './navitem.module.css';

export default function NavItem({ item, activeLink, setActiveLink, ...props }) {
  const navigate = useNavigate();

  return (
    <Button
      maw={props.w}
      py={0}
      pr={0}
      size={NAVIGATION_ITEM_SIZE}
      variant="transparent"
      data-inactive={activeLink !== item.path || undefined}
      onClick={() => {
        setActiveLink(item.path);
        navigate(item.path);
      }}
      fullWidth
      justify="start"
      radius="0"
      className={classes.base}
      classNames={{
        root: classes.buttonRoot,
        inner: classes.buttonInner,
        label: classes.buttonLabel,
      }}
      {...props}
    >
      <Group w="100%" maw="100%" wrap="nowrap">
        {item.Icon && (
          <ThemeIcon
            radius="xl"
            variant={activeLink == item.path ? 'filled' : 'transparent'}
            size="xl"
            c={activeLink == item.path ? 'white' : 'inherit'}
            color={activeLink == item.path ? 'main' : 'gray'}
          >
            <item.Icon style={{ width: '75%', height: '75%' }} />
          </ThemeIcon>
        )}
        <Text style={{ textAlign: 'start' }} fw="bold" w="100%" truncate="end">
          {item.name}
        </Text>
      </Group>
    </Button>
  );
}
