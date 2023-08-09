<h1> API REST de Sistema Bancário em Node.js </h1>

<h3>Bem-vindo ao repositório da API REST de Sistema Bancário em Node.js! Este projeto é uma implementação de uma API que simula funcionalidades básicas de um sistema bancário, permitindo aos usuários realizar operações como criação de contas, depósitos, saques, transferências e verificação de extrato!</h3>

<h2>Funcionalidades Principais</h2>

<h3>- Criação de Contas: Os usuários podem criar novas contas bancárias, fornecendo informações como nome, CPF, e saldo inicial.</h2>
<h3>- Depósitos e Saques: Os titulares das contas podem realizar depósitos e saques nas suas contas, mantendo seus saldos atualizados.</h2>
<h3>- Transferências: Os usuários podem transferir fundos entre diferentes contas cadastradas no sistema.</h3>
<h3>- Consulta de Saldo: Os titulares de contas podem verificar o saldo disponível em suas contas a qualquer momento.</h3>

<h2>Tecnologias Utilizadas</h2>
 <h3>- Linguagem: Node.js</h3>
 <h3>- Banco de Dados:PostgreSQL(pode ser facilmente substituído por outros bancos de dados).</h3>
 <h3>- Dependências: Veja o arquivo requirements.txt para a lista completa de dependências.</h3>


<h2>Rotas da API</h2>
<h3>POST /api/contas: Cria uma nova conta bancária.</h3>
<h3>GET /api/contas/:id: Retorna informações sobre uma conta específica.</h3>
<h3>POST /api/contas/:id/deposito: Realiza um depósito na conta especificada.</h3>
<h3>POST /api/contas/:id/saque: Realiza um saque na conta especificada.</h3>
<h3>POST /api/contas/transferencia: Realiza uma transferência entre contas.</h3>
<h3>GET /api/contas/:id/saldo: Retorna o saldo disponível em uma conta.</h3>
<h3>A API estará acessível em: http://localhost:3000</h3>

Contribuindo

Contribuições são bem-vindas! Se você gostaria de contribuir para este projeto, siga estas etapas:

Crie um fork deste repositório.

Crie uma nova branch para suas alterações

Contato
Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma issue neste repositório ou entre em contato através do email contato@exemplo.com.

Divirta-se explorando a API bancária!
