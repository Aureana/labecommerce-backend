import {PRODUCT_CATEGORY, Tproduct, Tuser, Tpurchase} from "./type"
import express, { Request, Response } from 'express'
import cors from 'cors'
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



const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})


//get all users
app.get('/users', (req: Request,  res:Response)=>{
    res.status(200).send(users)
 })
//create users
 app.post('/users', (req:Request, res: Response)=>{

    const {id, email, password} = req.body as Tuser   //msm coisa q esta comentado, porém desestruturado

    const newUserOne = {
        id, 
        email,
        password
    }
    users.push(newUserOne)

    
    res.status(201).send("Cadastro realizado com sucesso")
})

//get all produtcts
app.get('/products', (req: Request,  res:Response)=>{
    res.status(200).send(products)
 })
 //create products
 app.post('/products', (req:Request, res: Response)=>{

    const {id, name, price, category} = req.body as Tproduct   //msm coisa q esta comentado, porém desestruturado

    const newProductOne = {
        id,
        name,
        price,
        category
    }
    products.push(newProductOne)

    
    res.status(201).send("Produto cadastrado com sucesso")
})
//search produto by name
app.get('/products/search', (req:Request,  res:Response)=>{
    const q = req.query.q as string    // o "as" força a const ser uma string
    const result = products.filter((product)=>{
     return product.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(result)
 })

 //exercicio 3 

 //create User

 app.post('/users', (req:Request, res: Response)=>{

    const {id, email, password} = req.body as Tuser   

    const newUser = {
        id, 
        email,
        password
    }
    users.push(newUser)

    
    res.status(201).send("Usuário registrado com sucesso")
})


//Create Product
app.post('/products', (req:Request, res: Response)=>{

    const {id, name, price, category} = req.body as Tproduct  
    const newProduct = {
        id,
        name,
        price,
        category
    }
    products.push(newProduct)

    
    res.status(201).send("Produto cadastrado com sucesso")
})

app.post('/purchase', (req:Request, res: Response)=>{

    const {useId, productId, quantity, totalPrice} = req.body as Tpurchase  
    const newPurchase = {
        useId, 
        productId, 
        quantity, 
        totalPrice
    }
    purchase.push(newPurchase)

    
    res.status(201).send("Compra cadastrada com sucesso")
})