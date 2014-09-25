var superagent = require('superagent');
var expect = require('expect.js');

var address = 'http://localhost:3000';

describe('app', function() {
  // This way cookies and sessions are used
  var agent = superagent.agent();

  it('GET /static', function(done) {
    agent.get(address+'/static/stylesheets/style.css')
      .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.type).to.equal('text/css');
          done();
      });
  });

  it('GET index', function(done) {
    agent.get(address+'/')
      .end(function(err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.type).to.equal('text/html');
        done();
      });
  });

  it('GET change language', function(done) {
    agent.get(address+'/changelanguage/et')
      .end(function(err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.text).to.contain('Tere portaali');
        done();
      });
  });

  it('GET /users index', function(done) {
    agent.get(address+'/users')
      .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.type).to.equal('text/plain');
          done();
      });
  });
});

