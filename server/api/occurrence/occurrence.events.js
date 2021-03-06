/**
 * Occurrence model events
 */

'use strict';

import {EventEmitter} from 'events';
import Occurrence from './occurrence.model';
var OccurrenceEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
OccurrenceEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Occurrence.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    OccurrenceEvents.emit(event + ':' + doc._id, doc);
    OccurrenceEvents.emit(event, doc);
  }
}

export default OccurrenceEvents;
