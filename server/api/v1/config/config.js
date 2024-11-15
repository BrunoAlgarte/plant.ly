require('dotenv').config()

const config = {
  // Configurações do Servidor
    server: {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development',
    },

  // Configurações do MongoDB
    database: {
        url: process.env.MONGO_URI || 'mongodb://localhost:27017/seu_banco',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },

  // Configurações de CORS
    cors: {
        origin: process.env.CORS_ORIGIN?.split(',') || '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    },

  // Outras configurações da aplicação
    app: {
        apiPrefix: '/v1',
        uploadDir: process.env.UPLOAD_DIR || 'uploads/',
    }
}

// Validação de configurações críticas
const requiredEnvs = [
    'MONGO_URI'
]

const missingEnvs = requiredEnvs.filter(env => !process.env[env])
if (missingEnvs.length) {
    throw new Error(`Variáveis de ambiente obrigatórias não definidas: ${missingEnvs.join(', ')}`)
}

module.exports = config