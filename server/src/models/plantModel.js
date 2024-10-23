const mongoose = require('mongoose');
const { Schema } = mongoose;

const plantSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  date_created: { type: Date, default: Date.now },
  sensor_data: [{ type: Schema.Types.ObjectId, ref: 'SensorData' }]
});

module.exports = mongoose.model('Plant', plantSchema);
