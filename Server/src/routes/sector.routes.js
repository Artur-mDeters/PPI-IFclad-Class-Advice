const express = require('express')
const sectorController = require('../controller/Sector.controller')

const routes = express.Router()

routes.post('/setores', sectorController.addSector)

module.exports = routes