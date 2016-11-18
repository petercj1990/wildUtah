'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var amphibianCtrlStub = {
  index: 'amphibianCtrl.index',
  show: 'amphibianCtrl.show',
  create: 'amphibianCtrl.create',
  update: 'amphibianCtrl.update',
  destroy: 'amphibianCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var amphibianIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './amphibian.controller': amphibianCtrlStub
});

describe('Amphibian API Router:', function() {

  it('should return an express router instance', function() {
    amphibianIndex.should.equal(routerStub);
  });

  describe('GET /api/amphibians', function() {

    it('should route to amphibian.controller.index', function() {
      routerStub.get
        .withArgs('/', 'amphibianCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/amphibians/:id', function() {

    it('should route to amphibian.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'amphibianCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/amphibians', function() {

    it('should route to amphibian.controller.create', function() {
      routerStub.post
        .withArgs('/', 'amphibianCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/amphibians/:id', function() {

    it('should route to amphibian.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'amphibianCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/amphibians/:id', function() {

    it('should route to amphibian.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'amphibianCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/amphibians/:id', function() {

    it('should route to amphibian.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'amphibianCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
