require('dotenv').config();
const http = require('http')
const app = require('./app')
const server = http.createServer(app);


// Porta do servidor
const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
