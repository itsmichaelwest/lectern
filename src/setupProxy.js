// Proxies some routes to the backend server. Make sure to run the server
// when debugging (see README).
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
        target: 'http://localhost:8080',
        changeOrigin: true,
    })
  );
  app.use(
    '/auth',
    createProxyMiddleware({
        target: 'http://localhost:8080',
        changeOrigin: true,
    })
  );
};