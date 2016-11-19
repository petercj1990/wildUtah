'use strict';

import mongoose from 'mongoose';

var FishSchema = new mongoose.Schema({
  AID: {type: mongoose.Schema.Types.ObjectId, ref: 'Animal'},
  migration: {type: String},
  stagnation: {type: String}
});

export default mongoose.model('Fish', FishSchema);
