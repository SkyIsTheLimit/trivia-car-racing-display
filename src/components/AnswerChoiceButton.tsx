import { HTMLAttributes, ReactNode } from 'react';

export interface AnswerChoiceButton {
  option?: string;
  color?: 'default' | 'green' | 'red';
  state?: 'default' | 'pressed';
  player1?: ReactNode;
  player2?: ReactNode;
  flash?: boolean;
}

export function AnswerChoiceButton({
  option,
  color,
  state,
  player1,
  player2,
  flash,
  className,
  children,
  style,
  ...others
}: AnswerChoiceButton & HTMLAttributes<HTMLDivElement>) {
  const players = [];

  if (player1) players.push(player1);
  if (player2) players.push(player2);

  return (
    <div
      className={`px-6 py-1 rounded-full border-[4px] relative ${
        flash ? 'animate__animated animate__heartBeat animate__infinite' : ''
      } 
      ${
        (color || 'default') === 'default'
          ? 'bg-fuchsia-700'
          : color === 'green'
          ? 'bg-green-700'
          : 'bg-red-700'
      } 
      
      ${className || ''}`}
      style={{
        borderColor:
          (color || 'default') === 'default'
            ? '#D946EF'
            : (color || 'default') === 'green'
            ? '#22C55E'
            : '#ef4444',
        boxShadow:
          (state || 'default') === 'default'
            ? `inset 16px 16px 16px rgba(200, 200, 200, 0.2), inset -16px -8px 16px rgba(0, 0, 0, 0.25)`
            : `inset -16px -16px 16px rgba(200, 200, 200, 0.2), inset 16px 8px 16px rgba(0, 0, 0, 0.25)`,
        lineHeight: '2rem',
        ...style,
      }}
      {...others}
    >
      {option && `(${option}) `}

      {children}
      {player1}
      {player2}
    </div>
  );
}
