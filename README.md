<h1> API Sistema Bancário </h1>

<h2>📖Descrição</h2>
<h4>Este projeto é uma implementação de uma API que simula funcionalidades básicas de um sistema bancário, permitindo aos usuários realizar operações como criação de contas, depósitos, saques, transferências e verificação de extrato!</h4>

<h2>🔧Funcionalidades</h2>
<h4>- Criação de Contas: Os usuários podem criar novas contas bancárias, fornecendo informações como nome, CPF, e saldo inicial.</h4>
<h4>- Depósitos e Saques: Os titulares das contas podem realizar depósitos e saques nas suas contas, mantendo seus saldos atualizados.</h4>
<h4>- Transferências: Os usuários podem transferir fundos entre diferentes contas cadastradas no sistema.</h4>
<h4>- Consulta de Saldo: Os titulares de contas podem verificar o saldo disponível em suas contas a qualquer momento.</h4>

<h2>📡Tecnologias Utilizadas</h2>
 <h4>- Linguagem: Node.js</h4>
 <h4>- Banco de Dados:PostgreSQL(pode ser facilmente substituído por outros bancos de dados).</h4>
 <h4>- Dependências: Veja o arquivo requirements.txt para a lista completa de dependências.</h4>

<h2>⏳Inicialização</h2>
 </h4>Antes de começar, certifique-se de que você tenha o Node.js instalado em sua máquina. Você pode baixá-lo e instalá-lo a partir do site oficial:https://nodejs.org/en 
    
- Abra um terminal (ou linha de comando) no seu computador.

- Navegue para o diretório do projeto que você clonou. Você pode usar o comando cd para entrar na pasta do projeto. Por exemplo:
  - cd caminho/para/o/diretorio/do/projeto

- Certifique-se de que o arquivo package.json está presente no diretório do projeto. Este arquivo contém informações sobre as dependências do projeto.

- Execute o seguinte comando para instalar as dependências listadas no package.json:
  - npm install

- Isso iniciará o processo de instalação de todas as dependências do projeto a partir do registro do npm. O npm lerá o arquivo package.json e instalará todas as dependências listadas no campo dependencies.

- Depois que o comando for executado, todas as dependências do projeto serão baixadas e instaladas na pasta node_modules no diretório do projeto.

- Se o projeto tiver um arquivo package-lock.json, o npm também garantirá que as versões exatas das dependências sejam instaladas, o que ajuda a manter a consistência entre ambientes de desenvolvimento.
</4>


<h2>🌐Rotas da API</h2>
<h4> - GET /contas: Lista de todas as contas registradas.</h4>
<h4> - GET /contas/saldo: Retorna saldo de uma conta específica.</h4>
<h4> - GET /contas/extrato: Retorna todas as transações de uma conta especifica.</h4>
<h4> - POST /contas: Cria uma conta.</h4>
<h4> - POST /transacoes/depositar: Realiza um deposito em uma conta especificada.</h4>
<h4> - POST /transacoes/sacar: Realiza um saque em uma conta especificada.</h4>
<h4> - POST /transacoes/transferir: Realiza uma transferencia entre contas.</h4>
<h4> - PUT /contas/:numeroConta/usuario: Edição de dados em conta existente.</h4>
<h4> - DELETE /contas/:numeroConta: Deletar conta.</h4>

<h4>A API estará acessível em: http://localhost:3000</h4>

<h2>💎Implementações Futuras</h2>

- Autenticação e Segurança: Autenticação de dois fatores e a Autorização baseada em tokens, como OAuth 2.0, além de certificados  de segurança para comunicação segura (HTTPS, TLS).

- Inserção de banco de dados: O banco de dados mocado sera substituido por um banco de dados relacional(Postgresql)

<h2>🤝Contribuindo</h2>

<h4>Contribuições são bem-vindas! Se você gostaria de contribuir para este projeto, siga estas etapas:

 - Crie um fork deste repositório.

 - Crie uma nova branch para suas alterações</h4>

 <h2>🔎Status do Projetos</h2>
 <img  alt="igor-Js" src="https://camo.githubusercontent.com/699a3b795a510e84dfbf4e752a6ad2025d1e17c4bd46c2e0ddc53bb006c4bf4a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5374617475732d456d253230446573656e766f6c76696d656e746f2d677265656e">
 
<h2>✉️Contato</h2>

<h5>Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma issue neste repositório ou entre em contato através do email igormsantos1@icloud.com

Divirta-se explorando a API bancária!</h5>
