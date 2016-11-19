'use strict';

import mongoose from 'mongoose';

var ReptileSchema = new mongoose.Schema({
  AID: {type: mongoose.Schema.Types.ObjectId, ref: 'Animal'},
  venom: {type: String}
});

export default mongoose.model('Reptile', ReptileSchema);
