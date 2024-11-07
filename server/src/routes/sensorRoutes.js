const express = require('express');
const router = express.Router();
const controller = require('../controllers/sensorController'); // Usar controller como está

router.get('/', controller.getSensorData);

// Rota para buscar o último registro
router.get('/last', controller.getLastSensorData);

module.exports = router;
