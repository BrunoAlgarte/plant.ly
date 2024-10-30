const SensorData = require('../models/SensorData'); // Certifique-se de importar o modelo SensorData

const controller = {}

controller.getDataSensor = async (req, res) => {
    const {
        plant_id,
        plant,
        start_date,
        end_date,
        temperature_min,
        temperature_max,
        humidity_min,
        humidity_max,
        soil_moisture_status,
        limit = 10, // Limite padrão
        page = 1 // Página padrão
    } = req.query;

    // Validação de parâmetros
    if (limit <= 0 || page <= 0) {
        return res.status(400).json({ message: 'Limite e página devem ser maiores que zero.' });
    }

    let filter = {};

    if (plant) {
        filter.plant = plant
    }
    if (plant_id) {
        filter.plant_id = plant_id;
    }

    if (start_date && end_date) {
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ message: 'Datas inválidas fornecidas.' });
        }
        filter.timestamp = { $gte: startDate, $lte: endDate };
    }

    if (temperature_min && temperature_max) {
        filter.temperature_air = { $gte: Number(temperature_min), $lte: Number(temperature_max) };
    }

    if (humidity_min && humidity_max) {
        filter.humidity_air = { $gte: Number(humidity_min), $lte: Number(humidity_max) };
    }

    if (soil_moisture_status) {
        filter.soil_moisture = soil_moisture_status;
    }

    try {
        const sensorData = await SensorData.find(filter)
            .limit(Number(limit))
            .skip((page - 1) * limit);

        const total = await SensorData.countDocuments(filter); // Contar total de documentos que correspondem ao filtro

        res.status(200).json({
            total,
            page: Number(page),
            limit: Number(limit),
            data: sensorData
        });
    } catch (error) {
        console.error(error); // Log do erro para depuração
        res.status(500).json({ message: 'Erro ao buscar os dados do sensor', error: error.message });
    }
};

module.exports = controller;