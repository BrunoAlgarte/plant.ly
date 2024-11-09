const SensorData = require('../models/SensorData');

// Função para obter registros filtrados por query parameters
exports.getSensorData = async (req, res) => {
  const { plantid, startDate, endDate, week, limit } = req.query;

  if (!plantid) {
    return res.status(400).json({ error: 'plantid é obrigatório' });
  }

  const query = {
    plant_id: plantid
  };

  if (startDate) {
    query.timestamp = { $gte: new Date(startDate) };
  }

  if (endDate) {
    query.timestamp = query.timestamp || {};
    query.timestamp.$lte = new Date(endDate);
  }

  if (week) {
    query.week = parseInt(week);
  }

  try {
    const data = await SensorData.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit) || 100); // Limite de 100 registros por padrão
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para obter o último registro
exports.getLastSensorData = async (req, res) => {
  const { plantid } = req.query;

  if (!plantid) {
    return res.status(400).json({ error: 'plantid é obrigatório' });
  }

  try {
    const lastData = await SensorData.findOne({ plant_id: plantid })
      .sort({ timestamp: -1 });
    if (!lastData) {
      return res.status(404).json({ error: 'Nenhum dado encontrado' });
    }
    res.json(lastData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
