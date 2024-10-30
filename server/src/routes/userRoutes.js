const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/', controller.newUser)
router.get('/:id', controller.findByIdUser)

module.exports = router;
