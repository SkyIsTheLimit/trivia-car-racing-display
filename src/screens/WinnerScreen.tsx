import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Background } from '@/layouts/Background';
import { GameState } from '@/components/utils/types';
import { PlayerCharacter } from '@/components/PlayerCharacter';

export function WinnerScreen({ game }: { game: GameState }) {
  useEffect(() => {
    var count = 200;
    var defaults = {
      origin: { y: 1 },
    };

    function fire(particleRatio: number, opts: any) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    if (game.winner === 'player-1' || game.winner === 'player-2') {
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
  }, [game.winner]);

  return (
    <Background>
      <h1 className='relative text-5xl text-yellow-300 uppercase -top-24'>
        Winner
      </h1>
      {game.winner === 'player-1' && (
        <>
          <PlayerCharacter
            isShaking={true}
            name='bulbasaur'
            width={200}
            className='bottom-6'
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