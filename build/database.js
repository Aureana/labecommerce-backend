"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchase = exports.products = exports.users = void 0;
const type_1 = require("./type");
exports.users = [
    {
        id: "Aureana",
        email: "aureana@2018",
        password: "123456"
    },
    {
        id: "Ana",
        email: "ana@2022",
        password: "123321"
    },
    {
        id: "Clara",
        email: "clara@2022",
        password: "526143"
    }
];
exports.products = [
    {
        id: '1',
        name: 'Brinco',
        price: 10,
        category: type_1.PRODUCT_CATEGORY.ACCESSORIES
    },
    {
        id: '2',
        name: 'Sapato',
        price: 20,
        category: type_1.PRODUCT_CATEGORY.CLOTHES_AND_SHOES
    },
    {
        id: '3',
        name: 'Ventilador',
        price: 30,
        category: type_1.PRODUCT_CATEGORY.ELECTRONICS
    }
];
exports.purchase = [
    {
        useId: 'Aureana',
        productId: 'Brinco',
        quantity: 2,
        totalPrice: 20
    },
    {
        useId: 'Ana',
        productId: 'Sapato',
        quantity: 1,
        totalPrice: 20
    },
    {
        useId: 'Clara',
        productId: 'Ventilador',
        quantity: 1,
        totalPrice: 30
    }
];
function createUser(id, email, password) {
    const novoUsuario = {
        id: id,
        email: email,
        password: password
    };
    const newUser = [...exports.users, novoUsuario];
    console.log("Cadastro realizado com sucesso!");
    return newUser;
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    const novoProduto = {
        id,
        name,
        price,
        category
    };
    const newProduct = [...exports.products, novoProduto];
    console.log("Produto criado com sucesso!");
    return newProduct;
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function getProductById(idToSearch) {
    return exports.products.filter((products) => {
        if (products.id === idToSearch) {
            return products;
        }
    });
}
exports.getProductById = getProductById;
function queryProductsByName(q) {
    return exports.products.filter((products) => {
        if (products.name === q) {
            return products;
        }
    });
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(useId, productId, quantity, totalPrice) {
    const novaCompra = {
        useId,
        productId,
        quantity,
        totalPrice
    };
    const newPurchase = [...exports.purchase, novaCompra];
    console.log("Compra realizada com sucesso!");
    return newPurchase;
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(userIdToSearch) {
    return exports.purchase.filter((purchase) => {
        if (purchase.useId === userIdToSearch) {
            return purchase;
        }
    });
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map