const express = require('express');
const rotas = express();
const controladorContas = require('./contoladores/contas')
const controladorTransacoes = require('./contoladores/transacoes')
const { verificarUsuarioLogado } = require('./autenciacoes/autenticacao')

rotas.post('/contas', controladorContas.criarConta)
rotas.post('/login', controladorContas.login)

rotas.get('/contas/detalhar', verificarUsuarioLogado, controladorContas.detalharUsuario)
rotas.put('/contas/atualizar', verificarUsuarioLogado, controladorContas.atualizarDados)
rotas.delete('/contas/deletar', verificarUsuarioLogado, controladorContas.deletarConta)

rotas.get('/contas/saldo', controladorTransacoes.consultarSaldo)
rotas.get('/contas/extrato', controladorTransacoes.extrato)
rotas.post('/transacoes/depositar', controladorTransacoes.deposito)
rotas.post('/transacoes/sacar', controladorTransacoes.saque)
rotas.post('/transacoes/transferir', controladorTransacoes.transferencia)

module.exports = rotas