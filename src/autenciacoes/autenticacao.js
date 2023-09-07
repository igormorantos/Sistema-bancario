const jwt = require('jsonwebtoken')
const senhaJwt = require('./senhaJwt')
const pool = require('../conexao')

const verificarUsuarioLogado = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    const token = authorization.split(' ')[1];

    try {
        const tokenUsuario = jwt.verify(token, senhaJwt);
        const usuario = await pool.query('select * from usuarios where id = $1', [tokenUsuario.id]);

        if (!usuario) {
            return res.json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
        }

        req.usuario = {
            id: usuario.rows[0].id,
            nome: usuario.rows[0].nome,
            email: usuario.rows[0].email
        }

        next();
    } catch (error) {
        return res.status(401).json({ mensagem: 'Não autorizado' })
    }

}

module.exports = { verificarUsuarioLogado }