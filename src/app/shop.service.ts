import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Shop} from "./shared/shop";
import {environment} from "../environments/environment";

@Injectable()
export class ShopService {

  constructor(private http : HttpClient) { }

  getShops() : Observable<Shop[]> {
    return this.http.get<Shop[]>(environment.shopsUrl);
  }


  getShop(id: number) : Observable<Shop> {
    return this.http.get<Shop>(environment.shopsUrl + '/' + id)
  }

  addShop(shop : Shop) : Observable<Shop> {
    let shopObject = {...shop}
    // @ts-ignore
    delete shopObject['id']
    // @ts-ignore
    delete shopObject['productList']
    // @ts-ignore
    delete shopObject['openingTimesList']
    const {shopsUrl} = environment;
    return this.http.post<Shop>(shopsUrl, shopObject, environment.httpOptions);
  }

  modifyShop(shop : Shop) {
    let shopObject = {...shop}
    // @ts-ignore
    delete shopObject['id']
    // @ts-ignore
    delete shopObject['productList']
    // @ts-ignore
    delete shopObject['openingTimesList']
    // @ts-ignore
    delete shopObject['creationDate']
    const {shopsUrl, httpOptions} = environment
    return this.http.patch<Shop>(shopsUrl + '/' + shop.id, shopObject, httpOptions)
  }

  deleteShop(shop : Shop) {
    const {shopsUrl, httpOptions} = environment;
    return this.http.delete<Shop>(shopsUrl + '/' + shop.id, httpOptions)
  }

}
