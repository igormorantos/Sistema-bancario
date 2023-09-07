CREATE DATABASE BancoDeDados;
CREATE TABLE usuarios (
  id serial PRIMARY KEY,
  nome VARCHAR(100),
	cpf VARCHAR(11) UNIQUE,
  data_nascimento DATE,
  telefone VARCHAR(15),
  email VARCHAR(255) UNIQUE,
  senha VARCHAR(255)
);
CREATE TABLE contas (
  id serial PRIMARY KEY,
  saldo NUMERIC(10,2),
  usuario_id SERIAL REFERENCES usuarios (id)
);
CREATE TABLE saques (
  id serial PRIMARY KEY,
  data DATE,
  valor NUMERIC(10,2),
  conta_id SERIAL REFERENCES contas (id)
);
CREATE TABLE deposito (
  id serial PRIMARY KEY,
  data DATE,
  valor NUMERIC(10,2),
  conta_id SERIAL REFERENCES contas (id)
);