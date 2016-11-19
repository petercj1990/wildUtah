/**
 * Observation model events
 */

'use strict';

import {EventEmitter} from 'events';
import Observation from './observation.model';
var ObservationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ObservationEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Observation.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ObservationEvents.emit(event + ':' + doc._id, doc);
    ObservationEvents.emit(event, doc);
  }
}

export default ObservationEvents;
