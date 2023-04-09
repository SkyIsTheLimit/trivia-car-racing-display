import { HTMLAttributes, createContext, useContext, useState } from 'react';

export interface AudioContext {
  isReady?: boolean;

  setIsReady: (isReady: boolean) => void;
}

export const AudioContext = createContext<AudioContext>({
  isReady: false,
  setIsReady(_) {},
});

export function AudioProvider({ children }: HTMLAttributes<HTMLElement>) {
  const [isAudioReady, setIsReady] = useState(false);

  return (
    <AudioContext.Provider value={{ isReady: isAudioReady, setIsReady }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
