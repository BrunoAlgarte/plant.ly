const mongoose = require('mongoose');
const { Schema } = mongoose;

const plantSpeciesSchema = new Schema({
  name: { type: String, required: true },
  scientific_name: { type: String },
  watering_tips: { type: String },
  sunlight_tips: { type: String },
  soil_tips: { type: String },
  temperature_min: { type: Number },
  temperature_max: { type: Number },
  growth_time: { type: String }
});

module.exports = mongoose.model('PlantSpecies', plantSpeciesSchema);
