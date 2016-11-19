'use strict';

import mongoose from 'mongoose';

var EventSchema = new mongoose.Schema({
  OBVID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Observation'
  },
  eventName: {type: String},
  description: {type: String},
  weather: {type: String}
});

export default mongoose.model('Event', EventSchema);
