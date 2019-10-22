const banco = require('../servicos/banco')

const sqlBase = 
`
SELECT *
  FROM usuarios
`

async function consulta(contexto) {
  let sql = sqlBase
  const binds = {}

  if (contexto.usuario) {
    binds.usuario = contexto.usuario

    sql += ' WHERE usuario = :usuario'
  }

  const resultado = await banco.executaSQL(sql, binds)

  return resultado.rows
}

module.exports.consulta = consulta
