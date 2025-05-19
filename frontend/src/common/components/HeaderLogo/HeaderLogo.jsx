import { Flex, Text, Image, Title, Loader } from '@mantine/core';
import { useState, useEffect } from 'react';
import classes from './HeaderLogo.module.css';

import indoexpressLogo from '../../assets/indoexpress.PNG';
import warindoLogo from '../../assets/warindo.webp';
import ppiJermanLogo from '../../assets/ppijerman.png';
import merpatiLogo from '../../assets/merpati.jpg';

export function HeaderLogo() {
  const [competitionName, setCompetitionName] = useState("Sportfest 2025");
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
        <Flex align="center" gap="3" direction={'column'}>
          <Text fw={500} size="10px" c="white">Sponsored By:</Text>
          <Flex align="center" gap="xs">
            <Image h={30} src={indoexpressLogo} alt="IndoExpress" />
            <Image h={30} src={warindoLogo} alt="Warindo" />
          </Flex>
        </Flex>

        {loading ? (
          <Loader color="white" size="sm" />
        ) : (
          <Text c="white"
                ta="center"
                fw={700}
                size='lg'
                >{competitionName}</Text>
        )}

        <Flex align="center" gap="3" direction={'column'}>
          <Text fw={500} size="10px" c="white">Supported By:</Text>
          <Flex align="center" gap="xs">
            <Image h={30} src={ppiJermanLogo} alt="PPI Jerman" />
            <Image h={30} src={merpatiLogo} alt="Merpati" />
          </Flex>
        </Flex>
      </Flex>
    </header>
  );
}