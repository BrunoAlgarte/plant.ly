const express = require('express')
const router = express.Router()
const controller = require('../controllers/notificationController')

router.get('/',  controller.getNotificationsByUser)
router.post('/', controller.createNotification)
router.patch('/', controller.markAsRead)
router.delete('/', controller.deleteNotification)

module.exports = router;