--Criação do banco

CREATE DATABASE harybb;

--Crição da tabela de bruxos

CREATE TABLE bruxos(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade VARCHAR(100) NOT NULL,
    casa VARCHAR(100) NOT NULL,
    habilidade VARCHAR(100) NOT NULL,
    sangue VARCHAR(10) NOT NULL,
    patrono VARCHAR(100)
)

--Crição da tabela de varinhas

CREATE TABLE varinhas(
    id SERIAL PRIMARY KEY,
    material VARCHAR(100) NOT NULL,
    comprimento VARCHAR(100) NOT NULL,
    nucleo VARCHAR(100) NOT NULL,
    fabricacao DATE NOT NULL
)




