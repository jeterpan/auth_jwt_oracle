const oracledb = require('oracledb')

const configBanco = require('../config/banco')

async function inicializa() {
    const pool = await oracledb.createPool(configBanco.dadosParaConexao)
}

module.exports.inicializa = inicializa

function executaSQL (declaracao,binds,opcoes = {}) {
    return new Promise ( (resolve, reject) => {
        let conexao

        opcoes.outFormat = oracledb.DB_TYPE_OBJECT
        opcoes.autoCommit = true

        try {
            conexao = await oracledb.getConnection()

            const resultado = conexao.execute(declaracao, binds, opcoes)

            resolve(resultado)
        } catch (erro) {
            console.log(`Erro: ${erro} ao executar a declaracao SQL no banco de dados`)
            reject(erro)
        } finally {
            try {
                await conexao.close()
            } catch (err) {
                console.log(`Erro: ${err} ao fechar conexão com o banco de dados`)
                reject(err)
            }
        }
    })
}

module.exports.executaSQL = executaSQL


async function encerra() {
    await oracledb.getPool().close();
}
   
module.exports.encerra = encerra;


