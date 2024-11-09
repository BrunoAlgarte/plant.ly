const Species = require('../models/PlantSpecies');
const mongoose = require('mongoose');

const controller = {}


// Buscar dados de uma espécie por nome
controller.findByName = async (req, res) => {
    const name = req.params.name; // Obtendo o nome da espécie a partir dos parâmetros da requisição

    try {
        const species = await Species.findOne({ name }); // Buscando a espécie pelo nome
        if (!species) {
            return res.status(404).json({ message: 'Espécie não encontrada' });
        }
        res.status(200).json(species);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar dados da espécie', error });
    }
};

module.exports = controller;
