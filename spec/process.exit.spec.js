/* eslint-env mocha */
const chai = require('chai');
const spies = require('chai-spies');
const onQuit = require('../src/index');

chai.use(spies);

const { expect, spy } = chai;

describe('onQuit with process.exit', () => {
  const originalExit = process.exit;

  beforeEach(() => {
    process.removeAllListeners();
    onQuit.reset();
    process.exit = () => process.emit('exit');
  });

  afterEach(() => {
    process.exit = originalExit;
  });

  it('executes callback when application exits', () => {
    const callbackSpy = spy();

    onQuit(callbackSpy);

    process.exit();
    expect(callbackSpy).to.be.called();
  });

  it('executes every callback when application exits', () => {
    const callback = spy(() => {});
    const callback2 = spy(() => {});

    onQuit(callback);
    onQuit(callback2);

    process.exit();
    expect(callback).to.be.called();
    expect(callback2).to.be.called();
  });

  it('executes callback only once', () => {
    const callback = spy(() => {});

    onQuit(callback);

    process.exit();
    process.exit();
    expect(callback).to.be.called(1);
  });
});
