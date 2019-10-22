const http = require('http')

const configServidorWeb = require('../config/servidor-web')
const express = require('express')
const morgan = require('morgan')

const roteador = require('../servicos/roteador')

let httpServer

function inicializa() {
    return new Promise( (resolve, reject) => {

        // Carrega a função express em uma variável 
        const requestHandler = express()

        httpServer.createServer(requestHandler)

        requestHandler.use( morgan('combined') )

        requestHandler.use( '/auth_api', roteador )

        httpServer.listen(configServidorWeb.port)
        .on('listening', () => {
            console.log(`Servidor Web escutando na porta ${configServidorWeb.port}`)
            
            resolve()
        })
        .on('error', erro => {
            reject(erro)
        })
    })
}

module.exports.inicializa = inicializa()

function encerra() {
    return new Promise( (resolve, reject) => {
        httpServer.close( erro => {
            if(erro) {
                reject(erro)
                return
            }
            
            resolve()
        })
    })
}

module.exports.encerra = encerra
