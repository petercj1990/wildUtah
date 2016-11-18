'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var animalCtrlStub = {
  index: 'animalCtrl.index',
  show: 'animalCtrl.show',
  create: 'animalCtrl.create',
  update: 'animalCtrl.update',
  destroy: 'animalCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var animalIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './animal.controller': animalCtrlStub
});

describe('Animal API Router:', function() {

  it('should return an express router instance', function() {
    animalIndex.should.equal(routerStub);
  });

  describe('GET /api/animals', function() {

    it('should route to animal.controller.index', function() {
      routerStub.get
        .withArgs('/', 'animalCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/animals/:id', function() {

    it('should route to animal.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'animalCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/animals', function() {

    it('should route to animal.controller.create', function() {
      routerStub.post
        .withArgs('/', 'animalCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/animals/:id', function() {

    it('should route to animal.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'animalCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/animals/:id', function() {

    it('should route to animal.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'animalCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/animals/:id', function() {

    it('should route to animal.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'animalCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
