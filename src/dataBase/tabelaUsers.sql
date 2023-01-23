-- Active: 1674131650825@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at  TEXT NOT NULL,
    password TEXT NOT NULL    
);
-- DROP TABLE users;

PRAGMA table_info ('users');

INSERT INTO users (id, email, created_at, password)
VALUES
('u001', 'carlos@gmail.com', '10-02-22', '123456'),
('u002', 'felipe@gmail.com', '20-03-22', '654321'),
('u003', 'karol@gmail.com', '15-01-22', '456123');

SELECT*FROM users;

-- Create User
-- mocke um novo usuário
-- insere o item mockado na tabela users
INSERT INTO users (id, email, created_at, password)
VALUES ("New User", "new@email.com", "01-03-23", "N123");

-- Delete User by id
-- mocke uma id
-- delete a linha baseada no valor mockado
DELETE FROM users
WHERE id = 3;

-- Edit User by id
-- mocke valores para editar um user
-- edite a linha baseada nos valores mockados
UPDATE users
SET
	email = "mb@email.com",
	password = "0987"
WHERE id = 2;


--Exercicio 3

-- Copie as queries do exercício 1 e refatore-as

--Get All Users
--retorna o resultado ordenado pela coluna email em ordem crescente
SELECT * FROM users
ORDER BY email ASC;

