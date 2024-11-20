const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./config/config')

app.use(express.json({ limit: '100mb' }))
app.use(cors({
  origin: config.cors.origin, 
    methods: config.cors.methods,
    credentials: config.cors.credentials
}))
app.use(express.urlencoded({ limit: '100mb',extended: true }))


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB', err));


const routes = {
    users: require('./routes/user.routes'),
    plants: require('./routes/plant.routes'),
    auth: require('./routes/auth.routes'),
    species: require('./routes/species.routes'),
    sensors: require('./routes/sensor.routes'),
    notifications: require('./routes/notification.routes'),
    grafana: require('./routes/grafana.routes')
}
Object.entries(routes).forEach(([name, router]) => {
    app.use(`/v1/${name}`, router)
})

module.exports = app