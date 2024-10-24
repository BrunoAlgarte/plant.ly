const express = require('express');
const router = express.Router();
const Plant = require('../models/plantModel');
const User = require('../models/userModel');
const Species = require('../models/plantSpeciesModel');

// Cadastrar uma nova planta e associá-la ao usuário e à espécie
router.post('/', async (req, res) => {
  try {
    const { user_id, name, type } = req.body;

    // Verificar se o usuário existe
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Verificar se a espécie existe
    const species = await Species.findOne({ name: type });
    if (!species) {
      return res.status(404).json({ message: "Espécie não encontrada" });
    }

    // Criar e salvar a planta
    const newPlant = new Plant({ user_id, name, type });
    await newPlant.save();

    // Associar a planta ao usuário
    user.plants.push(newPlant._id);
    await user.save();

    res.status(201).json({ plant_id: newPlant._id, message: "Planta cadastrada com sucesso e associada ao usuário e à espécie" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao cadastrar a planta", error });
  }
});

// Buscar todas as plantas de um usuário
router.get('/:user_id/plants', async (req, res) => {
  try {
    const plants = await Plant.find({ user_id: req.params.user_id });
    if (!plants.length) {
      return res.status(404).json({ message: "Nenhuma planta encontrada para este usuário" });
    }
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar plantas", error });
  }
});

// Obter detalhes de uma planta específica
router.get('/:id', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: "Planta não encontrada" });
    }
    res.status(200).json(plant);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar detalhes da planta", error });
  }
});

// Deletar uma planta
router.delete('/:id', async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: "Planta não encontrada" });
    }

    // Remover a planta da lista de plantas do usuário
    await User.updateOne({ _id: plant.user_id }, { $pull: { plants: plant._id } });

    res.status(200).json({ message: "Planta deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar planta", error });
  }
});

module.exports = router;
