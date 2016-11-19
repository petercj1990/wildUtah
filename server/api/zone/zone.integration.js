'use strict';

var app = require('../..');
import request from 'supertest';

var newZone;

describe('Zone API:', function() {

  describe('GET /api/zones', function() {
    var zones;

    beforeEach(function(done) {
      request(app)
        .get('/api/zones')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          zones = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      zones.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/zones', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/zones')
        .send({
          name: 'New Zone',
          info: 'This is the brand new zone!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newZone = res.body;
          done();
        });
    });

    it('should respond with the newly created zone', function() {
      newZone.name.should.equal('New Zone');
      newZone.info.should.equal('This is the brand new zone!!!');
    });

  });

  describe('GET /api/zones/:id', function() {
    var zone;

    beforeEach(function(done) {
      request(app)
        .get('/api/zones/' + newZone._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          zone = res.body;
          done();
        });
    });

    afterEach(function() {
      zone = {};
    });

    it('should respond with the requested zone', function() {
      zone.name.should.equal('New Zone');
      zone.info.should.equal('This is the brand new zone!!!');
    });

  });

  describe('PUT /api/zones/:id', function() {
    var updatedZone;

    beforeEach(function(done) {
      request(app)
        .put('/api/zones/' + newZone._id)
        .send({
          name: 'Updated Zone',
          info: 'This is the updated zone!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedZone = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedZone = {};
    });

    it('should respond with the updated zone', function() {
      updatedZone.name.should.equal('Updated Zone');
      updatedZone.info.should.equal('This is the updated zone!!!');
    });

  });

  describe('DELETE /api/zones/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/zones/' + newZone._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when zone does not exist', function(done) {
      request(app)
        .delete('/api/zones/' + newZone._id)
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
