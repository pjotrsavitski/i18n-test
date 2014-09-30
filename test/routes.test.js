var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var app = require('../app');

describe('app', function() {
  var agent = request.agent(app);

  it('GET /static', function(done) {
    agent
      .get('/static/stylesheets/style.css')
      .expect('Content-Type', /css/)
      .expect(200, done);
  });

  it('GET index', function(done) {
    agent
      .get('/')
      .end(function(err, res) {
        expect(err).to.not.exist;
        expect(res.status).to.equal(200);
        expect(res.type).to.equal('text/html');
        done();
      });
  });

  describe('change language', function() {
    
    it('GET change language', function(done) {
      agent
        .get('/changelanguage/et')
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res.status).to.equal(302);
          // TODO A better check is needed
          expect(res.header['set-cookie'][0]).to.contain('=et');
          done();
        });
    });
    
    it('GET index with changed language', function(done) {
      agent
        .get('/')
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          // TODO Might use a cookie name instead
          expect(res.req._header).to.match(/Cookie: (.*)=et/);
          done();
        });
    });
  });

  it('GET /users index', function(done) {
    agent
      .get('/users')
      .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          expect(res.type).to.equal('text/plain');
          done();
      });
  });
});

