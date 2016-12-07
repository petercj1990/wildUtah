'use strict';

import mongoose from 'mongoose';

var WeatherSchema = new mongoose.Schema({
  OBVID: {type: mongoose.Schema.Types.ObjectId, ref: 'Observation'},
  type: {type: String,  enum : ['Sun', 'Rain', 'Overcast', 'Snow', 'Hail']}
});

export default mongoose.model('Weather', WeatherSchema);
