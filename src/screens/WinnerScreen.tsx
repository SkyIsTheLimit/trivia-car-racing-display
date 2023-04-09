import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Background } from '@/layouts/Background';
import { GameState } from '@/components/utils/types';
import { PlayerCharacter } from '@/components/PlayerCharacter';
import { Audio } from '@/components/Audio';
import { useAudio } from '@/components/context/audio';

export function WinnerScreen({ game }: { game: GameState }) {
  const [playPoppers, setPlayPoppers] = useState(false);
  const { isReady } = useAudio();

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
      if (game.winner === 'player-1' || game.winner === 'player-2') {
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

      {isReady && (
        <Audio file='/audio/mixkit-system-break-2942.wav' play={playPoppers} />
      )}

      <h1 className='relative text-5xl text-yellow-300 uppercase -top-24'>
        Winner
      </h1>
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
            width={125}
            className='bottom-5'
          />
          <PlayerCharacter name='bulbasaur' className='left-8 bottom-5' />
        </>
      )}
    </Background>
  );
}
