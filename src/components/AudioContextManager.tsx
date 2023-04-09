import { useEffect, useRef, useState } from 'react';
import { MutedIcon, UnmutedIcon } from './icons';
import { useAudio } from './context/audio';

export function AudioContextManager() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isReady, setIsPlaying] = useState(false);
  const { setIsReady } = useAudio();

  function toggleAudio() {
    setIsPlaying((isPlaying) => !isPlaying);
  }

  useEffect(() => {
    setIsReady(isReady);
  }, [isReady, setIsReady]);

  return (
    <div className='absolute z-10 right-9 top-8'>
      {isReady && (
        <button
          className='flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-500/50'
          onClick={toggleAudio}
        >
          <UnmutedIcon />
        </button>
      )}

      {!isReady && (
        <button
          className='flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-500/50'
          onClick={toggleAudio}
        >
          <MutedIcon />
        </button>
      )}
    </div>
  );
}
