import {PRODUCT_CATEGORY} from "./type"
import { 
    users, 
    products, 
    purchase,
    createUser, 
    getAllUsers, 
    getAllProducts, 
    createProduct,
    getProductById,
    queryProductsByName,
    createPurchase,
    getAllPurchasesFromUserId

} from "./database"

// console.table(users)
// console.table(products)
// console.table(purchase)
console.table(createUser("u004", "beltrano@email.com", "beltrano99"))
console.table(getAllUsers())

console.table(createProduct("p004", "Monitor HD", 800, PRODUCT_CATEGORY.ELECTRONICS))
console.table(getAllProducts())

console.table(getProductById("2"))

console.table(queryProductsByName('Brinco'))

console.table(createPurchase("u003", "p004", 2, 1600))

console.table (getAllPurchasesFromUserId("Ana"))

