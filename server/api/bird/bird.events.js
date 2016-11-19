/**
 * Bird model events
 */

'use strict';

import {EventEmitter} from 'events';
import Bird from './bird.model';
var BirdEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BirdEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Bird.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BirdEvents.emit(event + ':' + doc._id, doc);
    BirdEvents.emit(event, doc);
  }
}

export default BirdEvents;
