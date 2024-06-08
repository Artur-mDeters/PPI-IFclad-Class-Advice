const express = require('express')
const db = require('./db/db')
const PORT = 3030

const app = express()

app.get('/',  async (req, res) => {
    try {
        const resposta = await db.query('SELECT * from usuario')
        res.json(resposta).status(200)
    } catch(err)  {
        res.json(err).status(500)
    }
})

app.listen(PORT, () => {
    try {
        console.log(`App rodando em http://localhost:${PORT}`)
    } catch(err) {
        console.error(err)
    }
}) 