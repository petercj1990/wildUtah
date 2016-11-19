'use strict';

import mongoose from 'mongoose';

var ObservationSchema = new mongoose.Schema({
  ResearcherID: {type: mongoose.Schema.Types.ObjectId, ref: 'Researcher'},
  AID: {type: mongoose.Schema.Types.ObjectId, ref: 'Animal'},
  date: {type: Date},
  popChange: {type: Number}
});

export default mongoose.model('Observation', ObservationSchema);
