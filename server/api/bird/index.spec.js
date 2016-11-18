'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var birdCtrlStub = {
  index: 'birdCtrl.index',
  show: 'birdCtrl.show',
  create: 'birdCtrl.create',
  update: 'birdCtrl.update',
  destroy: 'birdCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var birdIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './bird.controller': birdCtrlStub
});

describe('Bird API Router:', function() {

  it('should return an express router instance', function() {
    birdIndex.should.equal(routerStub);
  });

  describe('GET /api/birds', function() {

    it('should route to bird.controller.index', function() {
      routerStub.get
        .withArgs('/', 'birdCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/birds/:id', function() {

    it('should route to bird.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'birdCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/birds', function() {

    it('should route to bird.controller.create', function() {
      routerStub.post
        .withArgs('/', 'birdCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/birds/:id', function() {

    it('should route to bird.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'birdCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/birds/:id', function() {

    it('should route to bird.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'birdCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/birds/:id', function() {

    it('should route to bird.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'birdCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
