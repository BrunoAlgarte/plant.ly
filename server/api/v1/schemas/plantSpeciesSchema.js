const Joi = require('joi')

const plantSpeciesSchema = Joi.object({
    name: Joi.string()
        .required()
        .trim()
        .messages({
            'string.empty': 'O nome da espécie é obrigatório',
            'any.required': 'O nome da espécie é obrigatório'
        }),

    scientific_name: Joi.string()
        .trim()
        .allow('')
        .optional()
        .messages({
            'string.base': 'Nome científico deve ser texto'
        }),

    watering_tips: Joi.string()
        .trim()
        .allow('')
        .optional()
        .messages({
            'string.base': 'Dicas de rega devem ser texto'
        }),

    sunlight_tips: Joi.string()
        .trim()
        .allow('')
        .optional()
        .messages({
            'string.base': 'Dicas de luz solar devem ser texto'
        }),

    soil_tips: Joi.string()
        .trim()
        .allow('')
        .optional()
        .messages({
            'string.base': 'Dicas de solo devem ser texto'
        }),

    temperature_min: Joi.number()
        .allow(null)
        .optional()
        .min(-50)
        .max(50)
        .messages({
            'number.base': 'Temperatura mínima deve ser um número',
            'number.min': 'Temperatura mínima muito baixa',
            'number.max': 'Temperatura mínima muito alta'
        }),

    temperature_max: Joi.number()
        .allow(null)
        .optional()
        .min(-50)
        .max(50)
        .messages({
            'number.base': 'Temperatura máxima deve ser um número',
            'number.min': 'Temperatura máxima muito baixa',
            'number.max': 'Temperatura máxima muito alta'
        }),

    growth_time: Joi.string()
        .trim()
        .allow('')
        .optional()
        .messages({
            'string.base': 'Tempo de crescimento deve ser texto'
        })
})
    .custom((value, helpers) => {
        if (value.temperature_min && value.temperature_max && 
            value.temperature_min > value.temperature_max) {
            return helpers.error('custom.temperature', {
                message: 'Temperatura mínima não pode ser maior que a máxima'
            })
        }
        return value
    })

module.exports = plantSpeciesSchema 