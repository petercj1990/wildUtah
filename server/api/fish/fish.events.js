/**
 * Fish model events
 */

'use strict';

import {EventEmitter} from 'events';
import Fish from './fish.model';
var FishEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FishEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Fish.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FishEvents.emit(event + ':' + doc._id, doc);
    FishEvents.emit(event, doc);
  }
}

export default FishEvents;
