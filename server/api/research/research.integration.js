'use strict';

var app = require('../..');
import request from 'supertest';

var newResearch;

describe('Research API:', function() {

  describe('GET /api/researchs', function() {
    var researchs;

    beforeEach(function(done) {
      request(app)
        .get('/api/researchs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          researchs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      researchs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/researchs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/researchs')
        .send({
          name: 'New Research',
          info: 'This is the brand new research!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newResearch = res.body;
          done();
        });
    });

    it('should respond with the newly created research', function() {
      newResearch.name.should.equal('New Research');
      newResearch.info.should.equal('This is the brand new research!!!');
    });

  });

  describe('GET /api/researchs/:id', function() {
    var research;

    beforeEach(function(done) {
      request(app)
        .get('/api/researchs/' + newResearch._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          research = res.body;
          done();
        });
    });

    afterEach(function() {
      research = {};
    });

    it('should respond with the requested research', function() {
      research.name.should.equal('New Research');
      research.info.should.equal('This is the brand new research!!!');
    });

  });

  describe('PUT /api/researchs/:id', function() {
    var updatedResearch;

    beforeEach(function(done) {
      request(app)
        .put('/api/researchs/' + newResearch._id)
        .send({
          name: 'Updated Research',
          info: 'This is the updated research!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedResearch = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedResearch = {};
    });

    it('should respond with the updated research', function() {
      updatedResearch.name.should.equal('Updated Research');
      updatedResearch.info.should.equal('This is the updated research!!!');
    });

  });

  describe('DELETE /api/researchs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/researchs/' + newResearch._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when research does not exist', function(done) {
      request(app)
        .delete('/api/researchs/' + newResearch._id)
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
