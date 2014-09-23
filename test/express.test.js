var superagent = require('superagent');
var expect = require('expect.js');

var request = superagent;
var address = 'http://localhost:3000';

describe('express app', function() {
  it('get static', function(done) {
    request.get(address+'/static/stylesheets/style.css')
      .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.type).to.equal('text/css');
          done();
      });
  });

  it('get index', function(done) {
    request.get(address+'/')
      .end(function(err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.type).to.equal('text/html');
        done();
      });
  });

  it('get users index', function(done) {
    request.get(address+'/users')
      .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.type).to.equal('text/plain');
          done();
      });
  });
});

