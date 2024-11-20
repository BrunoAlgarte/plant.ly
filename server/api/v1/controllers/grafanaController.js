const axios = require('axios');

const controller = {}

controller.proxyGrafana = async (req, res) => {
  try {
    const response = await axios.get(
      'https://brunoalgter.grafana.net/public-dashboards/c35726a3560941c5af48617424b9ddb1',
      {
        headers: {
          'Origin': process.env.FRONTEND_URL || 'http://localhost:3001',
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    );

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(response.data);
  } catch (error) {
    console.error('Erro ao acessar Grafana:', error);
    res.status(500).json({ error: 'Erro ao acessar dashboard' });
  }
};

module.exports = controller;