import { HTMLAttributes, ReactNode } from 'react';
import { AnswerChoiceButton } from './AnswerChoiceButton';

export function AnswerChoiceButton2({
  option,
  color,
  state,
  player1,
  player2,
  flash,
  className,
  children,
  ...others
}: AnswerChoiceButton & HTMLAttributes<HTMLDivElement>) {
  const players = [];

  if (player1) players.push(player1);
  if (player2) players.push(player2);

  return (
    <div
      className={`py-1 text-xl rounded-full border-[0px] relative ${
        flash ? 'animate__animated animate__heartBeat animate__infinite' : ''
      } 
      ${className || ''}`}
      {...others}
    >
      {/* {option && `(${option}) `} */}

      <div className='h-24 text-left'>
        {option && option === 'A' ? (
          <span className='inline-block w-3 h-3 mr-2 bg-red-500 rounded-full'></span>
        ) : option === 'B' ? (
          <span className='inline-block w-3 h-3 mr-2 bg-yellow-500 rounded-full'></span>
        ) : option === 'C' ? (
          <span className='inline-block w-3 h-3 mr-2 bg-green-500 rounded-full'></span>
        ) : (
          <span className='inline-block w-3 h-3 mr-2 bg-blue-500 rounded-full'></span>
        )}

        {children}
      </div>
      {player1}
      {player2}
    </div>
  );
}
