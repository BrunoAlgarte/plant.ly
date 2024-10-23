require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Conexão com o MongoDB usando a variável de ambiente
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB', err));

// Rotas
const userRoutes = require('./routes/userRoutes');
const plantRoutes = require('./routes/plantRoutes');
const authRoutes = require('./routes/authRoutes');
const speciesRoutes = require('./routes/speciesRoutes');
const sensorRoutes = require('./routes/sensorRoutes');

app.use('/v1/users', userRoutes);
app.use('/v1/plants', plantRoutes);
app.use('/v1/auth', authRoutes);
app.use('/v1/species', speciesRoutes);
app.use('/v1/sensors', sensorRoutes);

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
