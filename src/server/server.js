import path from 'path'
import fs from 'fs'
import cors from 'cors'
import { createProxyMiddleware } from 'http-proxy-middleware';

import express from 'express'

const PORT = 8080;
const app = express();

app.use(cors());

app.use('/api', createProxyMiddleware({ target: 'http://localhost:3001', origin: true, proxyTimeout: 60000 }));

app.use(express.static("dist"))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist', 'index.html'))
});

app.listen(PORT, () => {
    console.log(`SSR running on port ${PORT}`)
});