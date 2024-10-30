const express = require('express');
const router = express.Router();
const controller = require('../controllers/sensorController')

router.get('/', controller.getDataSensor)


module.exports = router;
