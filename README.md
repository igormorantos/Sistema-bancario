<h1> API Sistema Bancário </h1>

<h2>📖Descrição</h2>
<h4>Este projeto é uma implementação de uma API que simula funcionalidades básicas de um sistema bancário, permitindo aos usuários realizar operações como criação de contas, depósitos, saques, transferências e verificação de extrato!</h4>

<h2>🔧Funcionalidades</h2>
<h3>- Criação de Contas: Os usuários podem criar novas contas bancárias, fornecendo informações como nome, CPF, e saldo inicial.</h3>
<h3>- Depósitos e Saques: Os titulares das contas podem realizar depósitos e saques nas suas contas, mantendo seus saldos atualizados.</h2>
<h3>- Transferências: Os usuários podem transferir fundos entre diferentes contas cadastradas no sistema.</h3>
<h3>- Consulta de Saldo: Os titulares de contas podem verificar o saldo disponível em suas contas a qualquer momento.</h3>

<h2>📡Tecnologias Utilizadas</h2>
 <h3>- Linguagem: Node.js</h3>
 <h3>- Banco de Dados:PostgreSQL(pode ser facilmente substituído por outros bancos de dados).</h3>
 <h3>- Dependências: Veja o arquivo requirements.txt para a lista completa de dependências.</h3>


<h2>Rotas da API</h2>
<h3> - GET /contas: Lista de todas as contas registradas.</h3>
<h3> - GET /contas/saldo: Retorna saldo de uma conta específica.</h3>
<h3> - GET /contas/extrato: Retorna todas as transações de uma conta especifica.</h3>
<h3> - POST /contas: Cria uma conta.</h3>
<h3> - POST /transacoes/depositar: Realiza um deposito em uma conta especificada.</h3>
<h3> - POST /transacoes/sacar: Realiza um saque em uma conta especificada.</h3>
<h3> - POST /transacoes/transferir: Realiza uma transferencia entre contas.</h3>
<h3> - PUT /contas/:numeroConta/usuario: Edição de dados em conta existente.</h3> 
<h3> - DELETE /contas/:numeroConta: Deletar conta.</h3>

<h3>A API estará acessível em: http://localhost:3000</h3>

<h2>Contribuindo</h2>

<h3>Contribuições são bem-vindas! Se você gostaria de contribuir para este projeto, siga estas etapas:

 - Crie um fork deste repositório.

 - Crie uma nova branch para suas alterações</h3>

<h2>Contato</h2>

<h4>Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma issue neste repositório ou entre em contato através do email igormsantos1@icloud.com

Divirta-se explorando a API bancária!</h4>
