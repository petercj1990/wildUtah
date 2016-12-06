'use strict';

import mongoose from 'mongoose';

var ZoneSchema = new mongoose.Schema({
	habitat: [{type: String}]
});

export default mongoose.model('Zone', ZoneSchema);
