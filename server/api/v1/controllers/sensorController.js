const SensorData = require('../models/SensorData');

// Função para obter registros filtrados por query parameters
const getSensorData = async (req) => {
  const { plantid, startDate, endDate, week, limit } = req.query;

  if (!plantid) {
    throw new Error('plantid é obrigatório');
  }

  const query = { plant_id: plantid };

  if (startDate) query.timestamp = { $gte: new Date(startDate) };
  if (endDate) query.timestamp = { ...query.timestamp, $lte: new Date(endDate) };
  if (week) query.week = parseInt(week);

  const data = await SensorData.find(query).sort({ timestamp: -1 }).limit(parseInt(limit) || 100);
  return data;
};

// Função para calcular a média
exports.getAverage = async (req, res) => {
  try {
    const data = await getSensorData(req);
    const totalTemperature = data.reduce((acc, item) => acc + item.temperature_air, 0);
    const totalHumidity = data.reduce((acc, item) => acc + item.humidity_air, 0);

    const averageTemperature = totalTemperature / data.length;
    const averageHumidity = totalHumidity / data.length;

    res.json({
      'Média temperatura do ar': averageTemperature.toFixed(2),
      'Média umidade do ar': averageHumidity.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para calcular a moda
exports.getMode = async (req, res) => {
  try {
    const data = await getSensorData(req);

    const mode = (values) => {
      const frequency = {};
      let maxFreq = 0;
      let mode = null;

      values.forEach((value) => {
        frequency[value] = (frequency[value] || 0) + 1;
        if (frequency[value] > maxFreq) {
          maxFreq = frequency[value];
          mode = value;
        }
      });

      return mode;
    };

    const temperatures = data.map(item => item.temperature_air);
    const humidities = data.map(item => item.humidity_air);

    const modeTemperature = mode(temperatures);
    const modeHumidity = mode(humidities);

    res.json({
      'Moda temperatura do ar': modeTemperature,
      'Moda umidade do ar': modeHumidity,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para calcular a mediana
exports.getMedian = async (req, res) => {
  try {
    const data = await getSensorData(req);

    const median = (values) => {
      const sorted = values.slice().sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    };

    const temperatures = data.map(item => item.temperature_air);
    const humidities = data.map(item => item.humidity_air);

    const medianTemperature = median(temperatures);
    const medianHumidity = median(humidities);

    res.json({
      'Mediana temperatura do ar': medianTemperature,
      'Mediana umidade do ar': medianHumidity,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para calcular o desvio padrão
exports.getStandardDeviation = async (req, res) => {
  try {
    const data = await getSensorData(req);

    const standardDeviation = (values) => {
      const mean = values.reduce((acc, value) => acc + value, 0) / values.length;
      const variance = values.reduce((acc, value) => acc + (value - mean) ** 2, 0) / values.length;
      return Math.sqrt(variance);
    };

    const temperatures = data.map(item => item.temperature_air);
    const humidities = data.map(item => item.humidity_air);

    const stdDevTemperature = standardDeviation(temperatures);
    const stdDevHumidity = standardDeviation(humidities);

    res.json({
      'Desvio padrão temperatura do ar': stdDevTemperature.toFixed(2),
      'Desvio padrão umidade do ar': stdDevHumidity.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para calcular a assimetria (skewness)
exports.getSkewness = async (req, res) => {
  try {
    const data = await getSensorData(req);

    const skewness = (values) => {
      const mean = values.reduce((acc, value) => acc + value, 0) / values.length;
      const variance = values.reduce((acc, value) => acc + (value - mean) ** 2, 0) / values.length;
      const stdDev = Math.sqrt(variance);
      return values.reduce((acc, value) => acc + ((value - mean) / stdDev) ** 3, 0) / values.length;
    };

    const temperatures = data.map(item => item.temperature_air);
    const humidities = data.map(item => item.humidity_air);

    const skewnessTemperature = skewness(temperatures);
    const skewnessHumidity = skewness(humidities);

    res.json({
      'Assimetria temperatura do ar': skewnessTemperature.toFixed(2),
      'Assimetria umidade do ar': skewnessHumidity.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para calcular a regressão linear (projeção futura)
exports.getRegression = async (req, res) => {
  try {
    const data = await getSensorData(req);

    const linearRegression = (values) => {
      const n = values.length;
      const x = Array.from({ length: n }, (_, i) => i + 1);
      const sumX = x.reduce((acc, value) => acc + value, 0);
      const sumY = values.reduce((acc, value) => acc + value, 0);
      const sumXY = x.reduce((acc, value, index) => acc + value * values[index], 0);
      const sumX2 = x.reduce((acc, value) => acc + value ** 2, 0);

      const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
      const intercept = (sumY - slope * sumX) / n;

      return { slope, intercept };
    };

    const temperatures = data.map(item => item.temperature_air);
    const humidities = data.map(item => item.humidity_air);

    const tempRegression = linearRegression(temperatures);
    const humidityRegression = linearRegression(humidities);

    res.json({
      'Projeção futura temperatura do ar': tempRegression,
      'Projeção futura umidade do ar': humidityRegression,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para retornar os dados dos sensores diretamente
exports.getSensorData = async (req, res) => {
  try {
    const data = await getSensorData(req);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para obter o último registro
exports.getLastSensorData = async (req, res) => {
  try {
    const { plantid } = req.query;

    if (!plantid) {
      throw new Error('plantid é obrigatório');
    }

    const lastData = await SensorData.findOne({ plant_id: plantid }).sort({ timestamp: -1 });
    res.json(lastData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
