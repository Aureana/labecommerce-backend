"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("./type");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const knex_1 = require("./dataBase/knex");
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
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send({ message: "Pong!" });
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield knex_1.db.raw(`SELECT*FROM users`);
    res.status(200).send(result);
}));
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
app.post('/products', (req, res) => {
    try {
        const { id, name, price, category } = req.body;
        const newProduct = {
            id,
            name,
            price,
            category
        };
        if (newProduct.id.length < 1 || newProduct.name.length < 1 || newProduct.category.length < 1) {
            res.status(400);
            throw new Error("Id faltando cadastro de produtos");
        }
        if (newProduct.price < 1) {
            res.status(400);
            throw new Error("Preço faltando no cadastro de produtos");
        }
        const searchIdProduct = database_1.products.find((product) => {
            return product.id === newProduct.id;
        });
        if (searchIdProduct) {
            res.status(400);
            throw new Error("Id ja cadastrado");
        }
        database_1.products.push(newProduct);
        res.status(201).send('Produto registrado com sucesso!');
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
    try {
        const { useId, productId, quantity, totalPrice } = req.body;
        const newPurchase = {
            useId,
            productId,
            quantity,
            totalPrice,
        };
        if (newPurchase.useId.length < 1 || newPurchase.productId.length < 1 || newPurchase.quantity < 1) {
            res.status(400);
            throw new Error("Informações incompletas");
        }
        const searchIdUser = database_1.users.find((idUser) => {
            return idUser.id === newPurchase.useId;
        });
        const searchIdProduct = database_1.products.find((idProduct) => {
            return idProduct.id === newPurchase.productId;
        });
        if (searchIdUser && searchIdProduct) {
            const total = searchIdProduct.price * newPurchase.quantity;
            newPurchase.totalPrice = total;
            database_1.purchase.push(newPurchase);
            res.status(201).send("Compra registrada com sucesso!");
        }
        if (!searchIdUser) {
            res.status(404).send("Usuario não existe");
        }
        else {
            res.status(404).send("Produto não existe no estoque");
        }
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get("/products/:id", (req, res) => {
    try {
        const id = req.params.id;
        const product = database_1.products.find((product) => product.id === id);
        if (!product) {
            res.status(404);
            throw new Error("Produto não encontrado");
        }
        res.status(200).send(product);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get("/users/:id/purchase", (req, res) => {
    try {
        const id = req.params.id;
        const idUser = database_1.users.find((user) => user.id === id);
        if (!idUser) {
            res.status(404);
            throw new Error("Usuario não existe");
        }
        const PurchaseidUser = database_1.purchase.filter((p) => {
            return p.useId === idUser.id;
        });
        if (!PurchaseidUser[0]) {
            res.status(201).send("Usuario não realizou nenhuma compra");
        }
        else {
            res.status(200).send(PurchaseidUser);
        }
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.delete("/users/:id", (req, res) => {
    try {
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
            res.status(200).send("User não existe");
        }
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.delete("/products/:id", (req, res) => {
    try {
        const id = req.params.id;
        const productById = database_1.products.findIndex((product) => {
            return product.id === id;
        });
        console.log("Index: ", productById);
        if (productById >= 0) {
            database_1.products.splice(productById, 1);
            res.status(200).send("Produto apagado com sucesso");
        }
        else {
            res.status(404).send("Produto não existe");
        }
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.put("/users/:id", (req, res) => {
    try {
        const id = req.params.id;
        const newId = req.body.id;
        const newEmail = req.body.email;
        const newPassword = req.body.password;
        const searchIdUser = database_1.users.find((user) => {
            return user.id === id;
        });
        if (!searchIdUser) {
            res.status(400);
            throw new Error("Id não existe, insira uma id válida");
        }
        if (!newId) {
            res.status(400);
            throw new Error("Digite um novo id para o usuario");
        }
        if (!newEmail) {
            res.status(400);
            throw new Error("Digite uma novo email para o usuário");
        }
        if (!newPassword) {
            res.status(400);
            throw new Error("Digite uma nova senha para o usuário");
        }
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
            res.status(404).send("Id não encontrado");
        }
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.put("/products/:id", (req, res) => {
    try {
        const id = req.params.id;
        const { name, price, category } = req.body;
        const searchIdProduct = database_1.products.find((product) => {
            return product.id === id;
        });
        if (!searchIdProduct) {
            res.status(400);
            throw new Error("Id não existe, insira uma id válida");
        }
        if (!price) {
            res.status(400);
            throw new Error("Digite um novo preço para o produto");
        }
        if (!category) {
            res.status(400);
            throw new Error("Digite uma nova categoria para o produto");
        }
        if (!name) {
            res.status(400);
            throw new Error("Digite um novo nome para o produto");
        }
        const product = database_1.products.find((product) => {
            return product.id === id;
        });
        if (product) {
            product.name = name || product.name;
            product.price = isNaN(price) ? product.price : price;
            product.category = category || product.category;
        }
        res.status(200).send("Produto atualizado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
//# sourceMappingURL=index.js.map