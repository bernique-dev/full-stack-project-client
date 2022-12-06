import {Category} from "./category";

export interface Product {
  id: number
  name: string
  description: string
  price: number

  shop: Object
  shopId: number
  shopName: string

  categories : Category[]
}
