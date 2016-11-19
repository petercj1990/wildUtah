'use strict';

var app = require('../..');
import request from 'supertest';

var newAmphibian;

describe('Amphibian API:', function() {

  describe('GET /api/amphibians', function() {
    var amphibians;

    beforeEach(function(done) {
      request(app)
        .get('/api/amphibians')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          amphibians = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      amphibians.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/amphibians', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/amphibians')
        .send({
          name: 'New Amphibian',
          info: 'This is the brand new amphibian!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAmphibian = res.body;
          done();
        });
    });

    it('should respond with the newly created amphibian', function() {
      newAmphibian.name.should.equal('New Amphibian');
      newAmphibian.info.should.equal('This is the brand new amphibian!!!');
    });

  });

  describe('GET /api/amphibians/:id', function() {
    var amphibian;

    beforeEach(function(done) {
      request(app)
        .get('/api/amphibians/' + newAmphibian._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          amphibian = res.body;
          done();
        });
    });

    afterEach(function() {
      amphibian = {};
    });

    it('should respond with the requested amphibian', function() {
      amphibian.name.should.equal('New Amphibian');
      amphibian.info.should.equal('This is the brand new amphibian!!!');
    });

  });

  describe('PUT /api/amphibians/:id', function() {
    var updatedAmphibian;

    beforeEach(function(done) {
      request(app)
        .put('/api/amphibians/' + newAmphibian._id)
        .send({
          name: 'Updated Amphibian',
          info: 'This is the updated amphibian!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAmphibian = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAmphibian = {};
    });

    it('should respond with the updated amphibian', function() {
      updatedAmphibian.name.should.equal('Updated Amphibian');
      updatedAmphibian.info.should.equal('This is the updated amphibian!!!');
    });

  });

  describe('DELETE /api/amphibians/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/amphibians/' + newAmphibian._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when amphibian does not exist', function(done) {
      request(app)
        .delete('/api/amphibians/' + newAmphibian._id)
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
