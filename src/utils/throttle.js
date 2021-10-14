function throttle(func, delay) {
  let timeout = null;
  // eslint-disable-next-line func-names
  return function (...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        func.call(this, ...args);
        timeout = null;
      }, delay);
    }
  };
}

export default throttle;
