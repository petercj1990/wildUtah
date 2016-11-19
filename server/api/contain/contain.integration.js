'use strict';

var app = require('../..');
import request from 'supertest';

var newContain;

describe('Contain API:', function() {

  describe('GET /api/contains', function() {
    var contains;

    beforeEach(function(done) {
      request(app)
        .get('/api/contains')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          contains = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      contains.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/contains', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/contains')
        .send({
          name: 'New Contain',
          info: 'This is the brand new contain!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newContain = res.body;
          done();
        });
    });

    it('should respond with the newly created contain', function() {
      newContain.name.should.equal('New Contain');
      newContain.info.should.equal('This is the brand new contain!!!');
    });

  });

  describe('GET /api/contains/:id', function() {
    var contain;

    beforeEach(function(done) {
      request(app)
        .get('/api/contains/' + newContain._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          contain = res.body;
          done();
        });
    });

    afterEach(function() {
      contain = {};
    });

    it('should respond with the requested contain', function() {
      contain.name.should.equal('New Contain');
      contain.info.should.equal('This is the brand new contain!!!');
    });

  });

  describe('PUT /api/contains/:id', function() {
    var updatedContain;

    beforeEach(function(done) {
      request(app)
        .put('/api/contains/' + newContain._id)
        .send({
          name: 'Updated Contain',
          info: 'This is the updated contain!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedContain = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedContain = {};
    });

    it('should respond with the updated contain', function() {
      updatedContain.name.should.equal('Updated Contain');
      updatedContain.info.should.equal('This is the updated contain!!!');
    });

  });

  describe('DELETE /api/contains/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/contains/' + newContain._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when contain does not exist', function(done) {
      request(app)
        .delete('/api/contains/' + newContain._id)
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
