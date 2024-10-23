const express = require('express');
const router = express.Router();
const PlantSpecies = require('../models/plantSpeciesModel');

// Buscar todas as espécies de plantas ou filtrar por dicas
router.get('/', async (req, res) => {
  const filters = req.query;
  const species = await PlantSpecies.find(filters);
  res.status(200).json(species);
});

module.exports = router;
