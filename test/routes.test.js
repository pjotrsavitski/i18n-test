var superagent = require('superagent');
var expect = require('expect.js');

var address = 'http://localhost:3000';

describe('express app', function() {
  // This way cookies and sessions are used
  var agent = superagent.agent();

  it('get static', function(done) {
    agent.get(address+'/static/stylesheets/style.css')
      .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.type).to.equal('text/css');
          done();
      });
  });

  it('get index', function(done) {
    agent.get(address+'/')
      .end(function(err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.type).to.equal('text/html');
        done();
      });
  });

  it('change language', function(done) {
    agent.get(address+'/changelanguage/et')
      .end(function(err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.text).to.contain('Tere portaali');
        done();
      });
  });

  it('get users index', function(done) {
    agent.get(address+'/users')
      .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.type).to.equal('text/plain');
          done();
      });
  });
});

