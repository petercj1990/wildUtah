'use strict';

import mongoose from 'mongoose';

var NoteSchema = new mongoose.Schema({
  OBVID: {type: mongoose.Schema.Types.ObjectId, ref: 'Observation'},
  note: {type: String}
});

export default mongoose.model('Note', NoteSchema);
