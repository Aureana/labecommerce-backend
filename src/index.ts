import { PRODUCT_CATEGORY, Tproduct, Tuser, Tpurchase } from "./type"
import express, { raw, Request, Response } from 'express'
import cors from 'cors'
import { db } from "./dataBase/knex"
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
//console.table(createUser("u004", "beltrano@email.com", "beltrano99"))
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
app.get('/users', async (req: Request, res: Response) => {

    try {

        const result = await db.raw(`SELECT * FROM users`)
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
        const result = await db.raw(`SELECT*FROM products`)
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

    try {

        //const q = req.query.q as string    // o "as" força a const ser uma string
        const name = req.query.name
        // const result = products.filter((product) => {
        //     return product.name.toLowerCase().includes(q.toLowerCase())
        // })
        const result = await db.raw(`SELECT*FROM products WHERE name= "${name}"; `)

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
            if (!newUser.name || !newUser.password) {
                res.status(400)
                throw new Error("Nome ou senha faltando no cadastro")
            }
        }
        if (newUser !== undefined) {
            if (!newUser.id || !newUser.email) {
                res.status(400)
                throw new Error("Id ou email faltando no cadastro")
            }
        }

        const [ userId ] = await db.raw(`
        SELECT * FROM users
        WHERE id = ("${id}")

    `)

    if (userId) {
            res.status(404)
            throw new Error("Id ja cadastrado")
    }

    const [ userEmail ] = await db.raw(`
        SELECT * FROM users
        WHERE email = ("${email}")

    `)

    if (userEmail) {
            res.status(404)
            throw new Error("Email ja cadastrado")
    }
      
        await db.raw(`
            INSERT INTO users (id, name, email, password)
            VALUES ("${id}", "${name}", "${email}", "${password}")
        `)
        
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
        if (!newProduct.id  || !newProduct.name|| !newProduct.category) {
            res.status(400)
            throw new Error("Informações faltando no cadastro de produtos")
        }

        if (newProduct.price < 1) {
            res.status(400)
            throw new Error("Preço faltando no cadastro de produtos")
        }}

        const [ searchId ] = await db.raw(`
					SELECT * FROM products
					WHERE id = "${id}";
				`) 

				if (searchId) {
					res.status(404)
					throw new Error("Id ja cadastrado")
				}


        await db.raw(`
            INSERT INTO products (id, name, price, category)
            VALUES ("${id}", "${name}", "${price}", "${category}")
        `)

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

        //const { useId, productId, quantity, totalPrice } = req.body
        const {id, total_price, created_at, paid, buyer_id} = req.body
        const newPurchase = {
            id,
            total_price,
            created_at,
            paid,
            buyer_id
        }
        if (newPurchase.id.length < 1 ) {
            res.status(400)
            throw new Error("Informações incompletas, preencha o id")
        }
        // if (newPurchase.id.length < 1 || newPurchase.productId.length < 1 || newPurchase.quantity < 1) {
        //     res.status(400)
        //     throw new Error("Informações incompletas")
        // }

        const [ searchId ] = await db.raw(`
					SELECT * FROM purchases
					WHERE userId = "${id}";
				`) 

				if (searchId) {
					res.status(404)
					throw new Error("Id ja cadastrado")
				}

        // const [ searchIdProduct ] = await db.raw(`
		// 			SELECT * FROM purchases
		// 			WHERE idProduct = "${productId}";
		// 		`) 

		// 		if (searchIdProduct) {
		// 			res.status(404)
		// 			throw new Error("Id produto purchase ja cadastrado")
		// 		}




        // const searchIdUser = users.find((idUser) => {
        //     return idUser.id === newPurchase.useId
        // })
        // const searchIdProduct = products.find((idProduct) => {
        //     return idProduct.id === newPurchase.productId
        // })

        // if (searchIdUser && searchIdProduct) {
        //     // newPurchase.totalPrice
        //     const total = searchIdProduct.price * newPurchase.quantity
        //     newPurchase.totalPrice = total
        //     purchase.push(newPurchase)
        //     res.status(201).send("Compra registrada com sucesso!")
        // } if (!searchIdUser) {
        //     res.status(404).send("Usuario não existe")
        // } else {
        //     res.status(404).send("Produto não existe no estoque")
        // }
        
        await db.raw(`
            INSERT INTO purchase (id, name, price, category)
            VALUES ("${useId}", "${productId}", "${quantity}", "${totalPrice}")
        `)
       
        res.status(201).send('Purchase registrada com sucesso!')


    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
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
            return p.useId === idUser.id
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