import path from 'path'
import fs from 'fs'
import cors from 'cors'
import httpProxy from 'http-proxy';
import express from 'express'

const PORT = 8080;
const app = express();
const apiProxy = httpProxy.createProxyServer();

app.use(cors());
app.all("/api/*", function(req, res) {
    apiProxy.web(req, res, { target: 'http://localhost:3001' });
});

app.use(express.static("dist"))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist', 'index.html'))
});

app.listen(PORT, () => {
    console.log(`SSR running on port ${PORT}`)
});