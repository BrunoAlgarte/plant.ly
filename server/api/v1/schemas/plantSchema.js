const Joi = require('joi')

const plantSchema = Joi.object({
    user_id: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            'string.hex': 'ID do usuário inválido',
            'string.length': 'ID do usuário inválido',
            'any.required': 'ID do usuário é obrigatório'
        }),

    name: Joi.string()
        .required()
        .trim()
        .min(2)
        .max(50)
        .messages({
            'string.empty': 'Nome da planta é obrigatório',
            'string.min': 'Nome deve ter no mínimo 2 caracteres',
            'string.max': 'Nome deve ter no máximo 50 caracteres',
            'any.required': 'Nome da planta é obrigatório'
        }),

    type: Joi.string()
        .required()
        .trim()
        .messages({
            'string.empty': 'Tipo da planta é obrigatório',
            'any.required': 'Tipo da planta é obrigatório'
        }),

    image: Joi.string()
        .messages({
            'string.empty': 'Imagem da planta é obrigatório',
            'any.required': 'Imagem da planta é obrigatório'
        }),

    date_created: Joi.date()
        .default(Date.now)
        .messages({
            'date.base': 'Data de criação inválida'
        })
})

module.exports = plantSchema 