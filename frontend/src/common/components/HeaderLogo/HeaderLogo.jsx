import {Flex, Text, Image, Loader, Title, Tooltip} from '@mantine/core';
import { useState, useEffect } from 'react';
import classes from './HeaderLogo.module.css';

import indoexpressLogo from '../../assets/indoexpress.PNG';
import warindoLogo from '../../assets/warindo.webp';
import ppiJermanLogo from '../../assets/ppijerman.png';
import merpatiLogo from '../../assets/merpati.jpg';

export function HeaderLogo() {
  const [competitionName, setCompetitionName] = useState("Frada Cup 2025");
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/competition/`)
      .then(response => response.json())
      .then(data => {
        if (data && data.result && data.result.length > 0) {
          setCompetitionName(data.result[0].name);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching competition name:", err);
        setLoading(false);
      });
  }, []);

  return (
    <header className={classes.header}>
      <Flex justify="space-between" align="center" w="100%" h="100%">
        {loading ? (
          <Loader color="white" size="sm" />
        ) : (
          <Text c="white"
                ta="center"
                fw={700}
                size='lg'
                >{competitionName}</Text>
        )}
        <Flex gap={"xl"}>
          <Flex align="center" gap="3" direction={'column'}>
            <Title fw={500} order={5} c="white">Sponsored By</Title>
            <Flex align="center" gap="xs">
              <Tooltip label={"IndoExpress"}>
                <Image h={30} src={indoexpressLogo} alt="IndoExpress" />
              </Tooltip>
              <Tooltip label={"Warindo"}>
                <Image h={30} src={warindoLogo} alt="Warindo" />
              </Tooltip>
            </Flex>
          </Flex>

          <Flex align="center" gap="3" direction={'column'}>
            <Title fw={500} order={5} c="white">Supported By</Title>
            <Flex align="center" gap="md">
              <Tooltip label={"PPI Jerman"}>
                <Image h={30} src={ppiJermanLogo} alt="PPI Jerman" />
              </Tooltip>
              <Tooltip label={"Merpati E.V."}>
                <Image h={30} src={merpatiLogo} alt="Merpati" />
              </Tooltip>

            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </header>
  );
}