const express = require('express');
const router = express.Router();
const controller = require('../controllers/specieController');

// Rota para buscar a espécie pelo nome
router.get('/name/:name', controller.findByName); // Aqui estamos definindo a nova rota

module.exports = router;
