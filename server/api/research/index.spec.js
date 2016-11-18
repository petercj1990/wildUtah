'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var researchCtrlStub = {
  index: 'researchCtrl.index',
  show: 'researchCtrl.show',
  create: 'researchCtrl.create',
  update: 'researchCtrl.update',
  destroy: 'researchCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var researchIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './research.controller': researchCtrlStub
});

describe('Research API Router:', function() {

  it('should return an express router instance', function() {
    researchIndex.should.equal(routerStub);
  });

  describe('GET /api/researchs', function() {

    it('should route to research.controller.index', function() {
      routerStub.get
        .withArgs('/', 'researchCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/researchs/:id', function() {

    it('should route to research.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'researchCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/researchs', function() {

    it('should route to research.controller.create', function() {
      routerStub.post
        .withArgs('/', 'researchCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/researchs/:id', function() {

    it('should route to research.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'researchCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/researchs/:id', function() {

    it('should route to research.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'researchCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/researchs/:id', function() {

    it('should route to research.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'researchCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
