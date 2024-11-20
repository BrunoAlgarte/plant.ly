const Plant = require('../models/Plant');
const User = require('../models/User');
const mongoose = require('mongoose');

const controller = {}

controller.newPlant = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { name, type, image } = req.body;

        if (!name || !type) {
            return res.status(400).json({ message: "Nome e tipo da planta são obrigatórios" });
        }

        if (image && !image.match(/^data:image\/(jpeg|png|gif);base64,/)) {
            return res.status(400).json({ message: "Formato de imagem inválido" });
        }

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const newPlant = new Plant({
            user_id,
            name,
            type,
            image
        });

        await newPlant.save();
        user.plants.push(newPlant._id);
        await user.save();

        res.status(201).json({
            plant_id: newPlant._id,
            message: "Planta cadastrada com sucesso"
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao cadastrar a planta", error });
    }
};


controller.findAllPlants = async (req, res) => {
    const { user_id } = req.params;

    if (!mongoose.isValidObjectId(user_id)) {
        return res.status(400).json({ message: "ID do usuário inválido" });
    }

    try {

        const userExists = await User.exists({ _id: user_id });
        if (!userExists) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }


        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const [plants, total] = await Promise.all([
            Plant.find({ user_id })
                .select('name type image date_created')
                .sort({ date_created: -1 })
                .skip(skip)
                .limit(limit),
            Plant.countDocuments({ user_id })
        ]);
        
        if (!plants.length) {
            return res.status(404).json({ message: "Nenhuma planta encontrada para este usuário" });
        }

        res.status(200).json({
            plants,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
                hasMore: total > skip + plants.length
            }
        });
    } catch (error) {
        console.error('Erro ao buscar plantas:', error);
        res.status(500).json({ 
            message: "Erro ao buscar plantas",
            error: error.message 
        });
    }
};


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

        const userUpdateResult = await User.updateOne(
            { _id: plant.user_id },
            { $pull: { plants: plant._id } }
        );

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