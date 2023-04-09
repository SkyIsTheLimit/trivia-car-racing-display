import { createApi } from '@prototypedjs/core';
import { GameState } from './types';

const defaultGame: GameState = {
  state: 'pre-game',
  menu: {
    options: ['Easy', 'Medium', 'Difficult'],
    selectedIndex: 0,
  },
  currentRound: {
    questionIndex: 0,
    status: 'pre-question',
    question: {
      text: 'Who was the ancient Greek goddess of love?',
      choices: ['FooFoo Foo', 'Bar', 'Baz', 'Boo'],
      answer: 'B',
    },
    p1Answer: 'A',
    p2Answer: 'B',
  },
  menuScreen: 'splash-screen',
  lapCounts: {
    player1: 0,
    player2: 0,
  },
  difficulty: 'easy',
  winner: 'no-winner',
};

const gameApi = createApi<GameState>([defaultGame]);
const backendPort = 10000;

export function api(devMode = false) {
  function start() {
    return devMode
      ? Promise.resolve()
      : fetch(
          `${location.origin.substring(
            0,
            location.origin.lastIndexOf(':')
          )}:${backendPort}/start`
        );
  }

  function getData() {
    return devMode
      ? gameApi.all().then((games) => games[0])
      : fetch(
          `${location.origin.substring(
            0,
            location.origin.lastIndexOf(':')
          )}:${backendPort}/game`
        ).then((res) => res.json() as unknown as GameState);
  }

  return { start, getData };
}
