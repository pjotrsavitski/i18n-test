var superagent = require('superagent');
var expect = require('expect.js');

var request = superagent;

describe('express app', function() {
  it('get index', function(done) {
    request.get('http://localhost:3000/')
      .end(function(err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.type).to.equal('text/html');
        done();
      });
  });

  it('get users index', function(done) {
    request.get('http://localhost:3000/users')
      .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.type).to.equal('text/plain');
          done();
      });
  });
});

