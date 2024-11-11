const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');
const validateRequest = require('../middlewares/validateRequest');
const plantSchema = require('../schemas/plantSchema');

router.post('/user/:user_id', 
    validateRequest(plantSchema), 
    plantController.newPlant
);

router.get('/user/:user_id', plantController.findAllPlants);
router.get('/:id', plantController.findByIdPlants);
router.delete('/:id', plantController.deletePlant);

module.exports = router;