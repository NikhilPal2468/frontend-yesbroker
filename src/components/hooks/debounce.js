const debounce = (func, wait = 0, options = {}) => {
  let timeoutId;
  let lastArgs;
  let lastThis;
  let result;
  let lastCallTime = 0;

  const { leading = false, trailing = true, maxWait } = options;

  const invokeFunc = (time) => {
    const elapsed = time - lastCallTime;
    if (
      (leading || elapsed >= wait) &&
      (maxWait === undefined || elapsed <= maxWait)
    ) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCallTime = time;
      result = func.apply(lastThis, lastArgs);
    }
  };

  const debounced = function (...args) {
    const time = Date.now();
    lastArgs = args;
    lastThis = this;

    if (!timeoutId && leading) {
      lastCallTime = time;
      result = func.apply(lastThis, lastArgs);
    }

    clearTimeout(timeoutId);

    if (maxWait !== undefined) {
      timeoutId = setTimeout(() => invokeFunc(time), maxWait);
    } else if (trailing || wait) {
      timeoutId = setTimeout(() => invokeFunc(time), wait);
    }

    return result;
  };

  debounced.cancel = function () {
    clearTimeout(timeoutId);
    timeoutId = null;
  };

  debounced.flush = function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
      invokeFunc(Date.now());
    }
  };

  return debounced;
};

export default debounce;
