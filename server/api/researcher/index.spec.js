'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var researcherCtrlStub = {
  index: 'researcherCtrl.index',
  show: 'researcherCtrl.show',
  create: 'researcherCtrl.create',
  update: 'researcherCtrl.update',
  destroy: 'researcherCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var researcherIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './researcher.controller': researcherCtrlStub
});

describe('Researcher API Router:', function() {

  it('should return an express router instance', function() {
    researcherIndex.should.equal(routerStub);
  });

  describe('GET /api/researchers', function() {

    it('should route to researcher.controller.index', function() {
      routerStub.get
        .withArgs('/', 'researcherCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/researchers/:id', function() {

    it('should route to researcher.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'researcherCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/researchers', function() {

    it('should route to researcher.controller.create', function() {
      routerStub.post
        .withArgs('/', 'researcherCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/researchers/:id', function() {

    it('should route to researcher.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'researcherCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/researchers/:id', function() {

    it('should route to researcher.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'researcherCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/researchers/:id', function() {

    it('should route to researcher.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'researcherCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
