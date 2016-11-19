'use strict';

import mongoose from 'mongoose';

var OccurrenceSchema = new mongoose.Schema({
	ZID: {type: mongoose.Schema.Types.ObjectId, ref: 'Zone'},
	EID: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
	OID: {type: mongoose.Schema.Types.ObjectId, ref: 'Observation'}
});

export default mongoose.model('Occurrence', OccurrenceSchema);
