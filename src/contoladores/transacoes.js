const pool = require('../conexao')
const bancoDeDados = require('../bancodedados');
const { utcToZonedTime, format } = require('date-fns-tz');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaJwt = require('../autenciacoes/senhaJwt')


const deposito = async (req, res) => {
    const { valor } = req.body;
    const tipo = 'entrada';
    const usuario = req.usuario;
    const novoSaldo = parseFloat(valor);
    const saldoAtual = await pool.query('SELECT saldo FROM usuarios WHERE id = $1', [usuario.id]);
    const saldoAtualizado = parseFloat(saldoAtual.rows[0].saldo) + novoSaldo;
    const enviandoBanco = await pool.query('UPDATE usuarios SET saldo = $1 WHERE id = $2', [saldoAtualizado, usuario.id]);

    const dataDeposito = new Date();
    const TimeZone = 'America/Sao_Paulo';
    const pattern = 'yyyy-MM-dd HH:mm:ss'
    const zonedDate = utcToZonedTime(dataDeposito, TimeZone)
    const output = format(zonedDate, pattern, { timeZone: 'America/Sao_Paulo' })

    const novaTransaco = await pool.query('insert into transacoes (data, tipo, valor, usuario_id) values ($1, $2, $3, $4) returning *', [output, tipo, novoSaldo, usuario.id]);

    const contaAtualizada = {
        Nome: usuario.nome,
        Saldo: usuario.saldo
    }


    return res.status(201).json(contaAtualizada);

} //pronto

const saque = async (req, res) => {
    const { valor } = req.body;
    const tipo = 'saida';
    const usuario = req.usuario;
    const novoSaldo = parseFloat(valor);
    const saldoAtual = await pool.query('SELECT saldo FROM usuarios WHERE id = $1', [usuario.id]);
    const saldoAtualizado = parseFloat(saldoAtual.rows[0].saldo) - novoSaldo;

    if (parseFloat(saldoAtual.rows[0].saldo) < novoSaldo) {
        return res.status(401).json({ mensagem: "o valor do saque precisa ser menor ou igual o valor do saldo!" });
    }

    const enviandoBanco = await pool.query('UPDATE usuarios SET saldo = $1 WHERE id = $2', [saldoAtualizado, usuario.id]);

    const dataSaque = new Date();
    const TimeZone = 'America/Sao_Paulo';
    const pattern = 'yyyy-MM-dd HH:mm:ss'
    const zonedDate = utcToZonedTime(dataSaque, TimeZone)
    const output = format(zonedDate, pattern, { timeZone: 'America/Sao_Paulo' })

    const novaTransaco = await pool.query('insert into transacoes (data, tipo, valor, usuario_id) values ($1, $2, $3, $4) returning *', [output, tipo, novoSaldo, usuario.id]);

    const contaAtualizada = {
        Nome: usuario.nome,
        Saldo: usuario.saldo
    }


    return res.status(201).json(contaAtualizada);

}//pronto

const transferencia = async (req, res) => {
    const { numero_conta_destino, valor } = req.body;
    const usuario = req.usuario;
    const tipo = 'Transferencia';

    const saldoDestino = await pool.query('SELECT saldo FROM usuarios WHERE id = $1', [numero_conta_destino]);


    if (saldoDestino.rowCount < 1) {
        return res.status(401).json({ mensagem: "a conta não existe, digite uma conta valida" });
    }

    const novoSaldo = parseFloat(valor);
    const saldoOrigem = await pool.query('SELECT saldo FROM usuarios WHERE id = $1', [usuario.id]);
    const saldoOrigemAtulizado = parseFloat(saldoOrigem.rows[0].saldo) - novoSaldo;
    const saldoDestinoAtulizado = parseFloat(saldoDestino.rows.saldo) + novoSaldo;

    if (parseFloat(saldoOrigem.rows[0].saldo) < novoSaldo) {
        return res.status(401).json({ mensagem: "o valor de transferencia precisa ser menor ou igual o valor do saldo!" });
    }

    const enviandoBancoOrigem = await pool.query('UPDATE usuarios SET saldo = $1 WHERE id = $2', [saldoOrigemAtulizado, usuario.id]);
    const enviandoBancoDestino = await pool.query('UPDATE usuarios SET saldo = $1 WHERE id = $2', [saldoDestinoAtulizado, numero_conta_destino]);

    const dataSaque = new Date();
    const TimeZone = 'America/Sao_Paulo';
    const pattern = 'yyyy-MM-dd HH:mm:ss'
    const zonedDate = utcToZonedTime(dataSaque, TimeZone)
    const output = format(zonedDate, pattern, { timeZone: 'America/Sao_Paulo' })

    const novaTransaco = await pool.query('insert into transacoes (data, tipo, valor, usuario_id) values ($1, $2, $3, $4) returning *', [output, tipo, novoSaldo, usuario.id]);
    const contaDestino = await pool.query('SELECT * FROM usuarios WHERE id = $1', [numero_conta_destino]);

    const contaAtualizada = {
        Nome: usuario.nome,
        Destino: contaDestino.rows[0].nome,
        Saldo: usuario.saldo,
        Transferencia: valor
    }


    return res.status(201).json(saldoDestino);
    //verificar o erro
}

const consultarSaldo = (req, res) => {
    const { numero_conta } = req.query

    const conta = bancoDeDados.contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })

    res.status(200).json({ saldo: conta.saldo })

}

const extrato = (req, res) => {
    const { numero_conta } = req.query

    const depositos = bancoDeDados.depositos.find((deposito) => {
        return deposito.numero_conta == numero_conta
    })

    const saques = bancoDeDados.saques.find((saque) => {
        return saque.numero_conta == numero_conta
    })

    const transferenciasEnviadas = bancoDeDados.transferencias.find((transferencia) => {
        return transferencia.numero_conta_origem == numero_conta
    })



    const transferenciasRecebidas = bancoDeDados.transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino == numero_conta

    })


    const extrato = {
        depositos,
        saques,
        transferenciasEnviadas,
        transferenciasRecebidas
    }

    res.status(200).json(extrato)
}

module.exports = {
    deposito,
    saque,
    transferencia,
    consultarSaldo,
    extrato
}