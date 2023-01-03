"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.products = exports.users = void 0;
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
    }
];
exports.products = [
    {
        id: '1',
        name: 'sapato',
        price: 20,
        categoria: 'calçado'
    },
    {
        id: '2',
        name: 'sandalia',
        price: 20,
        categoria: 'calçado'
    }
];
exports.purchase = [
    {
        useId: 'Aureana',
        productId: 'sapato',
        quantity: 2,
        totalPrice: 40
    },
    {
        useId: 'Ana',
        productId: 'sandalia',
        quantity: 1,
        totalPrice: 20
    }
];
//# sourceMappingURL=database.js.map