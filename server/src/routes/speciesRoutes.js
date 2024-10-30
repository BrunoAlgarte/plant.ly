const express = require('express');
const router = express.Router();
const controller = require('../controllers/specieController')

router.get('/:id', controller.findById)


module.exports = router;
