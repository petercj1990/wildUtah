'use strict';

import mongoose from 'mongoose';

var LivesInSchema = new mongoose.Schema({
  ZID: {type: mongoose.Schema.Types.ObjectId, ref: 'Zone'},
  AID: {type: mongoose.Schema.Types.ObjectId, ref: 'Animal'},
  population: {type: Number}
});

export default mongoose.model('LivesIn', LivesInSchema);
