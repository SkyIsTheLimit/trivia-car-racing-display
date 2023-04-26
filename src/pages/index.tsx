import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Concert_One } from 'next/font/google';
import { api } from '@/components/utils/api';
import { createPoller } from '@/components/utils/common';
import { GameState } from '@/components/utils/types';
import { MenuScreen } from '@/screens/MenuScreen';
import { SplashScreen } from '@/screens/SplashScreen';
import { InGameScreen } from '@/screens/InGameScreen';
import { WinnerScreen } from '@/screens/WinnerScreen';
import { AudioContextManager } from '@/components/AudioContextManager';
import { useAudio } from '@/components/context/audio';
import { Audio } from '@/components/Audio';
import { StartScreen } from '@/screens/StartScreen';

const font = Concert_One({ weight: '400', subsets: ['latin'] });

export default function Home() {
  const [game, setGame] = useState<GameState>({
    state: 'pre-game',
    menuScreen: 'splash-screen',
    lapCounts: {
      player1: 0,
      player2: 0,
    },
    difficulty: 'easy',
    menu: {
      selectedIndex: 0,
      options: [],
    },
    winner: 'no-winner',
    startMenuOption: 0,
    endMenuOption: 0,
  });
  const { isReady } = useAudio();
  const { start, getData } = api();

  useEffect(() => {
    const { poller, cancel } = createPoller(() => getData(), setGame);

    start().then(poller);

    return () => cancel();
  }, []);

  return (
    <>
      <Head>
        <title>Trivia Racing Game</title>
        <meta name='description' content='App for ID3510' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main
        className={`relative w-[100vw] h-[100vh] flex items-center justify-center ${font.className}`}
      >
        <AudioContextManager />

        {isReady && (
          <Audio file='/audio/kids-morning-full.wav' play={true} volume={0.3} />
        )}

        {game &&
          game.state === 'pre-game' &&
          game.menuScreen === 'splash-screen' && <SplashScreen />}
        {game &&
          game.state === 'pre-game' &&
          game.menuScreen === 'difficulty-screen' && <MenuScreen game={game} />}

        {game &&
          game.state === 'pre-game' &&
          game.menuScreen === 'start-screen' &&
          game.difficulty && <StartScreen game={game} />}

        {game && game.state === 'in-game' && <InGameScreen game={game} />}

        {game && game.state === 'post-game' && <WinnerScreen game={game} />}
      </main>
    </>
  );
}
