const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true // remove campos não definidos no schema
        })

        if (error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({ errors })
        }

        // Substitui o body com os dados validados
        req.body = value
        next()
    }
}

module.exports = validateRequest 