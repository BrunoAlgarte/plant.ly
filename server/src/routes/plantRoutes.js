const express = require('express');
const router = express.Router();
const Plant = require('../models/plantModel');

// Cadastrar uma nova planta
router.post('/', async (req, res) => {
  const { user_id, name, type } = req.body;
  const newPlant = new Plant({ user_id, name, type });
  await newPlant.save();
  res.status(201).json({ plant_id: newPlant._id, message: "Planta cadastrada com sucesso" });
});

// Buscar todas as plantas de um usuário
router.get('/:user_id/plants', async (req, res) => {
  const plants = await Plant.find({ user_id: req.params.user_id });
  res.status(200).json(plants);
});

module.exports = router;
