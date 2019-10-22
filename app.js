const servidorWeb = require('./servicos/servidor-web')
const configBanco = require('./config/banco')
const banco = require('./servicos/banco')

const defaultThreadPoolSize = 4
process.env.UV_THREADPOOL_SIZE = configBanco.dadosParaConexao.poolMax + defaultThreadPoolSize

async function iniciaApp() {
    console.log('Iniciando a aplicação...')

    try {
        await servidorWeb.inicializa()

    } catch (erro) {
        console.log(erro)

        process.exit(1)
    }

    try {
        await banco.inicializa()

    } catch (erro) {
        console.log(erro)

        process.exit(1)
    }
}

iniciaApp()

async function finalizaApp(e) {

    let erro = e

    console.log('Finalizando aplicação...')

    try {
        console.log('Fechando o servidor web...')
        
        await servidorWeb.encerra()
    } catch (err) {
        console.log(err)

        erro = erro || err
    }

    try {
        console.log('Encerrando o modulo de Banco de dados...');

        await database.encerra(); 
    } catch (e) {
        console.log('Erro encontrado ao encerrar pool de conexoes: ', e);

        erro = erro || e;
    }

    if(erro) {
        process.exit(1)
    } else {
        process.exit(0)
    }
}

module.exports.finalizaApp = finalizaApp

rocess.on('SIGTERM', () => {
    console.log('Recebido SIGTERM')

    finalizaApp()
})

process.on('SIGINT', ()=> {
    console.log('Recebido SIGINT')

    finalizaApp()
})

process.on('uncaughtException', err => {
    console.log('Uncaught exception')
    console.error(err)

    finalizaApp(err)
})