const express = require('express');
const router = express.Router();
const grafanaController = require('../controllers/grafanaController');

router.get('/dashboard', grafanaController.proxyGrafana);

module.exports = router; 