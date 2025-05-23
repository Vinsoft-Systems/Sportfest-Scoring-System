import { Flex, Text, Image, Title, Tooltip } from '@mantine/core';
import classes from './HeaderLogo.module.css';

import indoexpressLogo from '../../../../public/static/indoexpress.PNG';
import warindoLogo from '../../../../public/static/warindo.webp';
import ppiJermanLogo from '../../../../public/static/ppijerman.png';
import merpatiLogo from '../../../../public/static/merpati.jpg';

export function HeaderLogo() {

  return (
    <header className={classes.header}>
      <Flex justify="space-between" align="center" w="100%" h="100%">
        <Text c="white" ta="center" fw={700} size="lg">
          {'Frada Cup 2025'}
        </Text>

        <Flex gap={'xl'}>
          <Flex align="center" gap="3" direction={'column'}>
            <Title fw={500} order={5} c="white">
              Sponsored By
            </Title>
            <Flex align="center" gap="xs">
              <Tooltip label={'IndoExpress'}>
                <Image h={30} src={indoexpressLogo} alt="IndoExpress" />
              </Tooltip>
              <Tooltip label={'Warindo'}>
                <Image h={30} src={warindoLogo} alt="Warindo" />
              </Tooltip>
            </Flex>
          </Flex>

          <Flex align="center" gap="3" direction={'column'}>
            <Title fw={500} order={5} c="white">
              Supported By
            </Title>
            <Flex align="center" gap="md">
              <Tooltip label={'PPI Jerman'}>
                <Image h={30} src={ppiJermanLogo} alt="PPI Jerman" />
              </Tooltip>
              <Tooltip label={'Merpati E.V.'}>
                <Image h={30} src={merpatiLogo} alt="Merpati" />
              </Tooltip>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </header>
  );
}