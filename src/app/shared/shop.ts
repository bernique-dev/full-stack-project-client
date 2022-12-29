import {Product} from "./product";
import {OpeningTimes} from "./opening-times";

export interface Shop {
  id : number
  name : string
  isOnLeave : boolean

  openingTimes : string
  openingTimesList : OpeningTimes[]

  productList : Product[]
  creationDate : Date

  nbrCategories?: number;
}
