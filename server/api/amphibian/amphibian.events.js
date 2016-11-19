/**
 * Amphibian model events
 */

'use strict';

import {EventEmitter} from 'events';
import Amphibian from './amphibian.model';
var AmphibianEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AmphibianEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Amphibian.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AmphibianEvents.emit(event + ':' + doc._id, doc);
    AmphibianEvents.emit(event, doc);
  }
}

export default AmphibianEvents;
