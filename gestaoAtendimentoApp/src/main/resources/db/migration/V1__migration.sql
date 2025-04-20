CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS estado (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    sigla VARCHAR(2) NOT NULL
);

CREATE TABLE IF NOT EXISTS cidade (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    nome VARCHAR(150) NOT NULL,
    estado UUID NOT NULL,
    FOREIGN KEY (estado) REFERENCES estado(id)
);

CREATE TABLE IF NOT EXISTS endereco (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    cep VARCHAR(10),
    rua VARCHAR(200) NOT NULL,
    numero VARCHAR(10),
    bairro VARCHAR(200),
    cidade UUID NOT NULL,
    FOREIGN KEY (cidade) REFERENCES cidade(id)
);

CREATE TABLE usuario (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    tipo_usuario INTEGER NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    whatsapp VARCHAR(20),
    email VARCHAR(255),
    senha VARCHAR(255),
    endereco_comercial UUID NOT NULL,
    FOREIGN KEY (endereco_comercial) REFERENCES endereco(id),
    data_cadastro DATE NOT NULL,
    observacao VARCHAR(255),
    senha_redefinida BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE atendimento (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    descricao VARCHAR(150) NOT NULL,
    valor_padrao NUMERIC(10,2) NOT NULL,
    duracao_padrao INTEGER NOT NULL
);

CREATE TABLE atendimento_cliente (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    cliente UUID NOT NULL,
    FOREIGN KEY (cliente) REFERENCES usuario(id),
    atendimento UUID NOT NULL,
    FOREIGN KEY (atendimento) REFERENCES atendimento(id),
    data DATE NOT NULL,
    hora TIME NOT NULL,
    duracao_sessao INTEGER NOT NULL,
    valor NUMERIC(10,2) NOT NULL DEFAULT 0,
    status_pagamento VARCHAR(6) NOT NULL DEFAULT 'ABERTO'
)