import Image from 'next/image';
import { HTMLAttributes } from 'react';
import { Audio } from './Audio';
import { useAudio } from './context/audio';

export interface PlayerCharacter {
  name: string;
  isShaking?: boolean;
  width?: number;
  playSound?: boolean;
}

export function PlayerCharacter({
  name,
  isShaking,
  width,
  playSound,
  className,
}: PlayerCharacter & HTMLAttributes<HTMLElement>) {
  const { isReady } = useAudio();

  return (
    <>
      {isReady && playSound && (
        <Audio
          file='/audio/mixkit-arcade-score-interface-217.wav'
          play={true}
        />
      )}
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
    </>
  );
}
