import { Background } from '@/layouts/Background';
import { AnswerChoiceButton } from '../components/AnswerChoiceButton';
import { GameState } from '../components/utils/types';

export function MenuScreen({ game }: { game: GameState }) {
  return (
    <Background>
      <div className='flex flex-col gap-4'>
        <h1 className='relative mb-2 text-5xl'>Select Difficulty</h1>

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
              option=''
            >
              {option}
            </AnswerChoiceButton>
          ))}
      </div>
    </Background>
  );
}
