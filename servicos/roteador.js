const express = require('express')
const roteador = new express.Router()

const login = require('../controllers/login')
const publico = require('../controllers/publico')
const privado = require('../controllers/privado')

roteador.route('/publico').get(publico.get)
roteador.route('/privado').get(privado.get)
roteador.route('/login').get(login.get)

module.exports.roteador = roteador