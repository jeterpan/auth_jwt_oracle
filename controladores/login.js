const usuarios = require('../db_api/usuarios')

const oracledb = require('oracledb')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const configdb = require('../config/banco')
const configAuth = require('../config/login')

function post(req, res, next) {
    
}