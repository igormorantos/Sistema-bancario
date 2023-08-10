<h1> API Sistema Bancário </h1>

<h2>📖Descrição</h2>
<h4>Este projeto é uma implementação de uma API que simula funcionalidades básicas de um sistema bancário, permitindo aos usuários realizar operações como criação de contas, depósitos, saques, transferências e verificação de extrato!</h4>

<h2>🔧Funcionalidades</h2>
<h4>- Criação de Contas: Os usuários podem criar novas contas bancárias, fornecendo informações como nome, CPF, e saldo inicial.</h4>
<h4>- Depósitos e Saques: Os titulares das contas podem realizar depósitos e saques nas suas contas, mantendo seus saldos atualizados.</h4>
<h4>- Transferências: Os usuários podem transferir fundos entre diferentes contas cadastradas no sistema.</h4>
<h4>- Consulta de Saldo: Os titulares de contas podem verificar o saldo disponível em suas contas a qualquer momento.</h4>

<h2>📡Tecnologias Utilizadas</h2>
 </h4>- Linguagem: Node.js</h4>
 </h4>- Banco de Dados:PostgreSQL(pode ser facilmente substituído por outros bancos de dados).</h4>
 </h4>- Dependências: Veja o arquivo requirements.txt para a lista completa de dependências.</h4>


<h2>Rotas da API</h2>
<h4>- GET /contas: Lista de todas as contas registradas.</h4>
<h4> - GET /contas/saldo: Retorna saldo de uma conta específica.</h4>
<h4> - GET /contas/extrato: Retorna todas as transações de uma conta especifica.</h4>
<h4> - POST /contas: Cria uma conta.</h4>
<h4> - POST /transacoes/depositar: Realiza um deposito em uma conta especificada.</h4>
<h4> - POST /transacoes/sacar: Realiza um saque em uma conta especificada.</h4>
<h4> - POST /transacoes/transferir: Realiza uma transferencia entre contas.</h4>
<h4> - PUT /contas/:numeroConta/usuario: Edição de dados em conta existente.</h4>
<h4> - DELETE /contas/:numeroConta: Deletar conta.</h4>

<h4>A API estará acessível em: http://localhost:3000</h4>

<h2>Contribuindo</h2>

<h4>Contribuições são bem-vindas! Se você gostaria de contribuir para este projeto, siga estas etapas:

 - Crie um fork deste repositório.

 - Crie uma nova branch para suas alterações</h4>

<h2>Contato</h2>

<h5>Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma issue neste repositório ou entre em contato através do email igormsantos1@icloud.com

Divirta-se explorando a API bancária!</h5>
