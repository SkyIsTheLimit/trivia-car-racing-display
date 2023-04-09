import { useEffect, useRef } from 'react';

export function Audio({
  file,
  play,
  loop,
  volume = 1,
}: {
  file: string;
  play: boolean;
  loop?: boolean;
  volume?: number;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const _audioRef = audioRef;

    if (_audioRef.current) {
      if (play) {
        if (volume) {
          _audioRef.current.volume = volume;
        }
        _audioRef.current.play();
      } else {
        _audioRef.current.pause();
      }
    }

    return () => {
      if (_audioRef.current && loop) {
        _audioRef.current.pause();
      }
    };
  }, [play, volume, loop]);

  return (
    <>
      {play && (
        <audio ref={audioRef} loop={loop}>
          <source src={file} type='audio/wav' />
        </audio>
      )}
    </>
  );
}
