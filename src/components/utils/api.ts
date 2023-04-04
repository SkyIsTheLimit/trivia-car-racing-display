import { createApi } from '@prototypedjs/core';
import { Game } from './types';

const defaultGame: Game = {
  state: 'not-started',
  questionNo: 1,
  menu: {
    title: 'Select Difficulty',
    options: ['Easy', 'Medium', 'Difficult'],
    highlighted: 0,
  },
  rounds: [],
  currentRound: {
    id: 1,
    question: {
      text: 'Who was the ancient Greek goddess of love?',
      choices: ['FooFoo Foo', 'Bar', 'Baz', 'Boo'],
      answer: 'B',
    },
    p1Answer: 'A',
    p2Answer: 'B',
  },
};

const gameApi = createApi<Game>([defaultGame]);
const backendPort = 3000;

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
        ).then((res) => res.json() as unknown as Game);
  }

  return { start, getData };
}
