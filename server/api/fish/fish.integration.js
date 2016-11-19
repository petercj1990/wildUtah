'use strict';

var app = require('../..');
import request from 'supertest';

var newFish;

describe('Fish API:', function() {

  describe('GET /api/fishs', function() {
    var fishs;

    beforeEach(function(done) {
      request(app)
        .get('/api/fishs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          fishs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      fishs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/fishs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/fishs')
        .send({
          name: 'New Fish',
          info: 'This is the brand new fish!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newFish = res.body;
          done();
        });
    });

    it('should respond with the newly created fish', function() {
      newFish.name.should.equal('New Fish');
      newFish.info.should.equal('This is the brand new fish!!!');
    });

  });

  describe('GET /api/fishs/:id', function() {
    var fish;

    beforeEach(function(done) {
      request(app)
        .get('/api/fishs/' + newFish._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          fish = res.body;
          done();
        });
    });

    afterEach(function() {
      fish = {};
    });

    it('should respond with the requested fish', function() {
      fish.name.should.equal('New Fish');
      fish.info.should.equal('This is the brand new fish!!!');
    });

  });

  describe('PUT /api/fishs/:id', function() {
    var updatedFish;

    beforeEach(function(done) {
      request(app)
        .put('/api/fishs/' + newFish._id)
        .send({
          name: 'Updated Fish',
          info: 'This is the updated fish!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFish = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFish = {};
    });

    it('should respond with the updated fish', function() {
      updatedFish.name.should.equal('Updated Fish');
      updatedFish.info.should.equal('This is the updated fish!!!');
    });

  });

  describe('DELETE /api/fishs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/fishs/' + newFish._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when fish does not exist', function(done) {
      request(app)
        .delete('/api/fishs/' + newFish._id)
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
