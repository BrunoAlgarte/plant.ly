const express = require('express');
const router = express.Router();
const controller = require('../controllers/sensorController');

router.get('/', controller.getSensorData);
router.get('/last', controller.getLastSensorData);
router.get('/average', controller.getAverage);
router.get('/mode', controller.getMode);
router.get('/median', controller.getMedian);
router.get('/stddev', controller.getStandardDeviation);
router.get('/skewness', controller.getSkewness);
router.get('/regression', controller.getRegression);

module.exports = router;
