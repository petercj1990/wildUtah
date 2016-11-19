/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/amphibians              ->  index
 * POST    /api/amphibians              ->  create
 * GET     /api/amphibians/:id          ->  show
 * PUT     /api/amphibians/:id          ->  update
 * DELETE  /api/amphibians/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Amphibian from './amphibian.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Amphibians
export function index(req, res) {
  return Amphibian.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Amphibian from the DB
export function show(req, res) {
  return Amphibian.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Amphibian in the DB
export function create(req, res) {
  return Amphibian.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Amphibian in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Amphibian.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Amphibian from the DB
export function destroy(req, res) {
  return Amphibian.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
