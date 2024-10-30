const User = require('../models/User')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')

const controller = {}

controller.newUser  = async (req, res) => {
    const { name, email, password, plants } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: 'Nome, email e senha são obrigatórios.'
        });
    }

    try {
        // Verificar se o email já está em uso
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return res.status(409).json({
                message: 'Email já está em uso.'
            });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criação do usuário
        const newUser  = new User({
            name,
            email,
            password: hashedPassword,
            plants: plants || []
        });

        // Salvando no banco de dados
        const savedUser  = await newUser.save();

        res.status(201).json({
            message: 'Usuário criado com sucesso!',
            user: {
                id: savedUser ._id,
                name: savedUser .name,
                email: savedUser .email,
                plants: savedUser .plants
            }
        });
    } catch (error) {
        console.error(error); 
        res.status(500).json({message: 'Erro ao criar o usuário',error: error.message});
    }
};

// Rota para buscar um usuário por ID (GET)
controller.findByIdUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "ID da planta inválido" });
    }

    try {

        const user = await User.findById(id);
    
        // Se o usuário não for encontrado, retorna 404
        if (!user) {
            return res.status(404).json({message: 'Usuário não encontrado'});
        }

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            plants: user.plants
        });
    } catch (error) {
        console.error(error); 
        res.status(500).json({message: 'Erro ao buscar o usuário', error: error.message});
    }
};

module.exports = controller;