/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/observations              ->  index
 * POST    /api/observations              ->  create
 * GET     /api/observations/:id          ->  show
 * PUT     /api/observations/:id          ->  update
 * DELETE  /api/observations/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Observation from './observation.model';

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

// Gets a list of Observations
export function index(req, res) {
  return Observation.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Observation from the DB
export function show(req, res) {
  return Observation.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Observation in the DB
export function create(req, res) {
  return Observation.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Observation in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Observation.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Observation from the DB
export function destroy(req, res) {
  return Observation.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
