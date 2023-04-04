import { AnswerChoiceButton } from './AnswerChoiceButton';
import { PlayerCharacter } from './PlayerCharacter';
import { QuestionText } from './QuestionText';
import { isSame } from './utils/common';
import { Question } from './utils/types';

export interface QuestionParams {
  value: Question;
  p1Answer?: string;
  p2Answer?: string;
  displayCorrectAnswer?: boolean;
}

export function Question({
  value,
  p1Answer,
  p2Answer,
  displayCorrectAnswer,
}: QuestionParams) {
  return (
    <div className='z-10 flex flex-col w-3/4'>
      <QuestionText text={value.text} />

      <div className='grid grid-cols-2 grid-rows-2 gap-x-16 gap-y-4'>
        {value.choices.map((choice, index) => (
          <AnswerChoiceButton
            key={index}
            option={String.fromCharCode(65 + index)}
            flash={displayCorrectAnswer && isSame(index, value.answer)}
            color={
              displayCorrectAnswer && isSame(index, value.answer)
                ? 'green'
                : displayCorrectAnswer &&
                  !isSame(index, value.answer) &&
                  ((p1Answer && isSame(index, p1Answer)) ||
                    (p2Answer && isSame(index, p2Answer)))
                ? 'red'
                : 'default'
            }
            state={
              (p1Answer && isSame(index, p1Answer)) ||
              (p2Answer && isSame(index, p2Answer))
                ? 'pressed'
                : 'default'
            }
            player1={
              p1Answer &&
              p1Answer.charCodeAt(0) - 65 === index && (
                <PlayerCharacter
                  name='bulbasaur'
                  width={60}
                  className='-bottom-1 -left-6'
                  isShaking={true}
                  style={{
                    transform: 'scaleX(-1)',
                  }}
                />
              )
            }
            player2={
              p2Answer &&
              p2Answer.charCodeAt(0) - 65 === index && (
                <PlayerCharacter
                  name='pikachu'
                  width={50}
                  className='-bottom-1 -right-6'
                  isShaking={true}
                />
              )
            }
          >
            {choice}
          </AnswerChoiceButton>
        ))}
      </div>
    </div>
  );
}
