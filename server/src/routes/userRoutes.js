const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Assumindo que seu model de usuário está em models/User.js

// Rota para criar um novo usuário (POST)
router.post('/', async (req, res) => {
  try {
    // Criação do usuário com os dados enviados no corpo da requisição
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,  // Não se esqueça de adicionar hash da senha
      plants: req.body.plants || [] // Caso tenha plantas associadas
    });

    // Salvando no banco de dados
    const savedUser = await newUser.save();

    // Resposta com mensagem personalizada e dados do usuário criado
    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      id: savedUser._id,  // O ID do usuário recém-criado
      user: {
        name: savedUser.name,
        email: savedUser.email,
        plants: savedUser.plants
      }
    });
  } catch (error) {
    // Em caso de erro, retornar uma resposta com status 500
    res.status(500).json({
      message: 'Erro ao criar o usuário',
      error: error.message
    });
  }
});

// Rota para buscar um usuário por ID (GET)
router.get('/:id', async (req, res) => {
  try {
    // Busca o usuário pelo ID
    const user = await User.findById(req.params.id);

    // Se o usuário não for encontrado, retorna 404
    if (!user) {
      return res.status(404).json({
        message: 'Usuário não encontrado'
      });
    }

    // Se o usuário for encontrado, retorna os dados dele
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      plants: user.plants
    });
  } catch (error) {
    // Em caso de erro, retorna status 500 com a mensagem de erro
    res.status(500).json({
      message: 'Erro ao buscar o usuário',
      error: error.message
    });
  }
});

module.exports = router;
