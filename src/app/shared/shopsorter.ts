import {Shop} from "./shop";

export interface ShopSorter {

  name: string
  function: (p1: Shop, p2: Shop) => number

}
