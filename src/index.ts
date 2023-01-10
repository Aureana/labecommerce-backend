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

//Get Products by id
app.get("/products/:id", (req:Request, res: Response)=>{

    const id = req.params.id  
    const result = products.find((product)=>{
      return product.id === id
    })
    
  
    res.status(200).send({result})
  })
//Get User Purchases by User id
  app.get("/users/:id/purchases", (req:Request, res: Response)=>{

    const useId = req.params.useId 
    const result =purchase.find((purchases)=>{
      return purchases.useId === useId
    })
    
  
    res.status(200).send({result})
  })

  //Delete User by id
  app.delete("/users/:id", (req:Request, res:Response)=>{

    const id = req.params.id  as string
    
    const usersIndex = users.findIndex((user)=>{
        return user.id === id
    })
    console.log("Index:", usersIndex)
     
    if (usersIndex>=0){
        users.splice(usersIndex,1)
        res.status(200).send("User apagado com sucesso")        
    }else{
        res.status(200).send("User não encontrado")    
   
    }  
    
})
//Delete Product by id
app.delete("/products/:id", (req:Request, res:Response)=>{

    const id = req.params.id  as string
    
    const productsIndex = products.findIndex((product)=>{
        return product.id === id
    })
    console.log("Index:", productsIndex)
     
    if (productsIndex>=0){
        products.splice(productsIndex,1)
        res.status(200).send("Produto apagado com sucesso")        
    }else{
        res.status(200).send("Produto não encontrado")    
   
    } 
})

// //Edit User by id

app.put("/users/:id", (req:Request, res:Response)=>{
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as number | undefined
    
    const user = users.find((user)=>{
        return user.id === id
    })
    if (user){
        user.id = newId ||  user.id
        user.email = newEmail || user.email
        user.password = isNaN(newPassword)? user.password: newPassword
       

        res.status(200).send("Cadastro atualizado com sucesso")
    }else{
        res.status(404).send("Cadastro não encontrado")
    } 
})
//Edit Product by id
app.put("/products/:id", (req:Request, res:Response)=>{
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newOwnerName = req.body.name as  string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory =  req.body.category as PRODUCT_CATEGORY | undefined

    const product =products.find((product)=>{
        return product.id === id
    })
    if (product){
        product.id = newId || product.id
        product.name = newOwnerName || product.name
        product.price = isNaN(newPrice)? product.price:newPrice
        product.category = newCategory || product.category

        res.status(200).send("Produto atualizado com sucesso")
    }else{
        res.status(404).send("Produto não encontrado")
    } 
})