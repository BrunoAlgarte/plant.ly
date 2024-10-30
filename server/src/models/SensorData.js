const mongoose = require('mongoose');
const { Schema } = mongoose;

const sensorDataSchema = new Schema({
  plant_id: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },
  temperature_air: { type: Number, required: true },
  humidity_air: { type: Number, required: true },
  soil_moisture: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  week: { type: Number, required: true }
});

module.exports = mongoose.model('SensorData', sensorDataSchema);
