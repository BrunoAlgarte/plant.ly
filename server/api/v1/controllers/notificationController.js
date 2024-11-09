const Notification = require('../models/Notification');
const controller = {}

// Cria uma nova notificação
controller.createNotification = async (req, res) => {
  const { user_id, plant_id, message } = req.body;

  try {
    const newNotification = new Notification({
      user_id,
      plant_id,
      message,
      read: false,
      timestamp: new Date()
    });
    await newNotification.save();

    res.status(201).json({
      message: 'Notificação criada com sucesso',
      notification: newNotification
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao criar notificação',
      error: error.message
    });
  }
};

// Lista todas as notificações de um usuário com filtro de lidas/não lidas
controller.getNotificationsByUser = async (req, res) => {
  const { user_id } = req.params;
  const { read } = req.query;

  try {
    const filter = { user_id };
    if (read !== undefined) filter.read = read === 'true';

    const notifications = await Notification.find(filter);
    if (notifications.length === 0) {
      return res.status(404).json({ message: 'Nenhuma notificação encontrada' });
    }

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao buscar notificações',
      error: error.message
    });
  }
};

// Marca uma notificação como lida
controller.markAsRead = async (req, res) => {
  const { notification_id } = req.params;

  try {
    const notification = await Notification.findByIdAndUpdate(
      notification_id,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notificação não encontrada' });
    }

    res.status(200).json({
      message: 'Notificação marcada como lida',
      notification
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao atualizar notificação',
      error: error.message
    });
  }
};

// Deleta uma notificação
controller.deleteNotification = async (req, res) => {
  const { notification_id } = req.params;

  try {
    const notification = await Notification.findByIdAndDelete(notification_id);
    if (!notification) {
      return res.status(404).json({ message: 'Notificação não encontrada' });
    }

    res.status(200).json({
      message: 'Notificação deletada com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao deletar notificação',
      error: error.message
    });
  }
};

module.exports = controller;
