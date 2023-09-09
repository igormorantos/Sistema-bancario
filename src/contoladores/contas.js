const pool = require('../conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaJwt = require('../autenciacoes/senhaJwt')


const criarConta = async (req, res) => {
    const { nome, cpf, data_nascimento, email, senha } = req.body

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const novoUsuario = await pool.query('insert into usuarios (nome, cpf, data_nascimento, email, senha, saldo) values ($1, $2, $3, $4, $5, $6) returning *', [nome, cpf, data_nascimento, email, senhaCriptografada, 0])
        const usuario = await pool.query('select * from usuarios where cpf = $1', [cpf])

        const usuarioConta = {
            Nome: usuario.rows[0].nome,
            Cpf: usuario.rows[0].cpf,
            Data_Nascimento: usuario.rows[0].data_nascimento,
            Email: usuario.rows[0].email,
            Saldo: usuario.rows[0].saldo
        }

        res.status(201).json(usuarioConta);
    }
    catch (e) {
        res.status(401).json(e.mensagem);
    }


}

const login = async (req, res) => {
    const { email, senha } = req.body
    try {
        const usuario = await pool.query(
            'select * from usuarios where email = $1',
            [email]
        )

        if (usuario.rowCount < 1) {
            return res.status(404).json({ mensagem: 'Email ou senha invalida' })
        }

        const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha)

        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Email ou senha invalida' })
        }

        const token = jwt.sign({ id: usuario.rows[0].id }, senhaJwt, { expiresIn: '6h' })

        const { senha: _, ...usuarioLogado } = usuario.rows[0]

        return res.json({ usuario: usuarioLogado, token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const detalharUsuario = async (req, res) => {
    const usuario = req.usuario

    return res.json(usuario);
}

const atualizarDados = async (req, res) => {
    const usuario = req.usuario
    const { email, senha } = req.body

    if (!email || !senha) {
        res.status(401).json({ mensagem: "todos os requisitos precisam ser preenchido (nome, email, senha)" })
    }

    const emailExiste = await pool.query('select * from usuarios where email= $1', [email]);

    if (emailExiste.rowCount >= 1) {
        res.status(401).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." })
    }

    const senhaCript = await bcrypt.hash(senha, 10)

    const usuarioBancoDados = await pool.query('select * from usuarios where id= $1', [usuario.id]);

    const updateUsuarioEmail = await pool.query(`update usuarios SET email = $1 WHERE id = $2`,
        [email, usuario.id])

    const updateUsuarioSenha = await pool.query(`update usuarios SET senha = $1 WHERE id = $2`,
        [senhaCript, usuario.id])

    const usuarioBancoDadosAtualizado = await pool.query('select * from usuarios where id= $1', [usuario.id]);

    res.status(201).json(usuarioBancoDadosAtualizado.rows[0]);

}

const deletarConta = async (req, res) => {
    const usuario = req.usuario
    const deletarUsuario = await pool.query('DELETE FROM usuarios WHERE id = $1', [usuario.id]);
    return res.json(deletarUsuario.rows[0] + " usuario deletado!");
}



module.exports = {
    criarConta,
    atualizarDados,
    deletarConta,
    login,
    detalharUsuario
}