'use strict';

import mongoose from 'mongoose';

var ResearcherSchema = new mongoose.Schema({
  firsName: {type: String},
  lastName: {type: String}
});

export default mongoose.model('Researcher', ResearcherSchema);
