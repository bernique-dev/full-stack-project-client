import {Product} from "./product";

export interface ProductSorter {

  name: string
  function: (p1: Product, p2: Product) => number

}
