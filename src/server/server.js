import path from 'path'
import fs from 'fs'
import cors from 'cors'

import express from 'express'
const PORT = 3000;
const app = express();


app.use(cors());

app.use(express.static("dist"))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist', 'index.html'))
});

app.listen(PORT, () => {
    console.log(`SSR running on port ${PORT}`)
});