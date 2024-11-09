const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))



mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB', err));


const userRoutes = require('./routes/userRoutes');
app.use('/v1/users', userRoutes);

const plantRoutes = require('./routes/plantRoutes');
app.use('/v1/plants', plantRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/v1/auth', authRoutes);

const speciesRoutes = require('./routes/speciesRoutes');
app.use('/v1/species', speciesRoutes);

const sensorRoutes = require('./routes/sensorRoutes');
app.use('/v1/sensors', sensorRoutes);

const notificationRoutes = require('./routes/notificationRoutes')
app.use('/v1/notifications', notificationRoutes)

module.exports = app;