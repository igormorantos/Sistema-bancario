const pool = require('../conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaJwt = require('../autenciacoes/senhaJwt')

const bancoDeDados = require('../bancodedados');
const contador = { identificarConta: 1 }


const criarConta = async (req, res) => {
    const { nome, cpf, data_nascimento, email, senha } = req.body
    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const novoUsuario = await pool.query('insert into usuarios (nome, cpf, data_nascimento, email, senha) values ($1, $2, $3, $4, $5) returning *', [nome, cpf, data_nascimento, email, senhaCriptografada])
        const usuario = await pool.query('select * from usuarios where cpf = $1', [cpf])
        const novaConta = await pool.query('insert into contas (saldo, usuario_id) values ($1, $2) returning *', [0, usuario.rows[0].id])
        const conta = await pool.query('select * from contas where usuario_id = $1', [usuario.rows[0].id])

        const usuarioConta = {
            Nome: usuario.rows[0].nome,
            Cpf: usuario.rows[0].cpf,
            Data_Nascimento: usuario.rows[0].data_nascimento,
            Email: usuario.rows[0].email,
            Saldo: conta.rows[0].saldo
        }

        res.status(201).json(usuarioConta);
    }
    catch (e) {
        res.status(404).json(e.mensagem);
    }

} //1

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
}//2

const atualizarDadosDaConta = (req, res) => {
    const { numeroConta } = req.params
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body


    const conta = bancoDeDados.contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    })


    conta.usuario.nome = nome ?? conta.nome;
    conta.usuario.cpf = cpf ?? conta.cpf;
    conta.usuario.data_nascimento = data_nascimento ?? conta.data_nascimento;
    conta.usuario.telefone = telefone ?? conta.telefone;
    conta.usuario.email = email ?? conta.email;
    conta.usuario.senha = senha ?? conta.senha;


    res.status(200).json({ mensagem: 'Conta atualizada com sucesso' });
}

const deletarConta = (req, res) => {
    const { numeroConta } = req.params

    bancoDeDados.contas = bancoDeDados.contas.filter((conta) => {
        return conta.numero !== Number(numeroConta);
    })

    res.status(200).json({ "mensagem": "Conta excluída com sucesso" });
}



module.exports = {
    criarConta,
    atualizarDadosDaConta,
    deletarConta,
    login
}