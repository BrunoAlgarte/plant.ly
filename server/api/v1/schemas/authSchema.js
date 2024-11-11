const Joi = require('joi')

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Email inválido',
            'string.empty': 'Email é obrigatório',
            'any.required': 'Email é obrigatório'
        }),
    
    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Senha é obrigatória',
            'any.required': 'Senha é obrigatória'
        })
})

const resetPasswordSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Email inválido',
            'string.empty': 'Email é obrigatório',
            'any.required': 'Email é obrigatório'
        }),
    
    current_password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Senha atual é obrigatória',
            'any.required': 'Senha atual é obrigatória'
        }),
    
    new_password: Joi.string()
        .min(6)
        .required()
        .not(Joi.ref('current_password'))
        .messages({
            'string.empty': 'Nova senha é obrigatória',
            'string.min': 'Nova senha deve ter no mínimo 6 caracteres',
            'any.required': 'Nova senha é obrigatória',
            'any.invalid': 'Nova senha deve ser diferente da senha atual'
        }),
    
    password_validation: Joi.string()
        .required()
        .messages({
            'string.empty': 'Confirmação de senha é obrigatória',
            'any.required': 'Confirmação de senha é obrigatória'
        })
})

module.exports = {
    loginSchema,
    resetPasswordSchema
} 