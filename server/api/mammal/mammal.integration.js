'use strict';

var app = require('../..');
import request from 'supertest';

var newMammal;

describe('Mammal API:', function() {

  describe('GET /api/mammals', function() {
    var mammals;

    beforeEach(function(done) {
      request(app)
        .get('/api/mammals')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          mammals = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      mammals.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/mammals', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/mammals')
        .send({
          name: 'New Mammal',
          info: 'This is the brand new mammal!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMammal = res.body;
          done();
        });
    });

    it('should respond with the newly created mammal', function() {
      newMammal.name.should.equal('New Mammal');
      newMammal.info.should.equal('This is the brand new mammal!!!');
    });

  });

  describe('GET /api/mammals/:id', function() {
    var mammal;

    beforeEach(function(done) {
      request(app)
        .get('/api/mammals/' + newMammal._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          mammal = res.body;
          done();
        });
    });

    afterEach(function() {
      mammal = {};
    });

    it('should respond with the requested mammal', function() {
      mammal.name.should.equal('New Mammal');
      mammal.info.should.equal('This is the brand new mammal!!!');
    });

  });

  describe('PUT /api/mammals/:id', function() {
    var updatedMammal;

    beforeEach(function(done) {
      request(app)
        .put('/api/mammals/' + newMammal._id)
        .send({
          name: 'Updated Mammal',
          info: 'This is the updated mammal!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMammal = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMammal = {};
    });

    it('should respond with the updated mammal', function() {
      updatedMammal.name.should.equal('Updated Mammal');
      updatedMammal.info.should.equal('This is the updated mammal!!!');
    });

  });

  describe('DELETE /api/mammals/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/mammals/' + newMammal._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when mammal does not exist', function(done) {
      request(app)
        .delete('/api/mammals/' + newMammal._id)
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
