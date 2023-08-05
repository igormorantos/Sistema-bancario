const express = require('express');
const rotas = express();
const controladorContas = require('./contoladores/contas')
const controladorTransacoes = require('./contoladores/transacoes')
const intermediariosValidacoes = require('./Intermediarios/validacoes')

rotas.get('/contas', intermediariosValidacoes.ValidacaoSenhaBanco, controladorContas.listaDeContas)
rotas.get('/contas/saldo', intermediariosValidacoes.ValidacaoConsultaSaldo, controladorTransacoes.consultarSaldo)
rotas.get('/contas/extrato', intermediariosValidacoes.ValidacaoExtrato, controladorTransacoes.extrato)
rotas.post('/contas', intermediariosValidacoes.ValidacaoCriarConta, controladorContas.criarConta)
rotas.post('/transacoes/depositar', intermediariosValidacoes.ValidacaoDeposito, controladorTransacoes.deposito)
rotas.post('/transacoes/sacar', intermediariosValidacoes.ValidacaoSaque, controladorTransacoes.saque)
rotas.post('/transacoes/transferir', intermediariosValidacoes.ValidacaoTransferencia, controladorTransacoes.transferencia)
rotas.put('/contas/:numeroConta/usuario', intermediariosValidacoes.ValidacaoEdicaoConta, controladorContas.atualizarDadosDaConta)
rotas.delete('/contas/:numeroConta', intermediariosValidacoes.ValidacaoExcluirConta, controladorContas.deletarConta)

module.exports = rotas