import { useEffect, useRef, useState } from 'react';
import { Player } from 'tone';

export function Audio({
  file,
  play,
  loop,
  volume = -2,
}: {
  file: string;
  play: boolean;
  loop?: boolean;
  volume?: number;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [loaded, setLoaded] = useState(false);
  const player = useRef<Player | null>(null);

  useEffect(() => {
    let _player = player.current;

    if (!_player) {
      player.current = new Player(file, () => {
        setLoaded(true);
      }).toDestination();

      if (volume) {
        player.current.volume.value = volume;
      }
      player.current.loop = true;
      _player = player.current;
    }

    return () => {
      if (_player) {
        _player.stop();
      }
    };
  }, [setLoaded, file, volume]);

  useEffect(() => {
    if (loaded && play && file && player.current) {
      player.current.start();
    }
  }, [loaded, file, play]);

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
