const Species = require('../models/PlantSpecies');
const mongoose = require('mongoose')

const controller = {}

// Buscar dados de uma espécie po ID
controller.findById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "ID da espécie inválido" });
    }

    try {
        const species = await Species.findById(id);
        if (!species) {
        return res.status(404).json({ message: 'Espécie não encontrada' });
        }
        res.status(200).json(species);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar dados da espécie', error });
    }
};


module.exports = controller;