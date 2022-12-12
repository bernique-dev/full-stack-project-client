import { Injectable } from '@angular/core';
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

}
