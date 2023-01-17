-- Active: 1673893217653@@127.0.0.1@3306


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

-- purchase--------------------------



