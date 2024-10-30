const express = require('express');
const router = express.Router();
const controller = require('../controllers/plantController')

router.post('/user/:user_id', controller.newPlant)
router.get('/user/:user_id', controller.findAllPlants)
router.get('/:id', controller.findByIdPlants)
router.delete('/:id', controller.deletePlant)

module.exports = router