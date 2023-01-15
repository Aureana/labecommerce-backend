"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("./type");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
console.table((0, database_1.createUser)("u004", "beltrano@email.com", "beltrano99"));
console.table((0, database_1.getAllUsers)());
console.table((0, database_1.createProduct)("p004", "Monitor HD", 800, type_1.PRODUCT_CATEGORY.ELECTRONICS));
console.table((0, database_1.getAllProducts)());
console.table((0, database_1.getProductById)("2"));
console.table((0, database_1.queryProductsByName)('Brinco'));
console.table((0, database_1.createPurchase)("u003", "p004", 2, 1600));
console.table((0, database_1.getAllPurchasesFromUserId)("Ana"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/ping', (req, res) => {
    res.send('Pong!');
});
app.get('/users', (req, res) => {
    try {
        res.status(200).send(database_1.users);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post('/users', (req, res) => {
    const { id, email, password } = req.body;
    const newUserOne = {
        id,
        email,
        password
    };
    database_1.users.push(newUserOne);
    res.status(201).send("Cadastro realizado com sucesso");
});
app.get('/products', (req, res) => {
    try {
        res.status(200).send(database_1.products);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post('/products', (req, res) => {
    const { id, name, price, category } = req.body;
    const newProductOne = {
        id,
        name,
        price,
        category
    };
    database_1.products.push(newProductOne);
    res.status(201).send("Produto cadastrado com sucesso");
});
app.get('/products/search', (req, res) => {
    try {
        const q = req.query.q;
        const result = database_1.products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase());
        });
        if (q.length < 1) {
            res.status(400);
            throw new Error("Query parms deve possuir pelo menos 1 caracter");
        }
        if (result.length < 1) {
            res.status(404);
            throw new Error("Produto não encontrado");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post('/users', (req, res) => {
    try {
        const { id, email, password } = req.body;
        const newUser = {
            id,
            email,
            password
        };
        if (newUser.id.length < 1 || newUser.email.length < 1) {
            res.status(400);
            throw new Error("Email ou id faltando no cadastro");
        }
        if (newUser.password < 1) {
            res.status(400);
            throw new Error("Password faltando no cadastro");
        }
        const searchId = database_1.users.find((user) => {
            return user.id === newUser.id;
        });
        const searchEmail = database_1.users.find((user) => {
            return user.email === newUser.email;
        });
        if (searchId || searchEmail) {
            res.status(400);
            throw new Error("Email ou id ja cadastrado");
        }
        database_1.users.push(newUser);
        res.status(201).send('Usuario registrado com sucesso!');
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post('/purchase', (req, res) => {
    const { useId, productId, quantity, totalPrice } = req.body;
    const newPurchase = {
        useId,
        productId,
        quantity,
        totalPrice
    };
    database_1.purchase.push(newPurchase);
    res.status(201).send("Compra cadastrada com sucesso");
});
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const result = database_1.products.find((product) => {
        return product.id === id;
    });
    res.status(200).send({ result });
});
app.get("/users/:id/purchases", (req, res) => {
    const useId = req.params.useId;
    const result = database_1.purchase.find((purchases) => {
        return purchases.useId === useId;
    });
    res.status(200).send({ result });
});
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const usersIndex = database_1.users.findIndex((user) => {
        return user.id === id;
    });
    console.log("Index:", usersIndex);
    if (usersIndex >= 0) {
        database_1.users.splice(usersIndex, 1);
        res.status(200).send("User apagado com sucesso");
    }
    else {
        res.status(200).send("User não encontrado");
    }
});
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    const productsIndex = database_1.products.findIndex((product) => {
        return product.id === id;
    });
    console.log("Index:", productsIndex);
    if (productsIndex >= 0) {
        database_1.products.splice(productsIndex, 1);
        res.status(200).send("Produto apagado com sucesso");
    }
    else {
        res.status(200).send("Produto não encontrado");
    }
});
app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const newId = req.body.id;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const user = database_1.users.find((user) => {
        return user.id === id;
    });
    if (user) {
        user.id = newId || user.id;
        user.email = newEmail || user.email;
        user.password = isNaN(newPassword) ? user.password : newPassword;
        res.status(200).send("Cadastro atualizado com sucesso");
    }
    else {
        res.status(404).send("Cadastro não encontrado");
    }
});
app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    const newId = req.body.id;
    const newOwnerName = req.body.name;
    const newPrice = req.body.price;
    const newCategory = req.body.category;
    const product = database_1.products.find((product) => {
        return product.id === id;
    });
    if (product) {
        product.id = newId || product.id;
        product.name = newOwnerName || product.name;
        product.price = isNaN(newPrice) ? product.price : newPrice;
        product.category = newCategory || product.category;
        res.status(200).send("Produto atualizado com sucesso");
    }
    else {
        res.status(404).send("Produto não encontrado");
    }
});
//# sourceMappingURL=index.js.map