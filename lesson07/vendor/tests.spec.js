'use strict';

var should = chai.should();

describe('simple test', function () {
  it('should equal 0 when n === 0', function () {
    window.fibonacci(0).should.equal(0);
  });

  it ('should equal 1 when n === 1', function() {
    window.fibonacci(1).should.equal(1);
  });

  it ('should equal 55 when n === 10', function() {
    window.fibonacci(10).should.equal(55);
  });

  it ('should throw error when n > 10', function() {
    (function() {
        window.fibonacci(11);
    }).should.throw('n should <= 10');
  });

  it ('should throw error when n < 0', function() {
    (function() {
        window.fibonacci(-1);
    }).should.throw('n should >= 0');
  });

  it ('should throw error when n isnt number', function() {
    (function() {
        window.fibonacci('haha!');
    }).should.throw('n should be a number');
  });

});