const mongoose = require('mongoose')

const esquema = new mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, required: true, index: { unique: true } },
    password: {type: String, required: true},
    list_plants: [
        {
            name: String,
            type: String,
            date_created: Date
        },    
    ]
})

module.exports = mongoose.model('User', esquema, 'users')