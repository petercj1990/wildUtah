'use strict';

import mongoose from 'mongoose';

var ResearchSchema = new mongoose.Schema({
  RID: {type: mongoose.Schema.Types.ObjectId, ref: 'Researcher'},
  AID: {type: mongoose.Schema.Types.ObjectId, ref: 'Animal'}
});

export default mongoose.model('Research', ResearchSchema);
