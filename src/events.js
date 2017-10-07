/* Dictionary of events that the module listens.
 * - key is the name of the event.
 * - value is the code number that is sent to process.exit(). */
module.exports = {
  /* Process is about to exit normally. */
  exit: null,

  /* Node.js empties its event loop and has nothing else to schedule. */
  beforeExit: null,

  /* Unhandled error will cause application to terminate. */
  uncaughtException: -1,

  /* signal(7) events:
   * https://nodejs.org/api/process.html#process_signal_events
   * http://man7.org/linux/man-pages/man7/signal.7.html
   */

  /* Windows: when the console window is closed. Unconditionally terminates the application about 5 seconds later. */
  /* Other: various conditions. Default behaviour removed when a listener is attached. */
  SIGHUP: 1,

  /* CTRL + C. Not generated when terminal raw mode is enabled. */
  SIGINT: 2,

  /* Quit from keyboard */
  SIGQUIT: 3,

  /* Illegal Instruction*/
  SIGILL: 4,

  /* Abort signal from abort(3) */
  SIGABRT: 6,

  /* Bus error (bad memory access) */
  SIGBUS: 7,

  /* Floating-point exception */
  SIGFPE: 8,

  /* Can not have listener installed. */
  // SIGKILL: 9,

  /* Invalid memory reference */
  SIGSEGV: 11,

  /*  Bad system call */
  SIGSYS: 12,

  /* Not supported on Windows but it can be listened for. */
  SIGTERM: 15,

  /* Node.js starting debugger. */
  SIGUSR1: 16,

  /* Can not have listener installed. */
  // SIGSTOP: 17,

  /* CTRL + BREAK pressed. Windows only. There is no way to send or generate it. */
  SIGBREAK: null

};
