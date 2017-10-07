/**
 * Makes function callable only once during the runtime.
 * @param  {Function} fn Function to be called only once.
 * @return {Function}    Wrapped function.
 */
module.exports = function callOnce(fn) {
  let called = false;

  function wrapper(...args) {
    if (!called) {
      called = true;
      fn(...args);
    }
  }

  wrapper.reset = function reset() {
    called = false;
  };

  return wrapper;
};
