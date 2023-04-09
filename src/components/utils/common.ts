export function isSame(index: number, answerChoice: string) {
  return answerChoice.charCodeAt(0) - 65 === index;
}

export function createPoller<T>(
  fn: () => Promise<T>,
  callback: (value: T) => void,
  timeout = 500
) {
  return function poller() {
    fn()
      .then((value) => {
        callback(value);
      })
      .catch((error) => console.error(error))
      .finally(() => setTimeout(poller, timeout));
  };
}
