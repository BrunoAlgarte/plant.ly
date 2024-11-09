const Joi = require('joi')

const notificationSchema = Joi.object({
    user_id: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            'string.hex': 'ID do usuário inválido',
            'string.length': 'ID do usuário inválido',
            'any.required': 'ID do usuário é obrigatório'
        }),

    plant_id: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            'string.hex': 'ID da planta inválido',
            'string.length': 'ID da planta inválido',
            'any.required': 'ID da planta é obrigatório'
        }),

    message: Joi.string()
        .required()
        .trim()
        .min(1)
        .max(500)
        .messages({
            'string.empty': 'Mensagem é obrigatória',
            'string.min': 'Mensagem não pode estar vazia',
            'string.max': 'Mensagem muito longa (máximo 500 caracteres)',
            'any.required': 'Mensagem é obrigatória'
        }),

    read: Joi.boolean()
        .default(false)
        .messages({
            'boolean.base': 'Campo read deve ser um booleano'
        }),

    timestamp: Joi.date()
        .default(Date.now)
        .messages({
            'date.base': 'Data inválida'
        })
})

module.exports = notificationSchema 