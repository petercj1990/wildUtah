'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var reptileCtrlStub = {
  index: 'reptileCtrl.index',
  show: 'reptileCtrl.show',
  create: 'reptileCtrl.create',
  update: 'reptileCtrl.update',
  destroy: 'reptileCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var reptileIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './reptile.controller': reptileCtrlStub
});

describe('Reptile API Router:', function() {

  it('should return an express router instance', function() {
    reptileIndex.should.equal(routerStub);
  });

  describe('GET /api/reptiles', function() {

    it('should route to reptile.controller.index', function() {
      routerStub.get
        .withArgs('/', 'reptileCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/reptiles/:id', function() {

    it('should route to reptile.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'reptileCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/reptiles', function() {

    it('should route to reptile.controller.create', function() {
      routerStub.post
        .withArgs('/', 'reptileCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/reptiles/:id', function() {

    it('should route to reptile.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'reptileCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/reptiles/:id', function() {

    it('should route to reptile.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'reptileCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/reptiles/:id', function() {

    it('should route to reptile.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'reptileCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
