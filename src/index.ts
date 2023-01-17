import { PRODUCT_CATEGORY, Tproduct, Tuser, Tpurchase } from "./type"
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

console.table(getAllPurchasesFromUserId("Ana"))



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
app.get('/users', (req: Request, res: Response) => {
    // res.status(200).send(users)
    try {
        res.status(200).send(users)

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//create users  // exercicio de aprofundamentos express

//  app.post('/users', (req:Request, res: Response)=>{

//     const {id, email, password} = req.body as Tuser   //msm coisa q esta comentado, porém desestruturado

//     const newUserOne = {
//         id, 
//         email,
//         password
//     }
//     users.push(newUserOne)


//     res.status(201).send("Cadastro realizado com sucesso")
// })

//get all produtcts
app.get('/products', (req: Request, res: Response) => {

    try {
        res.status(200).send(products)

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})
//create products //exercicio de aprofundamentos express
//  app.post('/products', (req:Request, res: Response)=>{

//     const {id, name, price, category} = req.body as Tproduct   //msm coisa q esta comentado, porém desestruturado

//     const newProductOne = {
//         id,
//         name,
//         price,
//         category
//     }
//     products.push(newProductOne)


//     res.status(201).send("Produto cadastrado com sucesso")
// })
//search produto by name
app.get('/products/search', (req: Request, res: Response) => {
    try {


        const q = req.query.q as string    // o "as" força a const ser uma string
        const result = products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase())
        })

        if (q.length < 1) {
            res.status(400)
            throw new Error("Query parms deve possuir pelo menos 1 caracter")
        }

        if (result.length < 1) {
            res.status(404)
            throw new Error("Produto não encontrado")
        }

        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//exercicio 3 

//create User

app.post('/users', (req: Request, res: Response) => {
    try {
        const { id, email, password } = req.body as Tuser
        const newUser = {
            id,
            email,
            password
        }
        if (newUser.id.length < 1 || newUser.email.length < 1) {
            res.status(400)
            throw new Error("Email ou id faltando no cadastro")

        }
        if (newUser.password < 1) {
            res.status(400)
            throw new Error("Password faltando no cadastro")
        }
        const searchId = users.find((user) => {
            return user.id === newUser.id
        })
        const searchEmail = users.find((user) => {
            return user.email === newUser.email
        })
        if (searchId || searchEmail) {
            res.status(400)
            throw new Error("Email ou id ja cadastrado")
        }

        users.push(newUser)

        res.status(201).send('Usuario registrado com sucesso!')

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


//Create Product
app.post('/products', (req: Request, res: Response) => {

    try {

        const { id, name, price, category } = req.body
        const newProduct = {
            id,
            name,
            price,
            category
        }
        if (newProduct.id.length < 1 || newProduct.name.length < 1 || newProduct.category.length < 1) {
            res.status(400)
            throw new Error("Id faltando cadastro de produtos")
        }

        if (newProduct.price < 1) {
            res.status(400)
            throw new Error("Preço faltando no cadastro de produtos")
        }

        const searchIdProduct = products.find((product) => {
            return product.id === newProduct.id
        })

        if (searchIdProduct) {
            res.status(400)
            throw new Error("Id ja cadastrado")
        }

        products.push(newProduct)

        res.status(201).send('Produto registrado com sucesso!')

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


//create purchase
app.post('/purchase', (req: Request, res: Response) => {

    try {

        const { useId, productId, quantity, totalPrice } = req.body
        const newPurchase = {
            useId,
            productId,
            quantity,
            totalPrice,
        }
        if (newPurchase.useId.length < 1 || newPurchase.productId.length < 1 || newPurchase.quantity < 1) {
            res.status(400)
            throw new Error("Informações incompletas")
        }
        const searchIdUser = users.find((idUser) => {
            return idUser.id === newPurchase.useId
        })
        const searchIdProduct = products.find((idProduct) => {
            return idProduct.id === newPurchase.productId
        })

        if (searchIdUser && searchIdProduct) {
            // newPurchase.totalPrice
            const total = searchIdProduct.price * newPurchase.quantity
            newPurchase.totalPrice = total
            purchase.push(newPurchase)
            res.status(201).send("Compra registrada com sucesso!")
        } if (!searchIdUser) {
            res.status(404).send("Usuario não existe")
        } else {
            res.status(404).send("Produto não existe no estoque")
        }

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


//Get Products by id
app.get("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id // sempre string, então não precisa validar o tipo

        const product = products.find((product) => product.id === id)


        // throw new Error() // simulando um erro inesperado

        if (!product) {
            res.status(404)
            throw new Error("Produto não encontrado")
        }

        res.status(200).send(product)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500) // definimos 500 porque é algo que o servidor não previu
        }

        res.send(error.message)
    }
})

//Get User Purchases by User id
app.get("/users/:id/purchase", (req: Request, res: Response) => {


    try {
        const id = req.params.id
        const idUser = users.find((user) => user.id === id)

        if (!idUser) {
            res.status(404)
            throw new Error("Usuario não existe")
        }
        const PurchaseidUser = purchase.filter((p) => {
            return p.useId === idUser.id
        })
        if (!PurchaseidUser[0]) {
            res.status(201).send("Usuario não realizou nenhuma compra")
        } else {
            res.status(200).send(PurchaseidUser)
        }

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500) // definimos 500 porque é algo que o servidor não previu
        }

        res.send(error.message)
    }

})
//....................

//Delete User by id
app.delete("/users/:id", (req: Request, res: Response) => {

    try {
        const id = req.params.id as string

        const usersIndex = users.findIndex((user) => {
            return user.id === id
        })
        console.log("Index:", usersIndex)

        if (usersIndex >= 0) {
            users.splice(usersIndex, 1)
            res.status(200).send("User apagado com sucesso")
        } else {
            res.status(200).send("User não existe")

        }
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500) // definimos 500 porque é algo que o servidor não previu
        }

        res.send(error.message)
    }
})


//Delete Product by id
app.delete("/products/:id", (req: Request, res: Response) => {

    try {

        const id = req.params.id as string
        const productById = products.findIndex((product) => {
            return product.id === id
        })
        console.log("Index: ", productById)

        if (productById >= 0) {
            products.splice(productById, 1)
            res.status(200).send("Produto apagado com sucesso")
        } else {
            res.status(404).send("Produto não existe")
        }

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500) // definimos 500 porque é algo que o servidor não previu
        }

        res.send(error.message)
    }


})


// //Edit User by id

app.put("/users/:id", (req: Request, res: Response) => {
    try {
        
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as number | undefined

    const searchIdUser = users.find((user) => {
        return user.id === id
    })
    if (!searchIdUser) {
        res.status(400)
        throw new Error("Id não existe, insira uma id válida")
    }

    if (!newId) {
        res.status(400)
        throw new Error("Digite um novo id para o usuario")
    }
    if (!newEmail) {
        res.status(400)
        throw new Error("Digite uma novo email para o usuário")
    }
    if (!newPassword) {
        res.status(400)
        throw new Error("Digite uma nova senha para o usuário")
    }

    const user = users.find((user) => {
        return user.id === id
    })
    if (user) {
        user.id = newId || user.id
        user.email = newEmail || user.email
        user.password = isNaN(newPassword) ? user.password : newPassword


        res.status(200).send("Cadastro atualizado com sucesso")
    } else {
        res.status(404).send("Id não encontrado")
    }

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})



//Edit Product by id
app.put("/products/:id", (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const { name, price, category } = req.body as Tproduct

        const searchIdProduct = products.find((product) => {
            return product.id === id
        })
        if (!searchIdProduct) {
            res.status(400)
            throw new Error("Id não existe, insira uma id válida")
        }
        if (!price) {
            res.status(400)
            throw new Error("Digite um novo preço para o produto")
        }
        if (!category) {
            res.status(400)
            throw new Error("Digite uma nova categoria para o produto")
        }
        if (!name) {
            res.status(400)
            throw new Error("Digite um novo nome para o produto")
        }

        const product = products.find((product) => {
            return product.id === id
        })

        if (product) {

            product.name = name || product.name
            product.price = isNaN(price) ? product.price : price
            product.category = category || product.category
        }
        res.status(200).send("Produto atualizado com sucesso")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})