const express = require('express');
const router = express.Router();
const validateRequest = require('../middlewares/validateRequest');
const { notificationSchema } = require('../schemas/notificationSchema');
const controller = require('../controllers/notificationController');

router.get('/',  controller.getNotificationsByUser);
router.post('/', 
    validateRequest(notificationSchema), 
    controller.createNotification);
router.patch('/', controller.markAsRead);
router.delete('/', controller.deleteNotification);

module.exports = router;