'use strict';

var app = require('../..');
import request from 'supertest';

var newResearcher;

describe('Researcher API:', function() {

  describe('GET /api/researchers', function() {
    var researchers;

    beforeEach(function(done) {
      request(app)
        .get('/api/researchers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          researchers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      researchers.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/researchers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/researchers')
        .send({
          name: 'New Researcher',
          info: 'This is the brand new researcher!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newResearcher = res.body;
          done();
        });
    });

    it('should respond with the newly created researcher', function() {
      newResearcher.name.should.equal('New Researcher');
      newResearcher.info.should.equal('This is the brand new researcher!!!');
    });

  });

  describe('GET /api/researchers/:id', function() {
    var researcher;

    beforeEach(function(done) {
      request(app)
        .get('/api/researchers/' + newResearcher._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          researcher = res.body;
          done();
        });
    });

    afterEach(function() {
      researcher = {};
    });

    it('should respond with the requested researcher', function() {
      researcher.name.should.equal('New Researcher');
      researcher.info.should.equal('This is the brand new researcher!!!');
    });

  });

  describe('PUT /api/researchers/:id', function() {
    var updatedResearcher;

    beforeEach(function(done) {
      request(app)
        .put('/api/researchers/' + newResearcher._id)
        .send({
          name: 'Updated Researcher',
          info: 'This is the updated researcher!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedResearcher = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedResearcher = {};
    });

    it('should respond with the updated researcher', function() {
      updatedResearcher.name.should.equal('Updated Researcher');
      updatedResearcher.info.should.equal('This is the updated researcher!!!');
    });

  });

  describe('DELETE /api/researchers/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/researchers/' + newResearcher._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when researcher does not exist', function(done) {
      request(app)
        .delete('/api/researchers/' + newResearcher._id)
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
