'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var containCtrlStub = {
  index: 'containCtrl.index',
  show: 'containCtrl.show',
  create: 'containCtrl.create',
  update: 'containCtrl.update',
  destroy: 'containCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var containIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './contain.controller': containCtrlStub
});

describe('Contain API Router:', function() {

  it('should return an express router instance', function() {
    containIndex.should.equal(routerStub);
  });

  describe('GET /api/contains', function() {

    it('should route to contain.controller.index', function() {
      routerStub.get
        .withArgs('/', 'containCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/contains/:id', function() {

    it('should route to contain.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'containCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/contains', function() {

    it('should route to contain.controller.create', function() {
      routerStub.post
        .withArgs('/', 'containCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/contains/:id', function() {

    it('should route to contain.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'containCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/contains/:id', function() {

    it('should route to contain.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'containCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/contains/:id', function() {

    it('should route to contain.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'containCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
