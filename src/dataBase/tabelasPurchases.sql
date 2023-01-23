-- Active: 1674131650825@@127.0.0.1@3306

CREATE TABLE purchases(
     id TEXT PRIMARY KEY UNIQUE NOT NULL,
     total_price REAL UNIQUE NOT NULL,
     created_at  TEXT NOT NULL,
     paid INTEGER NOT NULL,
     delivered_at TEXT,
     buyer_id TEXT NOT NULL,
     FOREIGN KEY (buyer_id) REFERENCES users (id)
);
-- DROP TABLE purchases;

INSERT INTO purchases (id, total_price, created_at, paid, buyer_id)
VALUES
("pc001", 200, "20-03-23", 0,  "u001"), -- o now anula a data de entrega
("pc002", 100, "21-03-23", 0,  "u001"),  -- se quiser uma data tem q colocar a data
("pc003", 250, "22-03-23", 0,  "u002"),
("pc004", 700, "23-03-23", 0,  "u002"),
("pc005", 150, "24-03-23", 0,  "u003"),
("pc006", 130, "25-03-23", 0,  "u003");

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