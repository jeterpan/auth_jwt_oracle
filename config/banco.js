module.exports = {
    dadosParaConexao: {
        user: process.env.AUTH_JWT_USUARIO,
        password: process.env.AUTH_JWT_SENHA,
        connectionString: process.env.AUTH_JWT_STRINGCONEXAO,
        poolMin = 10,
        poolMax = 10,
        poolIncrement = 0
    }
}