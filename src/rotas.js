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
rotas.post('/transacoes/depositar', verificarUsuarioLogado, controladorTransacoes.deposito)
rotas.post('/transacoes/sacar', verificarUsuarioLogado, controladorTransacoes.saque)
rotas.post('/transacoes/transferir', verificarUsuarioLogado, controladorTransacoes.transferencia)
rotas.get('/contas/saldo', verificarUsuarioLogado, controladorTransacoes.consultarSaldo)
rotas.get('/contas/extrato', verificarUsuarioLogado, controladorTransacoes.extrato)

module.exports = rotas