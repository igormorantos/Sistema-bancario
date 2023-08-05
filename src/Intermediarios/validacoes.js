const bancoDeDados = require('../bancodedados');

const ValidacaoSenhaBanco = (req, res, next) => {
    const { senha_banco } = req.query

    if (bancoDeDados.banco.senha !== senha_banco) {
        return res.status(401).json({ "mensagem": "Senha Invalida" });
    }

    if (bancoDeDados.contas.length == 0) {
        return res.status(201).json({ "mensagem": "nenhuma conta encontrada" });
    }

    next();
}

const ValidacaoCriarConta = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ "mensagem": "Todos os dados são obrigatorios" });
    }

    const verificaCpf = bancoDeDados.contas.find((conta) => {
        if (conta.usuario) {
            return conta.usuario.cpf == cpf
        }
    })

    const verificaEmail = bancoDeDados.contas.find((conta) => {
        if (conta.usuario) {
            return conta.usuario.email == email
        }
    })

    if (verificaEmail) {
        return res.status(409).json({ mensagem: "Esse Email ja existe" });
    }

    if (verificaCpf) {
        return res.status(409).json({ mensagem: "Esse Cpf ja existe" });
    }

    next();
}

const ValidacaoEdicaoConta = (req, res, next) => {
    const { numeroConta } = req.params
    const { cpf, email } = req.body


    const conta = bancoDeDados.contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    })

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada' })
    }
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ mensagem: 'É necessário informar pelo menos uma propriedade' });

    }

    const verificaCpf = bancoDeDados.contas.find((conta) => {
        if (conta.usuario) {
            return conta.usuario.cpf == cpf
        }
    })

    const verificaEmail = bancoDeDados.contas.find((conta) => {
        if (conta.usuario) {
            return conta.usuario.email == email
        }
    })

    if (verificaEmail) {
        return res.status(409).json({ mensagem: "Esse Email ja existe no nosso banco de dados" });
    }

    if (verificaCpf) {
        return res.status(409).json({ mensagem: "Esse Cpf ja existe no nosso banco de dados" });
    }

    next();
}

const ValidacaoExcluirConta = (req, res, next) => {
    const { numeroConta } = req.params
    const conta = bancoDeDados.contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    })

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada' })
    }

    if (conta.saldo !== 0) {
        return res.status(400).json({ mensagem: "Conta não pode ser excluída porque possui saldo" });
    }

    next();
}

const ValidacaoDeposito = (req, res, next) => {
    const { numero_conta, valor } = req.body;

    const conta = bancoDeDados.contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada' });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'Valor invalido, precisar ser maior que 0!' });
    }


    next();
}

const ValidacaoSaque = (req, res, next) => {
    const { numero_conta, valor, senha } = req.body;

    const conta = bancoDeDados.contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada' });
    }

    if (valor <= 0 || valor > conta.saldo) {
        return res.status(400).json({ mensagem: 'O valor deve ser maior que 0 e menor ou igual ao saldo da conta' });
    }

    if (conta.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'Senha Invalida' });
    }


    next();
}

const ValidacaoTransferencia = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    const contaOrigem = bancoDeDados.contas.find((conta) => {
        return conta.numero === Number(numero_conta_origem)
    })

    const contaDestino = bancoDeDados.contas.find((conta) => {
        return conta.numero === Number(numero_conta_destino)
    })

    if (!contaOrigem || !contaDestino) {
        return res.status(404).json({ mensagem: 'Conta não encontrada!' });
    }

    if (contaOrigem === contaDestino) {
        return res.status(400).json({ mensagem: 'você não pode transfereir pra mesma conta!' });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'É nescessario um valor acima de 0 para transferencia!' });
    }

    if (contaOrigem.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'Senha Incorreta' });
    }

    if (valor > contaOrigem.saldo) {
        return res.status(400).json({ mensagem: 'voce não possui saldo suficiente' });
    }

    next();
}

const ValidacaoConsultaSaldo = (req, res, next) => {
    const { numero_conta, senha } = req.query

    const conta = bancoDeDados.contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta informada não existe!' });
    }

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'É nescessario conta e a senha que deseja saber o saldo!' });
    }

    if (conta.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'Senha incorreta!' });
    }

    next();
}

const ValidacaoExtrato = (req, res, next) => {
    const { numero_conta, senha } = req.query

    if (!numero_conta || !senha) {
        return res.status(404).json({ mensagem: 'É nescessario conta e a senha que deseja saber o saldo!' });
    }

    const conta = bancoDeDados.contas.find((conta) => {
        return conta.numero == Number(numero_conta)
    })

    if (!conta) {
        return res.status(400).json({ mensagem: 'Conta não encontrada' });
    }

    if (conta.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'Senha Invalida' });
    }


    next();
}



module.exports = {
    ValidacaoSenhaBanco,
    ValidacaoCriarConta,
    ValidacaoEdicaoConta,
    ValidacaoExcluirConta,
    ValidacaoDeposito,
    ValidacaoSaque,
    ValidacaoTransferencia,
    ValidacaoConsultaSaldo,
    ValidacaoExtrato
}