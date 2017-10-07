/* eslint-env mocha */
const { expect } = require('chai');
const onQuit = require('../src/index');
const events = require('../src/events');
const eventNames = Object.keys(events);
const eventCount = eventNames.length;

describe('onQuit process listeners', () => {
  beforeEach(() => {
    process.removeAllListeners();
    onQuit.reset();
  });

  it('registers a listener for each event', () => {
    // Extra check to be sure process acutally has no listeners.
    expect(process.eventNames().length).to.equal(0);

    onQuit(() => {});

    expect(process.eventNames().length).to.equal(eventCount);
  });

  it('registers listeners for proper events', () => {
    // Extra check to be sure process acutally has no listeners.
    expect(process.eventNames().length).to.equal(0);

    onQuit(() => {});

    expect(process.eventNames().sort().join(',')).to.equal(eventNames.sort().join(','));
  });

  it('multiple onQuit doesn\'t add new listeners', () => {
    // Extra check to be sure process acutally has no listeners.
    expect(process.eventNames().length).to.equal(0);

    onQuit(() => {});
    onQuit(() => {});

    const listenerCount = eventNames.reduce((sum, eventName) => sum + process.listenerCount(eventName), 0);

    expect(listenerCount).to.equal(eventCount);
  });
});
