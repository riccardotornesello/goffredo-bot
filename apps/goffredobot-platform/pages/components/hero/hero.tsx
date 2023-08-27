import Link from 'next/link';
import { createStyles, rem, Button, Title } from '@mantine/core';
import wave from './assets/wave.svg';
import sound from './assets/sound.svg';

const useStyles = createStyles((theme) => ({
  hero: {
    height: '100vh',
    width: '100%',
  },
  wave: {
    position: 'relative',
    width: '100%',
    height: '30%',
    minHeight: 120,
    opacity: 0.5,
  },
  container: {
    minHeight: '70%',
    position: 'relative',
    paddingInline: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: rem(60),
    fontWeight: 900,
    lineHeight: 1.1,
  },
  sound: {
    width: 120,
  },
}));

export function Hero() {
  const { classes } = useStyles();

  return (
    <div className={classes.hero}>
      <div className={classes.container}>
        <img src={sound.src} className={classes.sound} />
        <Title order={1} mb="40px">
          Goffredo bot
        </Title>
        <Title order={2} mb="40px">
          The Discord bot that introduces you with a musical theme song
        </Title>

        <Link href="/dashboard" passHref legacyBehavior>
          <Button component="a" radius="xs" size="md" w="250px">
            Access the Dashboard
          </Button>
        </Link>
      </div>

      <img src={wave.src} className={classes.wave} />
    </div>
  );
}
