'use strict';

var app = require('../app');

var supertest = require('supertest');

var request = supertest(app);
var should = require('should');

describe('test/app.test.js', () => {
    it('should return 55 when n is 10', (done) => {
        request.get('/fib')
          .query({n: 10})
          .end((err, res) => {
            res.text.should.equal('55');

            done(err);
          });
    });

    var testFib = (n, statusCode, expect, done) => {
        request.get('/fib')
          .query({n: n})
          .expect(statusCode)
          .end(function (err, res) {
            res.text.should.equal(expect);
            done(err);
          });
      };

    it('should return 0 when n === 0',  (done) => {
        testFib(0, 200, '0', done);
    });
    
    it('should equal 1 when n === 1', (done) => {
        testFib(1, 200, '1', done);
    });
    
    it('should equal 55 when n === 10', (done) => {
        testFib(10, 200, '55', done);
    });
    
    it('should throw when n > 10', (done) => {
      testFib(11, 500, 'n should <= 10', done);
    });
    
    it('should throw when n < 0', (done) => {
        testFib(-1, 500, 'n should >= 0', done);
    });
    
    it('should throw when n isnt number', (done) => {
        testFib('good', 500, 'n should be a number', done);
    });

    it('should status 500 when error', (done) => {
        request.get('/fib')
          .query({n: 100})
          .expect(500)
          .end((err, res) =>{
            done(err);
          });
    });
});