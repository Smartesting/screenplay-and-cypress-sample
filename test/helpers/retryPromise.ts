type RetryPromiseOptions = {
  retryDelay: number;
  timeout: number;
  makeMessage: (timeout: number) => string;
};

const defaultOptions: RetryPromiseOptions = {
  retryDelay: 15,
  timeout: 200,
  makeMessage: (timeout) => `Timeout after ${timeout}ms`,
};

export async function retryPromise<T>(
  fn: () => Promise<T>,
  options?: Partial<RetryPromiseOptions>
): Promise<T | null> {
  const { retryDelay, timeout, makeMessage } = {
    ...defaultOptions,
    ...options,
  };

  let retry = true;
  const checkStatus = new Promise<T>((resolve) => {
    function checkStatusLoop() {
      if (retry) {
        fn()
          .then((result: T) => {
            retry = false;
            resolve(result);
          })
          .catch(() => {
            setTimeout(checkStatusLoop, retryDelay);
          });
      }
    }

    checkStatusLoop();
  });

  const timeoutError = new Promise<null>((resolve, reject) =>
    setTimeout(() => {
      if (retry) {
        retry = false;
        reject(new Error(makeMessage(timeout)));
      } else {
        resolve(null);
      }
    }, timeout)
  );

  return Promise.race([timeoutError, checkStatus]);
}
