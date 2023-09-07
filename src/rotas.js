const express = require('express');
const rotas = express();
const controladorContas = require('./contoladores/contas')
const controladorTransacoes = require('./contoladores/transacoes')
const intermediariosValidacoes = require('./Intermediarios/validacoes')

rotas.post('/conta', controladorContas.criarConta)
rotas.post('/login', controladorContas.login)
rotas.get('/contas/saldo', controladorTransacoes.consultarSaldo)
rotas.get('/contas/extrato', controladorTransacoes.extrato)
rotas.post('/transacoes/depositar', controladorTransacoes.deposito)
rotas.post('/transacoes/sacar', controladorTransacoes.saque)
rotas.post('/transacoes/transferir', controladorTransacoes.transferencia)
rotas.put('/contas/:numeroConta/usuario', controladorContas.atualizarDadosDaConta)
rotas.delete('/contas/:numeroConta', controladorContas.deletarConta)

module.exports = rotas