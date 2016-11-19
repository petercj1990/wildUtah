/**
 * Mammal model events
 */

'use strict';

import {EventEmitter} from 'events';
import Mammal from './mammal.model';
var MammalEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MammalEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Mammal.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MammalEvents.emit(event + ':' + doc._id, doc);
    MammalEvents.emit(event, doc);
  }
}

export default MammalEvents;
