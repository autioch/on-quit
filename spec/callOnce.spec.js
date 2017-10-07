/* eslint-env mocha */
const chai = require('chai');
const spies = require('chai-spies');
const callOnce = require('../src/callOnce');

chai.use(spies);

const { expect, spy } = chai;

describe('callOnce', () => {
  it('is a function', () => {
    expect(callOnce).to.be.a('function');
  });

  it('accepts one argument', () => {
    expect(callOnce.length).to.equal(1);
  });

  it('returns a function', () => {
    expect(callOnce(() => {})).to.be.a('function');
  });
});

describe('callOnce argument', () => {
  it('should be called once', () => {
    const testMethodSpy = spy(() => {});
    const callOnceTestMethod = callOnce(testMethodSpy);

    callOnceTestMethod();
    callOnceTestMethod();

    expect(testMethodSpy).to.be.called(1);
  });
});
