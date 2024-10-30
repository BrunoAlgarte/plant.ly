const Plant = require('../models/Plant');
const User = require('../models/User');
const mongoose = require('mongoose')

const controller = {}

controller.newPlant = async (req, res) => {
    const { user_id } = req.params;
    const { name, type } = req.body;

    if (!name || !type) {
        return res.status(400).json({ message: "Nome e tipo da planta são obrigatórios" });
    }
    
    try {

        const user = await User.findById(req.params.user_id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
    
        // Criar e salvar a planta
        const newPlant = new Plant({ user_id, name, type });
        await newPlant.save();
    
        // Associar a planta ao usuário
        user.plants.push(newPlant._id);
        await user.save();
    
        res.status(201).json({ 
            plant_id: newPlant._id, message: "Planta cadastrada com sucesso e associada ao usuário e à espécie" 
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao cadastrar a planta", error });
    }
};

// Buscar todas as plantas de um usuário
controller.findAllPlants = async (req, res) => {
    const { user_id } = req.params; 
    if (!mongoose.isValidObjectId(user_id)) {
        return res.status(400).json({ message: "ID do usuário inválido" });
    }

    try {
        const plants = await Plant.find({ user_id });
        
        if (!plants.length) {
            return res.status(404).json({ message: "Nenhuma planta encontrada para este usuário" });
        }
        res.status(200).json(plants);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar plantas", error });
    }
};

// Obter detalhes de uma planta
controller.findByIdPlants = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "ID da planta inválido" });
    }
    try {
        const plant = await Plant.findById(id);
        if (!plant) {
            return res.status(404).json({ message: "Planta não encontrada" });
        }
        res.status(200).json(plant);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar detalhes da planta", error });
    }
};

controller.deletePlant = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "ID da planta inválido" });
    }

    try {
        const plant = await Plant.findByIdAndDelete(id);

        if (!plant) {
            return res.status(404).json({ message: "Planta não encontrada" });
        }

        // Remover a planta da lista de plantas do usuário
        const userUpdateResult = await User.updateOne(
            { _id: plant.user_id },
            { $pull: { plants: plant._id } }
        );

        // Verificar se a atualização do usuário foi bem-sucedida
        if (userUpdateResult.nModified === 0) {
            return res.status(404).json({ message: "Usuário não encontrado ou planta não estava associada ao usuário" });
        }

        console.log(`Planta ${plant._id} deletada com sucesso do usuário ${plant.user_id}.`);

        res.status(200).json({ message: "Planta deletada com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar planta:", error);
        res.status(500).json({ message: "Erro ao deletar planta", error });
    }
};

module.exports = controller;