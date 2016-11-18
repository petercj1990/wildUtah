'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var observationCtrlStub = {
  index: 'observationCtrl.index',
  show: 'observationCtrl.show',
  create: 'observationCtrl.create',
  update: 'observationCtrl.update',
  destroy: 'observationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var observationIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './observation.controller': observationCtrlStub
});

describe('Observation API Router:', function() {

  it('should return an express router instance', function() {
    observationIndex.should.equal(routerStub);
  });

  describe('GET /api/observations', function() {

    it('should route to observation.controller.index', function() {
      routerStub.get
        .withArgs('/', 'observationCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/observations/:id', function() {

    it('should route to observation.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'observationCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/observations', function() {

    it('should route to observation.controller.create', function() {
      routerStub.post
        .withArgs('/', 'observationCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/observations/:id', function() {

    it('should route to observation.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'observationCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/observations/:id', function() {

    it('should route to observation.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'observationCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/observations/:id', function() {

    it('should route to observation.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'observationCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
