const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', 
    createProxyMiddleware({
      target: 'https://psa-development.marinerfinance.io',
      changeOrigin: true,
    })
  );

};