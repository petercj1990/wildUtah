'use strict';

import mongoose from 'mongoose';

var AmphibianSchema = new mongoose.Schema({
  AID:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal'
  },
  isWet: {type: Boolean}
});

export default mongoose.model('Amphibian', AmphibianSchema);
