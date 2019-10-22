const express = require('express')
app = express()
app.use(express.json())

const login = require('../db_api/login')


async function post(req, res, next) {
    try {
        const contexto = {}

        contexto = req.body.usuario

        const linhas = await login.consulta(contexto)
    }
}