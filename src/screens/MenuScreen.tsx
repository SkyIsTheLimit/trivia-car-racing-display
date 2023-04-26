import { Background } from '@/layouts/Background';
import { AnswerChoiceButton } from '../components/AnswerChoiceButton';
import { GameState } from '../components/utils/types';
import { useEffect, useState } from 'react';
import { Audio } from '@/components/Audio';
import { useAudio } from '@/components/context/audio';

export function MenuScreen({ game }: { game: GameState }) {
  const [playAudio, setPlayAudio] = useState(false);
  const { isReady } = useAudio();

  useEffect(() => {
    if (game.menu.selectedIndex > 0) {
      setPlayAudio(true);
    }

    setTimeout(() => setPlayAudio(false), 1250);
  }, [game.menu.selectedIndex]);

  return (
    <Background>
      <div className='flex flex-col gap-4'>
        <h1 className='relative mb-2 text-5xl'>Select Difficulty</h1>

        {isReady && playAudio && (
          <Audio
            volume={0.75}
            play={playAudio}
            file='/audio/mixkit-magic-potion-music-and-fx-2831.wav'
          />
        )}

        {game?.menu?.options &&
          game.menu.options.map((option, index) => (
            <AnswerChoiceButton
              className='w-auto text-center'
              key={index}
              color={
                index === game.menu.selectedIndex - 1 ? 'green' : 'default'
              }
              state={
                index === game.menu.selectedIndex - 1 ? 'pressed' : 'default'
              }
            >
              {option}
            </AnswerChoiceButton>
          ))}
      </div>
    </Background>
  );
}
