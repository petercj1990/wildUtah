'use strict';

var app = require('../..');
import request from 'supertest';

var newLivesIn;

describe('LivesIn API:', function() {

  describe('GET /api/livesIns', function() {
    var livesIns;

    beforeEach(function(done) {
      request(app)
        .get('/api/livesIns')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          livesIns = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      livesIns.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/livesIns', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/livesIns')
        .send({
          name: 'New LivesIn',
          info: 'This is the brand new livesIn!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newLivesIn = res.body;
          done();
        });
    });

    it('should respond with the newly created livesIn', function() {
      newLivesIn.name.should.equal('New LivesIn');
      newLivesIn.info.should.equal('This is the brand new livesIn!!!');
    });

  });

  describe('GET /api/livesIns/:id', function() {
    var livesIn;

    beforeEach(function(done) {
      request(app)
        .get('/api/livesIns/' + newLivesIn._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          livesIn = res.body;
          done();
        });
    });

    afterEach(function() {
      livesIn = {};
    });

    it('should respond with the requested livesIn', function() {
      livesIn.name.should.equal('New LivesIn');
      livesIn.info.should.equal('This is the brand new livesIn!!!');
    });

  });

  describe('PUT /api/livesIns/:id', function() {
    var updatedLivesIn;

    beforeEach(function(done) {
      request(app)
        .put('/api/livesIns/' + newLivesIn._id)
        .send({
          name: 'Updated LivesIn',
          info: 'This is the updated livesIn!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedLivesIn = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLivesIn = {};
    });

    it('should respond with the updated livesIn', function() {
      updatedLivesIn.name.should.equal('Updated LivesIn');
      updatedLivesIn.info.should.equal('This is the updated livesIn!!!');
    });

  });

  describe('DELETE /api/livesIns/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/livesIns/' + newLivesIn._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when livesIn does not exist', function(done) {
      request(app)
        .delete('/api/livesIns/' + newLivesIn._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
