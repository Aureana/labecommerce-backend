-- Active: 1674131650825@@127.0.0.1@3306

CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,   
    created_at  TEXT NOT NULL DEFAULT(DATETIME()),
    paid INTEGER DEFAULT(0) NOT NULL ,
    FOREIGN KEY (buyer_id) REFERENCES users (id)); 

--DROP TABLE purchases;

INSERT INTO purchases (id, buyer_id, total_price)
VALUES
("pc001", "u001", 200), -- o now anula a data de entrega
("pc002", "u001", 100),  -- se quiser uma data tem q colocar a data
("pc003", "u002", 250),
("pc004", "u002", 700),
("pc005", "u003", 150),
("pc006", "u003", 130);

SELECT * FROM purchases;

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