const express = require('express')
const PORT = 3030

const app = express()

app.listen(PORT, () => {
    try {
        console.log(`App rodando em http://localhost:${PORT}`)
    } catch(err) {
        console.error(err)
    }
}) 