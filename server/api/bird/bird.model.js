'use strict';

import mongoose from 'mongoose';

var BirdSchema = new mongoose.Schema({
  AID: {type: mongoose.Schema.Types.ObjectId, ref: 'Animal'},
  migration: {type: String},
  huntType: {type: String},
  nestingType: {type: String}
});

export default mongoose.model('Bird', BirdSchema);
