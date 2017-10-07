/* eslint-env mocha */
const { expect } = require('chai');
const onQuit = require('../src/index');

describe('onQuit', () => {
  it('is a function', () => {
    expect(onQuit).to.be.a('function');
  });

  it('accepts one argument', () => {
    expect(onQuit.length).to.be.equal(1);
  });
});
