import { PlayerCharacter } from '@/components/PlayerCharacter';
import { Background } from '@/layouts/Background';

export function SplashScreen() {
  return (
    <Background>
      <PlayerCharacter
        name='bulbasaur'
        className='left-14 bottom-5 -rotate-3'
      />

      <PlayerCharacter name='pikachu' className='right-14 bottom-6 rotate-6' />

      <h1 className='w-1/2 text-yellow-400 text-7xl -rotate-3'>
        Car Racing Trivia Game
      </h1>
    </Background>
  );
}
