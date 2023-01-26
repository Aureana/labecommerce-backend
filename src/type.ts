export enum PRODUCT_CATEGORY {
    ACCESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Eletrônicos"
}

export type Tuser = {
    id: string,
    name: string,
    email: string,
    password: string|number
    
}
export type Tproduct = {
    id: string,
    name: string,
    price: number,
    category: string
}
// export type Tpurchase = {
    
//     id: string,
//     purchased_product_id: string,
//     created_at: string,
//     paid: number,
//     quantity:number,
//     buyer_id: string,
//     total_price:number

// }

export type Tpurchase = {
    id: string,
    buyer_id: string,
    total_price:number
    paid: number    
}
