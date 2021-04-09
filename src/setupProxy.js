// Proxies some routes to the backend server. Make sure to run the server
// when debugging (see README).
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    if (process.env.NODE_ENV !== 'production') {
        app.use(
            '/api/v1',
            createProxyMiddleware({
                target: 'http://[::1]:8080',
                changeOrigin: true,
            })
        );
        app.use(
            '/auth',
            createProxyMiddleware({
                target: 'http://[::1]:8080',
                changeOrigin: true,
            })
        );
    }
};