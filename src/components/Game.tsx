import { useEffect, useState } from 'react';
import { PlayerCharacter } from './PlayerCharacter';
import { Question } from './Question';
import { Game } from './utils/types';

export function GamePlay({ game }: { game: Game }) {
  const [displayCorrectAnswer, setDisplayCorrectAnswer] = useState(false);

  useEffect(() => {
    if (game.currentRound?.p1Answer && game.currentRound.p2Answer) {
      setTimeout(() => setDisplayCorrectAnswer(true), 2000);
    }
  }, [game.currentRound?.p1Answer, game.currentRound?.p2Answer]);

  useEffect(() => {
    setDisplayCorrectAnswer(false);
  }, [game.currentRound?.question.text]);

  return (
    <>
      <div
        className='absolute top-0 left-0 z-0 w-full h-full rounded-[2rem]'
        style={{
          background: `linear-gradient(113.56deg, #86198F 18.8%, #312E81 72.94%)`,
        }}
      ></div>
      <div className='absolute w-[97vw] rounded-[2rem] h-[95vh] m-4 border-indigo-600 border-[1rem] bg-indigo-900/25 z-0'></div>

      <div
        style={{
          position: 'absolute',
          width: '30vw',
          height: '30vw',
          borderRadius: '100%',
          left: '60%',
          top: '20%',

          background: 'rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(8px)',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          width: '20vw',
          height: '20vw',
          borderRadius: '100%',
          left: '22%',
          top: '35%',

          background: 'rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(8px)',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          width: '23vw',
          height: '23vw',
          borderRadius: '100%',
          left: '8%',
          top: '5%',

          background: 'rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(8px)',
        }}
      ></div>

      {game.currentRound && (
        <Question
          value={game.currentRound.question}
          p1Answer={game.currentRound.p1Answer}
          p2Answer={game.currentRound.p2Answer}
          displayCorrectAnswer={displayCorrectAnswer}
        />
      )}

      {game.currentRound && !game.currentRound.p1Answer && (
        <PlayerCharacter
          name='bulbasaur'
          className='left-12 bottom-5 -rotate-3'
        />
      )}

      {game.currentRound && !game.currentRound.p2Answer && (
        <PlayerCharacter
          name='pikachu'
          className='right-12 bottom-6 rotate-6'
        />
      )}
    </>
  );
}
