const events = require('./events');
const callOnce = require('./callOnce');

/* Array of functions to be called when application terminates. */
const callbacks = [];

/* Calls every registered callback, then exits the application. */
const execute = callOnce((code, codename, ...args) => {
  callbacks.forEach((callback) => callback(code, codename, ...args));

  /* Attached listener prevents termination - need to exit again. Only first process.exit triggers events. */
  process.exit(code);

  /* If a process is spawned by a parent, we need to properly pass the signal.
   * Right now this is disabled until I can test the best option */
  // process.kill(process.pid, signal);
});

/* Add event listeners for known process events that lead to termination. */
const install = callOnce(() => {
  Object.keys(events).forEach((codename) => {
    process.on(codename, (...args) => execute(events[codename], codename, ...args));
  });
});

module.exports = function onQuit(callback) {
  install();
  callbacks.push(callback);
};

/* Additional method to allow tests. */
module.exports.reset = function reset() {
  execute.reset();
  install.reset();
};
