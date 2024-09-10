const express = require('express')
const sectorController = require('../controller/Sector.controller')

const routes = express.Router()

routes.post('/setores', sectorController.addSector)
routes.get('/setores', sectorController.getSectors)
routes.put('/setores/:id', sectorController.editSectors)
routes.delete('/setores/:id', sectorController.excludeSectors)
routes.get('/setores/:id', sectorController.getSectorsByID)

module.exports = routes