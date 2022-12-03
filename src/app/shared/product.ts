import {Category} from "./category";

export class Product {
  id: number = 0
  name: string = ""
  description: string = ""
  price: number = 0

  shopId: number = 0
  shopName: string = ""

  categories : Category[] = []

  isEqual(product : Product) : boolean {
    return this.id == product.id
  }

}
