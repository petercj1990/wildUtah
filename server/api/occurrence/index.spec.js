'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var occurrenceCtrlStub = {
  index: 'occurrenceCtrl.index',
  show: 'occurrenceCtrl.show',
  create: 'occurrenceCtrl.create',
  update: 'occurrenceCtrl.update',
  destroy: 'occurrenceCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var occurrenceIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './occurrence.controller': occurrenceCtrlStub
});

describe('Occurrence API Router:', function() {

  it('should return an express router instance', function() {
    occurrenceIndex.should.equal(routerStub);
  });

  describe('GET /api/occurrences', function() {

    it('should route to occurrence.controller.index', function() {
      routerStub.get
        .withArgs('/', 'occurrenceCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/occurrences/:id', function() {

    it('should route to occurrence.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'occurrenceCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/occurrences', function() {

    it('should route to occurrence.controller.create', function() {
      routerStub.post
        .withArgs('/', 'occurrenceCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/occurrences/:id', function() {

    it('should route to occurrence.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'occurrenceCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/occurrences/:id', function() {

    it('should route to occurrence.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'occurrenceCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/occurrences/:id', function() {

    it('should route to occurrence.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'occurrenceCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
