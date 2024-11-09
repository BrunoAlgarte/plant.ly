const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateRequest = require('../middlewares/validateRequest');
const userSchema = require('../schemas/userSchema');

router.post('/', 
    validateRequest(userSchema), 
    userController.newUser
);
router.get('/:id', userController.findByIdUser);

module.exports = router;
