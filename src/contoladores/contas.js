const bancoDeDados = require('../bancodedados');
const contador = { identificarConta: 1 }

const listaDeContas = (req, res) => {
    return res.status(200).json(bancoDeDados.contas);
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    const conta = {
        numero: contador.identificarConta++,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }

    bancoDeDados.contas.push(conta)

    res.status(201).json(conta);
}

const atualizarDadosDaConta = (req, res) => {
    const { numeroConta } = req.params
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body


    const conta = bancoDeDados.contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    })


    conta.usuario.nome = nome ?? conta.nome;
    conta.usuario.cpf = cpf ?? conta.cpf;
    conta.usuario.data_nascimento = data_nascimento ?? conta.data_nascimento;
    conta.usuario.telefone = telefone ?? conta.telefone;
    conta.usuario.email = email ?? conta.email;
    conta.usuario.senha = senha ?? conta.senha;


    res.status(200).json({ mensagem: 'Conta atualizada com sucesso' });
}

const deletarConta = (req, res) => {
    const { numeroConta } = req.params

    bancoDeDados.contas = bancoDeDados.contas.filter((conta) => {
        return conta.numero !== Number(numeroConta);
    })

    res.status(200).json({ "mensagem": "Conta excluída com sucesso" });
}



module.exports = {
    listaDeContas,
    criarConta,
    atualizarDadosDaConta,
    deletarConta
}