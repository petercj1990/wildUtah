'use strict';

var app = require('../..');
import request from 'supertest';

var newInsect;

describe('Insect API:', function() {

  describe('GET /api/insects', function() {
    var insects;

    beforeEach(function(done) {
      request(app)
        .get('/api/insects')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          insects = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      insects.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/insects', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/insects')
        .send({
          name: 'New Insect',
          info: 'This is the brand new insect!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newInsect = res.body;
          done();
        });
    });

    it('should respond with the newly created insect', function() {
      newInsect.name.should.equal('New Insect');
      newInsect.info.should.equal('This is the brand new insect!!!');
    });

  });

  describe('GET /api/insects/:id', function() {
    var insect;

    beforeEach(function(done) {
      request(app)
        .get('/api/insects/' + newInsect._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          insect = res.body;
          done();
        });
    });

    afterEach(function() {
      insect = {};
    });

    it('should respond with the requested insect', function() {
      insect.name.should.equal('New Insect');
      insect.info.should.equal('This is the brand new insect!!!');
    });

  });

  describe('PUT /api/insects/:id', function() {
    var updatedInsect;

    beforeEach(function(done) {
      request(app)
        .put('/api/insects/' + newInsect._id)
        .send({
          name: 'Updated Insect',
          info: 'This is the updated insect!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedInsect = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedInsect = {};
    });

    it('should respond with the updated insect', function() {
      updatedInsect.name.should.equal('Updated Insect');
      updatedInsect.info.should.equal('This is the updated insect!!!');
    });

  });

  describe('DELETE /api/insects/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/insects/' + newInsect._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when insect does not exist', function(done) {
      request(app)
        .delete('/api/insects/' + newInsect._id)
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
