CREATE TABLE usuarios (
  id serial PRIMARY KEY,
  nome VARCHAR(100),
	cpf VARCHAR(11) UNIQUE,
  data_nascimento DATE,
  telefone VARCHAR(15),
  email VARCHAR(255) UNIQUE,
  senha VARCHAR(255),
  saldo NUMERIC(10,2)
);

CREATE TABLE transacoes (
  id serial PRIMARY KEY,
  data DATE,
  tipo VARCHAR(10),
  valor NUMERIC(10,2),
  usuario_id SERIAL REFERENCES usuarios (id)
);

ALTER TABLE transacoes ADD CONSTRAINT tipo_check CHECK (tipo IN ('entrada', 'saida'));