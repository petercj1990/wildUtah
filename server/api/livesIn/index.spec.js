'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var livesInCtrlStub = {
  index: 'livesInCtrl.index',
  show: 'livesInCtrl.show',
  create: 'livesInCtrl.create',
  update: 'livesInCtrl.update',
  destroy: 'livesInCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var livesInIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './livesIn.controller': livesInCtrlStub
});

describe('LivesIn API Router:', function() {

  it('should return an express router instance', function() {
    livesInIndex.should.equal(routerStub);
  });

  describe('GET /api/livesIns', function() {

    it('should route to livesIn.controller.index', function() {
      routerStub.get
        .withArgs('/', 'livesInCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/livesIns/:id', function() {

    it('should route to livesIn.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'livesInCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/livesIns', function() {

    it('should route to livesIn.controller.create', function() {
      routerStub.post
        .withArgs('/', 'livesInCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/livesIns/:id', function() {

    it('should route to livesIn.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'livesInCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/livesIns/:id', function() {

    it('should route to livesIn.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'livesInCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/livesIns/:id', function() {

    it('should route to livesIn.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'livesInCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
