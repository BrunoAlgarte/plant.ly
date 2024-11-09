const Joi = require('joi')

const userSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'string.empty': 'O nome é obrigatório',
            'any.required': 'O nome é obrigatório'
        }),
    
    last_name: Joi.string()
        .required()
        .messages({
            'string.empty': 'O sobrenome é obrigatório',
            'any.required': 'O sobrenome é obrigatório'
        }),
    
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Email inválido',
            'string.empty': 'O email é obrigatório',
            'any.required': 'O email é obrigatório'
        }),
    
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.min': 'A senha deve ter no mínimo 6 caracteres',
            'string.empty': 'A senha é obrigatória',
            'any.required': 'A senha é obrigatória'
        }),
    
    plants: Joi.array()
        .items(Joi.string().hex().length(24))  // Formato do MongoDB ObjectId
        .default([])
})

module.exports = userSchema 