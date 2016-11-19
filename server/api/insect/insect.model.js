'use strict';

import mongoose from 'mongoose';

var InsectSchema = new mongoose.Schema({
  AID: {type: mongoose.Schema.Types.ObjectId, ref: 'Animal'},
  community: {type: String}
});

export default mongoose.model('Insect', InsectSchema);
