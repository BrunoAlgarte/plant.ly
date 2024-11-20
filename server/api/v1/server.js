const config = require('./config/config')
const http = require('http')
const app = require('./app')
const server = http.createServer(app);

const PORT = config.cors.PORT || 3030;
server.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
