/**
 * Contain model events
 */

'use strict';

import {EventEmitter} from 'events';
import Contain from './contain.model';
var ContainEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ContainEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Contain.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ContainEvents.emit(event + ':' + doc._id, doc);
    ContainEvents.emit(event, doc);
  }
}

export default ContainEvents;
