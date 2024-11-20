const express = require('express');
const router = express.Router();
const controller = require('../controllers/specieController');

router.get('/name/:name', controller.findByName);

module.exports = router;
