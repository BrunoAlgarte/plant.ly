const express = require('express');
const router = express.Router();
const controller = require('../controllers/sensorController'); // Usar controller como está

router.get('/', controller.getSensorData);

// Rota para buscar o último registro
router.get('/last', controller.getLastSensorData);

// Rota para obter a média
router.get('/average', controller.getAverage);

// Rota para obter a moda
router.get('/mode', controller.getMode);

// Rota para obter a mediana
router.get('/median', controller.getMedian);

// Rota para obter o desvio padrão
router.get('/stddev', controller.getStandardDeviation);

// Rota para obter a assimetria
router.get('/skewness', controller.getSkewness);

// Rota para obter a projeção futura (regressão linear)
router.get('/regression', controller.getRegression);

module.exports = router;
