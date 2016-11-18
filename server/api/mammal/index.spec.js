'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var mammalCtrlStub = {
  index: 'mammalCtrl.index',
  show: 'mammalCtrl.show',
  create: 'mammalCtrl.create',
  update: 'mammalCtrl.update',
  destroy: 'mammalCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var mammalIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './mammal.controller': mammalCtrlStub
});

describe('Mammal API Router:', function() {

  it('should return an express router instance', function() {
    mammalIndex.should.equal(routerStub);
  });

  describe('GET /api/mammals', function() {

    it('should route to mammal.controller.index', function() {
      routerStub.get
        .withArgs('/', 'mammalCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/mammals/:id', function() {

    it('should route to mammal.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'mammalCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/mammals', function() {

    it('should route to mammal.controller.create', function() {
      routerStub.post
        .withArgs('/', 'mammalCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/mammals/:id', function() {

    it('should route to mammal.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'mammalCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/mammals/:id', function() {

    it('should route to mammal.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'mammalCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/mammals/:id', function() {

    it('should route to mammal.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'mammalCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
