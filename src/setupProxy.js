const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    if (process.env.REACT_APP_IS_LOCAL === '1') {
        app.use(
            '/api',
            createProxyMiddleware({
                target: 'http://localhost:8001',
                changeOrigin: true,
            })
        );
    }
};
