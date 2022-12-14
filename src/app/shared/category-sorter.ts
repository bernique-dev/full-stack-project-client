import {Category} from "./category";

export interface CategorySorter {

  name: string
  function: (p1: Category, p2: Category) => number

}
