export function isSame(index: number, answerChoice: string) {
  return answerChoice.charCodeAt(0) - 65 === index;
}

export function createPoller<T>(
  fn: () => Promise<T>,
  callback: (value: T) => void,
  timeout = 1000
) {
  let isCancelled = false;

  function cancel() {
    isCancelled = true;
  }
  function poller(): Promise<void> {
    isCancelled = false;

    return fn()
      .then((value) => {
        callback(value);
      })
      .catch((error) => console.error(error))
      .finally(() => !isCancelled && setTimeout(poller, timeout));
  }

  return {
    poller,
    cancel,
  };
}
