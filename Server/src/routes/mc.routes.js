const express = require('express')
const mcController = require('../controller/mc.controller')

const routes = express.Router()

routes.post('/addGrupoMostra', mcController.addMc)
routes.get('/mostra', mcController.getMostra)

module.exports = routes