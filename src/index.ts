import { PRODUCT_CATEGORY, Tproduct, Tuser, Tpurchase } from "./type"
import express, { raw, Request, Response } from 'express'
import cors from 'cors'
import { db } from "./dataBase/knex"
 import {
    users,
     products,
    purchase,
//     createUser,
//     getAllUsers,
//     getAllProducts,
//     createProduct,
//     getProductById,
//     queryProductsByName,
//     createPurchase,
//     getAllPurchasesFromUserId

} from "./database"

// console.table(users)
// console.table(products)
// console.table(purchase)
// //console.table(createUser("u004", "beltrano@email.com", "beltrano99"))
// console.table(getAllUsers())

// console.table(createProduct("p004", "Monitor HD", 800, PRODUCT_CATEGORY.ELECTRONICS))
// console.table(getAllProducts())

// console.table(getProductById("2"))

// console.table(queryProductsByName('Brinco'))

// console.table(createPurchase("u003", "p004", 2, 1600))

// console.table(getAllPurchasesFromUserId("Ana"))



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
app.get('/users', async (req: Request, res: Response) => {

    try {

        // const result = await db.raw(`SELECT * FROM users`)
        const result = await db.select("*").from("users")
        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

//get all produtcts
app.get('/products', async (req: Request, res: Response) => {

    try {
        // const result = await db.raw(`SELECT*FROM products`)
        const result = await db.select("*").from("products")
        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


//search produto by name

app.get('/products/search', async (req: Request, res: Response) => {

    try {            // o "as" força a const ser uma string
                                  
        const name = req.query.name

    //     if (name !== undefined) {
    //         if (typeof name !== "string") {
    //          res.status(400)
    //          throw new Error(" 'name' deve ser string")
    //     }
    //  }
        const result = await db.raw(`SELECT*FROM products WHERE name= "${name}"; `)

        //const [result] = await db("products").where({name: name})

        res.status(200).send(result)

        if (name.length < 1) {
            res.status(400)
            throw new Error("Query parms deve possuir pelo menos 1 caracter")
        }

        if (result.length < 1) {
            res.status(404)
            throw new Error("Produto não encontrado")
        }


    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }


})

//exercicio 3 

//create User

app.post('/users', async (req: Request, res: Response) => {
    try {
       const { id, name, email, password } = req.body as Tuser
        const newUser = {
            id,
            name,
            email,
            password
        }
        if (newUser !== undefined) {
            if (typeof newUser.name !== "string") {
             res.status(400)
             throw new Error(" 'name' deve ser string")
        }
     }
        if (newUser !== undefined) {
            if (!newUser.name || !newUser.password) {
                res.status(400)
                throw new Error("nome ou password faltando ")
            }
        }
//.....

        if (newUser !== undefined) {
            if (typeof newUser.id !== "string") {
            res.status(400)
            throw new Error(" 'id' deve ser string")
        }
        }

        if (newUser !== undefined) {
            if (typeof newUser.password !== "string") {
            res.status(400)
            throw new Error(" 'password' deve ser string")
        }
        }

        if (newUser !== undefined) {
            if (typeof newUser.email !== "string") {
            res.status(400)
            throw new Error(" 'email' deve ser string")
        }
        }
        
        
        if (newUser !== undefined) {
            if (!newUser.id || !newUser.email) {
                res.status(400)
                throw new Error("Id ou email faltando")
            }
        }
        const [userId] = await db("users").where({id: id})

   
        if (userId) {
            res.status(404)
            throw new Error("Id ja cadastrado")
        }

    const [userEmail] = await db("users").where({email: email})

        if (userEmail) {
            res.status(404)
            throw new Error("Email ja cadastrado")
        }

        await db("users").insert({id, name, email, password})

        res.status(201).send('Usuario registrado com sucesso!')

    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


//Create Product
app.post('/products', async (req: Request, res: Response) => {

    try {

        const { id, name, price, category } = req.body as Tproduct
        const newProduct = {
            id,
            name,
            price,
            category
        }
        if (newProduct !== undefined) {
            if (!newProduct.id || !newProduct.name || !newProduct.category) {
                res.status(400)
                throw new Error("Informações faltando no cadastro de produtos")
            }

            if (newProduct.price < 1) {
                res.status(400)
                throw new Error("Preço faltando no cadastro de produtos")
            }
        }

        const [productsId] = await db("products").where({id: id})

        if (productsId ) {
            res.status(404)
            throw new Error("Id ja cadastrado")
        }

        const [productsName] = await db("products").where({name: name})



        if (productsName ) {
            res.status(404)
            throw new Error("name ja cadastrado")
        }


        await db("products").insert({id, name, price, category})
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
app.post('/purchase', async (req: Request, res: Response) => {

    try {
        const { id, buyer_id, total_price } = req.body as Tpurchase
         
            
        if (!id || !total_price || isNaN(total_price)) {
            res.status(400)
            throw new Error("Dados inválidos")
        }
        
        const [userId] = await db("users").where({id:id})

        if(!userId){
            res.status(404)
            throw new  Error(" 'Id' não encontrada")
        }

        const newPurchase = {
            id, 
            buyer_id, 
            total_price
        }
        await db("purchases").insert(newPurchase) 
        res.status(201).send("Compra cadastrada com sucesso!")

        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})




//Get Products by id
app.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id // sempre string, então não precisa validar o tipo

        const product = products.find((product) => product.id === id)


        // throw new Error() // simulando um erro inesperado

        if (!product) {
            res.status(404)
            throw new Error("Produto não encontrado")
        }

        res.status(200).send(product)

        // } catch (error: any) {
        //     console.log(error)

        //     if (res.statusCode === 200) {
        //         res.status(500) // definimos 500 porque é algo que o servidor não previu
        //     }

        //     res.send(error.message)
        // }
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//Get User Purchases by User id
app.get("/users/:id/purchase", async (req: Request, res: Response) => {


    try {
        const id = req.params.id
        const idUser = users.find((user) => user.id === id)

        if (!idUser) {
            res.status(404)
            throw new Error("Usuario não existe")
        }
        const PurchaseidUser = purchase.filter((p) => {
            //return p.useId === idUser.id
        })
        if (!PurchaseidUser[0]) {
            res.status(201).send("Usuario não realizou nenhuma compra")
        } else {
            res.status(200).send(PurchaseidUser)
        }

        // } catch (error: any) {
        //     console.log(error)

        //     if (res.statusCode === 200) {
        //         res.status(500) // definimos 500 porque é algo que o servidor não previu
        //     }

        //     res.send(error.message)
        // }


    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})
//....................

//Delete User by id
app.delete("/users/:id", async (req: Request, res: Response) => {

    try {
        const id = req.params.id

        if (!id) {
            res.status(400)
            throw new Error("É necessário informar o id")
        }

        const [user] = await db("users").where({ id: id })

        if (!user) {
            res.status(404)
            throw new Error(" 'Id' não encontrada")
        }
        await db("users").del().where({ id: id })

        res.status(200).send("Usuário deletado com sucesso!")

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }

    }
})



//Delete Product by id
app.delete("/products/:id", async (req: Request, res: Response) => {

    try {
        const id = req.params.id

        if (!id) {
            res.status(400)
            throw new Error("É necessário informar o id")
        }

        const [product] = await db("products").where({ id: id })

        if (!product) {
            res.status(404)
            throw new Error(" 'Id' não encontrada")
        }
        await db("products").del().where({ id: id })

        res.status(200).send("Produto deletado com sucesso!")

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }

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