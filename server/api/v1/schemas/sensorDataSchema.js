const Joi = require('joi')

const sensorDataSchema = Joi.object({
    plant_id: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            'string.hex': 'ID da planta inválido',
            'string.length': 'ID da planta inválido',
            'any.required': 'ID da planta é obrigatório'
        }),

    temperature_air: Joi.number()
        .required()
        .min(-50)
        .max(100)
        .messages({
            'number.base': 'Temperatura deve ser um número',
            'number.min': 'Temperatura muito baixa',
            'number.max': 'Temperatura muito alta',
            'any.required': 'Temperatura do ar é obrigatória'
        }),

    humidity_air: Joi.number()
        .required()
        .min(0)
        .max(100)
        .messages({
            'number.base': 'Umidade deve ser um número',
            'number.min': 'Umidade não pode ser menor que 0%',
            'number.max': 'Umidade não pode ser maior que 100%',
            'any.required': 'Umidade do ar é obrigatória'
        }),

    soil_moisture: Joi.string()
        .required()
        .messages({
            'string.empty': 'Umidade do solo é obrigatória',
            'any.required': 'Umidade do solo é obrigatória'
        }),

    timestamp: Joi.date()
        .default(Date.now)
        .messages({
            'date.base': 'Data inválida'
        }),

    week: Joi.number()
        .integer()
        .min(1)
        .max(53)
        .required()
        .messages({
            'number.base': 'Semana deve ser um número',
            'number.integer': 'Semana deve ser um número inteiro',
            'number.min': 'Semana deve ser maior que 0',
            'number.max': 'Semana deve ser menor ou igual a 53',
            'any.required': 'Semana é obrigatória'
        })
})

module.exports = sensorDataSchema 