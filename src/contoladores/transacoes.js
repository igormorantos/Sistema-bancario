const pool = require('../conexao')
const bancoDeDados = require('../bancodedados');
const { utcToZonedTime, format } = require('date-fns-tz');


const deposito = (req, res) => {
    const { numero_conta, valor } = req.body;

    const conta = bancoDeDados.contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })

    conta.saldo += Number(valor)
    const dataDeposito = new Date();
    const TimeZone = 'America/Sao_Paulo';
    const pattern = 'yyyy-MM-dd HH:mm:ss'
    const zonedDate = utcToZonedTime(dataDeposito, TimeZone)
    const output = format(zonedDate, pattern, { timeZone: 'America/Sao_Paulo' })

    const resgitroDeposito = {
        data: output,
        numero_conta: numero_conta,
        valor: Number(valor)
    }

    bancoDeDados.depositos.push(resgitroDeposito);

    return res.status(201).json({ mensagem: "Depósito realizado com sucesso" });

}

const saque = (req, res) => {
    const { numero_conta, valor } = req.body;

    const conta = bancoDeDados.contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })

    conta.saldo -= Number(valor)
    const dataSaque = new Date();
    const TimeZone = 'America/Sao_Paulo';
    const pattern = 'yyyy-MM-dd HH:mm:ss'
    const zonedDate = utcToZonedTime(dataSaque, TimeZone)
    const output = format(zonedDate, pattern, { timeZone: 'America/Sao_Paulo' })

    const registroSaque = {
        data: output,
        numero_conta: numero_conta,
        valor: Number(valor)
    }

    bancoDeDados.saques.push(registroSaque);

    return res.status(200).json({ mensagem: "Saque realizado com sucesso" });

}

const transferencia = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor } = req.body

    const contaOrigem = bancoDeDados.contas.find((conta) => {
        return conta.numero === Number(numero_conta_origem)
    })

    const contaDestino = bancoDeDados.contas.find((conta) => {
        return conta.numero === Number(numero_conta_destino)
    })

    contaOrigem.saldo -= Number(valor);
    contaDestino.saldo += Number(valor);

    const dataTransacao = new Date();
    const TimeZone = 'America/Sao_Paulo';
    const pattern = 'yyyy-MM-dd HH:mm:ss'
    const zonedDate = utcToZonedTime(dataTransacao, TimeZone)
    const output = format(zonedDate, pattern, { timeZone: 'America/Sao_Paulo' })

    const registroSaque = {
        data: output,
        numero_conta_origem,
        numero_conta_destino,
        valor: Number(valor)
    }

    bancoDeDados.transferencias.push(registroSaque);

    res.status(200).json({ mensagem: "Transferência realizado com sucesso" });

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