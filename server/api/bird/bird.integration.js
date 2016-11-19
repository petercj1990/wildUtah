'use strict';

var app = require('../..');
import request from 'supertest';

var newBird;

describe('Bird API:', function() {

  describe('GET /api/birds', function() {
    var birds;

    beforeEach(function(done) {
      request(app)
        .get('/api/birds')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          birds = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      birds.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/birds', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/birds')
        .send({
          name: 'New Bird',
          info: 'This is the brand new bird!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBird = res.body;
          done();
        });
    });

    it('should respond with the newly created bird', function() {
      newBird.name.should.equal('New Bird');
      newBird.info.should.equal('This is the brand new bird!!!');
    });

  });

  describe('GET /api/birds/:id', function() {
    var bird;

    beforeEach(function(done) {
      request(app)
        .get('/api/birds/' + newBird._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bird = res.body;
          done();
        });
    });

    afterEach(function() {
      bird = {};
    });

    it('should respond with the requested bird', function() {
      bird.name.should.equal('New Bird');
      bird.info.should.equal('This is the brand new bird!!!');
    });

  });

  describe('PUT /api/birds/:id', function() {
    var updatedBird;

    beforeEach(function(done) {
      request(app)
        .put('/api/birds/' + newBird._id)
        .send({
          name: 'Updated Bird',
          info: 'This is the updated bird!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBird = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBird = {};
    });

    it('should respond with the updated bird', function() {
      updatedBird.name.should.equal('Updated Bird');
      updatedBird.info.should.equal('This is the updated bird!!!');
    });

  });

  describe('DELETE /api/birds/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/birds/' + newBird._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when bird does not exist', function(done) {
      request(app)
        .delete('/api/birds/' + newBird._id)
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
