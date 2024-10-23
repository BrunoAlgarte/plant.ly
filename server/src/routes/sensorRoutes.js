const express = require('express');
const router = express.Router();
const SensorData = require('../models/sensorDataModel');

// Buscar dados dos sensores por planta e outros critérios
router.get('/', async (req, res) => {
  const { plant_id, start_date, end_date, temperature_min, temperature_max, humidity_min, humidity_max, soil_moisture_status } = req.query;
  
  let filter = { plant_id };

  if (start_date && end_date) {
    filter.timestamp = { $gte: new Date(start_date), $lte: new Date(end_date) };
  }

  if (temperature_min && temperature_max) {
    filter.temperature_air = { $gte: temperature_min, $lte: temperature_max };
  }

  if (humidity_min && humidity_max) {
    filter.humidity_air = { $gte: humidity_min, $lte: humidity_max };
  }

  if (soil_moisture_status) {
    filter.soil_moisture = soil_moisture_status;
  }

  const sensorData = await SensorData.find(filter);
  res.status(200).json(sensorData);
});

module.exports = router;
