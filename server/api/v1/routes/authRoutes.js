const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController')

router.post('/login', controller.login)
router.patch('/resetPassword', controller.resetPassword)

module.exports = router;
