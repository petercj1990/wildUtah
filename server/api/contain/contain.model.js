'use strict';

import mongoose from 'mongoose';

var ContainSchema = new mongoose.Schema({
  ZID: {type: mongoose.Schema.Types.ObjectId, ref: 'Zone'},
  habitat: {type: String}
});

export default mongoose.model('Contain', ContainSchema);
