/* eslint-env mocha */
/* eslint line-comment-position: 0 */
/* eslint no-inline-comments: 0 */
const chai = require('chai');
const spies = require('chai-spies');
const onQuit = require('../src/index');

chai.use(spies);

const { expect, spy } = chai;

describe('onQuit with sigint', () => {
  const originalExit = process.exit;

  beforeEach(() => {
    process.removeAllListeners();
    onQuit.reset();
    process.exit = () => process.emit('exit');
  });

  afterEach(() => {
    process.exit = originalExit;
  });

  it('executes callback when process emits sigint', () => {
    const callback = spy(() => {});

    onQuit(callback);

    process.emit('SIGINT');
    expect(callback).to.be.called();
  });

  it('calls process.exit', () => {
    const exitSpy = spy(() => {});
    const callback = spy(() => {});

    process.exit = exitSpy;

    onQuit(callback);

    process.emit('SIGINT');
    expect(callback).to.be.called();
    expect(exitSpy).to.be.called();
  });

  it('with SIGBREAK executes callback only once', () => {
    const callback = spy(() => {});

    onQuit(callback);

    process.emit('SIGINT');
    process.emit('SIGBREAK');
    expect(callback).to.be.called(1);
  });
});
