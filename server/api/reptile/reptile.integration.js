'use strict';

var app = require('../..');
import request from 'supertest';

var newReptile;

describe('Reptile API:', function() {

  describe('GET /api/reptiles', function() {
    var reptiles;

    beforeEach(function(done) {
      request(app)
        .get('/api/reptiles')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          reptiles = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      reptiles.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/reptiles', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/reptiles')
        .send({
          name: 'New Reptile',
          info: 'This is the brand new reptile!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newReptile = res.body;
          done();
        });
    });

    it('should respond with the newly created reptile', function() {
      newReptile.name.should.equal('New Reptile');
      newReptile.info.should.equal('This is the brand new reptile!!!');
    });

  });

  describe('GET /api/reptiles/:id', function() {
    var reptile;

    beforeEach(function(done) {
      request(app)
        .get('/api/reptiles/' + newReptile._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          reptile = res.body;
          done();
        });
    });

    afterEach(function() {
      reptile = {};
    });

    it('should respond with the requested reptile', function() {
      reptile.name.should.equal('New Reptile');
      reptile.info.should.equal('This is the brand new reptile!!!');
    });

  });

  describe('PUT /api/reptiles/:id', function() {
    var updatedReptile;

    beforeEach(function(done) {
      request(app)
        .put('/api/reptiles/' + newReptile._id)
        .send({
          name: 'Updated Reptile',
          info: 'This is the updated reptile!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedReptile = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedReptile = {};
    });

    it('should respond with the updated reptile', function() {
      updatedReptile.name.should.equal('Updated Reptile');
      updatedReptile.info.should.equal('This is the updated reptile!!!');
    });

  });

  describe('DELETE /api/reptiles/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/reptiles/' + newReptile._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when reptile does not exist', function(done) {
      request(app)
        .delete('/api/reptiles/' + newReptile._id)
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
