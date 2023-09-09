const pool = require('../conexao')
const { utcToZonedTime, format } = require('date-fns-tz');



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

}

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

}

const transferencia = async (req, res) => {
    const { numero_conta_destino, valor } = req.body;
    const usuario = req.usuario;
    const tipo = 'transferencia';

    const saldoDestino = await pool.query('SELECT saldo FROM usuarios WHERE id = $1', [numero_conta_destino]);


    if (saldoDestino.rowCount < 1) {
        return res.status(401).json({ mensagem: "a conta não existe, digite uma conta valida" });
    }

    const novoSaldo = Number(valor);
    const saldoOrigem = await pool.query('SELECT saldo FROM usuarios WHERE id = $1', [usuario.id]);
    const saldoOrigemAtulizado = parseFloat(saldoOrigem.rows[0].saldo) - novoSaldo;

    if (parseFloat(saldoOrigem.rows[0].saldo) < novoSaldo) {
        return res.status(401).json({ mensagem: "o valor de transferencia precisa ser menor ou igual o valor do saldo!" });
    }

    const enviandoBancoOrigem = await pool.query('UPDATE usuarios SET saldo = $1 WHERE id = $2', [saldoOrigemAtulizado, usuario.id]);

    const saldoDestinoAtulizado = parseFloat(saldoDestino.rows[0].saldo) + novoSaldo;
    const enviandoBancoDestino = await pool.query('UPDATE usuarios SET saldo = $1 WHERE id = $2', [saldoDestinoAtulizado, numero_conta_destino]);

    const dataSaque = new Date();
    const TimeZone = 'America/Sao_Paulo';
    const pattern = 'yyyy-MM-dd HH:mm:ss'
    const zonedDate = utcToZonedTime(dataSaque, TimeZone)
    const output = format(zonedDate, pattern, { timeZone: 'America/Sao_Paulo' })

    const novaTransaco = await pool.query('insert into transacoes (data, tipo, valor, usuario_id, contadestino_id) values ($1, $2, $3, $4, $5) returning *', [output, tipo, novoSaldo, usuario.id, numero_conta_destino]);
    const contaDestino = await pool.query('SELECT * FROM usuarios WHERE id = $1', [numero_conta_destino]);

    const contaAtualizada = {
        idOrigem: usuario.id,
        Nome: usuario.nome,
        idDestino: contaDestino.rows[0].id,
        Destino: contaDestino.rows[0].nome,
        Transferencia: valor,
        Saldo: usuario.saldo
    }


    return res.status(201).json(contaAtualizada);
}

const consultarSaldo = (req, res) => {
    const usuario = req.usuario

    const user = {
        Nome: usuario.nome,
        Saldo: usuario.saldo
    }

    res.status(200).json(user)

}

const extrato = async (req, res) => {
    const usuario = req.usuario

    const transacoes = await pool.query('SELECT * FROM transacoes WHERE usuario_id = $1', [usuario.id]);

    res.status(200).json(transacoes.rows)
}

module.exports = {
    deposito,
    saque,
    transferencia,
    consultarSaldo,
    extrato
}