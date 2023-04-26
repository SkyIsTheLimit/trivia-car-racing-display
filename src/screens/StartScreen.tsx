import { AnswerChoiceButton } from '@/components/AnswerChoiceButton';
import { Audio } from '@/components/Audio';
import { useAudio } from '@/components/context/audio';
import { GameState } from '@/components/utils/types';
import { Background } from '@/layouts/Background';
import { useEffect, useState } from 'react';

export function StartScreen({ game }: { game: GameState }) {
  const [playAudio, setPlayAudio] = useState(false);
  const { isReady } = useAudio();

  useEffect(() => {
    if (game.startMenuOption > 0) {
      setPlayAudio(true);
    }

    setTimeout(() => setPlayAudio(false), 1250);
  }, [game.startMenuOption]);

  return (
    <Background>
      <div className='flex flex-col gap-4'>
        <h1 className='relative mb-2 text-5xl'>Select</h1>

        {isReady && playAudio && (
          <Audio
            volume={0.75}
            play={playAudio}
            file='/audio/mixkit-magic-potion-music-and-fx-2831.wav'
          />
        )}
        <AnswerChoiceButton
          className='w-auto text-center'
          color={game.startMenuOption === 1 ? 'green' : 'default'}
          state={game.startMenuOption === 1 ? 'pressed' : 'default'}
        >
          Start
        </AnswerChoiceButton>
        <AnswerChoiceButton
          className='w-auto text-center'
          color={game.startMenuOption === 2 ? 'green' : 'default'}
          state={game.startMenuOption === 2 ? 'pressed' : 'default'}
        >
          Back
        </AnswerChoiceButton>
      </div>
    </Background>
  );
}
