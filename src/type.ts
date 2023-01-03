export type Tuser ={
    id: string,
    email:string,
    password: string
}
export type Tproduct ={
    id: string,
    name:string,
    price: number,
    categoria: string
}
export type Tpurchase ={
    useId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}


