-- Active: 1674131650825@@127.0.0.1@3306


-- users----------------------------------
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL    
);
-- DROP TABLE users;

PRAGMA table_info ('users');

INSERT INTO users (id, email, password)
VALUES
('u001', 'carlos@gmail.com', '123456'),
('u002', 'felipe@gmail.com', '654321'),
('u003', 'karol@gmail.com', '456123');

SELECT*FROM users;

-- products----------------------

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

--DROP TABLE products;

PRAGMA table_info ('products');

INSERT INTO products (id, name, price, category)
VALUES
('p001', 'Bolsa', 80.00, 'Acessórios'),
('p002', 'ventilador', 100.01, 'Eletrônico'),
('p003', 'Sandálias', 65.80,'Roupas e calçados');

INSERT INTO products (id, name, price, category)
VALUES
('p004', 'Geladeira', 1000.99,'Eletrônico'),
('p005', 'Tênis', 200.80,'Roupas e calçados');

SELECT*FROM products;

--aprofundamento sql

--Exercicio 1 

--Get All Users
-- retorna todos os usuários cadastrados 
SELECT * FROM users;

-- Get All Products
-- retorna todos os produtos cadastrados
SELECT * FROM products;

-- Search Product by name
-- mocke um termo de busca, por exemplo "monitor"
-- retorna o resultado baseado no termo de busca
SELECT * FROM products
WHERE name = 'Sandálias';

-- Create User
-- mocke um novo usuário
-- insere o item mockado na tabela users
INSERT INTO users (id, email, password)
VALUES ("New User", "new@email.com", "N123");

-- Create Product
-- mocke um novo produto
-- insere o item mockado na tabela products
INSERT INTO products (id, name, price, category)
VALUES ("6", "brinco", 5.5, "Acessórios");

--Exercício 2

-- Get Products by id
-- mocke uma id
-- busca baseada no valor mockado
SELECT * FROM products
WHERE id = 6;

-- Delete User by id
-- mocke uma id
-- delete a linha baseada no valor mockado
DELETE FROM users
WHERE id = 3;

-- Delete Product by id
-- mocke uma id
-- delete a linha baseada no valor mockado
DELETE FROM products
WHERE id = 1;

-- Edit User by id
-- mocke valores para editar um user
-- edite a linha baseada nos valores mockados
UPDATE users
SET
	email = "mb@email.com",
	password = "0987"
WHERE id = 2;

-- Edit Product by id
-- mocke valores para editar um product
-- edite a linha baseada nos valores mockados
UPDATE products
SET
	name = "Fogão",
	price = 25.00,
    category ="Eletrônico"
WHERE id = 2;

INSERT INTO products (id, name, price, category)
VALUES 
("7", "celular", 350, "Eletronicos"),
("8", "tv", 550, "Eletronicos"),
("9", "notebook", 5780, "Eletronicos");


--Exercicio 3

-- Copie as queries do exercício 1 e refatore-as

--Get All Users
--retorna o resultado ordenado pela coluna email em ordem crescente
SELECT * FROM users
ORDER BY email ASC;

-- Get All Products versão 1
-- retorna o resultado ordenado pela coluna price em ordem crescente
-- limite o resultado em 20 iniciando pelo primeiro item
SELECT * FROM products
ORDER BY price ASC
LIMIT 20 OFFSET 0;

-- Get All Products versão 2
-- mocke um intervalo de preços, por exemplo entre 100.00 e 300.00
-- retorna os produtos com preços dentro do intervalo mockado em ordem crescente
SELECT * FROM products
WHERE
	price >= 300
	and price <= 1000
ORDER BY price ASC;


CREATE TABLE purchases(
     id TEXT PRIMARY KEY UNIQUE NOT NULL,
     total_price REAL UNIQUE NOT NULL,
     paid INTEGER NOT NULL,
     delivered_at TEXT,
     buyer_id TEXT NOT NULL,
     FOREIGN KEY (buyer_id) REFERENCES users (id)
);
DROP TABLE purchases;

INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES
("pc001", 200, 0,  "u001"), -- o now anula a data de entrega
("pc002", 100, 0,  "u001"),  -- se quiser uma data tem q colocar a data
("pc003", 250, 0,  "u002"),
("pc004", 700, 0,  "u002"),
("pc005", 150, 0,  "u003"),
("pc006", 130, 0,  "u003");

UPDATE purchases
SET paid = 1,
    delivered_at = DATETIME('now')
WHERE id = "p001";

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE purchases.buyer_id = "u001";

SELECT * FROM purchases;
SELECT * FROM users;

--Usando relações Sql

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
DROP TABLE purchases_products;

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
("pc001", "p001", 2),
("pc002", "p001", 4),
("pc003", "p001", 1);

SELECT*FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id

