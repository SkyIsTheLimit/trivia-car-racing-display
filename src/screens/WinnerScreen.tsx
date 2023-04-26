import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Background } from '@/layouts/Background';
import { GameState } from '@/components/utils/types';
import { PlayerCharacter } from '@/components/PlayerCharacter';
import { Audio } from '@/components/Audio';
import { useAudio } from '@/components/context/audio';
import { AnswerChoiceButton } from '@/components/AnswerChoiceButton';
import { Press_Start_2P } from 'next/font/google';

const font = Press_Start_2P({ weight: '400', subsets: ['latin'] });

export function WinnerScreen({ game }: { game: GameState }) {
  const [playAudio, setPlayAudio] = useState(false);
  const [playPoppers, setPlayPoppers] = useState(false);
  const { isReady } = useAudio();

  useEffect(() => {
    if (game.endMenuOption > 0) {
      setPlayAudio(true);
    }

    setTimeout(() => setPlayAudio(false), 1250);
  }, [game.endMenuOption]);

  useEffect(() => {
    const count = 100;
    const defaults = {
      origin: { y: 1 },
    };
    let isCelebrating = true;

    function fire(particleRatio: number, opts: any) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    function celebrate() {
      if (
        game.winner === 'player-1' ||
        game.winner === 'player-2' ||
        game.winner === 'tie'
      ) {
        setPlayPoppers(true);
        setTimeout(() => setPlayPoppers(false), 1500);
        fire(0.25, {
          spread: 26,
          startVelocity: 55,
        });
        fire(0.2, {
          spread: 60,
        });
        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        });
      }

      if (isCelebrating) {
        setTimeout(celebrate, 2000);
      }
    }

    celebrate();

    return () => {
      isCelebrating = false;
    };
  }, [game.winner]);

  return (
    <Background>
      {isReady && (
        <Audio
          file='/audio/mixkit-animated-small-group-applause-523.wav'
          play={true}
        />
      )}

      {isReady && playAudio && (
        <Audio
          volume={0.75}
          play={playAudio}
          file='/audio/mixkit-magic-potion-music-and-fx-2831.wav'
        />
      )}

      {isReady && (
        <Audio file='/audio/mixkit-system-break-2942.wav' play={playPoppers} />
      )}

      <div className='relative flex flex-col gap-4 -top-20'>
        {(game.winner === 'player-1' || game.winner === 'player-2') && (
          <div className='flex flex-col gap-2'>
            <h1 className='text-5xl uppercase'>Winner</h1>
            <h1 className={`text-3xl text-yellow-300 ${font.className}`}>
              {`${game.lapCounts.player1}`.padStart(2, '0')} -{' '}
              {`${game.lapCounts.player2}`.padStart(2, '0')}
            </h1>
          </div>
        )}
        {game.winner === 'tie' && (
          <div className='flex flex-col gap-2'>
            <h1 className='text-5xl uppercase'>It{"'"}s a tie</h1>
            <h1 className={`text-3xl text-yellow-300 ${font.className}`}>
              {`${game.lapCounts.player1}`.padStart(2, '0')} -{' '}
              {`${game.lapCounts.player2}`.padStart(2, '0')}
            </h1>
          </div>
        )}
        {game.winner === 'no-winner' && (
          <h1 className='text-2xl text-yellow-300'>
            There were no winners this time.
          </h1>
        )}
        <AnswerChoiceButton
          className='w-auto text-center'
          color={game.endMenuOption === 1 ? 'green' : 'default'}
          state={game.endMenuOption === 1 ? 'pressed' : 'default'}
        >
          Restart
        </AnswerChoiceButton>
      </div>
      <h2>
        ({game.lapCounts.player1} - {game.lapCounts.player2})
      </h2>
      {game.winner === 'player-1' && (
        <>
          <PlayerCharacter
            isShaking={true}
            name='bulbasaur'
            width={175}
            className='z-[200] bottom-6'
          />
          <PlayerCharacter name='pikachu' className='right-8 bottom-5' />
        </>
      )}

      {game.winner === 'player-2' && (
        <>
          <PlayerCharacter
            isShaking={true}
            name='pikachu'
            width={175}
            className='bottom-5'
          />
          <PlayerCharacter name='bulbasaur' className='left-8 bottom-5' />
        </>
      )}

      {game.winner === 'tie' && (
        <>
          <PlayerCharacter
            isShaking={true}
            name='pikachu'
            width={175}
            className='bottom-5 right-56'
          />
          <PlayerCharacter
            isShaking={true}
            name='bulbasaur'
            width={175}
            className='bottom-5 left-56'
          />
        </>
      )}
    </Background>
  );
}
