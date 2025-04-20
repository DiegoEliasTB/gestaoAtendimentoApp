INSERT INTO estado (id, nome, sigla) VALUES
     ('a1b2c3d4-e5f6-4890-8234-567890abcdef', 'Acre', 'AC'),
     ('f9e8d7c6-b5a4-4210-bcdc-ba9876543210', 'Alagoas', 'AL'),
     ('01234567-89ab-4def-a123-456789abcdef', 'Amapá', 'AP'),
     ('badc0ffe-edcb-4987-b543-210fedcba987', 'Amazonas', 'AM'),
     ('11223344-5566-4788-b9aa-bbccddeeff00', 'Bahia', 'BA'),
     ('aabbccdd-eeff-4011-b233-445566778899', 'Ceará', 'CE'),
     ('99887766-5544-4322-b100-ffeeccbbaa99', 'Distrito Federal', 'DF'),
     ('fedcba98-7654-4210-a123-456789abcdef', 'Espírito Santo', 'ES'),
     ('abcdef01-2345-4789-abcd-ef0123456789', 'Goiás', 'GO'),
     ('98765432-10fe-4cba-a876-543210fedcba', 'Maranhão', 'MA'),
     ('22446688-aaccee00-4133-b577-99bbddff', 'Mato Grosso', 'MT'),
     ('ffeeddcc-bbaa-4988-b766-554433221100', 'Mato Grosso do Sul', 'MS'),
     ('00112233-4455-4677-b899-aabbccddeeff', 'Minas Gerais', 'MG'),
     ('f8a7c2b1-9d3e-4e6a-9b5f-1a2c3d4e5f67', 'Pará', 'PA'),
     ('1a2b3c4d-5e6f-4a8b-bc0d-e1f2a3b4c5d6', 'Paraíba', 'PB'),
     ('f0e9d8c7-b6a5-4321-b0ed-cba987654321', 'Paraná', 'PR'),
     ('7b8c9d0e-f1a2-4b4c-bd6e-f7a8b9c0d1e2', 'Pernambuco', 'PE'),
     ('e2d1c0b9-a8f7-4e5d-bc3b-2a1f0e9d8c7b', 'Piauí', 'PI'),
     ('3c2b1a0f-e9d8-4c6b-ba43-210fedcba987', 'Rio de Janeiro', 'RJ'),
     ('8d9e0f1a-2b3c-4d5e-b6a7-b8c9d0e1f2a3', 'Rio Grande do Norte', 'RN'),
     ('4e5f6a7b-8c9d-4e1f-ba3b-4c5d6e7f8a9b', 'Rio Grande do Sul', 'RS'),
     ('b9a8f7e6-d5c4-4b2a-bf0e-9d8c7b6a5f4e', 'Rondônia', 'RO'),
     ('5f4e3d2c-1b0a-4f8e-bd6c-5b4a3f2e1d0c', 'Roraima', 'RR'),
     ('c0d1e2f3-a4b5-4c6d-be8f-a0b1c2d3e4f5', 'Santa Catarina', 'SC'),
     ('6a7b8c9d-0e1f-4a3b-bc5d-6e7f8a9bc0d1', 'São Paulo', 'SP'),
     ('d2e3f4a5-b6c7-4d8e-be9f-f0a1b2c3d4e5', 'Sergipe', 'SE'),
     ('7c6b5a4f-e3d2-4c1b-ba9f-e7d6c5b4a3f2', 'Tocantins', 'TO');

INSERT INTO cidade (id, nome, estado) VALUES
    ('620d8293-882a-43a6-8eb4-7ebe94b21d6c', 'Tubarão', 'c0d1e2f3-a4b5-4c6d-be8f-a0b1c2d3e4f5');

INSERT INTO endereco (id, cep, rua, numero, bairro, cidade) VALUES
    ('6895e63c-6e5a-4116-adf8-40a7f610bc5d', '88704-296', 'R. Dep. Olices Pedro de Caldas', 480, 'Dehon', '620d8293-882a-43a6-8eb4-7ebe94b21d6c');

INSERT INTO usuario (id, tipo_usuario, nome, cpf, whatsapp, email, senha, endereco_comercial, data_cadastro, observacao, senha_redefinida) VALUES
    (uuid_generate_v4(), 0, 'ADMINISTRADOR', '000.000.001-91', NULL, 'admin@admin', '@dmin123', '6895e63c-6e5a-4116-adf8-40a7f610bc5d', CURRENT_DATE, NULL, true);