const express = require('express');
const apresentationController = require('../controller/apresentation.controller');

const routes = express.Router();

routes.get('/apresentation/:id', apresentationController.getAllForApresentation);

module.exports = routes;
