'use strict';

import mongoose from 'mongoose';

var MammalSchema = new mongoose.Schema({
  AID: {type: mongoose.Schema.Types.ObjectId, ref: 'Animal'},
  migration: {type: String},
  hibernation: {type: Boolean}
});

export default mongoose.model('Mammal', MammalSchema);
