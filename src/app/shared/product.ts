import {Category} from "./category";
import {Translation} from "./translation";

export interface Product {
  id: number
  name: string
  description: string
  price: number

  shop: Object
  shopId: number
  shopName: string

  translations: {[key: string]: Translation}

  categories : Category[]
}
