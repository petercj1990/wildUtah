'use strict';

var app = require('../..');
import request from 'supertest';

var newOccurrence;

describe('Occurrence API:', function() {

  describe('GET /api/occurrences', function() {
    var occurrences;

    beforeEach(function(done) {
      request(app)
        .get('/api/occurrences')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          occurrences = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      occurrences.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/occurrences', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/occurrences')
        .send({
          name: 'New Occurrence',
          info: 'This is the brand new occurrence!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newOccurrence = res.body;
          done();
        });
    });

    it('should respond with the newly created occurrence', function() {
      newOccurrence.name.should.equal('New Occurrence');
      newOccurrence.info.should.equal('This is the brand new occurrence!!!');
    });

  });

  describe('GET /api/occurrences/:id', function() {
    var occurrence;

    beforeEach(function(done) {
      request(app)
        .get('/api/occurrences/' + newOccurrence._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          occurrence = res.body;
          done();
        });
    });

    afterEach(function() {
      occurrence = {};
    });

    it('should respond with the requested occurrence', function() {
      occurrence.name.should.equal('New Occurrence');
      occurrence.info.should.equal('This is the brand new occurrence!!!');
    });

  });

  describe('PUT /api/occurrences/:id', function() {
    var updatedOccurrence;

    beforeEach(function(done) {
      request(app)
        .put('/api/occurrences/' + newOccurrence._id)
        .send({
          name: 'Updated Occurrence',
          info: 'This is the updated occurrence!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedOccurrence = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedOccurrence = {};
    });

    it('should respond with the updated occurrence', function() {
      updatedOccurrence.name.should.equal('Updated Occurrence');
      updatedOccurrence.info.should.equal('This is the updated occurrence!!!');
    });

  });

  describe('DELETE /api/occurrences/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/occurrences/' + newOccurrence._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when occurrence does not exist', function(done) {
      request(app)
        .delete('/api/occurrences/' + newOccurrence._id)
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
