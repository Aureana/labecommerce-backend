import { Tuser, Tproduct, Tpurchase, PRODUCT_CATEGORY } from "./type"

export const users: Tuser[] = [
    {
        id: "u001",
        name:"Ana",
        email: "aureana@2018",
        password: "123456"
    },
    {
        id: "u002",
        name:"Lea",
        email: "ana@2022",
        password: "123321"
    },
    {
        id: "u003",
        name:"Lia",
        email: "clara@2022",
        password: "526143"
    }
]

export const products: Tproduct[] =
    [
        {
            id: '1',
            name: 'Brinco',
            price: 10,
            category: PRODUCT_CATEGORY.ACCESSORIES
        },
        {
            id: '2',
            name: 'Sapato',
            price: 20,
            category: PRODUCT_CATEGORY.CLOTHES_AND_SHOES
        },
        {
            id: '3',
            name: 'Ventilador',
            price: 30,
            category: PRODUCT_CATEGORY.ELECTRONICS
        }
    ]
export const purchase: Tpurchase[] = [
    // {
    //     useId: 'Aureana',
    //     productId: 'Brinco',
    //     quantity: 2,
    //     totalPrice: 20
    // },
    // {
    //     useId: 'Ana',
    //     productId: 'Sapato',
    //     quantity: 1,
    //     totalPrice: 20
    // },
    // {
    //     useId: 'Clara',
    //     productId: 'Ventilador',
    //     quantity: 1,
    //     totalPrice: 30
    // }
]
//função p usuarios
export function createUser(id:string, name:string, email:string, password:string|number): Tuser[]{
    const novoUsuario = {
        id:id,
        name: name,
        email: email,
        password:password
    }
    //users.push(novoUsuario)
    const newUser = [...users, novoUsuario]

    console.log("Cadastro realizado com sucesso!")
    return newUser
    }    

export function getAllUsers():Tuser[]{
    
    return users
    }

//função p produtos
export function createProduct (id:string, name:string, price:number, category:PRODUCT_CATEGORY): Tproduct[]{
    const novoProduto = {
        id, 
        name,
        price,
        category
    }
    //users.push(novoUsuario)
    const newProduct = [...products, novoProduto]

    console.log("Produto criado com sucesso!")
    return newProduct
    }
    

export function getAllProducts():Tproduct[]{
    
    return products
    }

//buscar produto por id
export function getProductById(idToSearch: string): Tproduct[] | undefined {
    return products.filter((products)=>{
        if(products.id === idToSearch){
            return products
        
        }
    })
}
   

//exercicio 3
        
export function queryProductsByName(q: string): Tproduct[] | undefined {
    return products.filter((products)=>{
        if(products.name === q){
            return products        
        }
    })
}        
 //   
export function createPurchase( useId:string, productId:string, quantity:number, totalPrice:number): Tpurchase[]{
    const novaCompra = {
        useId,
        productId,
        quantity,
        totalPrice
    }
    const newPurchase = [...purchase, novaCompra]

    console.log("Compra realizada com sucesso!")
    return newPurchase
    }  


    export function getAllPurchasesFromUserId(userIdToSearch: string): Tpurchase[] | undefined {
        return purchase.filter((purchase)=>{
            if(purchase. useId === userIdToSearch){
                return purchase
            
            }
        })
    }