const express = require('express');
const router = express.Router();
const Species = require('../models/plantSpeciesModel');

// Buscar dados de uma espécie específica
router.get('/:id', async (req, res) => {
  try {
    const species = await Species.findById(req.params.id);
    if (!species) {
      return res.status(404).json({ message: 'Espécie não encontrada' });
    }
    res.status(200).json(species);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar dados da espécie', error });
  }
});

// Cadastrar uma nova espécie
router.post('/', async (req, res) => {
  const { name, scientific_name, watering_tips, sunlight_tips, soil_tips, temperature_min, temperature_max, growth_time } = req.body;

  try {
    // Verificar se a espécie já existe pelo nome
    const speciesExists = await Species.findOne({ name });
    if (speciesExists) {
      return res.status(400).json({ message: 'Espécie já cadastrada' });
    }

    // Criar uma nova espécie
    const newSpecies = new Species({
      name,
      scientific_name,
      watering_tips,
      sunlight_tips,
      soil_tips,
      temperature_min,
      temperature_max,
      growth_time
    });

    // Salvar a espécie no banco de dados
    await newSpecies.save();

    res.status(201).json({
      message: 'Espécie cadastrada com sucesso',
      species: newSpecies
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar a espécie', error });
  }
});

// Deletar uma espécie
router.delete('/:id', async (req, res) => {
  try {
    const species = await Species.findByIdAndDelete(req.params.id);
    if (!species) {
      return res.status(404).json({ message: 'Espécie não encontrada' });
    }

    res.status(200).json({ message: 'Espécie deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a espécie', error });
  }
});

module.exports = router;
