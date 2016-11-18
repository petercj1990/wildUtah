'use strict';

import mongoose from 'mongoose';

var AnimalSchema = new mongoose.Schema({
	family: {type: String},
	genus: {type: String},
	name:{type: String},
	diet:{type: String},
	reproduction: {type: String}
});

export default mongoose.model('Animal', AnimalSchema);
