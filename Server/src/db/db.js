const pgp = require('pg-promise')()

const dbData = {
    username: 'postgres',
    password: 'root',
    host: 'localhost',
    port: '5432',
    name: 'PPI'
}

const db = pgp(`postgres://${dbData.username}:${dbData.password}@${dbData.host}:${dbData.port}/${dbData.name}`)

module.exports = db