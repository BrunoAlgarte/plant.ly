const express = require('express');
const router = express.Router();
const validateRequest = require('../middlewares/validateRequest');
const controller = require('../controllers/authController');
const { loginSchema, resetPasswordSchema } = require('../schemas/authSchema');

router.post('/login', 
    validateRequest(loginSchema),
    controller.login
)

router.patch('/resetPassword', 
    validateRequest(resetPasswordSchema), 
    controller.resetPassword
)

module.exports = router;
