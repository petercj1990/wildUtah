/**
 * Researcher model events
 */

'use strict';

import {EventEmitter} from 'events';
import Researcher from './researcher.model';
var ResearcherEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ResearcherEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Researcher.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ResearcherEvents.emit(event + ':' + doc._id, doc);
    ResearcherEvents.emit(event, doc);
  }
}

export default ResearcherEvents;
