"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("./type");
const database_1 = require("./database");
console.table((0, database_1.createUser)("u004", "beltrano@email.com", "beltrano99"));
console.table((0, database_1.getAllUsers)());
console.table((0, database_1.createProduct)("p004", "Monitor HD", 800, type_1.PRODUCT_CATEGORY.ELECTRONICS));
console.table((0, database_1.getAllProducts)());
console.table((0, database_1.getProductById)("2"));
console.table((0, database_1.queryProductsByName)('Brinco'));
console.table((0, database_1.createPurchase)("u003", "p004", 2, 1600));
console.table((0, database_1.getAllPurchasesFromUserId)("Ana"));
//# sourceMappingURL=index.js.map