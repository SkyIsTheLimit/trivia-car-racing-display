import { AnswerChoiceButton } from './AnswerChoiceButton';
import { AnswerChoiceButton2 } from './AnswerChoiceButton2';
import { Audio } from './Audio';
import { PlayerCharacter } from './PlayerCharacter';
import { QuestionText } from './QuestionText';
import { useAudio } from './context/audio';
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
  const { isReady } = useAudio();

  return (
    <div className='relative z-10 flex flex-col w-[90%] mx-auto -mt-12 px-12'>
      {isReady && (
        <Audio
          file='/audio/mixkit-christmas-reveal-tones-2988.wav'
          play={true}
        />
      )}

      {isReady && displayCorrectAnswer && (
        <Audio
          file='/audio/mixkit-cartoon-positive-sound-2255.wav'
          play={true}
        />
      )}

      <QuestionText text={value.text} />

      <div className='grid grid-cols-2 grid-rows-2 gap-x-12 gap-y-4'>
        {value.choices.map((choice, index) => (
          <AnswerChoiceButton
            key={index}
            style={{
              fontSize: choice.length <= 16 ? '1.5rem' : '1.0rem',
            }}
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
                  playSound={true}
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
                  playSound={true}
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
