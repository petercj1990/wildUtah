/**
 * LivesIn model events
 */

'use strict';

import {EventEmitter} from 'events';
import LivesIn from './livesIn.model';
var LivesInEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LivesInEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  LivesIn.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    LivesInEvents.emit(event + ':' + doc._id, doc);
    LivesInEvents.emit(event, doc);
  }
}

export default LivesInEvents;
