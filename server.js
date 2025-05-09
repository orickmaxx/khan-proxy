const express = require('express');
const httpProxy = require('http-proxy');
const path = require('path');

const app = express();
const proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    secure: true, // Verifica certificados HTTPS
    followRedirects: true // Segue redirecionamentos
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rota do proxy
app.use('/proxy', (req, res) => {
    const targetUrl = req.url.replace(/^\/+/, '');
    if (!targetUrl.startsWith('http')) {
        return res.status(400).send('URL inválida');
    }
    proxy.web(req, res, { target: targetUrl }, (err) => {
        console.error('Erro no proxy:', err);
        res.status(500).send('Erro no proxy: ' + err.message);
    });
});

// Injetar o script
proxy.on('proxyRes', (proxyRes, req, res) => {
    let body = [];
    proxyRes.on('data', (chunk) => body.push(chunk));
    proxyRes.on('end', () => {
        try {
            let html = Buffer.concat(body).toString();
            const script = `
                <script>
                    fetch("https://raw.githubusercontent.com/Niximkk/Khanware/refs/heads/main/Khanware.js")
                        .then(t => t.text())
                        .then(code => eval(code))
                        .catch(err => console.error("Erro ao carregar Khanware.js:", err));
                </script>
            `;
            html = html.replace('</body>', `${script}</body>`);
            res.setHeader('Content-Type', 'text/html');
            res.write(html);
            res.end();
        } catch (err) {
            console.error('Erro ao processar resposta:', err);
            res.status(500).send('Erro ao processar resposta');
        }
    });
});

// Tratamento de erros do proxy
proxy.on('error', (err, req, res) => {
    console.error('Erro no proxy:', err);
    res.status(500).send('Erro no proxy: ' + err.message);
});

module.exports = app;