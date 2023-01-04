export enum PRODUCT_CATEGORY {
    ACCESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Eletrônicos"
}

export type Tuser = {
    id: string,
    email: string,
    password: string|number
}
export type Tproduct = {
    id: string,
    name: string,
    price: number,
    category: string
}
export type Tpurchase = {
    useId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}
