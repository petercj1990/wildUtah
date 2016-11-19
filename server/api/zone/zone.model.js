'use strict';

import mongoose from 'mongoose';

var ZoneSchema = new mongoose.Schema({
	popTotal: {type: Number}
});

export default mongoose.model('Zone', ZoneSchema);
