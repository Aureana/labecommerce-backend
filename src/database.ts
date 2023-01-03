import { Tuser, Tproduct, Tpurchase } from "./type"

export const users:Tuser[] = [
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
]

export const products: Tproduct[] =
    [
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
    ]
export const purchase: Tpurchase [] = [
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
]