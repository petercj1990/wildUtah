'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var insectCtrlStub = {
  index: 'insectCtrl.index',
  show: 'insectCtrl.show',
  create: 'insectCtrl.create',
  update: 'insectCtrl.update',
  destroy: 'insectCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var insectIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './insect.controller': insectCtrlStub
});

describe('Insect API Router:', function() {

  it('should return an express router instance', function() {
    insectIndex.should.equal(routerStub);
  });

  describe('GET /api/insects', function() {

    it('should route to insect.controller.index', function() {
      routerStub.get
        .withArgs('/', 'insectCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/insects/:id', function() {

    it('should route to insect.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'insectCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/insects', function() {

    it('should route to insect.controller.create', function() {
      routerStub.post
        .withArgs('/', 'insectCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/insects/:id', function() {

    it('should route to insect.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'insectCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/insects/:id', function() {

    it('should route to insect.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'insectCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/insects/:id', function() {

    it('should route to insect.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'insectCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
