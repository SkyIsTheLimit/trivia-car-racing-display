import Image from 'next/image';
import { HTMLAttributes } from 'react';

export interface PlayerCharacter {
  name: string;
  isShaking?: boolean;
  width?: number;
}

export function PlayerCharacter({
  name,
  isShaking,
  width,
  className,
}: PlayerCharacter & HTMLAttributes<HTMLElement>) {
  return (
    <Image
      className={`absolute z-10
      ${className || ''}
        ${
          isShaking
            ? 'animate__animated animate__shakeY animate__infinite animate__slow'
            : ''
        }
      `}
      src={`/images/${name}.png`}
      alt={name}
      width={width || 100}
      height={0}
    />
  );
}
