const config = require('./config/config')
const http = require('http')
const app = require('./app')
const server = http.createServer(app);

const PORT = process.env.PORT || config.server.port || 3030;
server.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
